import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from './api.js';

function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState(""); // New field
  const [lastName, setLastName] = useState("");  // New field
  const [shippingAddress, setShippingAddress] = useState(""); // New field
  const [error, setError] = useState("");
  
  let navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    // Add validation for new fields if needed
    try {
      await signUp(username, email, password, firstName, lastName, shippingAddress); // Include new fields
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
      <label>
        First Name:
        <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} />
      </label>
      <label>
        Last Name:
        <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} />
      </label>
      <label>
        Shipping Address:
        <input type="text" value={shippingAddress} onChange={e => setShippingAddress(e.target.value)} />
      </label>
      {error && <p>{error}</p>}
      <input type="submit" value="Sign Up" />
    </form>
  );
}

export default SignupForm;
