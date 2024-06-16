import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditUser.css';

const EditUser = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:9090/api/users/${userId}`);
                const userData = await response.json();
                setUser(userData);
            } catch (error) {
                console.error('Failed to fetch user data', error);
            }
        };

        if (userId) {
            fetchUser();
        }
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:9090/api/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            });
            if (response.ok) {
                navigate(`/userLogged/${userId}`);
            } else {
                console.error('Failed to update user');
            }
        } catch (error) {
            console.error('Error updating user', error);
        }
    };

    if (!user) return <p>Loading...</p>;

    return (
            <div className="edit-user-container">
                <h2>Editar Usuário</h2>
                <form onSubmit={handleSave} className="edit-user-form">
                    <label>
                        Nome:
                        <input
                            type="text"
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        CPF:
                        <input
                            type="text"
                            name="cpf"
                            value={user.cpf}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Endereço:
                        <input
                            type="text"
                            name="address"
                            value={user.address}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Data de Nascimento:
                        <input
                            type="date"
                            name="birthDate"
                            value={user.birthDate}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Gênero:
                        <select
                            name="gender"
                            value={user.gender}
                            onChange={handleChange}
                        >
                            <option value="">Selecione o Gênero</option>
                            <option value="M">Masculino</option>
                            <option value="F">Feminino</option>
                            <option value="O">Outro</option>
                        </select>
                    </label>
                    <button type="submit" className="save-btn">Salvar</button>
                    <button type="button" className="cancel-btn" onClick={() => navigate(`/userLogged/${userId}`)}>Cancelar</button>
                </form>
            </div>
    );
};

export default EditUser;
