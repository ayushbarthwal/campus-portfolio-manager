import React from 'react';

const SkillGapCard = ({ matchedSkills, missingSkills }) => {
  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <h5 className="card-title mb-4">Skill Gap Analysis</h5>
        <div className="row">
          <div className="col-md-6 border-end">
            <h6 className="text-success mb-3">Matched Skills</h6>
            {matchedSkills.length > 0 ? (
              matchedSkills.map((skill, idx) => (
                <span key={idx} className="badge bg-success me-2 mb-2 p-2">{skill}</span>
              ))
            ) : (
              <p className="text-muted">No skills matched.</p>
            )}
          </div>
          <div className="col-md-6">
            <h6 className="text-danger mb-3">Missing Skills</h6>
            {missingSkills.length > 0 ? (
              missingSkills.map((skill, idx) => (
                <span key={idx} className="badge bg-danger me-2 mb-2 p-2">{skill}</span>
              ))
            ) : (
              <p className="text-muted">No missing skills!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillGapCard;
