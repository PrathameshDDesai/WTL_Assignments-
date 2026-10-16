const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri || uri.includes('<username>')) {
    console.warn(`\n⚠️  [Assignment 11 Auth Notice]:`);
    console.warn(`Configure your MongoDB Atlas string in Assignment_11_JWT_Authentication/.env`);
    console.warn(`Defaulting to local MongoDB: mongodb://127.0.0.1:27017/auth_db\n`);
  }

  try {
    const conn = await mongoose.connect(uri || 'mongodb://127.0.0.1:27017/auth_db', {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`✅ MongoDB Auth Database Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Auth Connection Failed: ${error.message}`);
  }
};

module.exports = connectDB;
