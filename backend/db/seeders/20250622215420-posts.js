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
        userId: 1,
        communityId: 1,
        post: 'This is one of the best MMOs out there.'
      },
      {
        userId: 2,
        communityId: 2,
        post: 'Halo? More like Hey Hole.'
      },
      {
        userId: 3,
        communityId: 3,
        post: 'I like to make them suffer.'
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Posts';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: {
        [Op.in] : [1, 2, 3]
      }
    })
  }
};
