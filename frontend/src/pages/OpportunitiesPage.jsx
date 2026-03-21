import React, { useState, useEffect } from 'react';
import api from '../api';
import OpportunityFilter from '../components/opportunities/OpportunityFilter';
import OpportunityList from '../components/opportunities/OpportunityList';

const OpportunitiesPage = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [filteredOpportunities, setFilteredOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const res = await api.get('opportunities.php');
        if (res.data.success) {
          setOpportunities(res.data.opportunities);
          setFilteredOpportunities(res.data.opportunities);
        }
      } catch (err) {
        console.error('Failed to fetch opportunities', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOpportunities();
  }, []);

  const handleFilterChange = (filter) => {
    let filtered = [...opportunities];
    
    if (filter.type !== 'all') {
      filtered = filtered.filter(opp => opp.type === filter.type);
    }
    
    filtered.sort((a, b) => {
      const dateA = new Date(a.deadline);
      const dateB = new Date(b.deadline);
      return filter.sort === 'asc' ? dateA - dateB : dateB - dateA;
    });

    setFilteredOpportunities(filtered);
  };

  if (loading) return <div>Loading opportunities...</div>;

  return (
    <div>
      <h2 className="mb-4">Opportunities</h2>
      <OpportunityFilter onFilterChange={handleFilterChange} />
      <OpportunityList opportunities={filteredOpportunities} />
    </div>
  );
};

export default OpportunitiesPage;
