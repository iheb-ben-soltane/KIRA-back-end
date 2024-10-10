const express = require('express');
const authRoutes = require('./authentication/authRoutes');
const userRoutes = require('./user/userRoute');
const categoryRoutes = require('./category/categoryRoutes');
const productRoutes = require('./product/productRoutes');
const requestRoutes = require('./request/requestRoutes');
const app = express();


// Middleware pour parser les requêtes JSON
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/requests', requestRoutes);

module.exports = app;
