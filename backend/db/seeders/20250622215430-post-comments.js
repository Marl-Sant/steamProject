'use strict';

const { PostComment } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await PostComment.bulkCreate([
      {
        ownerId: 1,
        postId: 1,
        comment: 'I couldnt agree more! Its great!'
      },
      {
        ownerId: 2,
        postId: 2,
        comment: 'Any hole is a goal.'
      },
      {
        ownerId: 3,
        postId: 3,
        comment: 'BURN BABY BURN DISCO INFERNO!'
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'PostComments';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId: {
        [Op.in] : [1, 2, 3]
      }
    })
  }
};
