import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserCardMinimum.css';

const UserCardMinimum = ({ userId }) => {
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

    return (
        <div className="user-profile-card">
            {user ? (
                <>
                    <img src={`data:image/jpeg;base64,${user.picture}`} alt={user.name} className="profile-picture" />
                    <h4>{user.name}</h4>
                    <button className="edit-profile-btn" onClick={() => navigate(`/manageUser/${userId}`)}>Editar Perfil</button>
                </>
            ) : (
                <p>Carregando...</p>
            )}
        </div>
    );
};

export default UserCardMinimum;
