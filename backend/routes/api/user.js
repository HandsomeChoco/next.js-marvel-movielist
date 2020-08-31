const express = require('express');
const router = express.Router();
const { connectDB, user } = require('../../model');
connectDB;
router.get('/', async (req, res, next) => {
	res.send('users');
});

module.exports = router;