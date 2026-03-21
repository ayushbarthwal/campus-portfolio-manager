import React from 'react';

const StatsBar = ({ totalSkills, totalProjects, totalOpportunities }) => {
  return (
    <div className="row mb-4">
      <div className="col-md-4">
        <div className="card text-white bg-primary mb-3 text-center shadow-sm">
          <div className="card-body">
            <h5 className="card-title">My Skills</h5>
            <p className="card-text fs-2">{totalSkills}</p>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card text-white bg-success mb-3 text-center shadow-sm">
          <div className="card-body">
            <h5 className="card-title">My Projects</h5>
            <p className="card-text fs-2">{totalProjects}</p>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card text-white bg-info mb-3 text-center shadow-sm">
          <div className="card-body">
            <h5 className="card-title">Recommended Ops</h5>
            <p className="card-text fs-2">{totalOpportunities}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsBar;
