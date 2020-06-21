const express = require('express');
const router = express.Router();
const { connectDB, user, movie }= require('../model')
/* GET users listing. */

connectDB;

router.get('/', async(req, res, next) => {
  res.end('api/');
});

router.get('/movie/', async(req, res, next) => {
  const getAllMovie = await movie.find();

  if(getAllMovie.length>=1) {
    return res.json(getAllMovie);
  }
  return res.status(400).send('no result');
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
});

module.exports = router;
