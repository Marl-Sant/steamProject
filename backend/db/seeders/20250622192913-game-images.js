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
      // Final Fantasy XI
      {
        gameId: 1,
        url: 'https://ams3.digitaloceanspaces.com/web01.ho-sting/videogamesartwork_com/public/styles/concept_art_gallery_medium_1x/public/concept-art/1590656922/finalfantasyxi_logo_with_title_by_yoshitaka_amano.jpg?itok=yO8D04Gc',
        displayPic: true,
      },
      {
        gameId: 1,
        url: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/6b/IngameimageFinalFantasyXI.jpg/250px-IngameimageFinalFantasyXI.jpg',
        displayPic: false,
      },
      {
        gameId: 1,
        url: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5c/ChocoboridersFFXI.jpg/250px-ChocoboridersFFXI.jpg',
        displayPic: false,
      },

      // Halo
      {
        gameId: 2,
        url: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Halo_-_Combat_Evolved_%28XBox_version_-_box_art%29.jpg/250px-Halo_-_Combat_Evolved_%28XBox_version_-_box_art%29.jpg',
        displayPic: true,
      },
      {
        gameId: 2,
        url: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/23/Halo_-_Combat_Evolved_%28screencap%29.jpg/220px-Halo_-_Combat_Evolved_%28screencap%29.jpg',
        displayPic: false,
      },
      {
        gameId: 2,
        url: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e2/First_official_halo_screenshot.jpg/220px-First_official_halo_screenshot.jpg',
        displayPic: false,
      },

      // The Sims
      {
        gameId: 3,
        url: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/22/The_Sims_Coverart.png/250px-The_Sims_Coverart.png',
        displayPic: true,
      },
      {
        gameId: 3,
        url: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/91/SimsSS.jpg/250px-SimsSS.jpg',
        displayPic: false,
      },
      {
        gameId: 3,
        url: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/96/Sims_NH.JPG/200px-Sims_NH.JPG',
        displayPic: false,
      },
      {
        gameId: 3,
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHCFm2XY--m1egc3Q2yno89wzJaw9VMX-uXw&s',
        displayPic: false,
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    options.tableName = 'GameImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: {
        [Op.in]: [
          // Final Fantasy XI
          'https://ams3.digitaloceanspaces.com/web01.ho-sting/videogamesartwork_com/public/styles/concept_art_gallery_medium_1x/public/concept-art/1590656922/finalfantasyxi_logo_with_title_by_yoshitaka_amano.jpg?itok=yO8D04Gc',
          'https://upload.wikimedia.org/wikipedia/en/thumb/6/6b/IngameimageFinalFantasyXI.jpg/250px-IngameimageFinalFantasyXI.jpg',
          'https://upload.wikimedia.org/wikipedia/en/thumb/5/5c/ChocoboridersFFXI.jpg/250px-ChocoboridersFFXI.jpg',

          // Halo
          'https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Halo_-_Combat_Evolved_%28XBox_version_-_box_art%29.jpg/250px-Halo_-_Combat_Evolved_%28XBox_version_-_box_art%29.jpg',
          'https://upload.wikimedia.org/wikipedia/en/thumb/2/23/Halo_-_Combat_Evolved_%28screencap%29.jpg/220px-Halo_-_Combat_Evolved_%28screencap%29.jpg',
          'https://upload.wikimedia.org/wikipedia/en/thumb/e/e2/First_official_halo_screenshot.jpg/220px-First_official_halo_screenshot.jpg',

          // The Sims
          'https://upload.wikimedia.org/wikipedia/en/thumb/2/22/The_Sims_Coverart.png/250px-The_Sims_Coverart.png',
          'https://upload.wikimedia.org/wikipedia/en/thumb/9/91/SimsSS.jpg/250px-SimsSS.jpg',
          'https://upload.wikimedia.org/wikipedia/en/thumb/9/96/Sims_NH.JPG/200px-Sims_NH.JPG',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHCFm2XY--m1egc3Q2yno89wzJaw9VMX-uXw&s',
        ]
      }
    }, {});
  },
};