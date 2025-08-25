"use strict";

const { User } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await User.bulkCreate(
      [
        {
          email: "demo@user.io",
          username: "Demo-lition",
          firstName: "Debby",
          lastName: "Demo",
          country: "United States",
          bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          hashedPassword: bcrypt.hashSync("password"),
          profilePic:
            "https://assets.teenvogue.com/photos/58a349a06d33d9e97bc0488a/16:9/w_2560%2Cc_limit/ed.jpg",
        },
        {
          email: "user1@user.io",
          username: "FakeUser1",
          firstName: "Freddy",
          lastName: "Fakename",
          country: "Brazil",
          bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          hashedPassword: bcrypt.hashSync("password2"),
          profilePic:
            "https://imageio.forbes.com/specials-images/imageserve/5ed564163dbc9800060b2829/0x0.jpg?format=jpg&crop=1080,1080,x0,y0,safe&height=416&width=416&fit=bounds",
        },
        {
          email: "user2@user.io",
          username: "FakeUser2",
          firstName: "Fatima",
          lastName: "Fakerton",
          country: "United Kingdoms",
          bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          hashedPassword: bcrypt.hashSync("password3"),
          profilePic:
            "https://www.indiewire.com/wp-content/uploads/2017/08/it.jpg",
        },
        {
          email: "TeeLoc@user.io",
          username: "TeefahLockehart",
          firstName: "Richard",
          lastName: "Fakerton",
          country: "Italy",
          bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          hashedPassword: bcrypt.hashSync("password3"),
          profilePic:
            "https://static.wikia.nocookie.net/oproleplaying/images/0/02/YukiMonkey.jpg/revision/latest?cb=20191018033540",
        },
        {
          email: "mushman@user.io",
          username: "ShortStomp",
          firstName: "Mario",
          lastName: "Jumpman",
          country: "Mexico",
          bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          hashedPassword: bcrypt.hashSync("password3"),
          profilePic:
            "https://cdn.masto.host/mastodongamedevplace/media_attachments/files/113/544/180/946/286/393/small/a3af75b5d8136be9.png",
        },
        {
          email: "mushman2@user.io",
          username: "TallStomp",
          firstName: "Luigi",
          lastName: "Jumpman",
          country: "Mexico",
          bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          hashedPassword: bcrypt.hashSync("password3"),
          profilePic: "https://ssb.wiki.gallery/images/b/b5/Ifrit.png",
        },
        {
          email: "spinnerset@user.io",
          username: "GamingGranny",
          firstName: "Rose",
          lastName: "Elderman",
          country: "United States",
          bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          hashedPassword: bcrypt.hashSync("password3"),
          profilePic:
            "https://preview.redd.it/goomba-print-and-paint-v0-in51flhznrza1.jpg?width=1080&crop=smart&auto=webp&s=3b59d15560388d38ceb687d79e5edfc6d089f76d",
        },
        {
          email: "rupertrefund@user.io",
          username: "Iwillberefunding",
          firstName: "Mae",
          lastName: "Bea",
          country: "Canada",
          bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          hashedPassword: bcrypt.hashSync("password3"),
          profilePic:
            "https://trekmovie.com/wp-content/uploads/2018/03/armin-ds9-publicty-640x479.jpg",
        },
        {
          email: "bagachipz@user.io",
          username: "PotatoChip",
          firstName: "Chip",
          lastName: "Falsename",
          country: "China",
          bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          hashedPassword: bcrypt.hashSync("password3"),
          profilePic:
            "https://static.vecteezy.com/system/resources/previews/017/285/400/large_2x/cartoon-potato-potato-mascot-smile-happy-cute-illustration-free-vector.jpg",
        },
        {
          email: "LegSweep@user.io",
          username: "LegSweepLarry",
          firstName: "Lawrence",
          lastName: "DeCampo",
          country: "United Kingdoms",
          bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          hashedPassword: bcrypt.hashSync("password3"),
          profilePic:
            "https://www.wfmaf.org/wp-content/uploads/2015/12/DSC_2484.jpg",
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Users";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        username: {
          [Op.in]: ["Demo-lition", "FakeUser1", "FakeUser2"],
        },
      },
      {}
    );
  },
};
