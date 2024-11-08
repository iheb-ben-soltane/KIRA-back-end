const mongoose = require('mongoose');
require('dotenv').config();

const MAX_RETRIES = 5;      // Number of retry attempts
const RETRY_DELAY = 5000;   // Delay between retries

const connectDB = async () => {
  let attempts = 0;

  while (attempts < MAX_RETRIES) {
    try {
      console.log('Connecting to database, please wait ...');
      await mongoose.connect(process.env.MONGO_URI);
      console.log('MongoDB connected successfully to Atlas');
      break;  // Exit loop on successful connection
    } catch (err) {
      attempts += 1;
      console.error(`Connection attempt ${attempts} failed: ${err.message}`);

      if (attempts < MAX_RETRIES) {
        console.log(`Retrying connection in ${RETRY_DELAY / 1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));  // Delay before retry
      } else {
        console.error('Max retries reached. Could not connect to MongoDB.');
        process.exit(1);  // Exit the process after maximum attempts
      }
    }
  }
};

module.exports = connectDB;