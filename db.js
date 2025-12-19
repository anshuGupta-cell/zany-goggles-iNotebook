const mongoose = require('mongoose');
const dotenv = require("dotenv")
dotenv.config()

//const URI = 'http://localhost:7000'
// const//const/con = process.env.MO
// const URI = "mongodb+srv://vivekgutt2004:2VJpxdAnkiGuMlJk@mongoyoutube.k2gyp.mongodb.net/?retryWrites=true&w=majority&appName=MongoYoutube";
const URI = "mongodb+srv://vivekgutt2004:<db_password>@mongoyoutube.k2gyp.mongodb.net/"

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








