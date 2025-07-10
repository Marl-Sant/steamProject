const express = require("express");

const { Community } = require("../../db/models");
const { Post } = require("../../db/models");
const { Game } = require("../../db/models");

const { Op } = require("sequelize");

const router = express.Router();

const oneWeekAgo = new Date();
oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

router.get("/", async (req, res) => {
  const allCommunities = await Community.findAll({
    include: [
      {
        model: Post,
        where: {
          createdAt: {
            [Op.gte]: oneWeekAgo,
          },
        },
      },
      {
        model: Game,
      },
    ],
  });

  allCommunities.forEach((community, i) => {
    community.dataValues.newPostCount = community.dataValues.Posts.length;
    delete community.dataValues.Posts;
  });

  return res.json(allCommunities);
});

module.exports = router;
