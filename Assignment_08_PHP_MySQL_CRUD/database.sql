-- SQL Schema for Assignment 08: Student Management System
-- Run or Import this file in phpMyAdmin (http://localhost/phpmyadmin)

CREATE DATABASE IF NOT EXISTS `student_portal_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `student_portal_db`;

-- Drop table if already exists
DROP TABLE IF EXISTS `students`;

-- Create students table
CREATE TABLE `students` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `roll_no` VARCHAR(20) NOT NULL UNIQUE,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `phone` VARCHAR(15) NOT NULL,
  `department` VARCHAR(50) NOT NULL,
  `gpa` DECIMAL(3,2) NOT NULL DEFAULT 0.00,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed initial test students
INSERT INTO `students` (`roll_no`, `name`, `email`, `phone`, `department`, `gpa`) VALUES
('2023COMP01', 'Rahul Sharma', 'rahul.sharma@sanjivani.edu.in', '9876543210', 'Computer Engineering', 9.15),
('2023COMP02', 'Priya Patil', 'priya.patil@sanjivani.edu.in', '9876543211', 'Computer Engineering', 8.85),
('2023IT01', 'Amit Deshmukh', 'amit.deshmukh@sanjivani.edu.in', '9876543212', 'Information Technology', 7.95),
('2023AIDS01', 'Sneha Roy', 'sneha.roy@sanjivani.edu.in', '9876543213', 'AI & Data Science', 9.40),
('2023ENTC01', 'Aditya Joshi', 'aditya.joshi@sanjivani.edu.in', '9876543214', 'Electronics & Telecom', 8.20);
