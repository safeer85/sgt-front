import React from 'react';
import { Link } from 'react-router-dom';
import './Sidemenu.css';

const SideMenu = ({ isVisible }) => {
    return (
        <div className={`side-menu ${isVisible ? 'visible' : ''}`}>
           
            <Link to='/edit-account'>Edit Account</Link>
            <Link to='/delete-account'>Delete Account</Link>
        </div>
    );
};

export default SideMenu;
