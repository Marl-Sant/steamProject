'use strict';

const { CommunityLike } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await CommunityLike.bulkCreate([
      {
        ownerId: 1,
        communityId: 1,
        liked: true
      },
      {
        ownerId: 2,
        communityId: 1,
        liked: false
      },
      {
        ownerId: 3,
        communityId: 1,
        liked: true
      },
      {
        ownerId: 1,
        communityId: 2,
        liked: true
      },
      {
        ownerId: 2,
        communityId: 2,
        liked: false
      },
      {
        ownerId: 3,
        communityId: 2,
        liked: true
      },
      {
        ownerId: 1,
        communityId: 3,
        liked: true
      },
      {
        ownerId: 2,
        communityId: 3,
        liked: false
      },
      {
        ownerId: 3,
        communityId: 3,
        liked: true
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'CommunityLikes';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      communityId: {
        [Op.in] : [1, 2 ,3]
      }
    })
  }
};
