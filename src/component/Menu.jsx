import React from 'react';
import { NavLink } from 'react-router-dom';
import './Menu.css'; // Import custom styles for Menu

const Menu = () => {
    return (
        <nav>
            <ul className="menu-list d-flex mb-0">
                <li className="menu-item">
                    <NavLink
                        to="/quiz-dashbord"
                        className={({ isActive }) =>
                            isActive ? 'menu-link active-link' : 'menu-link'
                        }
                    >
                        Dashboard
                    </NavLink>
                </li>
                <li className="menu-item">
                    <NavLink
                        to="/react-js"
                        className={({ isActive }) =>
                            isActive ? 'menu-link active-link' : 'menu-link'
                        }
                    >
                        React JS
                    </NavLink>
                </li>
                <li className="menu-item">
                    <NavLink
                        to="/php"
                        className={({ isActive }) =>
                            isActive ? 'menu-link active-link' : 'menu-link'
                        }
                    >
                        PHP
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Menu;
