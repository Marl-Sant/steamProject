'use strict';

const { Game } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Game.bulkCreate([
      {
        title: 'Final Fantasy XI',
        price: 59.99,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        genre: 'Tactics',
        developer: 'Square Enix',
        publisher: 'Sony',
      },
      {
        title: 'Halo',
        price: 19.99,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        genre: 'First Person Shooter',
        developer: 'Bungie',
        publisher: 'Microsoft',
      },
      {
        title: 'The Sims',
        price: 49.99,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        genre: 'Simulator',
        developer: 'EA',
        publisher: 'EA',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Games';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        title: {
          [Op.in]: ['Final Fantasy XI', 'Halo', 'The Sims'],
        },
      },
      {}
    );
  },
};
