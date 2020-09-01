const express = require('express');
const router = express.Router();


connectDB;

router.get('/', async (req, res, next) => {
	return res.status(200).send(`인덱스 라우터 페이지 API 어떻게 사용하는지 정의`)
});



module.exports = router;