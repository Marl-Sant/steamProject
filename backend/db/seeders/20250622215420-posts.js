"use strict";

const { Post } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Post.bulkCreate([
      {
        userId: 1,
        communityId: 1,
        post: "This is one of the best MMOs out there.",
      },
      {
        userId: 2,
        communityId: 2,
        post: "Halo? More like Hey Hole.",
      },
      {
        userId: 1,
        communityId: 3,
        post: "Did anyone find where the cow level is?",
      },
      {
        userId: 3,
        communityId: 2,
        post: "Tifa is clearly the first lady of Video Games.",
      },
      {
        userId: 3,
        communityId: 3,
        post: "Why did DOOM give me hope for the future?",
      },
      {
        userId: 1,
        communityId: 3,
        post: "Sometimes there really is no way to win Minesweeper.",
      },
      {
        userId: 2,
        communityId: 1,
        post: "Bowser did nothing wrong",
      },
      {
        userId: 1,
        communityId: 1,
        post: "How can I play this game without a monitor?",
      },
      {
        userId: 1,
        communityId: 2,
        post: "This game was something that I've been looking for for a while. Are there any other games like this?",
      },
      {
        userId: 1,
        communityId: 3,
        post: "Does anyone know how to get all the illusionary walls?",
      },
      {
        userId: 1,
        communityId: 3,
        post: "Melania was easy if you just mash the dodge button",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Posts";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: {
        [Op.in]: [1, 2, 3],
      },
    });
  },
};
