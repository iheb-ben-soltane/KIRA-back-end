const express = require('express');
const { getSubCategories, createSubCategory } = require('../controllers/subCategoryController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(getSubCategories).post(protect, createSubCategory); // Get all subcategories, create subcategory

module.exports = router;