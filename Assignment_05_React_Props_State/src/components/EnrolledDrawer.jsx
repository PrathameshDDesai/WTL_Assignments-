import React from 'react';

/**
 * Functional EnrolledDrawer component receiving props:
 * - isOpen (boolean)
 * - enrolledList (array)
 * - onClose (function callback)
 * - onRemove (function callback)
 */
export default function EnrolledDrawer({ isOpen, enrolledList, onClose, onRemove }) {
  if (!isOpen) return null;

  const totalCost = enrolledList.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <div>
            <h3>Your Learning Cart</h3>
            <span className="drawer-sub">{enrolledList.length} course(s) selected</span>
          </div>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <div className="drawer-content">
          {enrolledList.length === 0 ? (
            <div className="empty-cart-state">
              <i className="fa-solid fa-graduation-cap empty-icon"></i>
              <h4>No enrolled courses yet</h4>
              <p>Explore our catalog and click "Enroll Now" to add courses to your dashboard.</p>
            </div>
          ) : (
            <ul className="cart-list">
              {enrolledList.map(item => (
                <li key={item.id} className="cart-item">
                  <div className="cart-item-info">
                    <h5>{item.title}</h5>
                    <span className="cart-item-instructor">{item.instructor}</span>
                    <span className="cart-item-price">₹{item.price}</span>
                  </div>
                  <button 
                    className="remove-btn" 
                    title="Remove Course"
                    onClick={() => onRemove(item.id)}
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {enrolledList.length > 0 && (
          <div className="drawer-footer">
            <div className="total-row">
              <span>Total Tuition:</span>
              <span className="total-amount">₹{totalCost}</span>
            </div>
            <button className="checkout-btn" onClick={() => alert(`Enrolled in ${enrolledList.length} courses! Confirmation sent to your student email.`)}>
              Confirm Free Academic Access
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
