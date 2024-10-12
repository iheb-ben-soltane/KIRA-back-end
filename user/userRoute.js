const express = require('express');
const router = express.Router();
const { getAllUsers,getUserById } = require('./userController');
// const { getUserProfile, updateUserProfile, getUsers } = require('../user/userController');
// const { protect } = require('../authentication/authMiddleware');

// router.route('/profile').get(protect, getUserProfile);

// router.route('/profile').put(protect, updateUserProfile);

// router.route('/').get(protect, getUsers);
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);

module.exports = router;