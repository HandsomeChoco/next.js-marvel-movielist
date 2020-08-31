const express = require('express');
const router = express.Router();
const { connectDB, policy } = require('../../model');

connectDB;
router.get('/', async (req, res, next) => {
	return res.status(200).send('policy api');
});

router.get('/:key', async (req, res, next) => {
	const key = req.params.key;
	console.log('test')
	console.log(key);

	const getPolicy = await policy.findOne({ key: key });
	if (getPolicy) {
		return res.json(getPolicy.content);
	}
	return res.status(404).send('');
});


module.exports = router;