const express = require('express');
const { getCategories, createCategory } = require('../controllers/categoryController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(getCategories).post(protect, createCategory); // Get all categories, create category

module.exports = router;