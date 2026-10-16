/**
 * Assignment 09: Node.js & Express.js RESTful API Backend Server
 * Features:
 * 1. Serves static files via express.static('public')
 * 2. Basic JSON information route
 * 3. Complete RESTful Student CRUD API (GET, POST, PUT, DELETE)
 * 4. Error handling middleware & input validation
 */

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 1. Static file serving middleware
app.use(express.static(path.join(__dirname, 'public')));

// In-Memory Student Dataset
let students = [
  {
    id: 1,
    rollNo: '2023COMP01',
    name: 'Aarav Patel',
    email: 'aarav.patel@sanjivani.edu.in',
    department: 'Computer Engineering',
    semester: 'SEM-V',
    gpa: 9.35
  },
  {
    id: 2,
    rollNo: '2023COMP02',
    name: 'Isha Deshmukh',
    email: 'isha.deshmukh@sanjivani.edu.in',
    department: 'Computer Engineering',
    semester: 'SEM-V',
    gpa: 8.90
  },
  {
    id: 3,
    rollNo: '2023IT01',
    name: 'Siddharth Joshi',
    email: 'siddharth.joshi@sanjivani.edu.in',
    department: 'Information Technology',
    semester: 'SEM-V',
    gpa: 8.45
  },
  {
    id: 4,
    rollNo: '2023AIDS01',
    name: 'Tanvi Shinde',
    email: 'tanvi.shinde@sanjivani.edu.in',
    department: 'AI & Data Science',
    semester: 'SEM-V',
    gpa: 9.60
  }
];

// Helper auto-increment id generator
let nextId = 5;

// ==========================================
// 2. BASIC ROUTES: Static Info & Server Metadata
// ==========================================

// GET /api/info -> Server diagnostic information
app.get('/api/info', (req, res) => {
  res.status(200).json({
    success: true,
    server: 'Node.js Express Academic REST API',
    version: '1.0.0',
    college: 'Sanjivani College of Engineering, Kopargaon',
    uptime: `${Math.round(process.uptime())} seconds`,
    timestamp: new Date().toISOString(),
    endpoints: {
      getAllStudents: 'GET /api/students',
      getStudentById: 'GET /api/students/:id',
      createStudent: 'POST /api/students',
      updateStudent: 'PUT /api/students/:id',
      deleteStudent: 'DELETE /api/students/:id'
    }
  });
});

// ==========================================
// 3. RESTFUL API: Student Data Operations
// ==========================================

// GET /api/students -> Fetch all students (supports ?dept=... and ?search=...)
app.get('/api/students', (req, res) => {
  const { dept, search } = req.query;
  let result = [...students];

  if (dept) {
    result = result.filter(s => s.department.toLowerCase() === dept.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(s => 
      s.name.toLowerCase().includes(q) || 
      s.rollNo.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q)
    );
  }

  res.status(200).json({
    success: true,
    count: result.length,
    data: result
  });
});

// GET /api/students/:id -> Fetch single student by ID
app.get('/api/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id, 10);
  const student = students.find(s => s.id === studentId);

  if (!student) {
    return res.status(404).json({
      success: false,
      message: `Student with ID ${studentId} was not found.`
    });
  }

  res.status(200).json({
    success: true,
    data: student
  });
});

// POST /api/students -> Create new student record
app.post('/api/students', (req, res) => {
  const { rollNo, name, email, department, semester, gpa } = req.body;

  // Validation
  if (!rollNo || !name || !email || !department) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed: rollNo, name, email, and department are mandatory fields.'
    });
  }

  // Check unique rollNo or email
  const existing = students.find(s => s.rollNo.toLowerCase() === rollNo.toLowerCase() || s.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(409).json({
      success: false,
      message: 'Conflict: A student with this roll number or email already exists.'
    });
  }

  const newStudent = {
    id: nextId++,
    rollNo: rollNo.trim().toUpperCase(),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    department: department.trim(),
    semester: semester || 'SEM-V',
    gpa: gpa !== undefined ? parseFloat(gpa) : 0.00
  };

  students.push(newStudent);

  res.status(201).json({
    success: true,
    message: 'Student record created successfully.',
    data: newStudent
  });
});

// PUT /api/students/:id -> Update an existing student record
app.put('/api/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id, 10);
  const index = students.findIndex(s => s.id === studentId);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Cannot update. Student with ID ${studentId} not found.`
    });
  }

  const { rollNo, name, email, department, semester, gpa } = req.body;

  // Update properties if provided
  const target = students[index];
  if (rollNo) target.rollNo = rollNo.trim().toUpperCase();
  if (name) target.name = name.trim();
  if (email) target.email = email.trim().toLowerCase();
  if (department) target.department = department.trim();
  if (semester) target.semester = semester;
  if (gpa !== undefined) target.gpa = parseFloat(gpa);

  students[index] = target;

  res.status(200).json({
    success: true,
    message: `Student with ID ${studentId} updated successfully.`,
    data: target
  });
});

// DELETE /api/students/:id -> Remove student record
app.delete('/api/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id, 10);
  const index = students.findIndex(s => s.id === studentId);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Cannot delete. Student with ID ${studentId} does not exist.`
    });
  }

  const removedStudent = students.splice(index, 1)[0];

  res.status(200).json({
    success: true,
    message: `Student '${removedStudent.name}' (ID: ${studentId}) deleted successfully.`,
    data: removedStudent
  });
});

// Global 404 handler for unknown endpoints
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route '${req.originalUrl}' not found on this server.`
  });
});

// Start listening
app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`🚀 Node.js Express Server running at: http://localhost:${PORT}`);
  console.log(`📄 Static Web Dashboard: http://localhost:${PORT}/`);
  console.log(`📡 REST API Base URL:    http://localhost:${PORT}/api/students`);
  console.log(`===============================================`);
});
