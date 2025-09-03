"use strict";

const { ProfileComment } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await ProfileComment.bulkCreate([
      {
        userId: 1,
        profileUserId: 2,
        comment: "Hey! Love your profile, very cool!",
      },
      {
        userId: 3,
        profileUserId: 1,
        comment: "Great achievements, keep it up!",
      },
      {
        userId: 2,
        profileUserId: 3,
        comment: "Nice profile picture!",
      },
      {
        userId: 1,
        profileUserId: 3,
        comment: "Amazing gaming stats here.",
      },
      {
        userId: 3,
        profileUserId: 2,
        comment: "Looking forward to seeing your streams!",
      },
      {
        userId: 2,
        profileUserId: 1,
        comment: "Keep posting awesome content!",
      },
      {
        userId: 1,
        profileUserId: 2,
        comment: "Thanks for the help last time!",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "ProfileComments";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: {
        [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      },
    });
  },
};
