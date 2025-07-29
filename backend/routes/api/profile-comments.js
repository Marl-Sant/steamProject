const express = require('express');
const { ProfileComment, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

// Get all comments for a profile user
router.get('/:profileUserId/comments', async (req, res) => {
  const comments = await ProfileComment.findAll({
    where: { profileUserId: req.params.profileUserId },
    include: [{ model: User, as: 'commenter' }],
    order: [['createdAt', 'DESC']],
  });

  if (comments.length) {
    return res.json(comments);
  } else {
    return res.status(404).json({ message: 'Comments not found' });
  }
});

// Create a comment on a user's profile
router.post(
  '/:profileUserId/comments',
  requireAuth,
  async (req, res) => {
    const { comment } = req.body;

    if (!comment || comment.trim().length === 0) {
      return res.status(400).json({ message: 'Comment cannot be empty' });
    }

    try {
      const newComment = await ProfileComment.create({
        userId: req.user.id,
        profileUserId: req.params.profileUserId,
        comment,
      });

      const populatedComment = await ProfileComment.findOne({
        where: { id: newComment.id },
        include: [{ model: User, as: 'commenter' }],
      });

      if (populatedComment) {
        return res.json(populatedComment);
      } else {
        return res.status(401).json({
          message: 'You must be logged in to create a comment.',
        });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error creating comment' });
    }
  }
);

module.exports = router;
