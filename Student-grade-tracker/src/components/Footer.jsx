// Footer.jsx

import React from 'react';
import './Footer.css'


const Footer = () => {
    return (
        <footer>
            <div className="footer-content">
                <p>&copy; 2024 SFR (PVT). All rights reserved.</p>
                <ul className="footer-links">
                    
                    <li><a href="/about">About</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
