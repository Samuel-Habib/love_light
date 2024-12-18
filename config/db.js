// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    mongoose.set('debug', true);
    await mongoose.connect(uri);
    console.log('Mongoose connected to MongoDB');
  } catch (err) {
    console.error('Mongoose connection error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;