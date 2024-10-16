// Login.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import './Login.css'; // Import CSS file for styling

const Login = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: '',
        password: ''
    });

    const loginUser = async (e) => {
        e.preventDefault();
        const { email, password } = data;
        try {
            const response = await axios.post('http://localhost:5000/login', {
                email,
                password
            });

            if (response.data.error) {
                toast.error(response.data.error);
            } else {
                // Save token in local storage
                localStorage.setItem('token', response.data.token);
                console.log('Stored Token:', localStorage.getItem('token')); // Add this line
                setData({ email: '', password: '' });
                navigate('/dashboard');
            }
        } catch (error) {
            console.log(error);
            toast.error('Login failed. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Login</h2>
                <form onSubmit={loginUser}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type='email'
                            placeholder='Enter email'
                            value={data.email}
                            onChange={(e) => setData({ ...data, email: e.target.value })}
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type='password'
                            placeholder='Enter password'
                            value={data.password}
                            onChange={(e) => setData({ ...data, password: e.target.value })}
                        />
                    </div>

                    <button type='submit'>Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
