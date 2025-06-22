'use strict';

const { GameImage } = require('../models');

let options = {};
if ((process.env.NODE_ENV === 'production')) {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await GameImage.bulkCreate([
      {
        gameId: 1,
        url: 'https://example.com/images/finalfantasy_main.jpg',
        displayPic: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        gameId: 1,
        url: 'https://example.com/images/finalfantasy_side1.jpg',
        displayPic: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        gameId: 2,
        url: 'https://example.com/images/halo_main.jpg',
        displayPic: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        gameId: 3,
        url: 'https://example.com/images/thesims_main.jpg',
        displayPic: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        gameId: 3,
        url: 'https://example.com/images/thesims_side1.jpg',
        displayPic: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'GameImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: {
        [Op.in]: [
          'https://example.com/images/finalfantasy_main.jpg',
          'https://example.com/images/finalfantasy_side1.jpg',
          'https://example.com/images/halo_main.jpg',
          'https://example.com/images/thesims_main.jpg',
          'https://example.com/images/thesims_side1.jpg',
        ],
      },
    }, {});
  },
};
