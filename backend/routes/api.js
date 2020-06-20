const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const { connectDB, user, movie } = require('../model');

/* GET users listing. */

connectDB;

router.get('/', async(req, res, next) => {
  res.end('api/');
});

router.get('/movie', async(req, res, next) => {
  res.end('api/movie');
});


router.get('/movie/:name', async(req, res, next) => {
  const movieName = req.params.name;
  const getMovie = await movie.find({ title: { $regex: movieName  }});

  if(getMovie.length>=1) {
    return res.json(getMovie);
  }
  return res.status(400).send('no result');
  
});

router.get('/user', async(req, res, next) => {
  res.send('api/user')
=======
const { connectDB, User, Movie } = require('../model')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
>>>>>>> parent of e174497... 백엔드 드디어 된다
});

module.exports = router;
