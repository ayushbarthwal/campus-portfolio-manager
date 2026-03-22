import React from 'react';
const ReadinessCard = ({ percentage }) => {
  let colorClass = 'bg-danger';
  if (percentage >= 70) colorClass = 'bg-success';
  else if (percentage >= 40) colorClass = 'bg-warning text-dark';
  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body p-4 d-flex flex-column justify-content-center">
        <h6 className="card-title fw-bold mb-3 text-muted d-flex align-items-center"><i className="bi bi-activity me-2 text-purple"></i>Overall Readiness Match</h6>
        <div className="progress bg-dark" style={{ border: '1px solid #222' }}>
          <div 
            className="progress-bar fw-bold bg-purple" 
            role="progressbar" 
            style={{ width: `${percentage}%` }} 
            aria-valuenow={percentage} 
            aria-valuemin="0" 
            aria-valuemax="100"
          >
            {percentage}%
          </div>
        </div>
      </div>
    </div>
  );
};
export default ReadinessCard;
