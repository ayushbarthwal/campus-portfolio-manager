import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student'
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.password || !formData.role) {
      setError('Please fill out all fields.');
      return;
    }

    try {
      const res = await api.post('register.php', formData);
      if (res.data.success) {
        navigate('/login');
      } else {
        setError(res.data.message || 'Registration failed.');
      }
    } catch (err) {
      setError('An error occurred during registration.');
    }
  };

  return (
    <div className="card p-4 mx-auto" style={{ maxWidth: '400px' }}>
      <h3 className="mb-3 text-center">Register</h3>
      {error && <div className="alert alert-danger p-2">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input 
            type="text" 
            name="name"
            className="form-control" 
            value={formData.name} 
            onChange={handleChange} 
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input 
            type="email" 
            name="email"
            className="form-control" 
            value={formData.email} 
            onChange={handleChange} 
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input 
            type="password" 
            name="password"
            className="form-control" 
            value={formData.password} 
            onChange={handleChange} 
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Role</label>
          <select name="role" className="form-select" value={formData.role} onChange={handleChange}>
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="btn btn-success w-100">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
