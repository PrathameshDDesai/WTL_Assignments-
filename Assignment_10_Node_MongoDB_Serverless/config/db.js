const mongoose = require('mongoose');

let cachedConnection = null;

const connectDB = async () => {
  if (cachedConnection && mongoose.connection.readyState === 1) {
    return cachedConnection;
  }

  const uri = process.env.MONGO_URI;

  if (!uri || uri.includes('<username>')) {
    console.warn(`\n⚠️  [MongoDB Config Notice]:`);
    console.warn(`Please set your MongoDB Atlas connection string in .env file!`);
    console.warn(`Example: MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname\n`);
  }

  try {
    const conn = await mongoose.connect(uri || 'mongodb://127.0.0.1:27017/college_students_db', {
      serverSelectionTimeoutMS: 5000,
    });
    cachedConnection = conn;
    console.log(`✅ MongoDB Connected Successfully: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    // Do not crash process, allow server to run for demonstration
    return null;
  }
};

module.exports = connectDB;
