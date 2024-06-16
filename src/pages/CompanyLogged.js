import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import CompanyCardMinimum from './CompanyCardMinimum';
import './CompanyLogged.css';

const CompanyLogged = () => {
    const [candidates, setCandidates] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const { companyId } = useParams();

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const response = await fetch('http://localhost:9090/api/users/withUserInfo');
                if (response.ok) {
                    const users = await response.json();
                    setCandidates(users);
                } else {
                    throw new Error('Failed to fetch candidates');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchCandidates();
    }, []);

    const handleYes = () => {
        setCurrentIndex((currentIndex + 1) % candidates.length);
    };

    const handleNo = () => {
        handleYes(); // Similar to 'Yes' for now
    };

    const cardVariants = {
        hidden: { opacity: 0, x: -100 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
        exit: { opacity: 0, x: 100, transition: { duration: 0.3 } }
    };

    return (
        <div className="company-logged-container">
            <CompanyCardMinimum companyId={companyId} />
            <AnimatePresence>
                {candidates.length > 0 && (
                    <motion.div
                        key={currentIndex}
                        className="candidate-card"
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        style={{
                            backgroundImage: `url(data:image/jpeg;base64,${candidates[currentIndex].picture})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundBlendMode: 'overlay',
                            backgroundColor: 'rgba(255, 255, 255, 0.5)'
                        }}
                    >
                        <h3>{candidates[currentIndex].name}</h3>
                        <p>Email: {candidates[currentIndex].email}</p>
                        <p>Skills: {candidates[currentIndex].skills}</p>
                        <p>Level: {candidates[currentIndex].level}</p>
                        <div className="candidate-buttons">
                            <button className="candidate-button yes" onClick={handleYes}>Yes</button>
                            <button className="candidate-button no" onClick={handleNo}>No</button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            {candidates.length === 0 && <p>No candidates available.</p>}
        </div>
    );
};

export default CompanyLogged;
