const express = require('express');
const router = express.Router();
const openai = require('../../lib/openai');
const { Game } = require('../../db/models');
const { Review } = require('../../db/models');
const { Op } = require('sequelize');

const tools = [
  {
    type: 'function',
    function: {
      name: 'getGameFromDB',
      description:
        'Looks up information about a game in our database or Steam website if not found in our database. Use this function if the user specifically asks for the detail of a game and provides the title. These recommendations should always include a link. If the game is in our database, create a link and use the following URL http://localhost:5173/games/{game.id} where game.id is provided value from a return.',
      parameters: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            description: 'Game title to look up',
          },
        },
        required: ['title'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'recommendGame',
      description:
        'Recommends a game by searching through our database to find matching keywords in our Games detailedDescription. Will also recommend a game by searching Steam for the game if it is not in our database. These recommendations should always include a link. If the game is in our database, create a link and use the following URL http://localhost:5173/games/{game.id} where game.id is provided value from a return.  Always provide at least 3 recommendation and notify the user if the link leads outside of our website. Use this function if the user does not provide you a title and does not reference any games that they own.',
      parameters: {
        type: 'object',
        properties: {
          keywords: {
            type: 'array',
            description:
              'Array of specific keywords found in the user input. Include other words that are related to the keywords that may not have been included in the input',
            items: {
              type: 'string',
              description: 'A single keyword',
            },
          },
        },
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'highestPositiveReview',
      description:
        'Finds the game in our database with the highest number of reviews marked as recommended (isRecommended = true) and count how many trues that game has and turn that into a percentage. Whenever a user asks for games with highest rating or anything along those lines assume they are asking about highest number of positive recommendations or positive reviews or is recommended. If a game title keyword is provided, limits the search to games matching that keyword. Always include the review text, reviewer name (if available), and a link to the game. If the game is in our database, create a link using the following URL http://localhost:5173/games/{game.id}. Notify the user if the link leads outside our website. I always want you to display 3 games at most.',
      parameters: {
        type: 'object',
        properties: {
          keywords: {
            type: 'array',
            description: 'Optional array of keywords to filter games by title or anticipate it by genre.',
            items: {
              type: 'string',
              description: 'A single keyword',
            },
          },
        },
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'highestNegativeReview',
      description:
        'Finds the game in our database with the highest number of reviews marked as not recommended (isRecommended = false) and count how many false that game has. Whenever a user asks for games with lowest rating or anything along those lines assume they are asking about lowest number of negative recommendations or negative reviews or not recommended. If a game title keyword is provided, limits the search to games matching that keyword. Always include the review text, reviewer name (if available), and a link to the game. If the game is in our database, create a link using the following URL http://localhost:5173/games/{game.id}. Notify the user if the link leads outside our website.',
      parameters: {
        type: 'object',
        properties: {
          keywords: {
            type: 'array',
            description: 'Optional array of keywords to filter games by title or anticipate it by genre.',
            items: {
              type: 'string',
              description: 'A single keyword',
            },
          },
        },
      },
    },
  }
];

router.post('/', async (req, res) => {
  const { message } = req.body;

  const baseRequest = {
    model: 'gpt-5-mini',
    messages: [
      {
        role: 'system',
        content:
          'You are a helpful assistant at a video game store. Users will often ask you to recommend games in a variety of ways. You only know information regarding video games and will not answer questions outside that topic. When a user asks you about a video game, you will always check the database for information to provide them. If the video game is not in the database, you will provide a link to Steam with that game as a search query. You will provide a short description of the game and the features, the developer, and the price.',
      },
      { role: 'user', content: message },
    ],
    tools,
  };

  try {
    const initialResponse = await openai.chat.completions.create({
      ...baseRequest,
      model: 'gpt-5-mini',
      tools,
    });

    console.log(initialResponse.choices[0].message.tool_calls?.[0]);

    const toolCall = initialResponse.choices[0].message.tool_calls?.[0];

    let game;
    let toolResponse;

    if (toolCall) {
      const functionName = toolCall.function.name;

      if (functionName === 'getGameFromDB') {
        const args = JSON.parse(toolCall.function.arguments);
        const { title } = args;

        game = await Game.findOne({
          where: { title },
        });

        toolResponse = game
          ? {
              id: game.id,
              title: game.title,
              descriptions: {
                shortDescriptions: game.shortDescription,
                detailedDescriptions: game.detailedDescription,
              },
              genre: game.genre,
              price: game.price,
            }
          : null;
      } else if (functionName === 'recommendGame') {
        const args = JSON.parse(toolCall.function.arguments);
        const { keywords } = args;

        let searchParams = {
          where: {},
        };
        if (keywords)
          searchParams.where.detailedDescription = {
            [Op.or]: keywords.map((keyword) => ({
              [Op.substring]: `${keyword}`,
            })),
          };

        game = await Game.findAll(searchParams);

        toolResponse = game ? game : null;
      } else if (
        functionName === 'highestPositiveReview' ||
        functionName === 'highestNegativeReview'
      ) {
        const args = JSON.parse(toolCall.function.arguments);
        const { keywords } = args;
      
        const whereClause = {};
        if (keywords && keywords.length > 0) {
          whereClause[Op.or] = [
            { title: { [Op.substring]: keywords[0] } },
            { genres: { [Op.substring]: keywords[0] } },
            { shortDescription: { [Op.substring]: keywords[0] } }
          ];
        }
      
        const isRecommendedValue = functionName === 'highestPositiveReview';
      
        // Find all games matching criteria and include all reviews for percentage calculation
        const games = await Game.findAll({
          where: whereClause,
          include: [
            {
              model: Review,
              required: false,
              attributes: ['review', 'userId', 'isRecommended'],
            },
          ],
        });
      
        const gamesWithStats = games
          .map((g) => {
            const totalReviews = g.Reviews ? g.Reviews.length : 0;
            const matchingReviews = g.Reviews
              ? g.Reviews.filter((r) => r.isRecommended === isRecommendedValue).length
              : 0;
            const percentRecommended = totalReviews
              ? Math.round((matchingReviews / totalReviews) * 100)
              : 0;
            return {
              game: g,
              matchingCount: matchingReviews,
              totalReviews,
              percentRecommended,
            };
          })
          .sort((a, b) => {
            // Weighted score favors higher percentage and more matching reviews
            const scoreA = a.percentRecommended * Math.log(1 + a.matchingCount);
            const scoreB = b.percentRecommended * Math.log(1 + b.matchingCount);
            return scoreB - scoreA;
          })
          .slice(0, 3); // top 3 only
      
        toolResponse = [];
      
        for (const entry of gamesWithStats) {
          const reviewToReturn =
            entry.game.Reviews && entry.game.Reviews.length > 0
              ? entry.game.Reviews.find((r) => r.isRecommended === isRecommendedValue)
              : null;
      
          toolResponse.push({
            id: entry.game.id,
            title: entry.game.title,
            matchingCount: entry.matchingCount,
            totalReviews: entry.totalReviews,
            percentRecommended: entry.percentRecommended,
            review: reviewToReturn
              ? {
                  text: reviewToReturn.review,
                  reviewer: reviewToReturn.userId,
                }
              : null,
          });
        }
      }
      

      const followUp = await openai.chat.completions.create({
        model: 'gpt-5-mini',
        messages: [
          {
            role: 'system',
            content:
              'You are a very helpful assistant at a video game store. You know nothing outside of video games and will not provide any information about other topics. When a user asks a question only give information about video games. Once the question is asked check our database to see if the video game has an entry. If it does, provide an explanation of the video game that includes a shortened version of the detailedDescription, the developer, and the price. You should also create a html anchor tag that follows the structure of "http://localhost:5173/games/{game.id}" with the game id being supplied by a return from the database. This link should be real HTML and would allow the user to click it and navigate to the game detail page, provide link as a button. If the game does not exist in our database, provide the user a link to the Steam website to find the game. Your reply should come back housed in a div matching the style of the rest of the website. The div should span the entire area of the page-wrapper div.make every reply consistant with the game image as a background. That div should have in-line styling that is simple and consistent with previous messages.',
          },
          { role: 'user', content: message },
          { role: 'assistant', tool_calls: [toolCall] },
          {
            role: 'tool',
            tool_call_id: toolCall.id,
            name: functionName,
            content: JSON.stringify(toolResponse),
          },
        ],
      });

      return res.json({
        reply: followUp.choices[0].message.content,
      });
    } else {
      return res.json({
        reply: initialResponse.choices[0].message.content,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to process chat' });
  }
});

module.exports = router;