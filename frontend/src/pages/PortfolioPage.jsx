import React, { useState, useEffect } from 'react';
import api from '../api';
import PortfolioHeader from '../components/portfolio/PortfolioHeader';
import SkillsSection from '../components/portfolio/SkillsSection';
import ProjectsSection from '../components/portfolio/ProjectsSection';
import CertificationsSection from '../components/portfolio/CertificationsSection';

const PortfolioPage = () => {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await api.get('portfolio.php');
        if (res.data.success) {
          setPortfolio(res.data.portfolio);
        }
      } catch (err) {
        console.error('Failed to fetch portfolio', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, []);

  if (loading) return <div>Loading portfolio...</div>;
  if (!portfolio) return <div className="alert alert-warning">Could not load portfolio data.</div>;

  return (
    <div>
      <PortfolioHeader name={portfolio.name} email={portfolio.email} />
      <SkillsSection 
        skills={portfolio.skills || []} 
        onUpdate={(newSkills) => setPortfolio({ ...portfolio, skills: newSkills })} 
      />
      <ProjectsSection 
        projects={portfolio.projects || []} 
        onUpdate={(newProjects) => setPortfolio({ ...portfolio, projects: newProjects })} 
      />
      <CertificationsSection 
        certifications={portfolio.certifications || []} 
        onUpdate={(newCerts) => setPortfolio({ ...portfolio, certifications: newCerts })} 
      />
    </div>
  );
};

export default PortfolioPage;
