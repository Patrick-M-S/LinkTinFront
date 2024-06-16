import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditUserInfo.css';

const skillsOptions = [
    "JavaScript", "Python", "Java", "C#", "Ruby", "PHP",
    "C++", "Swift", "Go", "Kotlin", "Perl", "R",
    "TypeScript", "Scala", "Bash", "Lua", "Rust",
    "Elixir", "Dart", "Clojure"
];

const EditUserInfo = () => {
    const { userId } = useParams();
    const [userInfo, setUserInfo] = useState(null);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [curriculum, setCurriculum] = useState('');
    const [level, setLevel] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch(`http://localhost:9090/api/userinfos/${userId}`);
                if (response.ok) {
                    const data = await response.json();
                    setUserInfo(data);
                    if (data.skills) {
                        setSelectedSkills(data.skills.split(','));
                    }
                    if (data.curriculum) {
                        setCurriculum(data.curriculum);
                    }
                    if (data.level) {
                        setLevel(data.level);
                    }
                } else {
                    throw new Error('Failed to fetch user info');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchUserInfo();
    }, [userId]);

    const toggleSkill = (skill) => {
        setSelectedSkills(prev =>
            prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
        );
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setCurriculum(reader.result.split(',')[1]);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedUserInfo = {
            ...userInfo,
            skills: selectedSkills.join(','),
            curriculum: curriculum,
            level: level,
        };

        try {
            const response = await fetch(`http://localhost:9090/api/userinfos/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUserInfo)
            });
            if (response.ok) {
                navigate(`/userLogged/${userId}`);
            } else {
                const errorText = await response.text();
                console.error('Failed to update user info:', errorText);
            }
        } catch (error) {
            console.error('Error updating user info:', error);
        }
    };

    const handleCancel = () => {
        navigate(`/userLogged/${userId}`);
    };

    if (!userInfo) {
        return <p>Loading...</p>;
    }

    return (
        <div className="edit-user-info-container">
            <h2>Editar Informações do Usuário</h2>
            <form onSubmit={handleSubmit} className="edit-user-info-form">
                <div className="form-row">
                    <label>
                        Curriculum (PDF only):
                        <input
                            type="file"
                            accept="application/pdf"
                            onChange={handleFileChange}
                            className="input-full-width"
                        />
                    </label>
                </div>
                <div className="form-row">
                    <label>
                        Level:
                        <select value={level} onChange={(e) => setLevel(e.target.value)} className="input-full-width">
                            <option value="">Select Level</option>
                            <option value="Jr">Jr</option>
                            <option value="Pleno">Pleno</option>
                            <option value="Senior">Senior</option>
                        </select>
                    </label>
                </div>
                <div className="skills-container">
                    {skillsOptions.map(skill => (
                        <button
                            key={skill}
                            type="button"
                            onClick={() => toggleSkill(skill)}
                            className={`skill ${selectedSkills.includes(skill) ? 'selected' : ''}`}
                        >
                            {skill}
                        </button>
                    ))}
                </div>
                <div className="form-buttons">
                    <button type="submit" className="save-btn">Salvar</button>
                    <button type="button" className="cancel-btn" onClick={handleCancel}>Cancelar</button>
                </div>
            </form>
        </div>
    );
};

export default EditUserInfo;
