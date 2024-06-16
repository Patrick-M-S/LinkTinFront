import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './ManageUser.css';

const ManageUser = () => {
    const { userId } = useParams();

    return (
        <div className="manage-user-background">
            <div className="manage-user-container">
                <h2>Gerenciar Perfil</h2>
                <div className="manage-user-options">
                    <Link to={`/editUser/${userId}`} className="manage-user-btn">Editar Usuário</Link>
                    <Link to={`/editUserInfo/${userId}`} className="manage-user-btn">Editar Informações</Link>
                </div>
            </div>
        </div>
    );
};

export default ManageUser;
