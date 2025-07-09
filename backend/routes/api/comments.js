const express = require('express');
const { ReviewComment } = require('../../db/models');
const { User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

// Get all comments
router.get('/:reviewId/comments', async (req, res) => {
  const comments = await ReviewComment.findAll({
    where: { reviewId: req.params.reviewId },
    include: [{ model: User }],
  });

  if (comments) {
    return res.json(comments);
  } else {
    return res
      .status(404)
      .json({ message: 'Comments not found' });
  }
});

// Create a comment on a review
router.post(
  '/:reviewId/comments',
  requireAuth,
  async (req, res) => {
    const { comment, isHelpful } = req.body;

    if (!comment || comment.length < 1) {
      return res
        .status(400)
        .json({ message: 'Comment cannot be empty' });
    }

    const newComment = await ReviewComment.create({
      userId: req.user.id,
      gameId: Number(req.params.gameId),
      reviewId: req.params.reviewId,
      comment: comment,
      isHelpful: isHelpful,
    });

    const populatedComment = await ReviewComment.findOne({
      where: { id: newComment.id },
      include: [{ model: User }],
    });

    if (populatedComment) {
      return res.json(populatedComment);
    } else {
      return res.status(401).json({
        message: 'You must be logged in to create a comment.',
      });
    }
  }
);

module.exports = router;
