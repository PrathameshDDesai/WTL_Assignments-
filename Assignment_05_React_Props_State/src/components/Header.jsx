import React from 'react';

/**
 * Functional Header component receiving props:
 * - enrolledCount (number)
 * - onOpenDrawer (function callback)
 */
export default function Header({ enrolledCount, onOpenDrawer }) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="logo-group">
          <div className="logo-icon">
            <i className="fa-brands fa-react"></i>
          </div>
          <div>
            <h2>SkillUp Academy</h2>
            <span className="subtext">Assignment 05: React Functional Components, Props & useState</span>
          </div>
        </div>

        <div className="header-actions">
          <button className="cart-trigger-btn" onClick={onOpenDrawer}>
            <i className="fa-solid fa-graduation-cap"></i>
            <span>My Enrolled Courses</span>
            <span className="cart-badge">{enrolledCount}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
