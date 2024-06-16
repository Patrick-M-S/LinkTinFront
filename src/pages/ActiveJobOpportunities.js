import React, { useEffect, useState } from 'react';
import EditJobOpportunity from './EditJobOpportunity';
import './ActiveJobOpportunities.css'; // Crie e importe o CSS para este componente

const ActiveJobOpportunities = ({ companyId }) => {
    const [jobs, setJobs] = useState([]);
    const [error, setError] = useState('');
    const [editingJob, setEditingJob] = useState(null);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch('http://localhost:9090/api/companys/withJobOpportunitys');
                if (response.ok) {
                    const data = await response.json();
                    const company = data.find(company => company.id === parseInt(companyId));
                    if (company) {
                        setJobs(company.jobOpportunityList);
                    } else {
                        setError('Company not found');
                    }
                } else {
                    throw new Error('Failed to fetch job opportunities');
                }
            } catch (error) {
                console.error('Error:', error);
                setError('Failed to fetch job opportunities');
            }
        };

        fetchJobs();
    }, [companyId]);

    const handleEditJob = (job) => {
        setEditingJob(job);
    };

    const handleSaveJob = (updatedJob) => {
        console.log('Job saved:', updatedJob);
        setJobs(jobs.map(job => (job.id === updatedJob.id ? updatedJob : job)));
        setEditingJob(null);
    };

    const handleCancelEdit = () => {
        setEditingJob(null);
    };

    const handleDeleteJob = async (jobId) => {
        try {
            const response = await fetch(`http://localhost:9090/api/jobopportunitys/${jobId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setJobs(jobs.filter(job => job.id !== jobId));
            } else {
                throw new Error('Failed to delete job opportunity');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to delete job opportunity');
        }
    };

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="active-jobs-container">
            {editingJob && (
                <EditJobOpportunity
                    job={editingJob}
                    onSave={handleSaveJob}
                    onCancel={handleCancelEdit}
                />
            )}
            {jobs.map(job => (
                <div key={job.id} className="job-card">
                    <h3>{job.jobTitle}</h3>
                    <p>{job.description}</p>
                    <button onClick={() => handleEditJob(job)}>Edit</button>
                    <button onClick={() => handleDeleteJob(job.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default ActiveJobOpportunities;
