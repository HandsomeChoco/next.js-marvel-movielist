const express = require('express');
const router = express.Router();
const { connectDB, user, movie } = require('../model'/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;