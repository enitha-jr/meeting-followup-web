import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = () => {
        const values = { username, password, email };
        axios.post("http://localhost:5000/register", values)
        .then((response) => {
            console.log(response);
            navigate('/login');
        })
        .catch((err) => {
            console.log(err);
        })
    }

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            onChange={e => setUsername(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            onChange={e => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            onChange={e => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <button className='reg-btn' type="submit" style={{ padding: '10px 15px', cursor: 'pointer' }}>
          Register
        </button>
      </form>
    </div>
  );
};

export default SignUp;
