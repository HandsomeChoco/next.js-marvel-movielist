const express = require('express');
const fs = require('fs');
const router = express.Router();
const { connectDB, Users, Movies } = require('../../model');
/* GET users listing. */

connectDB();

router.get('/', async (req, res, next) => {
  fs.readdir('./../client/public/imgs', 'utf-8', (err, data) => {
    if(err) {
      throw err;
    }
    data.map(name => {
      Movies.create({ title: name });
    });
  });
  res.send('done')
});

router.get('/title/:title', async (req, res, next) => {
  const title = req.params.title;

  const getMovie = await Movies.find({ title: { $regex: title } });

  if(getMovie.length>=1) {
    return res.json(getMovie);
  } else 
  return res.status(400).send('no result');
  
});

module.exports = router;
