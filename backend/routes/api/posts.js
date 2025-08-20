const express = require("express");

const { Post } = require("../../db/models");
const { Community } = require("../../db/models");
const { Game } = require("../../db/models");
const { User } = require("../../db/models");

const Sequelize = require("sequelize");

const router = express.Router();
const Op = Sequelize.Op;

router.get("/", async (req, res) => {
  let excludeUserId;
  if (req.user) {
    excludeUserId = req.user.id;
  } else {
    excludeUserId = 0;
  }

  const recentPosts = await Post.findAll({
    where: {
      [Op.not]: {
        userId: excludeUserId,
      },
    },
    include: [
      {
        model: Community,
        include: [
          {
            model: Game,
            attributes: ["title"],
          },
        ],
      },
      { model: User },
    ],
    order: [["createdAt", "DESC"]],
    limit: 10,
  });

  return res.json(recentPosts);
});

router.get("/current", async (req, res) => {
  const userId = req.user.id;
  const recentUserPosts = await Post.findAll({
    where: {
      userId: userId,
    },
    include: [
      {
        model: Community,
        include: [
          {
            model: Game,
            attributes: ["title"],
          },
        ],
      },
    ],
    order: [["createdAt", "DESC"]],
    limit: 10,
  });
  return res.json(recentUserPosts);
});

module.exports = router;
