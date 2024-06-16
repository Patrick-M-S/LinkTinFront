import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [isCompanyLogin, setIsCompanyLogin] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const toggleCompanyLogin = () => {
        setIsCompanyLogin(!isCompanyLogin);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const endpoint = isCompanyLogin ? '/api/companys' : '/api/users'; // Endpoint baseado no tipo de login
        const response = await fetch(`http://localhost:9090${endpoint}?email=${email}`);

        if (response.ok) {
            const data = await response.json();
            if (data.length > 0) {
                const authenticated = data.some(item => item.email === email);
                if (authenticated) {
                    const userId = data.find(user => user.email === email).id;
                    if (isCompanyLogin) {
                        navigate(`/companyLogged/${userId}`); // Redireciona para CompanyLogged se for empresa
                    } else {
                        navigate(`/userLogged/${userId}`); // Redireciona para UserLogged se for usuário
                    }
                } else {
                    setError('Usuário não encontrado.');
                }
            } else {
                setError('Usuário não encontrado.');
            }
        } else {
            console.error('Erro ao realizar login:', response.statusText);
            setError('Erro ao realizar login. Tente novamente mais tarde.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-content">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className={`form-group ${error ? 'error' : ''}`}>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            disabled // Manter visualmente, mas sem valor inicial
                        />
                    </div>
                    <div className="form-group toggle-container">
                        <label className="toggle-label">
                            <input
                                type="checkbox"
                                className="toggle-switch"
                                checked={isCompanyLogin}
                                onChange={toggleCompanyLogin}
                            />
                            <span className="toggle-slider"></span>
                            <span className={`toggle-text ${isCompanyLogin ? 'active' : ''}`}>
                                Login como empresa
                            </span>
                        </label>
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <button type="submit" className="btn">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
