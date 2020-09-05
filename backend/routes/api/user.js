const express = require('express');
const router = express.Router();
const { connectDB, user } = require('../../model');
connectDB;
router.get('/', async (req, res, next) => {
	res.send('users');
});

router.post('/', async (req, res, next) => {
	const id = req.body.id;
	const password = req.body.password;
	const passwordCheck = req.body.passwordCheck;

	console.log(id, password, passwordCheck)
})

module.exports = router;