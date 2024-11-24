const express = require('express');
const errorHandler = require('./helpers/errorHandler');
const { rateLimiter } = require('./helpers/rateLimiter');
const authRoutes = require('./modules/authentication/authRoutes');
const userRoutes = require('./modules/user/userRoute');
const categoryRoutes = require('./modules/category/categoryRoutes');
const productRoutes = require('./modules/product/productRoutes');
const requestRoutes = require('./modules/request/requestRoutes');
const rateRoutes = require('./modules/rate/rateRoutes');
const communityRoutes = require('./modules/community/communityRoutes');
const operationRoutes = require('./modules/operation/operationRoutes');
const app = express();


app.use(express.json());

app.use('/api/auth',rateLimiter, authRoutes);
app.use('/api/users',rateLimiter, userRoutes);
app.use('/api/categories',rateLimiter, categoryRoutes);
app.use('/api/products',rateLimiter, productRoutes);
app.use('/api/requests',rateLimiter, requestRoutes);
app.use('/api/rates',rateLimiter, rateRoutes);
app.use('/api/communities',rateLimiter, communityRoutes);
app.use('/api/operations',rateLimiter, operationRoutes);
app.all('*', (req, res, next) => {next({messageKey: `error.not_found`});});
app.use(errorHandler);
module.exports = app;
