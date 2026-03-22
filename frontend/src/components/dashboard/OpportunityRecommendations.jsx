import React from 'react';
const OpportunityRecommendations = ({ recommendations, onSelect }) => {
  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="card">
        <div className="card-body text-muted">No recommendations available at this time.</div>
      </div>
    );
  }
  const sortedRecs = [...recommendations].sort((a, b) => b.readinessPercentage - a.readinessPercentage);
  return (
    <div className="card shadow-sm h-100">
      <div className="card-header">
        <h5 className="mb-0">Recommended Opportunities</h5>
      </div>
      <div className="list-group list-group-flush">
        {sortedRecs.map((rec) => (
          <button 
            key={rec.id} 
            type="button" 
            className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
            onClick={() => onSelect(rec)}
          >
            <div>
              <div className="fw-bold">{rec.title}</div>
              <small className="text-muted">{rec.type}</small>
            </div>
            <span className={`badge ${rec.readinessPercentage >= 70 ? 'bg-success' : rec.readinessPercentage >= 40 ? 'bg-warning text-dark' : 'bg-danger'} rounded-pill`}>
              {rec.readinessPercentage}% Match
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
export default OpportunityRecommendations;
