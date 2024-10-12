import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPage.css'; // Import CSS file for styling

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  
  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the token from local storage
        const response = await axios.get('https://sgt-back-uoua.vercel.app/api/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (err) {
        setError('Failed to fetch users. Please try again.');
      }
    };

    fetchUsers();
  }, []);
  
  // Handle delete user
  const handleDelete = async (userId) => {
    try {
      const token = localStorage.getItem('token'); // Get the token from local storage
      await axios.delete(`https://sgt-back-uoua.vercel.app/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.filter(user => user._id !== userId)); // Remove user from state
    } catch (err) {
      setError('Failed to delete user. Please try again.');
    }
  };

  return (
    <div className="admin-page-container">
      <h1 className="admin-page-header">Admin - User List</h1>
      {error && <p className="error-message">{error}</p>}
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Science Field</th>
            <th>Actions</th> {/* New column for actions */}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.scienceField || 'N/A'}</td>
              <td>
                <button onClick={() => handleDelete(user._id)} className="delete-button">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
