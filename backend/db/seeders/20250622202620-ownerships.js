'use strict';
const { Ownership } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Ownership.bulkCreate([
      {
        userId: 1,
        gameId: 1,
      },
      {
        userId: 1,
        gameId: 4,
      },
      {
        userId: 1,
        gameId: 2,
      },
      {
        userId: 2,
        gameId: 2,
      },
      {
        userId: 2,
        gameId: 1,
      },
      {
        userId: 2,
        gameId: 8,
      },
      {
        userId: 3,
        gameId: 7,
      },
      {
        userId: 3,
        gameId: 3,
      },
      {
        userId: 3,
        gameId: 5,
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
    options.tableName = 'Ownerships';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        userId: {
          [Op.in]: [1, 2, 3],
        },
      },
      {}
    );
  },
};
