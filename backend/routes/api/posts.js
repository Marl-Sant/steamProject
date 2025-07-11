const express = require("express");

const { Post } = require("../../db/models");
const { Community } = require("../../db/models");
const { Game } = require("../../db/models");

const router = express.Router();

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
    limit: 3,
  });
  return res.json(recentUserPosts);
});

module.exports = router;
