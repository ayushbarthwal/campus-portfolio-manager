import React from 'react';
const SkillGapCard = ({ matchedSkills, missingSkills }) => {
  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <h5 className="card-title mb-4">Skill Gap Analysis</h5>
        <div className="row">
          <div className="col-md-6 border-end border-secondary border-opacity-25 p-4">
            <h6 className="text-muted mb-3 fw-bold d-flex align-items-center"><i className="bi bi-check-circle-fill me-2 text-purple"></i>Matched Skills</h6>
            <div className="d-flex flex-wrap gap-2">
              {matchedSkills.length > 0 ? (
                matchedSkills.map((skill, idx) => (
                  <span key={idx} className="badge bg-purple bg-opacity-10 text-purple border border-purple p-2">{skill}</span>
                ))
              ) : (
                <p className="text-muted">No skills matched.</p>
              )}
            </div>
          </div>
          <div className="col-md-6 p-4">
            <h6 className="text-muted mb-3 fw-bold d-flex align-items-center"><i className="bi bi-exclamation-triangle-fill me-2 text-purple"></i>Missing Skills</h6>
            <div className="d-flex flex-wrap gap-2">
              {missingSkills.length > 0 ? (
                missingSkills.map((skill, idx) => (
                  <span key={idx} className="badge bg-purple bg-opacity-10 text-purple border border-purple p-2">{skill}</span>
                ))
              ) : (
                <p className="text-muted">No missing skills.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SkillGapCard;
