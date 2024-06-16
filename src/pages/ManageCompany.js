import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CompanyInfo from './CompanyInfo';
import ActiveJobOpportunities from './ActiveJobOpportunities';
import NewJobOpportunity from './NewJobOpportunity';
import './ManageCompany.css';

const ManageCompany = () => {
    const { companyId } = useParams();
    const [activeSection, setActiveSection] = useState('info');

    return (
        <div className="manage-company-container">
            <nav className="manage-company-nav">
                <button onClick={() => setActiveSection('info')}>Informações da empresa</button>
                <button onClick={() => setActiveSection('activeJobs')}>Minhas vagas ativas</button>
                <button onClick={() => setActiveSection('newJob')}>Cadastrar nova vaga</button>
            </nav>
            {activeSection === 'info' && <CompanyInfo companyId={companyId} />}
            {activeSection === 'activeJobs' && <ActiveJobOpportunities companyId={companyId} />}
            {activeSection === 'newJob' && <NewJobOpportunity companyId={companyId} />}
        </div>
    );
};

export default ManageCompany;
