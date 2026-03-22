import React, { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
const HomePage = () => {
  const { user } = useContext(AuthContext);
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  return (
    <div className="container text-center py-5 mt-5">
      <i className="bi bi-mortarboard display-1 text-primary mb-3 d-block"></i>
      <h1 className="display-4 fw-bold mb-4">Smart Campus Portfolio Manager</h1>
      <p className="lead mb-5 text-muted">
        Connect students with campus opportunities and track skill progression in real-time.
      </p>
      <div className="d-flex justify-content-center gap-3">
        <Link to="/login" className="btn btn-primary btn-lg px-5">
          <i className="bi bi-box-arrow-in-right me-2"></i>Login
        </Link>
        <Link to="/register" className="btn btn-outline-light btn-lg px-5">
          <i className="bi bi-person-plus me-2"></i>Register
        </Link>
      </div>
    </div>
  );
};
export default HomePage;
