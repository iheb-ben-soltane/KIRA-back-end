const express = require('express');
const { getOperations, createOperation } = require('../controllers/operationController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(protect, getOperations).post(protect, createOperation); // Get all operations, create operation

module.exports = router;