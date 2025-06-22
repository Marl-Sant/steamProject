const express = require('express')

//Maybe not needed
const { Game } = require('../../db/models')
const { GameImage } = require('../../db/models');

const router = express.Router();

router.get('/:gameId/images', async (req, res) => {
    const gameImages = await GameImage.findAll({
        where: {
            gameId: req.params.gameId
        }
    })

    return res.json(gameImages)
})


router.get('/:gameId/images/:imageId', async(req, res) => {
    const gameImage = await GameImage.findByPk(req.params.imageId)

    return res.json(gameImage)
})
