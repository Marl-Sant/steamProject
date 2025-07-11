'use strict';
const { Ownership } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Ownership.bulkCreate([
      {
        userId: 1,
        gameId: 1,
        mostRecent: true
      },
      {
        userId: 2,
        gameId: 2,
        mostRecent: false
      },
      {
        userId: 3,
        gameId: 3,
        mostRecent: true
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = "Ownerships";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: {
        [Op.in] : [1, 2, 3]
      }
    }, {})
  }
};
