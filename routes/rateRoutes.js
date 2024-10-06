const express = require('express');
const { getRates, createRate } = require('../controllers/rateController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(getRates).post(protect, createRate); // Get all rates, create rate

module.exports = router;