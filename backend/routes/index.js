const express = require('express');
const router = express.Router();
const { connectDB } = require('../model');

connectDB();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('index');
});

module.exports = router;
