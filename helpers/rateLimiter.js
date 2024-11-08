const rateLimit = require('express-rate-limit');

// Define rate limit for authentication routes
exports.rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes
  max: 20, // limit each IP to 100 requests per window
  message: 'Too many requests from this IP, please try again later',
});
