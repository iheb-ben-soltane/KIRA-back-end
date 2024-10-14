const express = require('express');
const errorHandler = require('./helpers/errorHandler');
const authRoutes = require('./modules/authentication/authRoutes');
const userRoutes = require('./modules/user/userRoute');
const categoryRoutes = require('./modules/category/categoryRoutes');
const productRoutes = require('./modules/product/productRoutes');
const requestRoutes = require('./modules/request/requestRoutes');
const rateRoutes = require('./modules/rate/rateRoutes');
const communityRoutes = require('./modules/community/communityRoutes');
const operationRoutes = require('./modules/operation/operationRoutes');
const app = express();


// Middleware pour parser les requêtes JSON
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/rates', rateRoutes);
app.use('/api/communities', communityRoutes);
app.use('/api/operations', operationRoutes);
app.use(errorHandler);
app.all('*', (req, res, next) => {
    res.status(404).json({
    success: false,
    messageKey: `error.not_found`,
    });
  });
module.exports = app;
