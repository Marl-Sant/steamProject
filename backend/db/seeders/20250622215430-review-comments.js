'use strict';

const { ReviewComment } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await ReviewComment.bulkCreate([
      {
        userId: 1,
        reviewId: 1,
        comment: 'I couldnt agree more! Its great!',
        isHelpful: true,
      },
      {
        userId: 2,
        reviewId: 2,
        comment: 'Any hole is a goal.',
        isHelpful: false,
      },
      {
        userId: 3,
        reviewId: 3,
        comment: 'BURN BABY BURN DISCO INFERNO!',
        isHelpful: true,
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewComments';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: {
        [Op.in] : [1, 2, 3]
      }
    })
  }
};
