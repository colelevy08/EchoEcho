import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from './api.js'; // Import the login function from the API

function LoginForm() {
  // Local states for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // useNavigate hook for redirecting to other routes
  let navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Call the login API method to authenticate the user
      const response = await login(email, password);
      console.log('User logged in:', response.data);
      // After successfully logging in the user, redirect to the home page
      navigate('/');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <input type="submit" value="Log In" />
    </form>
  );
}

export default LoginForm;
