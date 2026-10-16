const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    rollNo: {
      type: String,
      required: [true, 'Roll Number / PRN is required'],
      unique: true,
      trim: true,
      uppercase: true,
    },
    name: {
      type: String,
      required: [true, 'Student Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address'],
    },
    department: {
      type: String,
      required: [true, 'Department is required'],
      enum: [
        'Computer Engineering',
        'Information Technology',
        'AI & Data Science',
        'Electronics & Telecom',
        'Mechanical Engineering',
      ],
    },
    semester: {
      type: String,
      default: 'SEM-V',
    },
    cgpa: {
      type: Number,
      required: [true, 'CGPA is required'],
      min: [0.0, 'CGPA cannot be negative'],
      max: [10.0, 'CGPA cannot exceed 10.00'],
    },
    skills: {
      type: [String],
      default: ['JavaScript', 'HTML5', 'CSS3'],
    },
  },
  {
    timestamps: true,
  }
);

// Virtual index for rapid sorting by CGPA
studentSchema.index({ cgpa: -1 });

module.exports = mongoose.model('Student', studentSchema);
