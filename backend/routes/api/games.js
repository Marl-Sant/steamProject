const express = require('express');

const { Game } = require('../../db/models');
const { Review } = require('../../db/models');

const { requireAuth } = require('../../utils/auth');
const router = express.Router();

router.get('/:gameId', async (req, res) => {
  const game = await Game.findOne({
    where: {
      id: req.params.gameId,
    },
    // include: [{
    //   model: Review
    // }]
  });

  if (game) {
    return res.json(game);
  } else {
    return res.status(404).json({ message: 'Game not found' });
  }
});

router.get('/:gameId/reviews', async (req, res) => {
  const review = await Review.findAll({
    where: {
      gameId: req.params.gameId,
    },
  });

  if (review) {
    return res.json(review);
  } else {
    return res.status(404).json({ message: 'Reviews not found' });
  }
});

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

router.post('/:gameId/reviews', requireAuth, async (req, res) => {
  const { review } = req.body;

  const newReview = await Review.create({
    userId: req.user.id,
    gameId: Number(req.params.gameId),
    review: review
  });

  if (newReview) {
    return res.json(newReview);
  } else {
    return res.status(401).json({ message: 'You must be logged in to create a review.' });
  }
});

router.put('/:gameId/reviews/:reviewId', requireAuth, async (req, res) => {
  const { review } = req.body;

  const updatedReview = await Review.findByPk(
    req.params.reviewId
  );

  updatedReview.review = review;
  updatedReview.save();

  if (updatedReview) {
    return res.json(updatedReview);
  } else {
    return res.status(401).json({ message: 'You must be logged in to create a review.' });
  }
});

router.delete('/:gameId/reviews/:reviewId', requireAuth, async (req, res) => {
  const review = await Review.findByPk(
    req.params.reviewId
  );

  if (review) {
    review.destroy();

    return res.json({
      message: "Review has been deleted"
    });
  } else {
    return res.status(401).json({ message: 'You must be logged in to create a review.' });
  }
});


router.get('/', async (req, res) => {
  return res.json(await Game.findAll());
});

module.exports = router;
