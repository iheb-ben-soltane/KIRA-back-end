const rateLimit = require('express-rate-limit');

//for testing
exports.rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes for now
  max: 100, 
  message: 'Too many requests from this IP, please try again later',
});
