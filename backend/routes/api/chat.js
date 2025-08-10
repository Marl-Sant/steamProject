const express = require('express');
const router = express.Router();
const openai = require('../../lib/openai');
const { Game } = require('../../db/models');
const { Op } = require('sequelize');

const tools = [
  {
    type: 'function',
    function: {
      name: 'getGameFromDB',
      description:
        'Looks up information about a game in our database or Steam website if not found in our database based on the title',
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
        'Recommends a game from our database based on the user input.',
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
];

router.post('/', async (req, res) => {
  const { message } = req.body;

  try {
    const initialResponse = await openai.chat.completions.create(
      {
        model: 'gpt-5-mini',
        messages: [
          {
            role: 'system',
            content:
              'You are a very helpful assistant at a video game store. You know nothing outside of video games and will not provide any information about other topics. When a user asks a question only give information about video games. Once the question is asked check our database to see if the video game has an entry. If it does, provide a explanation of the video game that includes a shortened version of the detailedDescription, the developer, and the price.',
          },
          { role: 'user', content: message },
        ],
        tools,
        tool_choice: 'auto',
      }
    );

    console.log(initialResponse.choices[0].message.tool_calls);
    const toolCall =
      initialResponse.choices[0].message.tool_calls?.[0];

    if (toolCall['function']['name'] === 'getGameFromDB') {
      const args = JSON.parse(toolCall.function.arguments);
      const { title } = args;

      const game = await Game.findOne({
        where: { title },
      });

      const toolResponse = game
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

      const followUp = await openai.chat.completions.create({
        model: 'gpt-5-mini',
        messages: [
          {
            role: 'system',
            content:
              'You are a very helpful assistant at a video game store. You know nothing outside of video games and will not provide any information about other topics. When a user asks a question only give information about video games. Once the question is asked check our database to see if the video game has an entry. If it does, provide a explanation of the video game that includes a shortened version of the detailedDescription, the developer, and the price. You should also create a html anchor tag that follows the structure of "http://localhost:5173/games/{game.id} with the game id being supplied by a return from the database. This link should be real HTML and would allow the user to click it and navigate to the game detail page. If the game does not exist in our database, provide the user a link to the Steam website to find the game. Your reply should come back housed in a div. That div should have in-line styling that is simple and consistent with previous messages.',
          },
          { role: 'user', content: message },
          { role: 'assistant', tool_calls: [toolCall] },
          {
            role: 'tool',
            tool_call_id: toolCall.id,
            name: 'getGameFromDB',
            content: JSON.stringify(toolResponse),
          },
        ],
      });

      return res.json({
        reply: followUp.choices[0].message.content,
      });
    } else if (
      toolCall['function']['name'] === 'recommendGame'
    ) {
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

      const game = await Game.findAll(searchParams);

      const toolResponse = game ? game : null;

      const followUp = await openai.chat.completions.create({
        model: 'gpt-5-mini',
        messages: [
          {
            role: 'system',
            content:
              'You are a very helpful assistant at a video game store. You know nothing outside of video games and will not provide any information about other topics. When a user asks a question only give information about video games. Once the question is asked check our database to see if the video game has an entry. If it does, provide a explanation of the video game that includes a shortened version of the detailedDescription, the developer, and the price. You should also create a html anchor tag that follows the structure of "http://localhost:5173/games/{game.id} with the game id being supplied by a return from the database. This link should be real HTML and would allow the user to click it and navigate to the game detail page. If the game does not exist in our database, provide the user a link to the Steam search page using the title of the game as a search query. Any links that are directed to Steam should have a header notifying the user they will be leaving our site as well as a professional explanation that we do not have that a game based on the user input in our database. Regardless if a game is or is not in our database, provide the user with at least three recommendations.  Your reply should come back housed in a div. That div should have in-line styling that is simple and consistent with previous messages.',
          },
          { role: 'user', content: message },
          { role: 'assistant', tool_calls: [toolCall] },
          {
            role: 'tool',
            tool_call_id: toolCall.id,
            name: 'recommendGame',
            content: JSON.stringify(toolResponse),
          },
        ],
      });

      console.log(followUp.choices, 'LOOK HERE');

      return res.json({
        reply: followUp.choices
          .map((game) => game.message.content)
          .join(' '),
      });
    } else {
      return res.json({
        reply: initialResponse.choices[0].message.content,
      });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: 'Failed to process chat' });
  }
});

module.exports = router;
