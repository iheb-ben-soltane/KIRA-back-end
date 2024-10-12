const express = require('express');
const { getRequestById, createRequest } = require('../request/requestController');
const router = express.Router();
const { verifyToken } = require('../authentication/authMiddleware');

router.post('/requests', createRequest);

// Get a request by ID
router.get('/requests/:id',verifyToken, getRequestById);
router.post('/requests/create',verifyToken, createRequest);


module.exports = router;