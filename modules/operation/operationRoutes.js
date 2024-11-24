const express = require('express');
const { createOperation,getOperationById } = require('../operation/operationController');
const router = express.Router();
const { verifyToken } = require('../authentication/authMiddleware');

// no need here for the verifyToken cause we it will be automatically created after the acceptance of the request
//no i think we need to think again
router.post('/operations/create', createOperation);
router.get('/operations/:id', getOperationById);
module.exports = router;
