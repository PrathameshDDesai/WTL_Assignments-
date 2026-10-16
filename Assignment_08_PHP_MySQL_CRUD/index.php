<?php
require_once 'config.php';

// Search and filter parameters
$search = trim($_GET['search'] ?? '');
$dept = trim($_GET['dept'] ?? '');

$sql = "SELECT * FROM students WHERE 1=1";
$params = [];

if (!empty($search)) {
    $sql .= " AND (name LIKE ? OR roll_no LIKE ? OR email LIKE ?)";
    $params[] = "%$search%";
    $params[] = "%$search%";
    $params[] = "%$search%";
}

if (!empty($dept)) {
    $sql .= " AND department = ?";
    $params[] = $dept;
}

$sql .= " ORDER BY id DESC";

$stmt = $pdo->prepare($sql);
$stmt->execute($params);
$students = $stmt->fetchAll();

// Total count
$totalCount = count($students);
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Student CRUD Portal | PHP & MySQL (XAMPP)</title>
  
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Outfit:wght@600;700;800&display=swap" rel="stylesheet">
  
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: #f8fafc; color: #0f172a; }
    h1, h2, h3, h4, .brand-font { font-family: 'Outfit', sans-serif; }
    .card { border-radius: 14px; border: 1px solid #e2e8f0; }
    .table thead th { background: #f1f5f9; font-size: 0.8rem; text-transform: uppercase; color: #64748b; font-weight: 700; }
    .gpa-badge { padding: 4px 10px; border-radius: 9999px; font-weight: 700; font-size: 0.85rem; }
    .gpa-high { background: #dcfce7; color: #15803d; }
    .gpa-med { background: #dbeafe; color: #1d4ed8; }
    .gpa-low { background: #fee2e2; color: #b91c1c; }
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
      <span class="navbar-text small text-white-50">
        Assignment 08: PHP + MySQL + XAMPP
      </span>
    </div>
  </nav>

  <div class="container py-4">
    
    <!-- Flash Notifications -->
    <?php if (isset($_GET['msg'])): ?>
      <?php if ($_GET['msg'] === 'created'): ?>
        <div class="alert alert-success alert-dismissible fade show rounded-3" role="alert">
          <i class="bi bi-check-circle-fill me-2"></i> Student record added successfully!
          <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
      <?php elseif ($_GET['msg'] === 'updated'): ?>
        <div class="alert alert-info alert-dismissible fade show rounded-3" role="alert">
          <i class="bi bi-info-circle-fill me-2"></i> Student profile updated successfully!
          <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
      <?php elseif ($_GET['msg'] === 'deleted'): ?>
        <div class="alert alert-danger alert-dismissible fade show rounded-3" role="alert">
          <i class="bi bi-trash3-fill me-2"></i> Student record was deleted from database.
          <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
      <?php endif; ?>
    <?php endif; ?>

    <!-- Header Actions Card -->
    <div class="card shadow-sm p-4 mb-4 bg-white">
      <div class="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-3">
        <div>
          <h2 class="fw-bold mb-1">Student Records Management</h2>
          <p class="text-muted small mb-0">Create, Read, Update, and Delete student records with MySQL</p>
        </div>
        <a href="create.php" class="btn btn-primary rounded-pill px-4 fw-semibold shadow-sm">
          <i class="bi bi-person-plus-fill me-1"></i> Add New Student
        </a>
      </div>

      <!-- Search & Filter Form -->
      <form method="GET" action="index.php" class="row g-2 pt-2 border-top">
        <div class="col-md-6">
          <div class="input-group">
            <span class="input-group-text bg-light"><i class="bi bi-search"></i></span>
            <input type="text" name="search" class="form-control" placeholder="Search by name, roll no, or email..." value="<?= htmlspecialchars($search) ?>">
          </div>
        </div>
        <div class="col-md-4">
          <select name="dept" class="form-select">
            <option value="">All Departments</option>
            <option value="Computer Engineering" <?= $dept === 'Computer Engineering' ? 'selected' : '' ?>>Computer Engineering</option>
            <option value="Information Technology" <?= $dept === 'Information Technology' ? 'selected' : '' ?>>Information Technology</option>
            <option value="AI & Data Science" <?= $dept === 'AI & Data Science' ? 'selected' : '' ?>>AI & Data Science</option>
            <option value="Electronics & Telecom" <?= $dept === 'Electronics & Telecom' ? 'selected' : '' ?>>Electronics & Telecom</option>
          </select>
        </div>
        <div class="col-md-2 d-flex gap-2">
          <button type="submit" class="btn btn-dark w-100 fw-semibold">Filter</button>
          <?php if (!empty($search) || !empty($dept)): ?>
            <a href="index.php" class="btn btn-outline-secondary" title="Reset Filters"><i class="bi bi-x-lg"></i></a>
          <?php endif; ?>
        </div>
      </form>
    </div>

    <!-- Data Table Card -->
    <div class="card shadow-sm overflow-hidden bg-white">
      <div class="card-header bg-white py-3 d-flex justify-content-between align-items-center">
        <span class="fw-bold text-secondary small">Total Enrolled Records: <span class="badge bg-primary"><?= $totalCount ?></span></span>
      </div>
      
      <div class="table-responsive">
        <table class="table table-hover align-middle mb-0">
          <thead>
            <tr>
              <th class="ps-4">#</th>
              <th>Roll No.</th>
              <th>Student Name</th>
              <th>Contact Details</th>
              <th>Department</th>
              <th>CGPA</th>
              <th class="text-end pe-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            <?php if ($totalCount === 0): ?>
              <tr>
                <td colspan="7" class="text-center py-5 text-muted">
                  <i class="bi bi-inbox fs-1 d-block mb-2 text-secondary"></i>
                  <h5>No student records found</h5>
                  <p class="small">Try adjusting search parameters or click "Add New Student".</p>
                </td>
              </tr>
            <?php else: ?>
              <?php foreach ($students as $index => $row): ?>
                <tr>
                  <td class="ps-4 text-muted fw-semibold"><?= $index + 1 ?></td>
                  <td><span class="badge bg-light text-dark border fw-bold"><?= htmlspecialchars($row['roll_no']) ?></span></td>
                  <td>
                    <div class="fw-bold text-dark"><?= htmlspecialchars($row['name']) ?></div>
                    <small class="text-muted">Registered: <?= date('d M Y', strtotime($row['created_at'])) ?></small>
                  </td>
                  <td>
                    <div class="small"><i class="bi bi-envelope text-muted me-1"></i><?= htmlspecialchars($row['email']) ?></div>
                    <div class="small"><i class="bi bi-telephone text-muted me-1"></i><?= htmlspecialchars($row['phone']) ?></div>
                  </td>
                  <td>
                    <span class="badge bg-secondary-subtle text-secondary-emphasis"><?= htmlspecialchars($row['department']) ?></span>
                  </td>
                  <td>
                    <?php 
                      $gpa = (float)$row['gpa'];
                      $badgeClass = ($gpa >= 8.5) ? 'gpa-high' : (($gpa >= 7.0) ? 'gpa-med' : 'gpa-low');
                    ?>
                    <span class="gpa-badge <?= $badgeClass ?>">
                      ⭐ <?= number_format($gpa, 2) ?>
                    </span>
                  </td>
                  <td class="text-end pe-4">
                    <a href="edit.php?id=<?= $row['id'] ?>" class="btn btn-sm btn-outline-primary rounded-pill px-3 me-1">
                      <i class="bi bi-pencil-square"></i> Edit
                    </a>
                    <a href="delete.php?id=<?= $row['id'] ?>" class="btn btn-sm btn-outline-danger rounded-pill px-3" onclick="return confirm('Permanently delete student <?= htmlspecialchars(addslashes($row['name'])) ?>?');">
                      <i class="bi bi-trash"></i> Delete
                    </a>
                  </td>
                </tr>
              <?php endforeach; ?>
            <?php endif; ?>
          </tbody>
        </table>
      </div>
    </div>

    <footer class="text-center text-muted small py-4 mt-3">
      &copy; 2026 Department of Computer Engineering, Sanjivani COE Kopargaon | Lab Assignment 08
    </footer>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
