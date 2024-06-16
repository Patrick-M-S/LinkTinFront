import React, { useState } from 'react';
import './NewJobOpportunity.css'; // Crie e importe o CSS para este componente

const NewJobOpportunity = ({ companyId }) => {
    const [jobData, setJobData] = useState({
        jobTitle: '',
        workMode: '',
        location: '',
        salary: 0,
        level: '',
        description: '',
        company: {}
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setJobData({ ...jobData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:9090/api/jobopportunitys?companyId=${companyId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(jobData)
            });

            if (response.ok) {
                alert('Job opportunity created successfully');
                setJobData({
                    jobTitle: '',
                    workMode: '',
                    location: '',
                    salary: 0,
                    level: '',
                    description: '',
                    company: {}
                });
            } else {
                setError('Failed to create job opportunity');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to create job opportunity');
        }
    };

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="new-job-container">
            <form onSubmit={handleSubmit} className="new-job-form">
                <div className="form-row">
                    <label>Job Title:
                        <input type="text" name="jobTitle" value={jobData.jobTitle} onChange={handleChange} />
                    </label>
                </div>
                <div className="form-row">
                    <label>Work Mode:
                        <input type="text" name="workMode" value={jobData.workMode} onChange={handleChange} />
                    </label>
                    <label>Location:
                        <input type="text" name="location" value={jobData.location} onChange={handleChange} />
                    </label>
                </div>
                <div className="form-row">
                    <label>Salary:
                        <input type="number" name="salary" value={jobData.salary} onChange={handleChange} />
                    </label>
                    <label>Level:
                        <input type="text" name="level" value={jobData.level} onChange={handleChange} />
                    </label>
                </div>
                <div className="form-row">
                    <label>Description:
                        <textarea name="description" value={jobData.description} onChange={handleChange} />
                    </label>
                </div>
                <button type="submit" className="btn-submit">Submit</button>
            </form>
        </div>
    );
};

export default NewJobOpportunity;
