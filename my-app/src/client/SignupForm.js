import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from './api.js';

function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  let navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    if (username.length < 3) {
      setError("Username must be at least 3 characters long.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    try {
      await signUp(username, email, password);
      navigate('/login');
    } catch (error) {
      setError(error.message);  // Show error message to user
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} required />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      </label>
      {error && <p>{error}</p>}
      <input type="submit" value="Sign Up" />
    </form>
  );
}

export default SignupForm;
