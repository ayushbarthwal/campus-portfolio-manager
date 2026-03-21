import React, { useState } from 'react';

const OpportunityFilter = ({ onFilterChange }) => {
  const [type, setType] = useState('all');
  const [sort, setSort] = useState('asc');

  const handleTypeChange = (e) => {
    setType(e.target.value);
    onFilterChange({ type: e.target.value, sort });
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
    onFilterChange({ type, sort: e.target.value });
  };

  return (
    <div className="card mb-4 p-3 bg-light">
      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Filter by Type</label>
          <select className="form-select" value={type} onChange={handleTypeChange}>
            <option value="all">All</option>
            <option value="internship">Internship</option>
            <option value="hackathon">Hackathon</option>
            <option value="scholarship">Scholarship</option>
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Sort by Deadline</label>
          <select className="form-select" value={sort} onChange={handleSortChange}>
            <option value="asc">Earliest First</option>
            <option value="desc">Latest First</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default OpportunityFilter;
