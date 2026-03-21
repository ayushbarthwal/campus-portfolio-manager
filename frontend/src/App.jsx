import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Navbar from './components/layout/Navbar';
import ProtectedRoute from './components/auth/ProtectedRoute';

import Login from './pages/Login';
import Register from './pages/Register';
import OpportunitiesPage from './pages/OpportunitiesPage';
import AddOpportunityPage from './pages/AddOpportunityPage';
import PortfolioPage from './pages/PortfolioPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/opportunities" element={
              <ProtectedRoute>
                <OpportunitiesPage />
              </ProtectedRoute>
            } />
            <Route path="/add-opportunity" element={
              <ProtectedRoute allowedRoles={['faculty', 'admin']}>
                <AddOpportunityPage />
              </ProtectedRoute>
            } />
            <Route path="/portfolio" element={
              <ProtectedRoute allowedRoles={['student']}>
                <PortfolioPage />
              </ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute allowedRoles={['student']}>
                <DashboardPage />
              </ProtectedRoute>
            } />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
