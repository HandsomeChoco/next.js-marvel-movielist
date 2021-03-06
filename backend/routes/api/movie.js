const express = require('express');
const router = express.Router();
const { connectDB, movie } = require('../../model');

connectDB;

router.get('/', async (req, res, next) => {
	let page = req.params.page;

	const getMovies = await movie.find();

	if (getMovies.length >= 1) {
		return res.json(getMovies);
	}
	return res.status(400).send('no result');
});

router.get('/:name', async (req, res, next) => {
	const movieName = req.params.name;
	const getMovie = await movie.find({ title: movieName });

	if (getMovie.length >= 1) {
		return res.json(getMovie);
	}
	return res.status(404).json({});
});

router.get('/search/:name', async (req, res, next) => {
	const movieName = req.params.name;
	const getMovie = await movie.find({ title: { $regex: movieName } });

	if (getMovie.length >= 1) {
		return res.json(getMovie);
	}
	return res.status(404).send({});
});


module.exports = router;