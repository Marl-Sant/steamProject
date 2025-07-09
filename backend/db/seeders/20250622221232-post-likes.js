'use strict';

const { PostLike } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await PostLike.bulkCreate([
      {
        userId: 1,
        postId: 1,
        liked: true
      },
      {
        userId: 2,
        postId: 1,
        liked: false
      },
      {
        userId: 3,
        postId: 1,
        liked: true
      },
      {
        userId: 1,
        postId: 2,
        liked: true
      },
      {
        userId: 2,
        postId: 2,
        liked: false
      },
      {
        userId: 3,
        postId: 2,
        liked: true
      },
      {
        userId: 1,
        postId: 3,
        liked: true
      },
      {
        userId: 2,
        postId: 3,
        liked: false
      },
      {
        userId: 3,
        postId: 3,
        liked: true
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'PostLikes';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      postId: {
        [Op.in] : [1, 2 ,3]
      }
    })
  }
};