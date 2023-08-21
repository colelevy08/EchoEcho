import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from './api.js'; // Import the login function from the API
import { UserContext } from './UserContext.js';  // Import UserContext

function LoginForm() {
  // Local states for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const { setUser } = useContext(UserContext);  // Use UserContext
  
  // useNavigate hook for redirecting to other routes
  let navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        // Call the login API method to authenticate the user
        const user = await login(email, password);
        // Check if user is not undefined before logging and navigating
        if (user) {
            console.log('User logged in:', user);
            setUser(user);  // Set the user state
            // After successfully logging in the user, redirect to the dashboard
            navigate('/Dashboard');
        } else {
            console.log('User logged in: user undefined');
        }
    } catch (error) {
        console.error('Error logging in:', error);
        alert(error.message);  // Show error message to user
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="block mb-4">
        Email:
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-2 border rounded mt-2" />
      </label>
      <label className="block mb-4">
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-2 border rounded mt-2" />
      </label>
      <input type="submit" value="Log In" className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer" />
    </form>
  );
}

export default LoginForm;
