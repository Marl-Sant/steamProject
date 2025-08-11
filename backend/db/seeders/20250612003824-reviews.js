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
        userId: 2,
        gameId: 2,
        isRecommended: false,
      },
      {
        review:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        userId: 3,
        gameId: 3,
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
      username: { [Op.in]: ["Dro", "Marlon", "Simon"] },
    });
  },
};
