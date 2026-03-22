import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';
import api from '../../api';
const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = async () => {
    try {
      await api.post('logout.php');
    } catch (err) {
      console.error(err);
    } finally {
      logout();
      navigate('/login');
    }
  };
  const isActive = (path) => location.pathname === path ? 'active' : '';
  return (
    <div className="sidebar d-flex flex-column">
      <Link className="navbar-brand text-white text-decoration-none px-4 mb-5 d-flex align-items-center" to="/">
        <i className="bi bi-boxes ms-1 me-3 text-purple fs-2"></i>
        <div className="fw-bold fs-6 tracking-tight link-text lh-sm">
          Campus<br/>Portfolio<br/>Manager
        </div>
      </Link>
      <ul className="nav flex-column mb-auto">
        {user && (
          <li className="nav-item">
            <Link className={`nav-link ${isActive('/opportunities')}`} to="/opportunities">
              <i className="bi bi-briefcase me-3"></i> <span className="link-text">Opportunities</span>
            </Link>
          </li>
        )}
        {user && user.role === 'student' && (
          <>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/dashboard')}`} to="/dashboard">
                <i className="bi bi-speedometer2 me-3"></i> <span className="link-text">Dashboard</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/portfolio')}`} to="/portfolio">
                <i className="bi bi-person-lines-fill me-3"></i> <span className="link-text">Portfolio</span>
              </Link>
            </li>
          </>
        )}
        {user && (user.role === 'faculty' || user.role === 'admin') && (
          <li className="nav-item">
            <Link className={`nav-link ${isActive('/add-opportunity')}`} to="/add-opportunity">
              <i className="bi bi-plus-circle me-3"></i> <span className="link-text">Add Opportunity</span>
            </Link>
          </li>
        )}
      </ul>
      <div className="mt-auto pb-4">
        {user ? (
          <button className="nav-link btn btn-link text-decoration-none text-danger w-100 text-start" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right me-3"></i> <span className="link-text">Logout</span>
          </button>
        ) : (
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/login')}`} to="/login">
                <i className="bi bi-box-arrow-in-right me-3"></i> <span className="link-text">Login</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/register')}`} to="/register">
                <i className="bi bi-person-plus me-3"></i> <span className="link-text">Register</span>
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};
export default Sidebar;
