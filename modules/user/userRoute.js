const express = require('express');
const router = express.Router();
const { getAllUsers,getUserById,addPhotoToUser,getPhotoFromUser } = require('./userController');
const upload = require('../../config/multerConfig');
const { verifyToken } = require('../authentication/authMiddleware');

router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.post('/users/photo/add', verifyToken, upload.single('photo'), addPhotoToUser);
router.get('/users/:id/photo', getPhotoFromUser);

module.exports = router;