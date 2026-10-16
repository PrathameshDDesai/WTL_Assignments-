import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserCard from './components/UserCard';
import SkeletonLoader from './components/SkeletonLoader';

const VALID_API_URL = 'https://jsonplaceholder.typicode.com/users';
const ERROR_API_URL = 'https://jsonplaceholder.typicode.com/invalid_404_url';

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeUrl, setActiveUrl] = useState(VALID_API_URL);

  // Fetch data using Axios
  const fetchUsers = async (url) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(url, { timeout: 8000 });
      setUsers(response.data);
    } catch (err) {
      if (err.response) {
        // Server responded with non-2xx status code
        setError(`Server Error: HTTP ${err.response.status} (${err.response.statusText || 'Endpoint Not Found'})`);
      } else if (err.request) {
        // Network timeout / no response
        setError('Network Error: Unable to communicate with the remote API server.');
      } else {
        setError(`Client Error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(activeUrl);
  }, [activeUrl]);

  // Client search filter
  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.company?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-wrapper">
      {/* Navbar */}
      <header className="app-bar">
        <div className="container nav-content">
          <div className="brand-box">
            <i className="fa-solid fa-network-wired brand-logo"></i>
            <div>
              <h2>AxiosClient</h2>
              <span className="brand-sub">Assignment 06: Axios API Integration & State Handling</span>
            </div>
          </div>
          <div className="api-status-badge">
            <span className={`status-dot ${loading ? 'dot-loading' : error ? 'dot-error' : 'dot-success'}`}></span>
            <span>{loading ? 'Fetching...' : error ? 'Error Encountered' : 'API Ready (200 OK)'}</span>
          </div>
        </div>
      </header>

      <main className="container main-body">
        {/* Header Controls */}
        <div className="controls-panel">
          <div className="search-bar">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input 
              type="text" 
              placeholder="Search user by name, email, or company..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              disabled={loading || Boolean(error)}
            />
          </div>

          <div className="action-buttons">
            <button 
              className="btn btn-refresh"
              onClick={() => { setActiveUrl(VALID_API_URL); fetchUsers(VALID_API_URL); }}
              disabled={loading}
            >
              <i className="fa-solid fa-arrows-rotate"></i> Reload API
            </button>

            <button 
              className="btn btn-danger-outline"
              title="Test Axios error state handling"
              onClick={() => { setActiveUrl(ERROR_API_URL); }}
              disabled={loading}
            >
              <i className="fa-solid fa-bug"></i> Simulate 404 Error
            </button>
          </div>
        </div>

        {/* State Boundaries */}
        {loading && <SkeletonLoader />}

        {error && (
          <div className="error-card">
            <div className="error-icon-box">
              <i className="fa-solid fa-triangle-exclamation"></i>
            </div>
            <div className="error-details">
              <h3>Axios Request Failed</h3>
              <p>{error}</p>
              <p className="error-help">Target URL: <code>{activeUrl}</code></p>
            </div>
            <button 
              className="btn btn-primary"
              onClick={() => { setActiveUrl(VALID_API_URL); fetchUsers(VALID_API_URL); }}
            >
              <i className="fa-solid fa-arrow-rotate-left"></i> Reset & Fetch Valid Data
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="info-bar">
              <span>Showing <strong>{filteredUsers.length}</strong> of {users.length} registered profiles</span>
            </div>

            {filteredUsers.length === 0 ? (
              <div className="empty-message">
                <i className="fa-solid fa-user-slash"></i>
                <p>No profiles match your search criteria.</p>
              </div>
            ) : (
              <div className="users-grid">
                {filteredUsers.map(user => (
                  <UserCard 
                    key={user.id} 
                    user={user} 
                    onSelect={(u) => setSelectedUser(u)} 
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* User Detail Modal */}
      {selectedUser && (
        <div className="modal-overlay" onClick={() => setSelectedUser(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Detailed Profile Overview</h3>
              <button className="modal-close" onClick={() => setSelectedUser(null)}>&times;</button>
            </div>
            <div className="modal-body">
              <div className="modal-hero">
                <div className="avatar-large">
                  {selectedUser.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                </div>
                <div>
                  <h4>{selectedUser.name}</h4>
                  <span className="text-muted">@{selectedUser.username} • ID: #{selectedUser.id}</span>
                </div>
              </div>

              <div className="modal-sections">
                <div className="modal-section">
                  <h5><i className="fa-regular fa-envelope"></i> Contact Information</h5>
                  <p><strong>Email:</strong> {selectedUser.email}</p>
                  <p><strong>Phone:</strong> {selectedUser.phone}</p>
                  <p><strong>Website:</strong> <a href={`http://${selectedUser.website}`} target="_blank" rel="noreferrer">{selectedUser.website}</a></p>
                </div>

                <div className="modal-section">
                  <h5><i className="fa-regular fa-building"></i> Company Particulars</h5>
                  <p><strong>Company:</strong> {selectedUser.company?.name}</p>
                  <p><strong>Catchphrase:</strong> "{selectedUser.company?.catchPhrase}"</p>
                  <p><strong>Business Sector:</strong> {selectedUser.company?.bs}</p>
                </div>

                <div className="modal-section">
                  <h5><i className="fa-solid fa-location-dot"></i> Physical Address</h5>
                  <p>{selectedUser.address?.suite}, {selectedUser.address?.street}</p>
                  <p>{selectedUser.address?.city} - {selectedUser.address?.zipcode}</p>
                  <p className="text-muted small">Geo: Lat {selectedUser.address?.geo?.lat}, Lng {selectedUser.address?.geo?.lng}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="footer">
        <p>&copy; 2026 Academic Submissions | Web Development Lab Assignment 06 (React Axios)</p>
      </footer>
    </div>
  );
}
