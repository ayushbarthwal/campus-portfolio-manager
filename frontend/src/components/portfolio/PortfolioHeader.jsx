import React from 'react';
const PortfolioHeader = ({ name, email }) => {
  return (
    <div className="mb-5 d-flex align-items-center pb-4 border-bottom border-dark">
      <div className="bg-purple text-black rounded d-flex align-items-center justify-content-center me-4" style={{ width: '64px', height: '64px', fontSize: '1.5rem', fontWeight: 600 }}>
        {name.charAt(0).toUpperCase()}
      </div>
      <div>
        <h2 className="fw-bold mb-1">{name}</h2>
        <p className="text-muted mb-0"><i className="bi bi-envelope me-2"></i>{email}</p>
      </div>
    </div>
  );
};
export default PortfolioHeader;
