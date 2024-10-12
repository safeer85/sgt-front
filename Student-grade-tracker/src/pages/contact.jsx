import React, { useState } from 'react';
import './contact.css';

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission (e.g., send the message to an API or email)
        alert('Your message has been sent!');
        setName('');
        setEmail('');
        setMessage('');
    };

    return (
        <div className="contact-container">
            <form className="contact-form" onSubmit={handleSubmit}>
                <h1>Contact Us</h1>
                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </label>
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>
                <label>
                    Message:
                    <textarea value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
                </label>
                <button type="submit">Send Message</button>
            </form>
        </div>
    );
};

export default Contact;
