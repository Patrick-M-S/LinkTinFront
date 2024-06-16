import React, { useState, useEffect } from 'react';
import './EditJobOpportunity.css'; // Certifique-se de criar e importar o CSS para este componente

const EditJobOpportunity = ({ job, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        jobTitle: job.jobTitle,
        workMode: job.workMode,
        location: job.location,
        salary: job.salary,
        level: job.level,
        description: job.description
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:9090/api/jobopportunitys/${job.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                const updatedJob = await response.json();
                onSave(updatedJob);
            } else {
                throw new Error('Failed to update job opportunity');
            }
        } catch (error) {
            console.error('Error updating job opportunity:', error);
        }
    };

    return (
        <div className="edit-job-container">
            <form onSubmit={handleSubmit} className="edit-job-form">
                <label>
                    Job Title:
                    <input
                        type="text"
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Work Mode:
                    <input
                        type="text"
                        name="workMode"
                        value={formData.workMode}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Location:
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Salary:
                    <input
                        type="number"
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Level:
                    <input
                        type="text"
                        name="level"
                        value={formData.level}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Description:
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </label>
                <div className="edit-job-buttons">
                    <button type="submit" className="save-btn">Save</button>
                    <button type="button" onClick={onCancel} className="cancel-btn">Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default EditJobOpportunity;
