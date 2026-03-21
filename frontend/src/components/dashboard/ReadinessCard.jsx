import React from 'react';

const ReadinessCard = ({ percentage }) => {
  let colorClass = 'bg-danger';
  if (percentage >= 70) colorClass = 'bg-success';
  else if (percentage >= 40) colorClass = 'bg-warning text-dark';

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <h5 className="card-title mb-3">Overall Readiness Match</h5>
        <div className="progress" style={{ height: '30px' }}>
          <div 
            className={`progress-bar ${colorClass}`} 
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
