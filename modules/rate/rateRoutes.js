const express = require('express');
const router = express.Router();

const { verifyToken } = require('../authentication/authMiddleware');
const { getRates, createRate,getRateById } = require('../rate/rateController');


router.get('/rates', getRates);
router.get('/rates/:id', getRateById);
router.post('/rates/create', verifyToken, createRate);

module.exports = router;