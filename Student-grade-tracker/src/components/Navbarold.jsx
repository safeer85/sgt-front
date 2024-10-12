import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../Authcontext';// Import the context
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'; // Import hamburger icon from FontAwesome

const Navbar = ({ toggleSideMenu }) => {
    const { isAuthenticated, logout } = useContext(AuthContext);
    const location = useLocation();

    const handleLogout = () => {
        logout();
        // Close side menu if open
        toggleSideMenu(false);
    };

    return (
        <nav>
            <div className="navbar-left">
                {isAuthenticated ? (
                    <>
                        {location.pathname === '/' ? (
                            <Link to='/dashboard'>Dashboard</Link>
                        ) : (
                            <Link to='/'>Home</Link>
                        )}
                        {toggleSideMenu && (
                            <Link to='#' className="menu-toggle" onClick={toggleSideMenu}>
                                <FontAwesomeIcon icon={faBars} />
                            </Link>
                        )}
                        <Link to='/login' onClick={handleLogout}>Logout</Link>
                    </>
                ) : (
                    <>
                        <Link to='/'>Home</Link>
                        <Link to='/login'>Login</Link>
                        <Link to='/register'>Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
