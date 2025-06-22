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
      // Final Fantasy XI images
      {
        gameId: 1,
        url: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/6b/IngameimageFinalFantasyXI.jpg/250px-IngameimageFinalFantasyXI.jpg',
        displayPic: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        gameId: 1,
        url: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5c/ChocoboridersFFXI.jpg/250px-ChocoboridersFFXI.jpg',
        displayPic: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Halo images
      {
        gameId: 2,
        url: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/23/Halo_-_Combat_Evolved_%28screencap%29.jpg/220px-Halo_-_Combat_Evolved_%28screencap%29.jpg',
        displayPic: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        gameId: 2,
        url: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e2/First_official_halo_screenshot.jpg/220px-First_official_halo_screenshot.jpg',
        displayPic: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // The Sims images
      {
        gameId: 3,
        url: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/91/SimsSS.jpg/250px-SimsSS.jpg',
        displayPic: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        gameId: 3,
        url: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/96/Sims_NH.JPG/200px-Sims_NH.JPG',
        displayPic: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        gameId: 3,
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHCFm2XY--m1egc3Q2yno89wzJaw9VMX-uXw&s',
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
          'https://upload.wikimedia.org/wikipedia/en/thumb/6/6b/IngameimageFinalFantasyXI.jpg/250px-IngameimageFinalFantasyXI.jpg',
          'https://upload.wikimedia.org/wikipedia/en/thumb/5/5c/ChocoboridersFFXI.jpg/250px-ChocoboridersFFXI.jpg',
          'https://upload.wikimedia.org/wikipedia/en/thumb/2/23/Halo_-_Combat_Evolved_%28screencap%29.jpg/220px-Halo_-_Combat_Evolved_%28screencap%29.jpg',
          'https://upload.wikimedia.org/wikipedia/en/thumb/e/e2/First_official_halo_screenshot.jpg/220px-First_official_halo_screenshot.jpg',
          'https://upload.wikimedia.org/wikipedia/en/thumb/9/91/SimsSS.jpg/250px-SimsSS.jpg',
          'https://upload.wikimedia.org/wikipedia/en/thumb/9/96/Sims_NH.JPG/200px-Sims_NH.JPG',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHCFm2XY--m1egc3Q2yno89wzJaw9VMX-uXw&s'
        ]
      }
    }, {});
  },
};
