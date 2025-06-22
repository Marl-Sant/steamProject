const express = require('express');

const { Game } = require('../../db/models');
const { Review } = require('../../db/models');
const { GameImage } = require('../../db/models');

const { requireAuth } = require('../../utils/auth');
const router = express.Router();

//Get game by gameId
router.get('/:gameId', async (req, res) => {
  const game = await Game.findOne({
    where: {
      id: req.params.gameId,
    },
    include: [
      {
        model: gameImages,
      },
    ],
  });

  if (game) {
    return res.json(game);
  } else {
    return res.status(404).json({ message: 'Game not found' });
  }
});

//Get all games
router.get('/', async (req, res) => {
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
router.get('/:gameId/reviews', async (req, res) => {
  const review = await Review.findAll({
    where: {
      gameId: req.params.gameId,
    },
  });

  if (review) {
    return res.json(review);
  } else {
    return res
      .status(404)
      .json({ message: 'Reviews not found' });
  }
});

//Get a specific review
router.get('/:gameId/reviews/:reviewId', async (req, res) => {
  const review = await Review.findOne({
    where: {
      id: req.params.reviewId,
    },
  });

  if (review) {
    return res.json(review);
  } else {
    return res.status(404).json({ message: 'Review not found' });
  }
});

//Create a new Review on game
router.post(
  '/:gameId/reviews',
  requireAuth,
  async (req, res) => {
    const { review } = req.body;

    if (!review.length || review.length < 10) {
      return res.json({
        message:
          'User must leave a review that is at least 10 characters long.',
      });
    }

    const reviewLimit = await Review.findOne({
      where: {
        userId: req.user.id,
        gameId: req.params.gameId,
      },
    });

    if (reviewLimit) {
      return res.json({
        message: 'User can only leave one review per game.',
      });
    } else {
      const newReview = await Review.create({
        userId: req.user.id,
        gameId: Number(req.params.gameId),
        review: review,
      });
      console.log(newReview);

      if (newReview.ok) {
        return res.json(newReview);
      } else {
        return res.status(401).json({
          message: 'You must be logged in to create a review.',
        });
      }
    }
  }
);

//Edit review on game
router.put(
  '/:gameId/reviews/:reviewId',
  requireAuth,
  async (req, res) => {
    const { review } = req.body;

    if (!review.length || review.length < 10) {
      return res.json({
        message:
          'User must leave a review that is at least 10 characters long.',
      });
    }

    const updatedReview = await Review.findByPk(
      req.params.reviewId
    );

    if (updatedReview.userId !== req.user.id) {
      return res.status(401).json({
        message: 'User must be the owner of the review to edit.',
      });
    }

    updatedReview.review = review;
    updatedReview.save();

    if (updatedReview) {
      return res.json(updatedReview);
    } else {
      return res.status(404).json({
        message: 'Review could not be found',
      });
    }
  }
);

//Delete Review on game
router.delete(
  '/:gameId/reviews/:reviewId',
  requireAuth,
  async (req, res) => {
    const review = await Review.findByPk(req.params.reviewId);

    if (review.userId !== req.user.id) {
      return res.status(401).json({
        message: 'User must be the owner of the review to edit.',
      });
    }

    if (review) {
      review.destroy();

      return res.json({
        message: 'Review has been deleted',
      });
    } else {
      return res.status(404).json({
        message: 'Review could not be found',
      });
    }
  }
);

module.exports = router;
