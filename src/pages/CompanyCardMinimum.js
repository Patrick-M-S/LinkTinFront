import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CompanyCardMinimum.css'; // Assegure-se que o caminho do CSS está correto

const CompanyCardMinimum = ({ companyId }) => {
    const [company, setCompany] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!companyId) {
            setError('No company ID provided');
            return;
        }

        const fetchCompany = async () => {
            try {
                const url = `http://localhost:9090/api/companys/${companyId}`; // Assegurando que o ID está sendo incluído na URL
                const response = await fetch(url);
                if (response.ok) {
                    const companyData = await response.json();
                    setCompany(companyData);
                } else {
                    throw new Error('Failed to fetch company data');
                }
            } catch (error) {
                console.error('Error:', error);
                setError('Failed to fetch company data');
            }
        };

        fetchCompany();
    }, [companyId]);

    const handleManageCompany = () => {
        navigate(`/manageCompany/${companyId}`);
    };

    if (error) {
        return <p>{error}</p>; // Exibir erro se houver problemas na busca de dados
    }

    if (!company) {
        return <p>Loading company data...</p>;
    }

    return (
        <div className="company-profile-card">
            <img src={company.picture ? `data:image/jpeg;base64,${company.picture}` : "default-company-avatar.png"} alt={company.name} className="profile-picture" />
            <h4>{company.name}</h4>
            <button className="manage-company-btn" onClick={handleManageCompany}>Gerenciar Empresa</button>
        </div>
    );
};

export default CompanyCardMinimum;
