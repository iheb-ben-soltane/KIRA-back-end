
const express = require('express');
const { register, login } = require('../authentication/authController');
const { authRateLimiter } = require('./authRateLimiter');
const router = express.Router();
const { registerValidation, loginValidation, validate } = require('./validators');


router.post('/register', authRateLimiter, register);
router.post('/login', authRateLimiter, loginValidation, validate, login);

module.exports = router;
