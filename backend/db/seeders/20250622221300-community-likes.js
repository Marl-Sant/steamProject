"use strict";

const { CommunityLike } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await CommunityLike.bulkCreate([
      {
        userId: 1,
        communityId: 1,
        liked: true,
      },
      {
        userId: 2,
        communityId: 1,
        liked: false,
      },
      {
        userId: 3,
        communityId: 1,
        liked: true,
      },
      {
        userId: 1,
        communityId: 2,
        liked: true,
      },
      {
        userId: 2,
        communityId: 2,
        liked: false,
      },
      {
        userId: 3,
        communityId: 2,
        liked: true,
      },
      {
        userId: 1,
        communityId: 3,
        liked: true,
      },
      {
        userId: 2,
        communityId: 3,
        liked: false,
      },
      {
        userId: 3,
        communityId: 3,
        liked: true,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "CommunityLikes";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      communityId: {
        [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      },
    });
  },
};
