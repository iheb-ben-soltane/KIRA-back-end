const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    console.log('Connecting to database please wait ...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully to Atlas');
    
  } catch (err) {
    console.error(err.message);
    process.exit(1); // échec
  }
};

module.exports = connectDB;
