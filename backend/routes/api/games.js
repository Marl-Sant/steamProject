const express = require("express");

const { Game } = require("../../db/models");
const { Review } = require("../../db/models");
const { GameImage } = require("../../db/models");
const { User } = require("../../db/models");
const { Community } = require("../../db/models");
const { Post } = require("../../db/models");
const { CommunityLike } = require("../../db/models");

const { requireAuth } = require("../../utils/auth");
const router = express.Router();

//Get game by gameId
router.get("/:gameId", async (req, res) => {
  const game = await Game.findOne({
    where: {
      id: req.params.gameId,
    },
    include: [
      {
        model: GameImage,
      },
    ],
  });

  if (game) {
    return res.json(game);
  } else {
    return res.status(404).json({ message: "Game not found" });
  }
});

//Get all games
router.get("/", async (req, res) => {
  return res.json(
    await Game.findAll({
      include: [
        {
          model: GameImage,
        },
      ],
    })
  );
});

//Get all reviews on game
router.get("/:gameId/reviews", async (req, res) => {
  const review = await Review.findAll({
    where: {
      gameId: req.params.gameId,
    },
    include: [
      {
        model: User,
      },
    ],
  });

  if (review) {
    return res.json(review);
  } else {
    return res.status(404).json({ message: "Reviews not found" });
  }
});

//Get a specific review
router.get("/:gameId/reviews/:reviewId", async (req, res) => {
  const review = await Review.findOne({
    where: {
      id: req.params.reviewId,
    },
  });

  if (review) {
    return res.json(review);
  } else {
    return res.status(404).json({ message: "Review not found" });
  }
});

//Create a new Review on game
router.post("/:gameId/reviews", requireAuth, async (req, res) => {
  const { review, isRecommended } = req.body;

  if (!review.length || review.length < 10) {
    return res.json({
      message: "User must leave a review that is at least 10 characters long.",
    });
  }

  const reviewLimit = await Review.findOne({
    where: {
      userId: req.user.id,
      gameId: req.params.gameId,
    },
  });

  if (reviewLimit) {
    return res.status(401).json({
      message: "User can only leave one review per game.",
    });
  } else {
    const newReview = await Review.create({
      userId: req.user.id,
      gameId: Number(req.params.gameId),
      review: review,
      isRecommended: isRecommended,
    });

    if (newReview) {
      return res.json(newReview);
    } else {
      return res.status(401).json({
        message: "You must be logged in to create a review.",
      });
    }
  }
});

//Edit review on game
router.put("/:gameId/reviews/:reviewId", requireAuth, async (req, res) => {
  const { review } = req.body;

  if (!review.length || review.length < 10) {
    return res.json({
      message: "User must leave a review that is at least 10 characters long.",
    });
  }

  const updatedReview = await Review.findByPk(req.params.reviewId);

  if (updatedReview.userId !== req.user.id) {
    return res.status(401).json({
      message: "User must be the owner of the review to edit.",
    });
  }

  updatedReview.review = review;
  updatedReview.save();

  if (updatedReview) {
    return res.json(updatedReview);
  } else {
    return res.status(404).json({
      message: "Review could not be found",
    });
  }
});

//Delete Review on game
router.delete("/:gameId/reviews/:reviewId", requireAuth, async (req, res) => {
  const review = await Review.findByPk(req.params.reviewId);

  if (review.userId !== req.user.id) {
    return res.status(401).json({
      message: "User must be the owner of the review to edit.",
    });
  }

  if (review) {
    review.destroy();

    return res.json({
      message: "Review has been deleted",
    });
  } else {
    return res.status(404).json({
      message: "Review could not be found",
    });
  }
});

router.get("/:gameId/community", async (req, res) => {
  const community = await Community.findOne({
    where: {
      gameId: req.params.gameId,
    },
    include: [
      {
        model: Post,
        include: [{ model: User }],
      },
      {
        model: CommunityLike,
      },
    ],
  });
  return res.json(community);
});

router.get(
  "/:gameId/community/:communityId/posts/:postId",
  async (req, res) => {
    const communityPost = await Post.findOne({
      where: {
        id: req.params.postId,
      },
      include: [{ model: User }],
    });

    return res.json(communityPost);
  }
);

router.post(
  "/:gameId/community/:communityId/posts",
  requireAuth,
  async (req, res) => {
    const { post } = req.body;

    if (!post.length || post.length < 10) {
      return res.status(400).json({
        message: "Post must have at least 10 characters",
      });
    }

    const newPost = await Post.create({
      ownerId: req.user.id,
      communityId: req.params.communityId,
      post: post,
    });

    if (newPost) {
      return res.json(newPost);
    }
  }
);

router.put(
  "/:gameId/community/:communityId/posts/:postId",
  requireAuth,
  async (req, res) => {
    const existingPost = await Post.findByPk(req.params.postId);

    if (!existingPost) {
      return res.status(404).json({
        message: "Unable to find post",
      });
    }

    if (req.user.id !== existingPost.ownerId) {
      return res.status(401).json({
        message: "User must be post owner in order to edit",
      });
    }

    const { post } = req.body;

    if (!post.length || post.length < 10) {
      return res.json({
        message: "Post must have at least 10 characters",
      });
    }

    existingPost.post = post;

    existingPost.save();

    return res.json({
      message: "Post has been successfully edited",
      editedPost: existingPost,
    });
  }
);

router.delete(
  "/:gameId/community/:communityId/posts/:postId",
  async (req, res) => {
    const deletePost = await Post.findByPk(req.params.postId);

    if (!deletePost) {
      return res.status(404).json({
        message: "Post cannot be found",
      });
    }

    if (deletePost.ownerId !== req.user.id) {
      return res
        .status(401)
        .json({ message: "User must be owner of the post to delete it" });
    }

    deletePost.destroy();

    return res.json({
      message: "Post has been successfully deleted",
    });
  }
);

module.exports = router;
