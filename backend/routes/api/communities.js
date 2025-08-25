const express = require("express");

const { Community, Post, Game, User } = require("../../db/models");
const { Op } = require("sequelize");

const router = express.Router();

router.get("/", async (req, res) => {
  const name = req.query.name;
  const searchResults = await Game.findAll({
    where: {
      title: { [Op.like]: `%${name.toLowerCase()}%` },
    },
    include: [{ model: Community }],
  });
  console.log(searchResults);
  res.json(searchResults);
});

const oneMonthAgo = new Date();
oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);

router.get("/recent", async (req, res) => {
  const allCommunities = await Community.findAll({ 
    include: [
      {
        model: Post,
        where: {
          createdAt: {
            [Op.gte]: oneMonthAgo,
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
