const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware pour vérifier le token
exports.verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ messageKey: 'error.token_missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ messageKey: 'error.invalid_token' });
  }
};