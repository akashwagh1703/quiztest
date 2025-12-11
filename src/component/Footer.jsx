import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove user data from localStorage
        localStorage.removeItem('userData');
        localStorage.removeItem('authToken');
        // Navigate to the home page
        navigate('/');
    };

    return (
        <footer className="modern-footer">
            <div className="footer-content">
                <div className="footer-section footer-brand">
                    <div className="brand-logo">
                        <i className="bi bi-mortarboard-fill"></i>
                        <span>QuizTest</span>
                    </div>
                    <p className="brand-tagline">Master Your Skills, One Quiz at a Time</p>
                </div>

                <div className="footer-section footer-links">
                    <h4>Quick Links</h4>
                    <ul>
                        <li>
                            <a onClick={() => navigate('/quiz-dashbord')}>
                                <i className="bi bi-speedometer2"></i> Dashboard
                            </a>
                        </li>
                        <li>
                            <a onClick={() => navigate('/react-js')}>
                                <i className="bi bi-filetype-jsx"></i> React Quiz
                            </a>
                        </li>
                        <li>
                            <a onClick={() => navigate('/php')}>
                                <i className="bi bi-filetype-php"></i> PHP Quiz
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="footer-section footer-social">
                    <h4>Connect With Us</h4>
                    <div className="social-links">
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link github">
                            <i className="bi bi-github"></i>
                        </a>
                        <a href="https://stackoverflow.com" target="_blank" rel="noopener noreferrer" className="social-link stackoverflow">
                            <i className="bi bi-stack-overflow"></i>
                        </a>
                        <a href="https://dev.to" target="_blank" rel="noopener noreferrer" className="social-link dev">
                            <i className="bi bi-code-square"></i>
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link twitter">
                            <i className="bi bi-twitter"></i>
                        </a>
                    </div>
                </div>

                <div className="footer-section footer-action">
                    <button className="logout-btn" onClick={handleLogout}>
                        <i className="bi bi-box-arrow-right"></i>
                        <span>Logout</span>
                    </button>
                    <p className="logout-hint">Sign out of your account</p>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="footer-divider"></div>
                <p className="copyright">
                    &copy; {new Date().getFullYear()} QuizTest. All rights reserved. Built with{' '}
                    <i className="bi bi-heart-fill"></i> for learners
                </p>
            </div>

            <style jsx>{`
                .modern-footer {
                    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
                    color: white;
                    padding: 60px 0 20px;
                    margin-top: 80px;
                }

                .footer-content {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 20px;
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 40px;
                    margin-bottom: 40px;
                }

                /* Brand Section */
                .footer-brand .brand-logo {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    font-size: 28px;
                    font-weight: 800;
                    margin-bottom: 15px;
                }

                .footer-brand .brand-logo i {
                    font-size: 36px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .brand-tagline {
                    color: rgba(255, 255, 255, 0.7);
                    font-size: 14px;
                    line-height: 1.6;
                    margin: 0;
                }

                /* Links Section */
                .footer-links h4 {
                    font-size: 18px;
                    font-weight: 700;
                    margin: 0 0 20px 0;
                    color: white;
                }

                .footer-links ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }

                .footer-links ul li a {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    color: rgba(255, 255, 255, 0.7);
                    text-decoration: none;
                    font-size: 14px;
                    transition: all 0.3s ease;
                    cursor: pointer;
                }

                .footer-links ul li a:hover {
                    color: white;
                    transform: translateX(5px);
                }

                .footer-links ul li a i {
                    font-size: 16px;
                    color: #667eea;
                }

                /* Social Section */
                .footer-social h4 {
                    font-size: 18px;
                    font-weight: 700;
                    margin: 0 0 20px 0;
                    color: white;
                }

                .social-links {
                    display: flex;
                    gap: 15px;
                    flex-wrap: wrap;
                }

                .social-link {
                    width: 45px;
                    height: 45px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 20px;
                    color: white;
                    text-decoration: none;
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                }

                .social-link::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(255, 255, 255, 0.1);
                    transition: all 0.3s ease;
                }

                .social-link:hover::before {
                    background: rgba(255, 255, 255, 0.2);
                }

                .social-link:hover {
                    transform: translateY(-5px);
                }

                .social-link.github {
                    background: linear-gradient(135deg, #333 0%, #555 100%);
                }

                .social-link.stackoverflow {
                    background: linear-gradient(135deg, #f48024 0%, #f58025 100%);
                }

                .social-link.dev {
                    background: linear-gradient(135deg, #0a0a0a 0%, #2d2d2d 100%);
                }

                .social-link.twitter {
                    background: linear-gradient(135deg, #1da1f2 0%, #0d8bd9 100%);
                }

                /* Action Section */
                .footer-action {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                }

                .logout-btn {
                    background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
                    color: white;
                    border: none;
                    padding: 14px 30px;
                    border-radius: 12px;
                    font-size: 16px;
                    font-weight: 700;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 15px rgba(220, 53, 69, 0.3);
                    margin-bottom: 10px;
                }

                .logout-btn:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 6px 20px rgba(220, 53, 69, 0.4);
                }

                .logout-btn:active {
                    transform: translateY(-1px);
                }

                .logout-btn i {
                    font-size: 18px;
                }

                .logout-hint {
                    color: rgba(255, 255, 255, 0.5);
                    font-size: 13px;
                    margin: 0;
                }

                /* Footer Bottom */
                .footer-bottom {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 20px;
                }

                .footer-divider {
                    height: 1px;
                    background: linear-gradient(
                        90deg,
                        transparent 0%,
                        rgba(255, 255, 255, 0.2) 50%,
                        transparent 100%
                    );
                    margin-bottom: 20px;
                }

                .copyright {
                    text-align: center;
                    color: rgba(255, 255, 255, 0.6);
                    font-size: 14px;
                    margin: 0;
                    padding: 0;
                }

                .copyright i {
                    color: #dc3545;
                    font-size: 12px;
                    animation: heartbeat 1.5s ease-in-out infinite;
                }

                @keyframes heartbeat {
                    0%, 100% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(1.1);
                    }
                }

                /* Responsive Design */
                @media (max-width: 768px) {
                    .modern-footer {
                        padding: 40px 0 20px;
                        margin-top: 60px;
                    }

                    .footer-content {
                        grid-template-columns: 1fr;
                        gap: 30px;
                        text-align: center;
                    }

                    .footer-brand .brand-logo {
                        justify-content: center;
                    }

                    .footer-links h4,
                    .footer-social h4 {
                        font-size: 16px;
                    }

                    .footer-links ul {
                        align-items: center;
                    }

                    .footer-links ul li a:hover {
                        transform: none;
                    }

                    .social-links {
                        justify-content: center;
                    }

                    .footer-action {
                        align-items: center;
                    }

                    .logout-btn {
                        width: 100%;
                        max-width: 300px;
                        justify-content: center;
                    }

                    .copyright {
                        font-size: 12px;
                    }
                }

                @media (max-width: 480px) {
                    .modern-footer {
                        padding: 30px 0 15px;
                    }

                    .footer-content {
                        gap: 25px;
                    }

                    .footer-brand .brand-logo {
                        font-size: 24px;
                    }

                    .footer-brand .brand-logo i {
                        font-size: 30px;
                    }

                    .logout-btn {
                        padding: 12px 24px;
                        font-size: 14px;
                    }
                }
            `}</style>
        </footer>
    );
};

export default Footer;
