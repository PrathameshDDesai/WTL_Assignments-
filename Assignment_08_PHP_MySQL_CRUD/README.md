# Assignment 08: PHP Student Management System with MySQL CRUD via XAMPP

## 1. Title
Create a simple PHP web application that manages a list of students using CRUD operations (Create, Read, Update, Delete) and interacts with a MySQL database through XAMPP.

## 2. Objectives
- To configure and interact with Apache and MySQL services through the XAMPP control panel.
- To use PHP Data Objects (PDO) for secure, database-agnostic relational database connectivity.
- To implement prepared statements preventing SQL Injection vulnerabilities.
- To execute full CRUD operations:
  - **Create**: Insert new student records into MySQL.
  - **Read**: Display, search, and filter student tables.
  - **Update**: Edit existing student records using parameterized queries.
  - **Delete**: Remove obsolete records safely.

## 3. Problem Statement
Create a simple PHP application that manages a list of students using CRUD operations (Create, Read, Update, Delete) and interacts with a MySQL database through XAMPP.

## 4. Theoretical Concepts
1. **XAMPP Stack**: Cross-platform Apache, MariaDB/MySQL, PHP, and Perl environment.
2. **PDO (PHP Data Objects)**: A lightweight, consistent interface for accessing databases with native support for parameter binding and error handling exceptions (`PDOException`).
3. **SQL Injection Defense**: By binding input parameters using prepared statements (`$pdo->prepare(...)`), user inputs are treated as literal values rather than executable SQL syntax.
4. **CRUD Lifecycle**:
   - `SELECT * FROM students ...` (Read)
   - `INSERT INTO students (...) VALUES (...)` (Create)
   - `UPDATE students SET ... WHERE id = ?` (Update)
   - `DELETE FROM students WHERE id = ?` (Delete)

## 5. Execution Steps in XAMPP
1. **Start Services**:
   - Open **XAMPP Control Panel**.
   - Start **Apache** and **MySQL**.
2. **Database Setup**:
   - Open browser at `http://localhost/phpmyadmin`.
   - Click **Import** tab.
   - Choose [`database.sql`](./database.sql) from this assignment folder and click **Import**.
   - This creates `student_portal_db` with seed data.
3. **Deploy Files**:
   - Copy or symbolic link this entire `Assignment_08_PHP_MySQL_CRUD` folder into your XAMPP web root:
     `C:\xampp\htdocs\Assignment_08_PHP_MySQL_CRUD\`
4. **Launch Application**:
   - Open `http://localhost/Assignment_08_PHP_MySQL_CRUD/index.php`.

## 6. Test Cases
| Test ID | Test Scenario | Expected Outcome | Status |
|:---|:---|:---|:---|
| TC_01 | Navigate to `index.php` with MySQL active | 5 seeded student records display with department, roll number, and GPA badges | Passed |
| TC_02 | Click "Add New Student", enter details, and submit | Record inserted into database; redirects to `index.php?msg=created` with success alert | Passed |
| TC_03 | Attempt to insert duplicate Roll Number or Email | Server-side validation catches conflict and displays error banner | Passed |
| TC_04 | Click "Edit", modify CGPA from 8.85 to 9.20, and submit | MySQL row updated, reflected immediately in table view | Passed |
| TC_05 | Click "Delete" on a student record and confirm prompt | MySQL row removed, success banner displayed | Passed |

## 7. Conclusion
Successfully implemented a database-driven student management application using PHP 8 and MySQL via XAMPP, demonstrating secure PDO queries, input sanitation, and full CRUD operations.

## 8. References
- PHP Official PDO Manual: https://www.php.net/manual/en/book.pdo.php
- Apache Friends XAMPP: https://www.apachefriends.org/
