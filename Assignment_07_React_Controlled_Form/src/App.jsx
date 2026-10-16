import React, { useState } from 'react';
import RegistrationForm from './components/RegistrationForm';
import RegistrationSuccess from './components/RegistrationSuccess';

export default function App() {
  const [submittedData, setSubmittedData] = useState(null);

  return (
    <div className="page-wrapper">
      <header className="page-header">
        <div className="header-badge">
          <i className="fa-brands fa-react"></i> React Controlled Components
        </div>
        <h1>Sanjivani Engineering Student Portal</h1>
        <p className="page-subtitle">Assignment 07: Controlled components, real-time regex email & form validation</p>
      </header>

      <main className="form-card-container">
        {!submittedData ? (
          <div className="form-wrapper-card">
            <div className="card-top-header">
              <i className="fa-solid fa-user-graduate form-icon"></i>
              <div>
                <h3>Student Enrollment Form</h3>
                <p>Complete all required inputs. Each keystroke updates React component state.</p>
              </div>
            </div>
            <RegistrationForm onSubmitSuccess={(data) => setSubmittedData(data)} />
          </div>
        ) : (
          <RegistrationSuccess 
            data={submittedData} 
            onReset={() => setSubmittedData(null)} 
          />
        )}
      </main>

      <footer className="page-footer">
        <p>&copy; 2026 Department of Computer Engineering | Sanjivani COE Kopargaon (Assignment 07)</p>
      </footer>
    </div>
  );
}
