import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { setUser, setAdmin } from '../redux/userSlice';

const Register = () => {
  const [formData, setFormData] = useState({ id: '', password: '', isAdmin: false });
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = formData.isAdmin ? 'signupadmin' : 'signup';
      const response = await axios.post(`http://localhost:4555/${endpoint}`, {
        id: formData.id,
        password: formData.password,
      });

      dispatch(setUser(response.data.user));
      if (formData.isAdmin) {
        dispatch(setAdmin(true));
      }

      history.push('/');
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="id"
          value={formData.id}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <label>
          <input
            type="checkbox"
            name="isAdmin"
            checked={formData.isAdmin}
            onChange={handleChange}
          />
          Register as admin
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
