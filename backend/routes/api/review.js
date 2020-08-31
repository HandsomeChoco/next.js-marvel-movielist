const express = require('express');
const router = express.Router();
const { connectDB, user, review } = require('../../model');
connectDB;

router.get('/', async (req, res, next) => {
	const getReview = await review.find({});
	if (getReview.length >= 1) {
		return res.json(getReview.content);
	}
	return res.status(400).json('no data');
});



module.exports = router;