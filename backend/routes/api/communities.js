const express = require("express");

const { Community } = require("../../db/models");
const { Post } = require("../../db/models");
const { Game } = require("../../db/models");
const { User } = require("../../db/models");

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

router.get("/:communityId", async (req, res) => {
  const currentCommunity = await Community.findOne({
    where: {
      id: req.params.communityId,
    },
    include: [
      {
        model: Post,
        order: ["createdAt", "DESC"],
        include: [
          {
            model: User,
          },
        ],
      },
      {
        model: Game,
      },
    ],
  });

  const normalizedPosts = {};

  currentCommunity.Posts.map((post) => {
    normalizedPosts[post.id] = post;
  });

  currentCommunity.dataValues.Posts = normalizedPosts;

  res.json(currentCommunity);
});

module.exports = router;
