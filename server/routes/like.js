const express = require('express')
const router = express.Router()
const { Like } = require('../models/Like')
const { DisLike } = require('../models/DisLike')

router.post('/getLikes', (req, res) => {
	let variable = {}
	if (req.body.videoId) {
		variable = { videoId: req.body.videoId }
	} else {
		variable = { comentId: req.body.comentId }
	}

	Like.find(variable).exec((err, likes) => {
		if (err) return res.status(400).send(err)
		res.status(200).send({ success: true, likes })
	})
})

router.post('/getDisLikes', (req, res) => {
	let variable = {}
	if (req.body.videoId) {
		variable = { videoId: req.body.videoId }
	} else {
		variable = { comentId: req.body.comentId }
	}

	DisLike.find(variable).exec((err, dislikes) => {
		if (err) return res.status(400).send(err)
		res.status(200).send({ success: true, dislikes })
	})
})
router.post('/upLike', (req, res) => {
	let variable = {}
	if (req.body.videoId) {
		variable = { videoId: req.body.videoId }
	} else {
		variable = { comentId: req.body.comentId }
	}

	// Like
	Like.find(variable).exec((err, dislikes) => {
		if (err) return res.status(400).send(err)
		res.status(200).send({ success: true, dislikes })
	})
})

module.exports = router
