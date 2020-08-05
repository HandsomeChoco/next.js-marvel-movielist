const express = require('express');
const router = express.Router();
const { connectDB, user, movie, policy, review } = require('../model');
/* GET users listing. */

connectDB;

router.get('/', async (req, res, next) => {
	res.end('api/');
});

router.get('/movie/', async (req, res, next) => {
	let page = req.params.page;

	const getMovies = await movie.find();

	if (getMovies.length >= 1) {
		return res.json(getMovies);
	}
	return res.status(400).send('no result');
});

router.get('/movie/:name', async (req, res, next) => {
	const movieName = req.params.name;
	const getMovie = await movie.find({ title: movieName });

	if (getMovie.length >= 1) {
		return res.json(getMovie);
	}
	return res.status(404).json({});
});

router.get('/movie/search/:name', async (req, res, next) => {
	const movieName = req.params.name;
	const getMovie = await movie.find({ title: { $regex: movieName } });

	if (getMovie.length >= 1) {
		return res.json(getMovie);
	}
	return res.status(404).send(null);
});

router.get('/user', async (req, res, next) => {
	res.send('api/user');
});

router.get('/policy/:key', async (req, res, next) => {
	const key = req.params.key;
	console.log(key);

	const getPolicy = await policy.findOne({ key: key });
	if (getPolicy) {
		return res.json(getPolicy.content);
	}

	return res.status(400).send('');
});

router.get('/review', async (req, res, next) => {
	const getReview = await review.find({});
	if (getReview.length >= 1) {
		return res.json(getReview.content);
	}
	return res.status(400).json('no data');
});

router.post('/review', async (req, res, next) => {
	review.create({});
});

module.exports = router;
