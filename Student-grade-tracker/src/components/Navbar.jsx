import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../Authcontext'; // Import the context
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'; // Import hamburger icon from FontAwesome
import SideMenu from './Sidemenu'; // Import SideMenu component
import logo from '../Assets/sgtlogo.png'; // Import the logo image

const Navbar = () => {
    const { isAuthenticated, logout } = useContext(AuthContext);
    const location = useLocation();
    const [sideMenuVisible, setSideMenuVisible] = useState(false);

    const handleLogout = () => {
        logout();
        // Close side menu if open
        setSideMenuVisible(false);
    };

    const handleToggleSideMenu = () => {
        setSideMenuVisible(!sideMenuVisible);
    };

    return (
        <nav>
            <div className="navbar-left">
                <img src={logo} alt="Logo" className="navbar-logo" />
                {isAuthenticated && (
                    <Link to='#' className="menu-toggle" onClick={handleToggleSideMenu}>
                        <FontAwesomeIcon icon={faBars} />
                    </Link>
                )}
                {isAuthenticated ? (
                    <>
                        {/* Show Dashboard link if on the RankPage or HomePage */}
                        {(location.pathname === '/' || location.pathname === '/ranks') && (
                            <Link to='/dashboard'>Dashboard</Link>
                        )}
                        {location.pathname === '/' ? (
                            <Link to='/'>Home</Link>
                        ) : (
                            <Link to='/'>Home</Link>
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
            {isAuthenticated && (
                <SideMenu isVisible={sideMenuVisible} toggleSideMenu={handleToggleSideMenu} />
            )}
        </nav>
    );
};

export default Navbar;
