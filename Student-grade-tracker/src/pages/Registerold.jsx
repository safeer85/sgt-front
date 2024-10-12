import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const registerUser = async (e) => {
    e.preventDefault();
    const { name, email, password } = data;
    try {
      const { data } = await axios.post('http://localhost:5000/register', {
        name, email, password
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({ name: '', email: '', password: '' });
        toast.success('Registration successful! Welcome!');
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={registerUser}>
        <h2>Register</h2>
        <div className="form-group">
          <label>Name</label>
          <input
            type='text'
            placeholder='Enter name'
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type='email'
            placeholder='Enter email'
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type='password'
            placeholder='Enter password'
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            required
          />
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}

export default Register;
