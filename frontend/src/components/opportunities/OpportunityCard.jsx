import React from 'react';
const OpportunityCard = ({ opportunity, onClick }) => {
  const skills = Array.isArray(opportunity.required_skills) 
    ? opportunity.required_skills 
    : typeof opportunity.required_skills === 'string'
      ? opportunity.required_skills.split(',')
      : [];
  return (
    <div className="card mb-4 accent-border-purple" style={{ cursor: onClick ? 'pointer' : 'default' }} onClick={() => onClick && onClick(opportunity)}>
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="card-title fw-bold mb-0">{opportunity.title}</h5>
          <span className="badge bg-purple fs-6"><i className="bi bi-tag-fill me-1"></i>{opportunity.type}</span>
        </div>
        <h6 className="card-subtitle mb-3 text-muted">
          <i className="bi bi-calendar-event me-2"></i>Deadline: {opportunity.deadline}
        </h6>
        <p className="card-text fs-5 mb-4">{opportunity.description}</p>
        <div className="d-flex align-items-center flex-wrap gap-2">
          <strong className="text-muted me-2"><i className="bi bi-tools me-1"></i> Required: </strong>
          {skills.map((skill, index) => (
            <span key={index} className="badge bg-secondary" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>{skill.trim()}</span>
          ))}
        </div>
      </div>
    </div>
  );
};
export default OpportunityCard;
