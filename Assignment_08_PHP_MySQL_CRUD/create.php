<?php
require_once 'config.php';

$errors = [];
$roll_no = '';
$name = '';
$email = '';
$phone = '';
$department = '';
$gpa = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $roll_no = trim($_POST['roll_no'] ?? '');
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $phone = trim($_POST['phone'] ?? '');
    $department = trim($_POST['department'] ?? '');
    $gpa = trim($_POST['gpa'] ?? '');

    // Validations
    if (empty($roll_no)) {
        $errors['roll_no'] = 'Roll Number is required.';
    }
    if (empty($name)) {
        $errors['name'] = 'Full Name is required.';
    }
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = 'A valid email address is required.';
    }
    if (empty($phone) || !preg_match('/^[0-9]{10}$/', $phone)) {
        $errors['phone'] = '10-digit mobile number required.';
    }
    if (empty($department)) {
        $errors['department'] = 'Select department.';
    }
    if (!is_numeric($gpa) || (float)$gpa < 0 || (float)$gpa > 10) {
        $errors['gpa'] = 'CGPA must be a decimal between 0.00 and 10.00';
    }

    // Check unique constraints
    if (empty($errors)) {
        $chkStmt = $pdo->prepare("SELECT id FROM students WHERE roll_no = ? OR email = ?");
        $chkStmt->execute([$roll_no, $email]);
        if ($chkStmt->fetch()) {
            $errors['general'] = 'A student with this Roll Number or Email already exists in the database.';
        }
    }

    // Insert if no errors
    if (empty($errors)) {
        $stmt = $pdo->prepare("INSERT INTO students (roll_no, name, email, phone, department, gpa) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->execute([$roll_no, $name, $email, $phone, $department, (float)$gpa]);
        header("Location: index.php?msg=created");
        exit;
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Add Student Record | PHP MySQL CRUD</title>
  
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Outfit:wght@600;700;800&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: #f8fafc; color: #0f172a; }
    h1, h2, h3, h4, .brand-font { font-family: 'Outfit', sans-serif; }
    .card { border-radius: 14px; border: 1px solid #e2e8f0; }
  </style>
</head>
<body>

  <!-- Top Navbar -->
  <nav class="navbar navbar-dark bg-dark py-3">
    <div class="container">
      <a class="navbar-brand d-flex align-items-center gap-2 brand-font fs-4" href="index.php">
        <i class="bi bi-mortarboard-fill text-primary"></i>
        <span>Sanjivani <span class="text-primary">StudentCRUD</span></span>
      </a>
      <a href="index.php" class="btn btn-sm btn-outline-light rounded-pill px-3">
        <i class="bi bi-arrow-left"></i> Back to Student Directory
      </a>
    </div>
  </nav>

  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <div class="card shadow-sm p-4 p-md-5 bg-white">
          <div class="d-flex align-items-center gap-3 mb-4 pb-3 border-bottom">
            <div class="bg-primary-subtle text-primary p-3 rounded-circle fs-3">
              <i class="bi bi-person-plus-fill"></i>
            </div>
            <div>
              <h3 class="fw-bold mb-1">Create Student Record</h3>
              <p class="text-muted small mb-0">Insert a new student profile into the MySQL database.</p>
            </div>
          </div>

          <?php if (!empty($errors['general'])): ?>
            <div class="alert alert-danger rounded-3"><?= htmlspecialchars($errors['general']) ?></div>
          <?php endif; ?>

          <form method="POST" action="create.php" novalidate>
            <div class="row g-3">
              <div class="col-md-6">
                <label class="form-label fw-semibold small">Roll Number / PRN *</label>
                <input type="text" name="roll_no" class="form-control <?= isset($errors['roll_no']) ? 'is-invalid' : '' ?>" placeholder="e.g. 2023COMP45" value="<?= htmlspecialchars($roll_no) ?>" required>
                <?php if (isset($errors['roll_no'])): ?><div class="invalid-feedback"><?= $errors['roll_no'] ?></div><?php endif; ?>
              </div>

              <div class="col-md-6">
                <label class="form-label fw-semibold small">Full Student Name *</label>
                <input type="text" name="name" class="form-control <?= isset($errors['name']) ? 'is-invalid' : '' ?>" placeholder="e.g. Rohit Verma" value="<?= htmlspecialchars($name) ?>" required>
                <?php if (isset($errors['name'])): ?><div class="invalid-feedback"><?= $errors['name'] ?></div><?php endif; ?>
              </div>

              <div class="col-md-6">
                <label class="form-label fw-semibold small">Email Address *</label>
                <input type="email" name="email" class="form-control <?= isset($errors['email']) ? 'is-invalid' : '' ?>" placeholder="student@sanjivani.edu.in" value="<?= htmlspecialchars($email) ?>" required>
                <?php if (isset($errors['email'])): ?><div class="invalid-feedback"><?= $errors['email'] ?></div><?php endif; ?>
              </div>

              <div class="col-md-6">
                <label class="form-label fw-semibold small">Phone Number *</label>
                <input type="tel" name="phone" class="form-control <?= isset($errors['phone']) ? 'is-invalid' : '' ?>" placeholder="10-digit mobile" value="<?= htmlspecialchars($phone) ?>" required>
                <?php if (isset($errors['phone'])): ?><div class="invalid-feedback"><?= $errors['phone'] ?></div><?php endif; ?>
              </div>

              <div class="col-md-6">
                <label class="form-label fw-semibold small">Department / Branch *</label>
                <select name="department" class="form-select <?= isset($errors['department']) ? 'is-invalid' : '' ?>" required>
                  <option value="">Choose department...</option>
                  <option value="Computer Engineering" <?= $department === 'Computer Engineering' ? 'selected' : '' ?>>Computer Engineering</option>
                  <option value="Information Technology" <?= $department === 'Information Technology' ? 'selected' : '' ?>>Information Technology</option>
                  <option value="AI & Data Science" <?= $department === 'AI & Data Science' ? 'selected' : '' ?>>AI & Data Science</option>
                  <option value="Electronics & Telecom" <?= $department === 'Electronics & Telecom' ? 'selected' : '' ?>>Electronics & Telecom</option>
                  <option value="Mechanical Engineering" <?= $department === 'Mechanical Engineering' ? 'selected' : '' ?>>Mechanical Engineering</option>
                </select>
                <?php if (isset($errors['department'])): ?><div class="invalid-feedback"><?= $errors['department'] ?></div><?php endif; ?>
              </div>

              <div class="col-md-6">
                <label class="form-label fw-semibold small">Current CGPA (0.00 - 10.00) *</label>
                <input type="number" step="0.01" min="0" max="10" name="gpa" class="form-control <?= isset($errors['gpa']) ? 'is-invalid' : '' ?>" placeholder="e.g. 8.75" value="<?= htmlspecialchars($gpa) ?>" required>
                <?php if (isset($errors['gpa'])): ?><div class="invalid-feedback"><?= $errors['gpa'] ?></div><?php endif; ?>
              </div>
            </div>

            <div class="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
              <a href="index.php" class="btn btn-light px-4">Cancel</a>
              <button type="submit" class="btn btn-primary px-4 fw-semibold">
                <i class="bi bi-check2-circle me-1"></i> Save Student Record
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

</body>
</html>
