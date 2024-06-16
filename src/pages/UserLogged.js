import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import UserCardMinimum from './UserCardMinimum';
import './UserLogged.css';

const UserLogged = () => {
    const [jobOpportunities, setJobOpportunities] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const { userId } = useParams();

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch('http://localhost:9090/api/jobopportunitys');
                if (response.ok) {
                    const jobs = await response.json();
                    setJobOpportunities(jobs);
                } else {
                    throw new Error('Failed to fetch job opportunities');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchJobs();
    }, []);

    const handleYes = () => {
        setCurrentIndex(prev => (prev + 1) % jobOpportunities.length);
    };

    const handleNo = () => {
        handleYes(); // Simplifies the handleNo to advance to the next job
    };

    const cardVariants = {
        enter: { opacity: 0, x: 100 },
        center: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -100 }
    };

    return (
        <div className="user-logged-container">
            <UserCardMinimum userId={userId} />
            <AnimatePresence>
                {jobOpportunities.length > 0 && currentIndex < jobOpportunities.length ? (
                    <motion.div
                        key={currentIndex}
                        className="user-logged-job-card"
                        variants={cardVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.5 }}
                        style={{
                            backgroundImage: `url("data:image/jpeg;base64,${jobOpportunities[currentIndex].company.picture}")`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundBlendMode: 'overlay',
                            backgroundColor: 'rgba(255, 255, 255, 0.5)'
                        }}
                    >
                        <h2>{jobOpportunities[currentIndex].jobTitle}</h2>
                        <p className="highlight">Company: {jobOpportunities[currentIndex].company.name}</p>
                        <p>Location: {jobOpportunities[currentIndex].location}</p>
                        <p>Mode: {jobOpportunities[currentIndex].workMode}</p>
                        <p>Salary: ${jobOpportunities[currentIndex].salary.toLocaleString()}</p>
                        <p>Level: {jobOpportunities[currentIndex].level}</p>
                        <p>{jobOpportunities[currentIndex].description}</p>
                        <div className="user-logged-buttons">
                            <button className="user-logged-button yes" onClick={handleYes}>Yes</button>
                            <button className="user-logged-button no" onClick={handleNo}>No</button>
                        </div>
                    </motion.div>

                ) : (
                    <p>No job opportunities available.</p>
                )}
            </AnimatePresence>
        </div>
    );
};

export default UserLogged;
