// SideMenu.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {AuthContext} from '../Authcontext';// Import the context
import './Sidemenu.css'; // Create and import a CSS file for styling

const SideMenu = () => {
    const { isAuthenticated } = useContext(AuthContext);

    if (!isAuthenticated) {
        return null; // Don't show the side menu if the user is not authenticated
    }

    return (
        <div className="side-menu">
            <Link to='/edit-account'>Edit Account Details</Link>
            <Link to='/delete-account'>Delete Account</Link>
        </div>
    );
};

export default SideMenu;
