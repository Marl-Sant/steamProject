'use strict';

const { PostCommentLike } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await PostCommentLike.bulkCreate([
      {
        ownerId: 1,
        postCommentId: 1,
        liked: true
      },
      {
        ownerId: 2,
        postCommentId: 1,
        liked: false
      },
      {
        ownerId: 3,
        postCommentId: 1,
        liked: true
      },
      {
        ownerId: 1,
        postCommentId: 2,
        liked: true
      },
      {
        ownerId: 2,
        postCommentId: 2,
        liked: false
      },
      {
        ownerId: 3,
        postCommentId: 2,
        liked: true
      },
      {
        ownerId: 1,
        postCommentId: 3,
        liked: true
      },
      {
        ownerId: 2,
        postCommentId: 3,
        liked: false
      },
      {
        ownerId: 3,
        postCommentId: 3,
        liked: true
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'PostCommentLikes';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      postCommentId: {
        [Op.in] : [1, 2 ,3]
      }
    })
  }
};
