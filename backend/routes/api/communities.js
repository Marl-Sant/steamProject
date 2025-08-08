const express = require("express");

const { Community, Post, Game, User } = require("../../db/models");
const { Op } = require("sequelize");

const router = express.Router();

router.get("/", async (req, res) => {
  // ...
});

router.get("/recent", async (req, res) => {
  // ...
});

router.get("/:communityId", async (req, res) => {
  const currentCommunity = await Community.findOne({
    where: {
      id: req.params.communityId,
    },
    include: [
      {
        model: Post,
        order: [["createdAt", "DESC"]],
        include: [{ model: User }],
      },
      { model: Game },
    ],
  });

  const normalizedPosts = {};
  currentCommunity.Posts.forEach((post) => {
    normalizedPosts[post.id] = post;
  });
  currentCommunity.dataValues.Posts = normalizedPosts;

  res.json(currentCommunity);
});

// Your new route here — NOT nested inside any other route
router.get("/user/:userId/posts", async (req, res) => {
  const userId = req.params.userId;

  const posts = await Post.findAll({
    where: { userId },
    include: [
      {
        model: Community,
        include: [{ model: Game }],
      },
      { model: User },
    ],
    order: [["createdAt", "DESC"]],
  });

  res.json(posts);
});

module.exports = router;
