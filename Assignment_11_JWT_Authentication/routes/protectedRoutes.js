const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');

// 1. General Protected Route: Student Dashboard
// Accessible to any authenticated user with a valid JWT
router.get('/dashboard', protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: `Welcome to the Student Academic Dashboard, ${req.user.name}!`,
    userContext: {
      id: req.user._id,
      name: req.user.name,
      role: req.user.role,
      department: req.user.department,
    },
    academicData: {
      registeredCourses: [
        'Web Application Development',
        'Database Management Systems',
        'Computer Networks',
      ],
      attendance: '89.5%',
      semester: 'SEM-V (2026-2027 Pattern)',
    },
  });
});

// 2. Role-Protected Route: Faculty Evaluation Portal
// Accessible ONLY to 'faculty' or 'admin' roles
router.get('/faculty-portal', protect, authorize('faculty', 'admin'), (req, res) => {
  res.status(200).json({
    success: true,
    message: `Faculty Grading & Continuous Assessment Console. Welcome Prof. ${req.user.name}.`,
    role: req.user.role,
    pendingSubmissions: [
      { student: 'Rahul Sharma', assignment: 'Lab Assignment 11 (JWT Auth)', status: 'Pending Review' },
      { student: 'Priya Patil', assignment: 'Lab Assignment 10 (MongoDB)', status: 'Graded (A+)' },
    ],
  });
});

// 3. High-Security Protected Route: College Administrator Portal
// Accessible ONLY to 'admin' role
router.get('/admin-portal', protect, authorize('admin'), (req, res) => {
  res.status(200).json({
    success: true,
    message: `Institutional System Configuration Console. Welcome Admin ${req.user.name}.`,
    role: req.user.role,
    systemMetrics: {
      totalUsers: 1420,
      activeSessions: 38,
      jwtAlgorithm: 'HS256',
      tokenValidity: process.env.JWT_EXPIRES_IN || '7d',
    },
  });
});

module.exports = router;
