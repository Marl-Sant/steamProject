'use strict';
const { ReviewLike } = require('../models');
const { Review } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const allReviews = await Review.findAll();

    const seededReviewLikes = allReviews.map((review, i) => {
      let reviewLike = {};
      reviewLike["userId"] = i + 1;
      reviewLike["reviewId"] = review.id;
      reviewLike["liked"] = true;
      return reviewLike;
    });
    await ReviewLike.bulkCreate(
      seededReviewLikes
      //   [
      //   {
      //     userId: 1,
      //     reviewId: 1,
      //     liked: true
      //   },
      //   {
      //     userId: 2,
      //     reviewId: 2,
      //     liked: false
      //   },
      //   {
      //     userId: 3,
      //     reviewId: 3,
      //     liked: true
      //   },
      // ]
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'ReviewLikes';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        userId: {
          [Op.in]: [1, 2, 3],
        },
      },
      {}
    );
  },
};
