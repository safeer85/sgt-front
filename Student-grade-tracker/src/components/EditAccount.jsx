import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditAccount.css';


const EditAccount = () => {
    const [name, setName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
   
    const navigate = useNavigate();

    const handleUpdateAccount = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        if (!token) {
            alert('You must be logged in to update your account.');
            return;
        }

        try {
            const response = await fetch('/api/user', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, newEmail, currentPassword, newPassword })
            });

            if (response.ok) {
                alert('Your account has been updated successfully. please login again');
                localStorage.removeItem('token');
                navigate('/login'); // Redirect to dashboard or another page
            } else {
                const data = await response.json();
                alert(`Failed to update account: ${data.message}`);
            }
        } catch (error) {
            console.error('Error updating account:', error);
            alert('An error occurred while updating your account. Please try again later.');
        }
    };

    return (
        <div className="edit-account-container">
            <h2>Edit Account</h2>
            <form onSubmit={handleUpdateAccount}>
                <label>
                    Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <label>
                    New Email:
                    <input
                        type="email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                    />
                </label>
                <label>
                    Current Password:
                    <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                </label>
                <label>
                    New Password:
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </label>
                <button type="submit">Update Account</button>
            </form>
        </div>
    );
};

export default EditAccount;
