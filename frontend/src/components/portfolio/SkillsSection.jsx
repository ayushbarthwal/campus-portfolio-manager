import React, { useState } from 'react';
import api from '../../api';

const SkillsSection = ({ skills, onUpdate }) => {
  const [newSkill, setNewSkill] = useState('');
  const [error, setError] = useState(null);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    
    setError(null);
    const updatedSkills = [...skills, newSkill.trim()];
    try {
      const res = await api.post('update_skills.php', { skills: updatedSkills });
      if (res.data.success) {
        onUpdate(updatedSkills);
        setNewSkill('');
      } else {
        setError(res.data.message || 'Failed to add skill');
      }
    } catch (err) {
      setError('An error occurred.');
    }
  };

  const handleRemove = async (indexToRemove) => {
    setError(null);
    const updatedSkills = skills.filter((_, idx) => idx !== indexToRemove);
    try {
      const res = await api.post('update_skills.php', { skills: updatedSkills });
      if (res.data.success) {
        onUpdate(updatedSkills);
      } else {
        setError(res.data.message || 'Failed to remove skill');
      }
    } catch (err) {
      setError('An error occurred.');
    }
  };

  return (
    <div className="card mb-4 p-4 shadow-sm">
      <h3 className="mb-3">Skills</h3>
      {error && <div className="alert alert-danger p-2">{error}</div>}
      <div className="mb-3">
        {skills.map((skill, idx) => (
          <span key={idx} className="badge bg-secondary fs-6 me-2 mb-2 p-2">
            {skill} <i className="ms-2" style={{ cursor: 'pointer' }} onClick={() => handleRemove(idx)}>&times;</i>
          </span>
        ))}
        {skills.length === 0 && <p className="text-muted">No skills added yet.</p>}
      </div>
      <form onSubmit={handleAdd} className="d-flex">
        <input 
          type="text" 
          className="form-control me-2" 
          placeholder="Add a skill" 
          value={newSkill} 
          onChange={(e) => setNewSkill(e.target.value)} 
        />
        <button type="submit" className="btn btn-primary">Add</button>
      </form>
    </div>
  );
};

export default SkillsSection;
