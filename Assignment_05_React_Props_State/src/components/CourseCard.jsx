import React from 'react';

/**
 * Functional CourseCard component receiving props:
 * - course (object)
 * - isEnrolled (boolean)
 * - onToggleEnroll (function callback)
 */
export default function CourseCard({ course, isEnrolled, onToggleEnroll }) {
  return (
    <div className={`course-card ${isEnrolled ? 'enrolled-border' : ''}`}>
      <div className="card-top-bar" style={{ backgroundColor: course.color }}>
        <span className="card-tag">{course.tag}</span>
        <span className="card-hours"><i className="fa-regular fa-clock"></i> {course.hours}</span>
      </div>

      <div className="card-body">
        <div className="category-pill">{course.category} • {course.level}</div>
        <h3 className="course-title">{course.title}</h3>
        <p className="instructor-name"><i className="fa-solid fa-chalkboard-user"></i> {course.instructor}</p>

        <div className="rating-row">
          <div className="stars">
            <i className="fa-solid fa-star"></i>
            <span className="rating-val">{course.rating}</span>
          </div>
          <span className="reviews">({course.reviews} reviews)</span>
        </div>

        <div className="card-footer-row">
          <div className="price-tag">
            <span className="currency">₹</span>
            <span className="amount">{course.price}</span>
          </div>

          <button 
            className={`enroll-btn ${isEnrolled ? 'btn-enrolled' : 'btn-enroll'}`}
            onClick={() => onToggleEnroll(course)}
          >
            {isEnrolled ? (
              <>
                <i className="fa-solid fa-check"></i> Enrolled
              </>
            ) : (
              <>
                <i className="fa-solid fa-cart-plus"></i> Enroll Now
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
