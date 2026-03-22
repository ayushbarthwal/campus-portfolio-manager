import React from 'react';
import OpportunityCard from './OpportunityCard';
const OpportunityList = ({ opportunities, onSelect }) => {
  if (!opportunities || opportunities.length === 0) {
    return <div className="alert alert-info">No opportunities found.</div>;
  }
  return (
    <div>
      {opportunities.map((opp) => (
        <OpportunityCard key={opp.id} opportunity={opp} onClick={onSelect} />
      ))}
    </div>
  );
};
export default OpportunityList;
