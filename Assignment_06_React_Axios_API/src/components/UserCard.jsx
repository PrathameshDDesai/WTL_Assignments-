import React from 'react';

export default function UserCard({ user, onSelect }) {
  return (
    <div className="user-card" onClick={() => onSelect(user)}>
      <div className="user-card-header">
        <div className="avatar-circle">
          {user.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
        </div>
        <div className="user-info">
          <h4>{user.name}</h4>
          <span className="user-username">@{user.username}</span>
        </div>
      </div>

      <div className="user-card-body">
        <div className="contact-item">
          <i className="fa-regular fa-envelope"></i>
          <span>{user.email}</span>
        </div>
        <div className="contact-item">
          <i className="fa-solid fa-phone"></i>
          <span>{user.phone}</span>
        </div>
        <div className="contact-item">
          <i className="fa-solid fa-globe"></i>
          <a href={`http://${user.website}`} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
            {user.website}
          </a>
        </div>
        <div className="contact-item company-pill">
          <i className="fa-regular fa-building"></i>
          <span>{user.company?.name}</span>
        </div>
      </div>

      <div className="user-card-footer">
        <span className="location-tag">
          <i className="fa-solid fa-location-dot"></i> {user.address?.city}
        </span>
        <button className="view-btn">View Profile <i className="fa-solid fa-arrow-right"></i></button>
      </div>
    </div>
  );
}
