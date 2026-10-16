<?php
/**
 * Database Configuration & Connection using PDO
 * Default XAMPP settings: localhost, user: root, password: ''
 */

$host = '127.0.0.1';
$db   = 'student_portal_db';
$user = 'root';
$pass = '';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    // If database not found or connection failed
    die("<div style='font-family: sans-serif; padding: 20px; background: #fee2e2; border: 1px solid #ef4444; border-radius: 8px; margin: 20px;'>
        <h3 style='color: #b91c1c; margin-top: 0;'>Database Connection Error!</h3>
        <p>Could not connect to MySQL server. Please verify:</p>
        <ol>
            <li>XAMPP Control Panel: <strong>MySQL</strong> service is started.</li>
            <li>Database <code>student_portal_db</code> exists. (Import <code>database.sql</code> via phpMyAdmin).</li>
        </ol>
        <p style='color: #7f1d1d; font-size: 0.85rem;'>Error Details: " . htmlspecialchars($e->getMessage()) . "</p>
    </div>");
}
?>
