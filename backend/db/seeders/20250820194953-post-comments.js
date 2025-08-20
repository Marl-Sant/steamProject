"use strict";

const { PostComment } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await PostComment.bulkCreate([
      {
        userId: 1,
        postId: 6,
        comment: "Hey! Love your post",
      },
      {
        userId: 2,
        postId: 5,
        comment: "Hey! Don't like this",
      },
      {
        userId: 2,
        postId: 4,
        comment: "Hey! Don't like this either",
      },
      {
        userId: 1,
        postId: 3,
        comment: "Hey! I REALLY like this",
      },
      {
        userId: 1,
        postId: 2,
        comment: "Bad take sorry man",
      },
      {
        userId: 2,
        postId: 4,
        comment: "No no no~",
      },
      {
        userId: 3,
        postId: 1,
        comment: "Agreed! Especially with all the things.",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "PostComments";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: {
        [Op.in]: [1, 2, 3, 4, 5, 6, 7],
      },
    });
  },
};
