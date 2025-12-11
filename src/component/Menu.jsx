import React from 'react';
import { NavLink } from 'react-router-dom';

const Menu = () => {
    return (
        <nav className="modern-menu">
            <ul className="menu-list">
                <li className="menu-item">
                    <NavLink
                        to="/quiz-dashbord"
                        className={({ isActive }) =>
                            isActive ? 'menu-link active-link' : 'menu-link'
                        }
                    >
                        <i className="bi bi-speedometer2"></i>
                        <span>Dashboard</span>
                    </NavLink>
                </li>
                <li className="menu-item">
                    <NavLink
                        to="/react-js"
                        className={({ isActive }) =>
                            isActive ? 'menu-link active-link' : 'menu-link'
                        }
                    >
                        <i className="bi bi-filetype-jsx"></i>
                        <span>React JS</span>
                    </NavLink>
                </li>
                <li className="menu-item">
                    <NavLink
                        to="/php"
                        className={({ isActive }) =>
                            isActive ? 'menu-link active-link' : 'menu-link'
                        }
                    >
                        <i className="bi bi-filetype-php"></i>
                        <span>PHP</span>
                    </NavLink>
                </li>
                <li className="menu-item">
                    <NavLink
                        to="/full-stack-developer"
                        className={({ isActive }) =>
                            isActive ? 'menu-link active-link' : 'menu-link'
                        }
                    >
                        <i className="bi bi-stack"></i>
                        <span>Full Stack</span>
                    </NavLink>
                </li>
                <li className="menu-item">
                    <NavLink
                        to="/ai-bots"
                        className={({ isActive }) =>
                            isActive ? 'menu-link active-link' : 'menu-link'
                        }
                    >
                        <i className="bi bi-robot"></i>
                        <span>AI Bots</span>
                    </NavLink>
                </li>
            </ul>

            <style jsx>{`
                .modern-menu {
                    width: 100%;
                }

                .menu-list {
                    display: flex;
                    list-style: none;
                    margin: 0;
                    padding: 0;
                    gap: 5px;
                    align-items: center;
                }

                .menu-item {
                    flex: 0 0 auto;
                }

                .menu-link {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 10px 18px;
                    text-decoration: none;
                    color: #666;
                    font-size: 15px;
                    font-weight: 600;
                    border-radius: 10px;
                    transition: all 0.3s ease;
                    position: relative;
                    white-space: nowrap;
                }

                .menu-link i {
                    font-size: 18px;
                    transition: transform 0.3s ease;
                }

                .menu-link:hover {
                    color: #667eea;
                    background: rgba(102, 126, 234, 0.1);
                }

                .menu-link:hover i {
                    transform: scale(1.1);
                }

                .active-link {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white !important;
                    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
                }

                .active-link:hover {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                }

                .active-link::before {
                    content: '';
                    position: absolute;
                    bottom: -2px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 30px;
                    height: 3px;
                    background: white;
                    border-radius: 2px;
                }

                /* Responsive Design */
                @media (max-width: 1024px) {
                    .menu-list {
                        gap: 3px;
                    }

                    .menu-link {
                        padding: 8px 14px;
                        font-size: 14px;
                    }

                    .menu-link i {
                        font-size: 16px;
                    }
                }

                @media (max-width: 768px) {
                    .menu-list {
                        flex-wrap: wrap;
                        justify-content: center;
                        gap: 8px;
                    }

                    .menu-link {
                        padding: 8px 12px;
                        font-size: 13px;
                    }

                    .menu-link span {
                        display: none;
                    }

                    .menu-link i {
                        font-size: 20px;
                        margin: 0;
                    }

                    .menu-link {
                        width: 44px;
                        height: 44px;
                        justify-content: center;
                        padding: 0;
                    }

                    .active-link::before {
                        display: none;
                    }
                }

                @media (max-width: 480px) {
                    .menu-list {
                        gap: 6px;
                    }

                    .menu-link {
                        width: 40px;
                        height: 40px;
                    }

                    .menu-link i {
                        font-size: 18px;
                    }
                }
            `}</style>
        </nav>
    );
};

export default Menu;
