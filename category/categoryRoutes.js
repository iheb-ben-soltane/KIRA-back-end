const express = require('express');
const { getCategories ,getCategoryById , createCategory } = require('../category/categoryController');
// const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// router.route('/').get(getCategories).post(protect, createCategory); // Get all categories, create category

router.get('/categories', getCategories); 
router.get('/categories/:id', getCategoryById); 
router.post('/categories/create', createCategory); 


module.exports = router;