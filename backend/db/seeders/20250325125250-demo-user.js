'use strict';

const { User } = require('../models');
const bcrypt = require('bcryptjs');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await User.bulkCreate(
      [
        {
          email: 'demo@user.io',
          username: 'Demo-lition',
          firstName: 'Debby',
          lastName: 'Demo',
          country: 'United States',
          bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          hashedPassword: bcrypt.hashSync('password'),
          profilePic:
            'https://assets.teenvogue.com/photos/58a349a06d33d9e97bc0488a/16:9/w_2560%2Cc_limit/ed.jpg',
        },
        {
          email: 'user1@user.io',
          username: 'FakeUser1',
          firstName: 'Freddy',
          lastName: 'Fakename',
          country: 'Brazil',
          bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          hashedPassword: bcrypt.hashSync('password2'),
          profilePic:
            'https://imageio.forbes.com/specials-images/imageserve/5ed564163dbc9800060b2829/0x0.jpg?format=jpg&crop=1080,1080,x0,y0,safe&height=416&width=416&fit=bounds',
        },
        {
          email: 'user2@user.io',
          username: 'FakeUser2',
          firstName: 'Fatima',
          lastName: 'Fakerton',
          country: 'United Kingdoms',
          bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          hashedPassword: bcrypt.hashSync('password3'),
          profilePic:
            'https://www.indiewire.com/wp-content/uploads/2017/08/it.jpg',
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        username: {
          [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'],
        },
      },
      {}
    );
  },
};
