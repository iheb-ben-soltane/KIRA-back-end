
const express = require('express');
const { register, login } = require('../authentication/authController');
const router = express.Router();
const { registerValidation, loginValidation, validate } = require('./validators');


router.post('/register',register);
router.post('/login', loginValidation, validate, login);

module.exports = router;
