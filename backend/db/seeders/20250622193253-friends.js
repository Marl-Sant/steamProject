'use strict';
const { Friend } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Friend.bulkCreate([
      {
        senderId: 1,
        receiverId: 2,
      },
      {
        senderId: 2,
        receiverId: 3,
      },
      {
        senderId: 3,
        receiverId: 1,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Friends';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      [Op.or]: [
        { senderId: 1, recieverId: 2 },
        { senderId: 2, recieverId: 3 },
        { senderId: 3, recieverId: 1 },
      ],
    }, {});
  },
};
