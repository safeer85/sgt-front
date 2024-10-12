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
    password: '',
    scienceField: 'Biological Science' // default value
  });

  const registerUser = async (e) => {
    e.preventDefault();
    const { name, email, password, scienceField } = data;
    try {
      const { data } = await axios.post('https://calm-dango-2d9f93.netlify.app/register', {
        name, email, password, scienceField
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({ name: '', email: '', password: '', scienceField: 'Biological Science' });
        toast.success('Registration successful! Welcome!');
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
    }
  };
 
  return (
    <div className='Background'>
    <div className="register-container">
      <form className="register-form" onSubmit={registerUser}>
        <h2>Register</h2>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Science Field</label>
          <select
            value={data.scienceField}
            onChange={(e) => setData({ ...data, scienceField: e.target.value })}
            required
          >
            <option value="Biological Science">Biological Science</option>
            <option value="Physical Science">Physical Science</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
    </div>
  );
};

export default Register;
