const { check, validationResult } = require('express-validator');

// Register validation
exports.registerValidation = [
  check('firstName', 'First Name is required').not().isEmpty().trim().escape(),
  check('lastName', 'Last Name is required').not().isEmpty().trim().escape(),
  check('phoneNumber', 'Please include a valid phone number').isMobilePhone(),
  check('email', 'Please include a valid email').isEmail().normalizeEmail(),
  check('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
];

// Login validation
exports.loginValidation = [
  check('email', 'Please include a valid email').isEmail().normalizeEmail(),
  check('password', 'Password is required').exists(),
];

// Profile update validation
exports.updateProfileValidation = [
  check('firstName', 'First Name is required').optional().not().isEmpty().trim().escape(),
  check('lastName', 'Last Name is required').optional().not().isEmpty().trim().escape(),
  check('phoneNumber', 'Please include a valid phone number').optional().isMobilePhone(),
  check('email', 'Please include a valid email').optional().isEmail().normalizeEmail(),
  check('password', 'Password must be at least 6 characters long').optional().isLength({ min: 6 }),
];

// Handle validation errors
exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};