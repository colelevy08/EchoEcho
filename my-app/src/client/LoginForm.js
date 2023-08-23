import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
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
    <div>
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-gray-100 rounded shadow">
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
    <h2 className="text-lg mb-4"><Link to="/HomePage" className="text-blue-500">Cancel</Link></h2>
    </div>
  );
}

export default LoginForm;