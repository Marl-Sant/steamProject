const express = require("express");
const router = express.Router();
const openai = require("../../lib/openai");
const { Game } = require("../../db/models");

const tools = [
  {
    type: "function",
    function: {
      name: "getGameFromDB",
      description: "Recommend a game from the local DB by title",
      parameters: {
        type: "object",
        properties: {
          title: {
            type: "string",
            description: "Game title to look up",
          },
        },
        required: ["title"],
      },
    },
  },
];

router.post("/", async (req, res) => {
  const { message } = req.body;

  try {
    const initialResponse = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a helpful game assistant for a store. If a game is in the local DB, return its details. If not, suggest a Steam link using https://store.steampowered.com/search/?term={game title}. If you are asked a question that is outside that does not relate to video games at all, do not answer and tell the user that you can only help with video game related questions that pertain to the store.",
        },
        { role: "user", content: message },
      ],
      tools,
      tool_choice: "auto",
    });

    const toolCall = initialResponse.choices[0].message.tool_calls?.[0];

    if (toolCall) {
      const args = JSON.parse(toolCall.function.arguments);
      const { title } = args;

      const game = await Game.findOne({
        where: { title },
      });

      const toolResponse = game
        ? {
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
        messages: [
          { role: "user", content: message },
          { role: "assistant", tool_calls: [toolCall] },
          {
            role: "tool",
            name: "getGameFromDB",
            content: JSON.stringify(toolResponse),
          },
        ],
      });

      return res.json({ reply: followUp.choices[0].message.content });
    } else {
      return res.json({ reply: initialResponse.choices[0].message.content });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to process chat" });
  }
});

module.exports = router;
