"use strict";

const { Review } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Review.bulkCreate([
      {
        review:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        userId: 1,
        gameId: 1,
        isRecommended: true,
      },
      {
        review:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        userId: 1,
        gameId: 3,
        isRecommended: false,
      },
      {
        review:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        userId: 1,
        gameId: 2,
        isRecommended: true,
      },
      {
        review:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        userId: 1,
        gameId: 7,
        isRecommended: true,
      },
      {
        review:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        userId: 2,
        gameId: 2,
        isRecommended: false,
      },
      {
        review:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        userId: 2,
        gameId: 1,
        isRecommended: false,
      },
      {
        review:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        userId: 2,
        gameId: 5,
        isRecommended: false,
      },
      {
        review:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        userId: 2,
        gameId: 4,
        isRecommended: true,
      },
      {
        review:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        userId: 2,
        gameId: 6,
        isRecommended: true,
      },
      {
        review:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        userId: 3,
        gameId: 3,
        isRecommended: true,
      },
      {
        review:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        userId: 3,
        gameId: 1,
        isRecommended: true,
      },
      {
        review:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        userId: 3,
        gameId: 2,
        isRecommended: true,
      },
      {
        review:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        userId: 3,
        gameId: 4,
        isRecommended: true,
      },
      {
        review:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        userId: 3,
        gameId: 5,
        isRecommended: true,
      },
      {
        review:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        userId: 4,
        gameId: 12,
        isRecommended: true,
      },
      {
        review:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        userId: 4,
        gameId: 11,
        isRecommended: false,
      },
      {
        review:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        userId: 4,
        gameId: 10,
        isRecommended: true,
      },
      {
        review:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        userId: 4,
        gameId: 9,
        isRecommended: false,
      },
      {
        review:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        userId: 4,
        gameId: 8,
        isRecommended: true,
      },
      {
        review:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        userId: 4,
        gameId: 7,
        isRecommended: true,
      },
      {
        review:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        userId: 4,
        gameId: 6,
        isRecommended: false,
      },
      {
        review:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        userId: 5,
        gameId: 4,
        isRecommended: false,
      },
      {
        review:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        userId: 5,
        gameId: 5,
        isRecommended: true,
      },
      {
        review:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        userId: 5,
        gameId: 6,
        isRecommended: true,
      },
      {
        review:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        userId: 5,
        gameId: 7,
        isRecommended: true,
      },
      {
        review:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        userId: 5,
        gameId: 8,
        isRecommended: false,
      },
      {
        review:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        userId: 5,
        gameId: 9,
        isRecommended: false,
      },
      {
        review:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        userId: 5,
        gameId: 10,
        isRecommended: true,
      },
      {
        review:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        userId: 5,
        gameId: 11,
        isRecommended: true,
      },
      {
        review:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        userId: 5,
        gameId: 12,
        isRecommended: true,
      },
      {
        review:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        userId: 5,
        gameId: 1,
        isRecommended: false,
      },
      {
        review:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        userId: 5,
        gameId: 2,
        isRecommended: true,
      },
      {
        review:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        userId: 5,
        gameId: 3,
        isRecommended: false,
      },
      {
        review:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        userId: 6,
        gameId: 3,
        isRecommended: false,
      },
      {
        review:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        userId: 6,
        gameId: 2,
        isRecommended: true,
      },
      {
        review:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        userId: 6,
        gameId: 1,
        isRecommended: false,
      },
      {
        review:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        userId: 7,
        gameId: 10,
        isRecommended: false,
      },
      {
        review:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        userId: 7,
        gameId: 12,
        isRecommended: true,
      },
      {
        review:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        userId: 7,
        gameId: 8,
        isRecommended: true,
      },
      {
        review:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        userId: 7,
        gameId: 6,
        isRecommended: false,
      },
      {
        review:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        userId: 8,
        gameId: 4,
        isRecommended: false,
      },
      {
        review:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        userId: 9,
        gameId: 1,
        isRecommended: false,
      },
      {
        review:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        userId: 9,
        gameId: 3,
        isRecommended: true,
      },
      {
        review:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        userId: 9,
        gameId: 5,
        isRecommended: true,
      },
      {
        review:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        userId: 9,
        gameId: 7,
        isRecommended: false,
      },
      {
        review:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        userId: 10,
        gameId: 10,
        isRecommended: true,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = "Reviews";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3] },
    });
  },
};
