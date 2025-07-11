'use strict';

const { Post } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Post.bulkCreate([
      {
        userId: 1,
        communityId: 1,
        post: 'This is one of the best MMOs out there.',
      },
      {
        userId: 2,
        communityId: 2,
        post: 'Halo? More like Hey Hole.',
      },
      {
        userId: 1,
        communityId: 3,
        post: 'Did anyone find where the cow level is?',
      },
      {
        userId: 3,
        communityId: 2,
        post: 'Tifa is clearly the first lady of Video Games.',
      },
      {
        userId: 3,
        communityId: 3,
        post: 'Why did DOOM give me hope for the future?',
      },
      {
        userId: 1,
        communityId: 3,
        post: 'Sometimes there really is no way to win Minesweeper.',
      },
      {
        userId: 2,
        communityId: 1,
        post: 'Bowser did nothing wrong',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Posts';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: {
        [Op.in]: [1, 2, 3],
      },
    });
  },
};
