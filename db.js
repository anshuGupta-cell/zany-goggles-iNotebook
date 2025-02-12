const mongoose = require('mongoose');

//const URI = 'http://localhost:7000'
//const URI = 'mongodb+srv://a:W8CkxBIxMLB2OoQF@cluster0.tow71.mongodb.net/sample_airbnb?retryWrites=true&w=majority&appName=Cluster0';
const URI = "mongodb+srv://vivekgutt2004:2VJpxdAnkiGuMlJk@mongoyoutube.k2gyp.mongodb.net/?retryWrites=true&w=majority&appName=MongoYoutube";
// const URI = "mongodb+srv://vivekgutt2004:<db_password>@mongoyoutube.k2gyp.mongodb.net/"

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








