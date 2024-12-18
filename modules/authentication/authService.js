const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });
};
