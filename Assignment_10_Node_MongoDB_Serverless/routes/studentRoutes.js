const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// 1. GET /api/students -> Fetch all students with optional filters
router.get('/', async (req, res) => {
  try {
    const { department, search } = req.query;
    const filter = {};

    if (department) {
      filter.department = department;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { rollNo: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const students = await Student.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: students.length,
      data: students,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve students from MongoDB.',
      error: error.message,
    });
  }
});

// 2. GET /api/students/:id -> Fetch single student by MongoDB _id
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: `Student with ID ${req.params.id} does not exist in MongoDB.`,
      });
    }

    res.status(200).json({
      success: true,
      data: student,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Invalid MongoDB ObjectId format.',
      error: error.message,
    });
  }
});

// 3. POST /api/students -> Insert new student into MongoDB
router.post('/', async (req, res) => {
  try {
    const newStudent = await Student.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Student document successfully created in MongoDB.',
      data: newStudent,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'Duplicate Key Error: Roll number or email is already registered.',
      });
    }

    res.status(400).json({
      success: false,
      message: 'Mongoose Validation Error.',
      error: error.message,
    });
  }
});

// 4. PUT /api/students/:id -> Update student document in MongoDB
router.put('/:id', async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({
        success: false,
        message: `Student with ID ${req.params.id} not found.`,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Student document updated successfully.',
      data: updatedStudent,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update student.',
      error: error.message,
    });
  }
});

// 5. DELETE /api/students/:id -> Delete student from MongoDB
router.delete('/:id', async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);

    if (!deletedStudent) {
      return res.status(404).json({
        success: false,
        message: `Student with ID ${req.params.id} not found.`,
      });
    }

    res.status(200).json({
      success: true,
      message: `Student ${deletedStudent.name} (${deletedStudent.rollNo}) deleted successfully.`,
      data: deletedStudent,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to delete student.',
      error: error.message,
    });
  }
});

module.exports = router;
