const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    console.log('Attempting to connect to MongoDB with URI:', mongoURI); // <-- ADD THIS LINE

    if (!mongoURI) {
      console.error('MongoDB connection string (MONGODB_URI) not found in .env file.');
      process.exit(1);
    }

    const conn = await mongoose.connect(mongoURI, {
      // ... options
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;