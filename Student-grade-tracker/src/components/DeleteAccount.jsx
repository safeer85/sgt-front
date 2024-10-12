import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Authcontext';
import './DeleteAccount.css';

const DeleteAccount = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleDeleteAccount = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('You must be logged in to delete your account.');
            return;
        }

        const confirmDelete = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
        if (!confirmDelete) {
            return;
        }

        try {
            const response = await fetch('/api/user', {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                alert('Your account has been deleted successfully.');
                logout(); // Log the user out
                navigate('/'); // Redirect to home page
            } else {
                const data = await response.json();
                alert(`Failed to delete account: ${data.message}`);
            }
        } catch (error) {
            console.error('Error deleting account:', error);
            alert('An error occurred while deleting your account. Please try again later.');
        }
    };

    return (
        <div className="delete-account-container">
            <h2>Delete Account</h2>
            <button onClick={handleDeleteAccount}>Delete My Account</button>
        </div>
    );
};

export default DeleteAccount;
