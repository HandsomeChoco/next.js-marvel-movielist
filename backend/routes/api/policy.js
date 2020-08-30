const express = require('express');
const router = express.Router();
const { policy } = require('../../model');

router.get('/policy/:key', async (req, res, next) => {
	const key = req.params.key;
	console.log(key);

	const getPolicy = await policy.findOne({ key: key });
	if (getPolicy) {
		return res.json(getPolicy.content);
	}

	return res.status(400).send({key: '키 값을 찾지 못했습니다. 페이지를 새로고침 (F5) 해주시길 바랍니다.'});
});


module.exports = router;