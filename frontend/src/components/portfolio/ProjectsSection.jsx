import React, { useState } from 'react';
import api from '../../api';
const ProjectsSection = ({ projects, onUpdate }) => {
  const [formData, setFormData] = useState({ name: '', description: '', techStack: '', link: '' });
  const [error, setError] = useState(null);
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.description) return;
    setError(null);
    const updatedProjects = [...projects, formData];
    try {
      const res = await api.post('update_projects.php', { projects: updatedProjects });
      if (res.data.success) {
        onUpdate(updatedProjects);
        setFormData({ name: '', description: '', techStack: '', link: '' });
      } else {
        setError(res.data.message || 'Failed to add project');
      }
    } catch (err) {
      setError('An error occurred while adding project.');
    }
  };
  return (
    <div className="card mb-4 p-4 shadow-sm">
      <h5 className="mb-4 fw-bold"><i className="bi bi-folder-fill me-2 text-purple"></i>Projects</h5>
      {error && <div className="alert alert-danger p-2">{error}</div>}
      <div className="row mb-5">
        {projects.map((proj, idx) => (
          <div key={idx} className="col-md-6 mb-4">
            <div className="card h-100 accent-border-purple">
              <div className="card-body">
                <h5 className="card-title">{proj.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{proj.techStack}</h6>
                <p className="card-text">{proj.description}</p>
                {proj.link && <a href={proj.link} target="_blank" rel="noreferrer" className="card-link">View Project</a>}
              </div>
            </div>
          </div>
        ))}
        {projects.length === 0 && <p className="text-muted">No projects added yet.</p>}
      </div>
      <h5>Add New Project</h5>
      <form onSubmit={handleAdd}>
        <div className="mb-3">
          <input type="text" name="name" className="form-control" placeholder="Project Name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <textarea name="description" className="form-control" placeholder="Project Description" value={formData.description} onChange={handleChange} required rows="2" />
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <input type="text" name="techStack" className="form-control" placeholder="Tech Stack (comma separated)" value={formData.techStack} onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <input type="url" name="link" className="form-control" placeholder="Project Link" value={formData.link} onChange={handleChange} />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Add Project</button>
      </form>
    </div>
  );
};
export default ProjectsSection;
