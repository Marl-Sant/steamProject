const express = require('express');

const { Game } = require('../../db/models');

const router = express.Router();

router.get('/:gameId', async (req, res) => {
  const game = await Game.findOne({
    where: {
      id: req.params.gameId,
    },
  });

  if (game) {
    return res.json(game);
  } else {
    return res.status(404).json({ message: 'Game not found' });
  }
});

router.get('/', async (req, res) => {
  return res.json(await Game.findAll());
});

module.exports = router;
