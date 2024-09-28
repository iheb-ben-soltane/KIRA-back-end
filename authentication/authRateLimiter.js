const rateLimit = require('express-rate-limit');

// Define rate limit for authentication routes
exports.authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // limit each IP to 100 requests per window
  message: 'Too many requests from this IP, please try again later',
});
