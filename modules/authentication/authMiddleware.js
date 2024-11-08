const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware pour vérifier le token
exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    next({ messageKey: 'error.token_missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err.message);
    next({ messageKey: 'error.invalid_token' });
  }
};