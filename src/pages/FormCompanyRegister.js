import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FormCompanyRegister.css';

const FormCompanyRegister = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        cnpj: '',
        address: '',
        token: '',
        picture: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                // Update state with base64 of the image
                setFormData({ ...formData, picture: reader.result.split(',')[1] });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Simple validation
        if (!formData.email || !formData.password || !formData.name || !formData.cnpj || !formData.address || !formData.token) {
            setError('All fields are required');
            return;
        }

        // Resetting error messages
        setError('');

        try {
            const response = await fetch('http://localhost:9090/api/companys', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Company registered:', result);
                navigate(`/companyLogged/${result.id}`); // Redirect to CompanyLogged
            } else {
                setError('Failed to register company. ' + response.statusText);
            }
        } catch (error) {
            setError('Error submitting form: ' + error.message);
        }
    };

    return (
        <div className="form-company-container">
            <form onSubmit={handleSubmit} className="form-company-register">
                <div className="form-company-row">
                    <label>Email:
                        <input type="email" name="email" value={formData.email} onChange={handleChange} />
                    </label>
                    <label>Password:
                        <input type="password" name="password" value={formData.password} onChange={handleChange} />
                    </label>
                </div>
                <div className="form-company-row">
                    <label>Name:
                        <input type="text" name="name" value={formData.name} onChange={handleChange} />
                    </label>
                    <label>CNPJ:
                        <input type="text" name="cnpj" value={formData.cnpj} onChange={handleChange} />
                    </label>
                </div>
                <div className="form-company-row">
                    <label>Address:
                        <input type="text" name="address" value={formData.address} onChange={handleChange} />
                    </label>
                    <label>Token:
                        <input type="text" name="token" value={formData.token} onChange={handleChange} />
                    </label>
                </div>
                <label htmlFor="picture">Picture:</label>
                <input type="file" name="picture" accept="image/*" onChange={handleImageChange} />
                <button type="submit" className="btn">Register</button>
                {error && <div className="error-message">{error}</div>}
            </form>
        </div>
    );
};

export default FormCompanyRegister;
