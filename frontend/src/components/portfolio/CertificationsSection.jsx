import React, { useState } from 'react';
import api from '../../api';

const CertificationsSection = ({ certifications, onUpdate }) => {
  const [formData, setFormData] = useState({ name: '', issuer: '', date: '' });
  const [error, setError] = useState(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.issuer) return;

    setError(null);
    const updatedCerts = [...certifications, formData];
    try {
      const res = await api.post('update_certifications.php', { certifications: updatedCerts });
      if (res.data.success) {
        onUpdate(updatedCerts);
        setFormData({ name: '', issuer: '', date: '' });
      } else {
        setError(res.data.message || 'Failed to add certification');
      }
    } catch (err) {
      setError('An error occurred.');
    }
  };

  return (
    <div className="card mb-4 p-4 shadow-sm">
      <h3 className="mb-3">Certifications</h3>
      {error && <div className="alert alert-danger p-2">{error}</div>}
      
      <ul className="list-group mb-4">
        {certifications.map((cert, idx) => (
          <li key={idx} className="list-group-item d-flex justify-content-between align-items-start">
            <div>
              <div className="fw-bold">{cert.name}</div>
              {cert.issuer}
            </div>
            {cert.date && <span className="badge bg-primary rounded-pill">{cert.date}</span>}
          </li>
        ))}
        {certifications.length === 0 && <p className="text-muted">No certifications added yet.</p>}
      </ul>

      <h5>Add New Certification</h5>
      <form onSubmit={handleAdd}>
        <div className="row g-2 mb-3">
          <div className="col-md-4">
            <input type="text" name="name" className="form-control" placeholder="Certification Name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="col-md-4">
            <input type="text" name="issuer" className="form-control" placeholder="Issuer" value={formData.issuer} onChange={handleChange} required />
          </div>
          <div className="col-md-3">
            <input type="date" name="date" className="form-control" value={formData.date} onChange={handleChange} />
          </div>
          <div className="col-md-1">
            <button type="submit" className="btn btn-primary w-100">+</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CertificationsSection;
