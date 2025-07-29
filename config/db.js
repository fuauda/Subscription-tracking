const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

const connectDB = async () => {
  try {
    const MONGODB_URI = process.env.MONGO_URI;

    if (!MONGODB_URI) {
      console.error('MongoDB connection string (MONGO_URI) not found in .env file.');
      process.exit(1); // Exit process with failure
    }

    // Connect to MongoDB using Mongoose
    const conn = await mongoose.connect(MONGODB_URI, {
      // These options are mostly deprecated in recent Mongoose versions (6.0+),
      // as they are now default or handled internally.
      // However, for older versions or explicit control, you might see them.
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useFindAndModify: false, // Prevents deprecation warning for findAndModify()
      // useCreateIndex: true,    // Prevents deprecation warning for ensureIndex()
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    // Exit process with failure if connection fails
    process.exit(1);
  }
};

module.exports = connectDB;