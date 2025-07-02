'use strict';
const { ReviewLike } = require('../models');
const { Review } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const allReviews = await Review.findAll();

const seededReviewLikes = allReviews.map((review, i) => {
  let reviewLike = {};
  reviewLike[ownerId] = i + 1;
  reviewLike[reviewId] = review.id;
  reviewLike[liked] = i % 2;
  return reviewLike;
});

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await ReviewLike.bulkCreate(
      seededReviewLikes
      //   [
      //   {
      //     ownerId: 1,
      //     reviewId: 1,
      //     liked: true
      //   },
      //   {
      //     ownerId: 2,
      //     reviewId: 2,
      //     liked: false
      //   },
      //   {
      //     ownerId: 3,
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
        ownerId: {
          [Op.in]: [1, 2, 3],
        },
      },
      {}
    );
  },
};
