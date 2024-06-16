import React, { useEffect, useState } from 'react';
import './CompanyInfo.css'; // Crie e importe o CSS para este componente

const CompanyInfo = ({ companyId }) => {
    const [companyData, setCompanyData] = useState({
        email: '',
        password: '',
        name: '',
        cnpj: '',
        address: '',
        token: '',
        picture: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCompanyData = async () => {
            try {
                const response = await fetch(`http://localhost:9090/api/companys/${companyId}`);
                if (response.ok) {
                    const data = await response.json();
                    setCompanyData(data);
                } else {
                    throw new Error('Failed to fetch company data');
                }
            } catch (error) {
                console.error('Error:', error);
                setError('Failed to fetch company data');
            }
        };

        fetchCompanyData();
    }, [companyId]);

    const handleChange = (e) => {
        setCompanyData({ ...companyData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setCompanyData({ ...companyData, picture: reader.result.split(',')[1] });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:9090/api/companys/${companyId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(companyData)
            });

            if (response.ok) {
                alert('Company data updated successfully');
            } else {
                setError('Failed to update company data');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to update company data');
        }
    };

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="company-info-container">
            <form onSubmit={handleSubmit} className="company-info-form">
                <div className="form-row">
                    <label>Email:
                        <input type="email" name="email" value={companyData.email} onChange={handleChange} />
                    </label>
                    <label>Password:
                        <input type="password" name="password" value={companyData.password} onChange={handleChange} />
                    </label>
                </div>
                <div className="form-row">
                    <label>Name:
                        <input type="text" name="name" value={companyData.name} onChange={handleChange} />
                    </label>
                    <label>CNPJ:
                        <input type="text" name="cnpj" value={companyData.cnpj} onChange={handleChange} />
                    </label>
                </div>
                <div className="form-row">
                    <label>Address:
                        <input type="text" name="address" value={companyData.address} onChange={handleChange} />
                    </label>
                    <label>Token:
                        <input type="text" name="token" value={companyData.token} onChange={handleChange} />
                    </label>
                </div>
                <div className="form-row">
                    <label htmlFor="picture">Picture:</label>
                    <input type="file" name="picture" accept="image/*" onChange={handleImageChange} />
                </div>
                <button type="submit" className="btn-submit">Save</button>
            </form>
        </div>
    );
};

export default CompanyInfo;
