import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const values = { username, password, email };
    axios.post("http://localhost:5000/register", values)
      .then((response) => {
        // console.log(response.data);
        navigate('/login');
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <div className="register-content">
      <div className="register-container">
        <h2 className="register-heading">Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Username:</label>
            <input
              type="text"
              name="username"
              onChange={e => setUsername(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email:</label>
            <input
              type="email"
              name="email"
              onChange={e => setEmail(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password:</label>
            <input
              type="password"
              name="password"
              onChange={e => setPassword(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <button className="reg-btn" type="submit">
            Register
          </button>
        </form>
      </div>
    </div>


  );
};

export default SignUp;
