require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Mount API Routes
app.use('/api/auth', authRoutes);
app.use('/api/academic', protectedRoutes);

// Server Info Root Route
app.get('/api', (req, res) => {
  res.status(200).json({
    success: true,
    title: 'Assignment 11: JWT Authentication & Protected Routes Server',
    status: 'Active',
    endpoints: {
      register: 'POST /api/auth/register',
      login: 'POST /api/auth/login',
      profile: 'GET /api/auth/profile (Protected with Bearer Token)',
      studentDashboard: 'GET /api/academic/dashboard (Protected with Bearer Token)',
      adminPortal: 'GET /api/academic/admin-portal (Protected: Admin Only)'
    }
  });
});

app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`🔐 JWT Auth Server running at: http://localhost:${PORT}`);
  console.log(`🖥️  Interactive Testing UI:   http://localhost:${PORT}/`);
  console.log(`🔑 Auth Endpoints:            http://localhost:${PORT}/api/auth`);
  console.log(`===============================================`);
});
