import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './FormUserRegister.css';

const FormUserRegister = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        cpf: '',
        address: '',
        birthDate: '',
        gender: '',
        picture: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newValue = name === 'gender' ? value.charAt(0) : value;
        setFormData({ ...formData, [name]: newValue });
        if (errors[name]) {
            setErrors({ ...errors, [name]: null });
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result.replace(/^data:.+;base64,/, '');
                setFormData({ ...formData, picture: base64String });
            };
            reader.readAsDataURL(file);
        }
    };

    const validateForm = () => {
        const newErrors = {};
        Object.keys(formData).forEach(key => {
            if (!formData[key] && key !== 'picture') {
                newErrors[key] = 'This field is required';
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        try {
            const response = await fetch('http://localhost:9090/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const data = await response.json();
                navigate(`/formUserInfo/${data.id}`); // Redirect to the FormUserInfoRegister with the user ID
            } else {
                const errorText = await response.text();
                console.error('Failed to register user:', errorText);
                setErrors({ submit: 'Error submitting form: ' + errorText });
            }
        } catch (error) {
            console.error('Registration Error:', error);
            setErrors({ submit: 'Error submitting form: ' + error.message });
        }
    };

    return (
        <motion.div
            className="form-user-container"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <form onSubmit={handleSubmit} className="form-user-register">
                <div className="form-user-row">
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={errors.name ? 'error' : ''}
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={errors.email ? 'error' : ''}
                        />
                    </label>
                </div>
                <div className="form-user-row">
                    <label>
                        Password:
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={errors.password ? 'error' : ''}
                        />
                    </label>
                    <label>
                        CPF:
                        <input
                            type="text"
                            name="cpf"
                            value={formData.cpf}
                            onChange={handleChange}
                            className={errors.cpf ? 'error' : ''}
                        />
                    </label>
                </div>
                <div className="form-user-row">
                    <label>
                        Address:
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className={errors.address ? 'error' : ''}
                        />
                    </label>
                </div>
                <div className="form-user-row">
                    <label>
                        Birth Date:
                        <input
                            type="date"
                            name="birthDate"
                            value={formData.birthDate}
                            onChange={handleChange}
                            className={errors.birthDate ? 'error' : ''}
                        />
                    </label>
                    <label>
                        Gender:
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className={errors.gender ? 'error' : ''}
                        >
                            <option value="">Select Gender</option>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                            <option value="O">Other</option>
                        </select>
                    </label>
                </div>
                <div className="form-user-row">
                    <label htmlFor="picture">
                        Picture:
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className={errors.picture ? 'error' : ''}
                        />
                    </label>
                </div>
                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn"
                >
                    Register
                </motion.button>
                {errors.submit && <p className="error-message">{errors.submit}</p>}
            </form>
        </motion.div>
    );
};

export default FormUserRegister;
