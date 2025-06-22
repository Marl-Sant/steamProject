'use strict';

const { Game } = require('../models');

let options = {};
if ((process.env.NODE_ENV === 'production')) {
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
        developer: "Square Enix",
        publisher: "Sony",
        mainImage: 'https://ams3.digitaloceanspaces.com/web01.ho-sting/videogamesartwork_com/public/styles/concept_art_gallery_medium_1x/public/concept-art/1590656922/finalfantasyxi_logo_with_title_by_yoshitaka_amano.jpg?itok=yO8D04Gc',
        subImages: [
          'https://upload.wikimedia.org/wikipedia/en/thumb/6/6b/IngameimageFinalFantasyXI.jpg/250px-IngameimageFinalFantasyXI.jpg', 
          'https://upload.wikimedia.org/wikipedia/en/thumb/5/5c/ChocoboridersFFXI.jpg/250px-ChocoboridersFFXI.jpg']
      },
      {
        title: 'Halo',
        price: 19.99,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        genre: 'First Person Shooter',
        developer: "Bungie",
        publisher: "Microsoft",
        mainImage: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Halo_-_Combat_Evolved_%28XBox_version_-_box_art%29.jpg/250px-Halo_-_Combat_Evolved_%28XBox_version_-_box_art%29.jpg',
        subImages: [
          'https://upload.wikimedia.org/wikipedia/en/thumb/2/23/Halo_-_Combat_Evolved_%28screencap%29.jpg/220px-Halo_-_Combat_Evolved_%28screencap%29.jpg',
          'https://upload.wikimedia.org/wikipedia/en/thumb/e/e2/First_official_halo_screenshot.jpg/220px-First_official_halo_screenshot.jpg',

        ]
      },
      {
        title: 'The Sims',
        price: 49.99,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        genre: 'Simulator',
        developer: "EA",
        publisher: "EA",
        mainImage: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/22/The_Sims_Coverart.png/250px-The_Sims_Coverart.png',
        subImages: [
          'https://upload.wikimedia.org/wikipedia/en/thumb/9/91/SimsSS.jpg/250px-SimsSS.jpg',
          'https://upload.wikimedia.org/wikipedia/en/thumb/9/96/Sims_NH.JPG/200px-Sims_NH.JPG',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHCFm2XY--m1egc3Q2yno89wzJaw9VMX-uXw&s'
        ]
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Games";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      title: { 
        [Op.in]: ['Final Fantasy XI', 'Halo', 'The Sims']
      }
    }, {})
  },
};
