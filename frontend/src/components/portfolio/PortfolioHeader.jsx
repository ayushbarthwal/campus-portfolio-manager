import React from 'react';

const PortfolioHeader = ({ name, email }) => {
  return (
    <div className="card mb-4 bg-primary text-white shadow-sm">
      <div className="card-body py-4">
        <h2>{name}'s Portfolio</h2>
        <p className="mb-0 fs-5">{email}</p>
      </div>
    </div>
  );
};

export default PortfolioHeader;
