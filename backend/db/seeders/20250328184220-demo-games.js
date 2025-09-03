"use strict";

const { Game } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}
let deleteTitle = [];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const appIdArray = [
      1151340, 1203620, 1627720, 2246340, 594330, 1361210, 1086940, 1313140,
      1222140, 601430, 1670870, 976310,
    ];

    const seedGameInformation = await Promise.all(
      appIdArray.map(async (id) => {
        const response = await fetch(
          `https://store.steampowered.com/api/appdetails?appids=${id}&cc=us&l=en`
        );
        const jsonResponse = await response.json();
        const base = jsonResponse[`${id}`]["data"];
        let seedGame = {};
        deleteTitle.push(base["name"]);
        seedGame["title"] = base["name"];
        seedGame["shortDescription"] = base["short_description"];
        seedGame["detailedDescription"] = base["detailed_description"];
        seedGame["headerImage"] = base["header_image"];
        seedGame["capsuleImage"] = base["capsule_image"];
        seedGame["website"] = base["website"];
        seedGame["requirements"] = base["pc_requirements"];
        seedGame["legal"] = base["legal_notice"];
        seedGame["publishers"] = base["publishers"];
        seedGame["developers"] = base["developers"];
        seedGame["price"] = base["price_overview"]["final_formatted"].slice(1);
        seedGame["categories"] = base["categories"].map((category) => {
          return category["description"];
        });
        seedGame["genres"] = base["genres"].map((genre) => {
          return genre["description"];
        });
        seedGame["screenshots"] = base["screenshots"].map((image) => {
          return image["path_thumbnail"];
        });
        seedGame["movies"] = base["movies"].map((movie) => {
          return movie["mp4"]["480"];
        });
        seedGame["releaseDate"] = base["release_date"]["date"];
        seedGame["background"] = base["background"];
        seedGame["ESRBRating"] = base["ratings"]["esrb"];

        console.log(seedGame.price, seedGame.title);
        return seedGame;
      })
    );

    // console.log(seedGameInformation);
    // const finalFantasy = await fetch(
    //   'https://store.steampowered.com/api/appdetails?appids=230330'
    // );

    // const finalFantasyData = await finalFantasy.json();
    // console.log(
    //   finalFantasyData[230330]['data'],
    //   'THIS IS BEING HIT'
    // );

    await Game.bulkCreate(
      seedGameInformation
      //   [
      //   {
      //     title: finalFantasy[230330]['data']['name'],
      //     price: 59.99,
      //     description:
      //       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      //     genre: 'Tactics',
      //     developer: 'Square Enix',
      //     publisher: 'Sony',
      //   },
      //   {
      //     title: 'Halo',
      //     price: 19.99,
      //     description:
      //       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      //     genre: 'First Person Shooter',
      //     developer: 'Bungie',
      //     publisher: 'Microsoft',
      //   },
      //   {
      //     title: 'The Sims',
      //     price: 49.99,
      //     description:
      //       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      //     genre: 'Simulator',
      //     developer: 'EA',
      //     publisher: 'EA',
      //   },
      // ]
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Games";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        title: {
          [Op.in]: deleteTitle,
        },
      },
      {}
    );
  },
};
