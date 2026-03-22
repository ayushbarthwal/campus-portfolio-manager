import React from 'react';
const StatsBar = ({ totalSkills, totalProjects, totalOpportunities }) => {
  return (
    <div className="row g-4 mb-5">
      <div className="col-md-4">
        <div className="card h-100 accent-border-purple">
          <div className="card-body">
            <h6 className="card-title text-muted mb-3 d-flex align-items-center text-uppercase" style={{ letterSpacing: '0.5px', fontSize: '13px' }}>
              <i className="bi bi-braces me-2 text-purple"></i> My Skills
            </h6>
            <h2 className="card-text fw-bold mb-0">{totalSkills}</h2>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card h-100 accent-border-purple">
          <div className="card-body">
            <h6 className="card-title text-muted mb-3 d-flex align-items-center text-uppercase" style={{ letterSpacing: '0.5px', fontSize: '13px' }}>
              <i className="bi bi-folder-check me-2 text-purple"></i> My Projects
            </h6>
            <h2 className="card-text fw-bold mb-0">{totalProjects}</h2>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card h-100 accent-border-purple">
          <div className="card-body">
            <h6 className="card-title text-muted mb-3 d-flex align-items-center text-uppercase" style={{ letterSpacing: '0.5px', fontSize: '13px' }}>
              <i className="bi bi-stars me-2 text-purple"></i> Recommended Ops
            </h6>
            <h2 className="card-text fw-bold mb-0">{totalOpportunities}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};
export default StatsBar;
