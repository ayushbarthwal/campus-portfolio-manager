import React from 'react';

const OpportunityCard = ({ opportunity, onClick }) => {
  const skills = Array.isArray(opportunity.required_skills) 
    ? opportunity.required_skills 
    : typeof opportunity.required_skills === 'string'
      ? opportunity.required_skills.split(',')
      : [];

  return (
    <div className="card mb-3 shadow-sm" style={{ cursor: onClick ? 'pointer' : 'default' }} onClick={() => onClick && onClick(opportunity)}>
      <div className="card-body">
        <h5 className="card-title">{opportunity.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">
          <span className="badge bg-primary me-2">{opportunity.type}</span>
          Deadline: {opportunity.deadline}
        </h6>
        <p className="card-text">{opportunity.description}</p>
        <div>
          <strong>Required Skills: </strong>
          {skills.map((skill, index) => (
            <span key={index} className="badge bg-secondary me-1">{skill.trim()}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OpportunityCard;
