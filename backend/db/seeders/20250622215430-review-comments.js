"use strict";

const { ReviewComment } = require("../models");
const { Review } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const allReviews = await Review.findAll();
    const seededReviews = allReviews.map((review, i) => {
      if (review.id % 2) {
        return {
          userId: Math.floor(Math.random() * 10) + 1,
          reviewId: review.id,
          comment: "I couldnt agree more! Its great!",
          isHelpful: true,
        };
      } else {
        return {
          userId: Math.floor(Math.random() * 10) + 1,
          reviewId: review.id,
          comment: "Just all around bad",
          isHelpful: false,
        };
      }
    });

    await ReviewComment.bulkCreate(
      seededReviews
      //   [
      //   {
      //     userId: 1,
      //     reviewId: 1,
      //     comment: 'I couldnt agree more! Its great!',
      //     isHelpful: true,
      //   },
      //   {
      //     userId: 2,
      //     reviewId: 2,
      //     comment: 'Any hole is a goal.',
      //     isHelpful: false,
      //   },
      //   {
      //     userId: 3,
      //     reviewId: 3,
      //     comment: 'BURN BABY BURN DISCO INFERNO!',
      //     isHelpful: true,
      //   },
      // ]
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "ReviewComments";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: {
        [Op.in]: [1, 2, 3],
      },
    });
  },
};
