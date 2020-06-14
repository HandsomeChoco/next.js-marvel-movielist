const express = require('express');
const router = express.Router();
const { connectDB, Users } = require('../model');
/* GET users listing. */

connectDB();

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
