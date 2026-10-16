<?php
/**
 * Smart Database Configuration
 * 1. Connects to MySQL (default for XAMPP: localhost, user: root, password: '')
 * 2. If MySQL is not reachable (e.g. cloud Docker / Render), automatically falls back to SQLite so it works online instantly!
 */

$host = getenv('DB_HOST') ?: '127.0.0.1';
$db   = getenv('DB_NAME') ?: 'student_portal_db';
$user = getenv('DB_USER') ?: 'root';
$pass = getenv('DB_PASS') !== false ? getenv('DB_PASS') : '';
$charset = 'utf8mb4';

$pdo = null;

// Try MySQL first
try {
    $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
        PDO::ATTR_TIMEOUT            => 2,
    ];
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\Exception $e) {
    // If MySQL connection fails (e.g. running on Render without MySQL), fallback to SQLite seamlessly!
    try {
        $sqlitePath = __DIR__ . '/database.sqlite';
        $isNew = !file_exists($sqlitePath);
        $pdo = new PDO("sqlite:" . $sqlitePath);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

        if ($isNew) {
            // Auto-create table & seed initial records
            $pdo->exec("CREATE TABLE IF NOT EXISTS students (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                roll_no TEXT UNIQUE NOT NULL,
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                phone TEXT NOT NULL,
                department TEXT NOT NULL,
                gpa REAL NOT NULL DEFAULT 0.00,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            );");

            $pdo->exec("INSERT INTO students (roll_no, name, email, phone, department, gpa) VALUES
                ('2023COMP01', 'Rahul Sharma', 'rahul.sharma@sanjivani.edu.in', '9876543210', 'Computer Engineering', 9.15),
                ('2023COMP02', 'Priya Patil', 'priya.patil@sanjivani.edu.in', '9876543211', 'Computer Engineering', 8.85),
                ('2023IT01', 'Amit Deshmukh', 'amit.deshmukh@sanjivani.edu.in', '9876543212', 'Information Technology', 7.95),
                ('2023AIDS01', 'Sneha Roy', 'sneha.roy@sanjivani.edu.in', '9876543213', 'AI & Data Science', 9.40),
                ('2023ENTC01', 'Aditya Joshi', 'aditya.joshi@sanjivani.edu.in', '9876543214', 'Electronics & Telecom', 8.20);");
        }
    } catch (\Exception $sqliteErr) {
        die("Database connection failed: " . htmlspecialchars($sqliteErr->getMessage()));
    }
}
?>
