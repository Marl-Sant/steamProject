'use strict';

const { Post } = require('../models');

let options = {};
if ((process.env.NODE_ENV === 'production')) {
  options.schema = process.env.SCHEMA;
}


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Post.bulkCreate([
      {
        ownerId: 1,
        communityId: 1,
        post: 'This is one of the best MMOs out there.'
      },
      {
        ownerId: 2,
        communityId: 2,
        post: 'Halo? More like Hey Hole.'
      },
      {
        ownerId: 3,
        communityId: 3,
        post: 'I like to make them suffer.'
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Posts';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId: {
        [Op.in] : [1, 2, 3]
      }
    })
  }
};
