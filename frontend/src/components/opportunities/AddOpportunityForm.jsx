import React, { useState } from 'react';
import api from '../../api';

const AddOpportunityForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    type: 'internship',
    deadline: '',
    description: '',
    required_skills: ''
  });
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: 'info', text: 'Submitting...' });
    
    try {
      const skillsArray = formData.required_skills.split(',').map(s => s.trim()).filter(s => s);
      const payload = { ...formData, required_skills: skillsArray.join(',') };
      
      const res = await api.post('opportunities.php', payload);
      if (res.data.success) {
        setMessage({ type: 'success', text: 'Opportunity added successfully!' });
        setFormData({ title: '', type: 'internship', deadline: '', description: '', required_skills: '' });
      } else {
        setMessage({ type: 'danger', text: res.data.message || 'Failed to add opportunity.' });
      }
    } catch (err) {
      setMessage({ type: 'danger', text: 'An error occurred.' });
    }
  };

  return (
    <div className="card p-4 mx-auto" style={{ maxWidth: '600px' }}>
      <h3 className="mb-4">Add New Opportunity</h3>
      {message && <div className={`alert alert-${message.type}`}>{message.text}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input type="text" name="title" className="form-control" required value={formData.title} onChange={handleChange} />
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Type</label>
            <select name="type" className="form-select" value={formData.type} onChange={handleChange}>
              <option value="internship">Internship</option>
              <option value="hackathon">Hackathon</option>
              <option value="scholarship">Scholarship</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Deadline</label>
            <input type="date" name="deadline" className="form-control" required value={formData.deadline} onChange={handleChange} />
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Required Skills (comma separated)</label>
          <input type="text" name="required_skills" className="form-control" placeholder="e.g. React, Node.js, Python" required value={formData.required_skills} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea name="description" className="form-control" rows="4" required value={formData.description} onChange={handleChange}></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Add Opportunity</button>
      </form>
    </div>
  );
};

export default AddOpportunityForm;
