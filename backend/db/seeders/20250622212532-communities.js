'use strict';
const { Community } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Community.bulkCreate([
      {
        gameId: 1
      },
      {
        gameId: 2
      },
      {
        gameId: 3
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Communities';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      gameId: {
        [Op.in] : [1, 2, 3]
      }
    })
  }
};
