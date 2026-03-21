import React, { useState, useEffect } from 'react';
import api from '../api';
import StatsBar from '../components/dashboard/StatsBar';
import ReadinessCard from '../components/dashboard/ReadinessCard';
import SkillGapCard from '../components/dashboard/SkillGapCard';
import OpportunityRecommendations from '../components/dashboard/OpportunityRecommendations';

const DashboardPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('dashboard_data.php');
        if (res.data.success) {
          setData(res.data.data);
          if (res.data.data.recommendations && res.data.data.recommendations.length > 0) {
            const sorted = [...res.data.data.recommendations].sort((a, b) => b.readinessPercentage - a.readinessPercentage);
            setSelectedOpportunity(sorted[0]);
          }
        }
      } catch (err) {
        console.error('Failed to fetch dashboard data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading dashboard...</div>;
  if (!data) return <div className="alert alert-warning">Could not load dashboard data.</div>;

  return (
    <div>
      <h2 className="mb-4">Student Dashboard</h2>
      
      <StatsBar 
        totalSkills={data.totalSkills || 0} 
        totalProjects={data.totalProjects || 0} 
        totalOpportunities={data.recommendations ? data.recommendations.length : 0} 
      />

      <div className="row">
        <div className="col-lg-8">
          {selectedOpportunity ? (
            <>
              <h4>Selected: {selectedOpportunity.title}</h4>
              <ReadinessCard percentage={selectedOpportunity.readinessPercentage || 0} />
              <SkillGapCard 
                matchedSkills={selectedOpportunity.matchedSkills || []} 
                missingSkills={selectedOpportunity.missingSkills || []} 
              />
            </>
          ) : (
            <div className="alert alert-info">Select an opportunity to view your readiness and skill gap.</div>
          )}
        </div>
        <div className="col-lg-4">
          <OpportunityRecommendations 
            recommendations={data.recommendations || []} 
            onSelect={(opp) => setSelectedOpportunity(opp)} 
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
