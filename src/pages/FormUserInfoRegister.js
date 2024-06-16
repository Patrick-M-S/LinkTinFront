import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './FormUserInfoRegister.css';

const skillsOptions = [
    "JavaScript", "Python", "Java", "C#", "Ruby", "PHP",
    "C++", "Swift", "Go", "Kotlin", "Perl", "R",
    "TypeScript", "Scala", "Bash", "Lua", "Rust",
    "Elixir", "Dart", "Clojure"
];

const FormUserInfoRegister = () => {
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [curriculum, setCurriculum] = useState('');
    const [level, setLevel] = useState('');
    const { userId } = useParams();
    const navigate = useNavigate();

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
        const userInfo = {
            skills: selectedSkills.join(','),
            curriculum: curriculum,
            level: level,
            user: { id: userId }
        };

        try {
            const response = await fetch(`http://localhost:9090/api/userinfos?userId=${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userInfo)
            });
            if (response.ok) {
                navigate(`/userLogged/${userId}`);
            } else {
                const errorText = await response.text();
                console.error('Failed to submit user info:', errorText);
            }
        } catch (error) {
            console.error('Error submitting user info:', error);
        }
    };

    const handleSkip = () => {
        navigate(`/userLogged/${userId}`);
    };

    return (
        <div className="form-user-info-container">
            <form onSubmit={handleSubmit} className="form-user-info">
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
                    <button type="submit" className="btn-submit">Submit</button>
                    <button type="button" className="btn-skip" onClick={handleSkip}>Agora não</button>
                </div>
            </form>
        </div>
    );
};

export default FormUserInfoRegister;
