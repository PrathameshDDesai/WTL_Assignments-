/**
 * Assignment 10: Serverless Function (Vercel / Netlify Compatible)
 * Endpoint: /api/summary
 * Description: Connects to MongoDB Atlas and returns read-only analytical summary:
 * - Total students count
 * - Average CGPA across institution
 * - Top-performing students ranking (CGPA desc)
 * - Department distribution
 */

const mongoose = require('mongoose');

// Cached connection for Serverless Lambdas to prevent connection exhaustion
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb && mongoose.connection.readyState === 1) {
    return cachedDb;
  }

  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error('MONGO_URI environment variable is missing.');
  }

  const db = await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000,
  });

  cachedDb = db;
  return db;
}

// Student Schema definition for serverless standalone context
const Student = mongoose.models.Student || mongoose.model('Student', new mongoose.Schema({
  rollNo: String,
  name: String,
  email: String,
  department: String,
  semester: String,
  cgpa: Number
}, { timestamps: true }));

module.exports = async (req, res) => {
  // Set CORS headers for serverless endpoint
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      message: `Method ${req.method} Not Allowed. Only GET is permitted for read-only summary.`
    });
  }

  try {
    // 1. Establish/reuse cached MongoDB connection
    await connectToDatabase();

    // 2. Compute Total Students
    const totalStudents = await Student.countDocuments();

    // 3. Compute Top 5 Performing Students
    const topPerformers = await Student.find({})
      .select('rollNo name department cgpa semester -_id')
      .sort({ cgpa: -1 })
      .limit(5);

    // 4. Compute Department Breakdown and Overall Average CGPA using MongoDB Aggregation
    const aggregationResult = await Student.aggregate([
      {
        $group: {
          _id: '$department',
          studentCount: { $sum: 1 },
          avgCgpa: { $avg: '$cgpa' }
        }
      },
      {
        $project: {
          department: '$_id',
          studentCount: 1,
          avgCgpa: { $round: ['$avgCgpa', 2] },
          _id: 0
        }
      }
    ]);

    // Overall Average CGPA
    const overallAvgResult = await Student.aggregate([
      {
        $group: {
          _id: null,
          overallAverageCgpa: { $avg: '$cgpa' }
        }
      }
    ]);

    const averageCGPA = overallAvgResult.length > 0 
      ? Math.round(overallAvgResult[0].overallAverageCgpa * 100) / 100 
      : 0.00;

    // Return Serverless Response
    return res.status(200).json({
      success: true,
      deployment: 'Serverless Function (Vercel / Netlify)',
      timestamp: new Date().toISOString(),
      summary: {
        totalStudents,
        averageCGPA,
        departmentDistribution: aggregationResult,
        topPerformers
      }
    });

  } catch (error) {
    console.error('Serverless Function Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Serverless MongoDB execution failed.',
      error: error.message
    });
  }
};
