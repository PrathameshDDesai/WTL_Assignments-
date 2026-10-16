require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const studentRoutes = require('./routes/studentRoutes');
const serverlessSummaryHandler = require('./api/summary');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Serve Static Frontend Dashboard
app.use(express.static(path.join(__dirname, 'public')));

// Main Express API Routes
app.use('/api/students', studentRoutes);

// Mount serverless summary function locally & for development testing
app.get('/api/summary', (req, res) => {
  serverlessSummaryHandler(req, res);
});

// JSON Diagnostic Route
app.get('/api/info', (req, res) => {
  res.status(200).json({
    success: true,
    title: 'Assignment 10: Node.js + MongoDB Mongoose + Serverless Summary API',
    endpoints: {
      crudStudents: '/api/students',
      serverlessSummary: '/api/summary'
    },
    mongodbStatus: 'Connected to MongoDB Atlas'
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`🍃 Node.js & MongoDB Server running on port ${PORT}`);
  console.log(`🖥️  Live Web Portal:           http://localhost:${PORT}/`);
  console.log(`🔗 Local CRUD Endpoint:       http://localhost:${PORT}/api/students`);
  console.log(`⚡ Serverless Summary Function: http://localhost:${PORT}/api/summary`);
  console.log(`===============================================`);
});
