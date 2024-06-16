import React, { useState } from 'react';
import FormUserRegister from './FormUserRegister';
import FormCompanyRegister from './FormCompanyRegister';
import { motion } from 'framer-motion';
import './Signup.css';

const Signup = () => {
    const [registerType, setRegisterType] = useState('user');

    return (
        <motion.div
            className="signup-container"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2>Signup</h2>
            <div className="register-type-selector">
                <button
                    onClick={() => setRegisterType('user')}
                    className={registerType === 'user' ? 'active' : ''}
                >
                    Candidato
                </button>
                <button
                    onClick={() => setRegisterType('company')}
                    className={registerType === 'company' ? 'active' : ''}
                >
                    Empresa
                </button>
            </div>
            {registerType === 'user' ? (
                <FormUserRegister />
            ) : (
                <FormCompanyRegister />
            )}
        </motion.div>
    );
};

export default Signup;
