import React from 'react';

export default function SkeletonLoader() {
  return (
    <div className="skeleton-grid">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton-header">
            <div className="skeleton-avatar"></div>
            <div className="skeleton-lines">
              <div className="skeleton-line title"></div>
              <div className="skeleton-line subtitle"></div>
            </div>
          </div>
          <div className="skeleton-body">
            <div className="skeleton-line full"></div>
            <div className="skeleton-line medium"></div>
            <div className="skeleton-line short"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
