import React, { useState } from 'react';

/**
 * Controlled Registration Form Component
 * Strictly controls input values with useState and performs real-time/submit validations.
 */
export default function RegistrationForm({ onSubmitSuccess }) {
  const [formData, setFormData] = useState({
    fullName: '',
    prn: '',
    email: '',
    phone: '',
    department: '',
    semester: 'SEM-V',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // Field validation logic
  const validateField = (name, value, currentFormData = formData) => {
    let error = '';

    switch (name) {
      case 'fullName':
        if (!value.trim()) {
          error = 'Full name is required.';
        } else if (value.trim().length < 3) {
          error = 'Full name must be at least 3 characters.';
        }
        break;

      case 'prn':
        if (!value.trim()) {
          error = 'PRN / Roll Number is required.';
        } else if (!/^[A-Za-z0-9]{6,12}$/.test(value.trim())) {
          error = 'PRN must be 6-12 alphanumeric characters.';
        }
        break;

      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) {
          error = 'Email address is required.';
        } else if (!emailRegex.test(value.trim())) {
          error = 'Please enter a valid email format (e.g., student@sanjivani.edu.in).';
        }
        break;

      case 'phone':
        if (!value.trim()) {
          error = 'Mobile number is required.';
        } else if (!/^[6-9]\d{9}$/.test(value.trim())) {
          error = 'Enter a valid 10-digit Indian phone number starting with 6-9.';
        }
        break;

      case 'department':
        if (!value) {
          error = 'Please select your department / branch.';
        }
        break;

      case 'password':
        if (!value) {
          error = 'Password is required.';
        } else if (value.length < 8) {
          error = 'Password must be at least 8 characters long.';
        } else if (!/(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(value)) {
          error = 'Must contain at least 1 uppercase letter, 1 number, and 1 special symbol.';
        }
        break;

      case 'confirmPassword':
        if (!value) {
          error = 'Please confirm your password.';
        } else if (value !== currentFormData.password) {
          error = 'Passwords do not match.';
        }
        break;

      case 'agreeTerms':
        if (!value) {
          error = 'You must agree to the academic terms and honor code.';
        }
        break;

      default:
        break;
    }

    return error;
  };

  // Change handler for all inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    const updatedFormData = {
      ...formData,
      [name]: fieldValue
    };

    setFormData(updatedFormData);

    // Dynamic error re-validation if already touched
    if (touched[name]) {
      const fieldError = validateField(name, fieldValue, updatedFormData);
      setErrors(prev => ({ ...prev, [name]: fieldError }));
    }

    // If typing in password, re-check confirmPassword match
    if (name === 'password' && touched.confirmPassword) {
      const confirmErr = validateField('confirmPassword', formData.confirmPassword, updatedFormData);
      setErrors(prev => ({ ...prev, confirmPassword: confirmErr }));
    }
  };

  // On blur handler
  const handleBlur = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    setTouched(prev => ({ ...prev, [name]: true }));
    const fieldError = validateField(name, fieldValue);
    setErrors(prev => ({ ...prev, [name]: fieldError }));
  };

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark all touched
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const err = validateField(key, formData[key], formData);
      if (err) newErrors[key] = err;
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmitSuccess(formData);
    }
  };

  // Password strength calculation
  const getPasswordStrength = () => {
    const p = formData.password;
    if (!p) return { score: 0, text: 'None', color: '#cbd5e1' };
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[!@#$%^&*]/.test(p)) score++;

    if (score <= 1) return { score: 25, text: 'Weak', color: '#ef4444' };
    if (score === 2) return { score: 50, text: 'Fair', color: '#f59e0b' };
    if (score === 3) return { score: 75, text: 'Good', color: '#3b82f6' };
    return { score: 100, text: 'Strong', color: '#10b981' };
  };

  const strength = getPasswordStrength();

  return (
    <form className="registration-form" onSubmit={handleSubmit} noValidate>
      
      {/* Row 1: Full Name & PRN */}
      <div className="form-row-2">
        <div className={`form-group ${errors.fullName && touched.fullName ? 'has-error' : ''}`}>
          <label>Full Student Name *</label>
          <div className="input-wrap">
            <i className="fa-regular fa-user"></i>
            <input
              type="text"
              name="fullName"
              placeholder="e.g. Atharva Kulkarni"
              value={formData.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          {errors.fullName && touched.fullName && <span className="error-msg">{errors.fullName}</span>}
        </div>

        <div className={`form-group ${errors.prn && touched.prn ? 'has-error' : ''}`}>
          <label>PRN / College Roll No. *</label>
          <div className="input-wrap">
            <i className="fa-solid fa-id-card"></i>
            <input
              type="text"
              name="prn"
              placeholder="e.g. 2023COMP042"
              value={formData.prn}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          {errors.prn && touched.prn && <span className="error-msg">{errors.prn}</span>}
        </div>
      </div>

      {/* Row 2: Email & Phone */}
      <div className="form-row-2">
        <div className={`form-group ${errors.email && touched.email ? 'has-error' : ''}`}>
          <label>Official Email Address *</label>
          <div className="input-wrap">
            <i className="fa-regular fa-envelope"></i>
            <input
              type="email"
              name="email"
              placeholder="name@sanjivani.edu.in"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          {errors.email && touched.email && <span className="error-msg">{errors.email}</span>}
        </div>

        <div className={`form-group ${errors.phone && touched.phone ? 'has-error' : ''}`}>
          <label>Mobile Number *</label>
          <div className="input-wrap">
            <i className="fa-solid fa-phone"></i>
            <input
              type="tel"
              name="phone"
              placeholder="9876543210"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          {errors.phone && touched.phone && <span className="error-msg">{errors.phone}</span>}
        </div>
      </div>

      {/* Row 3: Department & Semester */}
      <div className="form-row-2">
        <div className={`form-group ${errors.department && touched.department ? 'has-error' : ''}`}>
          <label>Academic Branch / Department *</label>
          <div className="input-wrap">
            <i className="fa-solid fa-graduation-cap"></i>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="">Select Branch...</option>
              <option value="Computer Engineering">Computer Engineering</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Artificial Intelligence & Data Science">AI & Data Science</option>
              <option value="Electronics & Telecommunication">Electronics & Telecom (E&TC)</option>
              <option value="Mechanical Engineering">Mechanical Engineering</option>
            </select>
          </div>
          {errors.department && touched.department && <span className="error-msg">{errors.department}</span>}
        </div>

        <div className="form-group">
          <label>Semester</label>
          <div className="input-wrap">
            <i className="fa-solid fa-calendar-days"></i>
            <select
              name="semester"
              value={formData.semester}
              onChange={handleChange}
            >
              <option value="SEM-V">Semester V (TY B.Tech)</option>
              <option value="SEM-VI">Semester VI</option>
            </select>
          </div>
        </div>
      </div>

      {/* Row 4: Password & Confirm Password */}
      <div className="form-row-2">
        <div className={`form-group ${errors.password && touched.password ? 'has-error' : ''}`}>
          <label>Password *</label>
          <div className="input-wrap">
            <i className="fa-solid fa-lock"></i>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Min 8 chars, 1 uppercase, 1 symbol"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <button 
              type="button" 
              className="eye-btn" 
              onClick={() => setShowPassword(!showPassword)}
            >
              <i className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
            </button>
          </div>

          {/* Password Strength Indicator */}
          {formData.password && (
            <div className="strength-wrapper">
              <div className="strength-bar-bg">
                <div 
                  className="strength-bar-fill" 
                  style={{ width: `${strength.score}%`, backgroundColor: strength.color }}
                ></div>
              </div>
              <span className="strength-label" style={{ color: strength.color }}>
                {strength.text} Password
              </span>
            </div>
          )}

          {errors.password && touched.password && <span className="error-msg">{errors.password}</span>}
        </div>

        <div className={`form-group ${errors.confirmPassword && touched.confirmPassword ? 'has-error' : ''}`}>
          <label>Confirm Password *</label>
          <div className="input-wrap">
            <i className="fa-solid fa-shield-halved"></i>
            <input
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Re-enter password"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          {errors.confirmPassword && touched.confirmPassword && (
            <span className="error-msg">{errors.confirmPassword}</span>
          )}
        </div>
      </div>

      {/* Terms Checkbox */}
      <div className={`checkbox-group ${errors.agreeTerms && touched.agreeTerms ? 'has-error' : ''}`}>
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="agreeTerms"
            checked={formData.agreeTerms}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <span>I declare that all entered student information is accurate and abide by college policies.</span>
        </label>
        {errors.agreeTerms && touched.agreeTerms && <span className="error-msg">{errors.agreeTerms}</span>}
      </div>

      {/* Submit Button */}
      <button type="submit" className="submit-btn">
        <i className="fa-solid fa-user-plus"></i> Submit Registration
      </button>
    </form>
  );
}
