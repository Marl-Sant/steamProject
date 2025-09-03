"use strict";

const { Post } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Post.bulkCreate([
      // Community 1
      { userId: 1, communityId: 1, title: "C1 Post 1", post: "Short post." },
      {
        userId: 2,
        communityId: 1,
        title: "C1 Post 2",
        post: "A medium-length post to vary height.",
      },
      {
        userId: 3,
        communityId: 1,
        title: "C1 Post 3",
        post: "A long post that will wrap over several lines. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vehicula.",
      },
      { userId: 1, communityId: 1, title: "C1 Post 4", post: "Tiny post." },
      {
        userId: 2,
        communityId: 1,
        title: "C1 Post 5",
        post: "Medium post with a few more sentences to make it taller than the shortest ones.",
      },
      {
        userId: 3,
        communityId: 1,
        title: "C1 Post 6",
        post: "Very long post describing the full game experience, mechanics, strategies, and secrets. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Proin non nulla eget libero cursus imperdiet.",
      },
      {
        userId: 1,
        communityId: 1,
        title: "C1 Post 7",
        post: "Short post again.",
      },
      {
        userId: 2,
        communityId: 1,
        title: "C1 Post 8",
        post: "Medium post with some extra text to create variety in post heights.",
      },

      // Community 2
      { userId: 2, communityId: 2, title: "C2 Post 1", post: "Tiny post." },
      {
        userId: 3,
        communityId: 2,
        title: "C2 Post 2",
        post: "Medium post with additional context for content height.",
      },
      {
        userId: 1,
        communityId: 2,
        title: "C2 Post 3",
        post: "Very long post describing quests, characters, strategies, and game secrets. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tincidunt.",
      },
      { userId: 2, communityId: 2, title: "C2 Post 4", post: "Short post." },
      {
        userId: 3,
        communityId: 2,
        title: "C2 Post 5",
        post: "Medium post that is a little taller than the short ones.",
      },
      {
        userId: 1,
        communityId: 2,
        title: "C2 Post 6",
        post: "Extremely long post with lots of details about every aspect of the game. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce facilisis.",
      },
      {
        userId: 2,
        communityId: 2,
        title: "C2 Post 7",
        post: "Short post again.",
      },
      {
        userId: 3,
        communityId: 2,
        title: "C2 Post 8",
        post: "Medium post for variety.",
      },

      // Community 3
      {
        userId: 1,
        communityId: 3,
        title: "C3 Post 1",
        post: "Short and sweet.",
      },
      {
        userId: 3,
        communityId: 3,
        title: "C3 Post 2",
        post: "Medium-length post with some extra details.",
      },
      {
        userId: 2,
        communityId: 3,
        title: "C3 Post 3",
        post: "Long post with lots of text to make this post tall. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus euismod.",
      },
      { userId: 1, communityId: 3, title: "C3 Post 4", post: "Tiny post." },
      {
        userId: 3,
        communityId: 3,
        title: "C3 Post 5",
        post: "Medium-length post with a few sentences to increase height slightly.",
      },
      {
        userId: 2,
        communityId: 3,
        title: "C3 Post 6",
        post: "Very long post with a full walkthrough of game mechanics, tips, and lore details. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit amet.",
      },
      { userId: 1, communityId: 3, title: "C3 Post 7", post: "Short post." },
      {
        userId: 3,
        communityId: 3,
        title: "C3 Post 8",
        post: "Medium-length post with just enough content to vary height.",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Posts";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
    });
  },
};
