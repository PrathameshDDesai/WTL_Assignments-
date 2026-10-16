import React from 'react';

export default function RegistrationSuccess({ data, onReset }) {
  return (
    <div className="success-card">
      <div className="success-icon-box">
        <i className="fa-solid fa-circle-check"></i>
      </div>
      <h2>Registration Successful!</h2>
      <p className="success-sub">Student registration profile has been recorded with controlled React state validation.</p>

      <div className="summary-box">
        <h4>Student Profile Record</h4>
        <div className="summary-grid">
          <div className="summary-item">
            <span className="label">Full Name</span>
            <span className="value">{data.fullName}</span>
          </div>
          <div className="summary-item">
            <span className="label">PRN / Roll No.</span>
            <span className="value">{data.prn}</span>
          </div>
          <div className="summary-item">
            <span className="label">Email Address</span>
            <span className="value">{data.email}</span>
          </div>
          <div className="summary-item">
            <span className="label">Phone</span>
            <span className="value">+91 {data.phone}</span>
          </div>
          <div className="summary-item">
            <span className="label">Department</span>
            <span className="value">{data.department}</span>
          </div>
          <div className="summary-item">
            <span className="label">Semester</span>
            <span className="value">{data.semester}</span>
          </div>
          <div className="summary-item">
            <span className="label">Timestamp</span>
            <span className="value">{new Date().toLocaleString()}</span>
          </div>
          <div className="summary-item">
            <span className="label">Verification</span>
            <span className="value text-success">Verified & Validated</span>
          </div>
        </div>
      </div>

      <button className="reset-btn" onClick={onReset}>
        <i className="fa-solid fa-arrow-rotate-left"></i> Register Another Student
      </button>
    </div>
  );
}
