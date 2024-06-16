import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import './Home.css';
import backgroundImage from './background.png';

const Home = () => {
    const [text, setText] = useState('');
    const fullText = "Conectando talentos e oportunidades em um único lugar.";

    useEffect(() => {
        let index = 0;
        const typingInterval = setInterval(() => {
            setText(fullText.substring(0, index + 1));
            index++;
            if (index === fullText.length) {
                clearInterval(typingInterval);
            }
        }, 50);

        return () => clearInterval(typingInterval);
    }, []);

    return (
        <div className="home-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="background-overlay"></div>
            <h1 className="main-title">{text}</h1>
            <div className="home-content">
                <div className="home-content-2">
                    <div className="login-signup-buttons">
                        <Link to="/login" className="btn login-btn">Login</Link>
                        <Link to="/signup" className="btn signup-btn">Sign Up</Link>
                    </div>
                    <div className="social-buttons">
                        <button className="btn google-btn">
                            <FontAwesomeIcon icon={faGoogle} />
                        </button>
                        <button className="btn facebook-btn">
                            <FontAwesomeIcon icon={faFacebook} />
                        </button>
                        <button className="btn linkedin-btn">
                            <FontAwesomeIcon icon={faLinkedin} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
