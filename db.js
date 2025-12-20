const mongoose = require('mongoose');
const dotenv = require("dotenv")
dotenv.config()

const URI = process.env.MONGO_URI

const connectToMongo = async () => {
  try {
    await mongoose.connect(URI);
    console.log('✅ Connected to MongoDB successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1); // Exit process on failure
  }
};

module.exports = connectToMongo;








