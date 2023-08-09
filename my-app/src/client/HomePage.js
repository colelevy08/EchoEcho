import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext.js';  // Import UserContext

function HomePage() {
  const { user, setUser } = useContext(UserContext);  // Use UserContext

  const logout = async () => {
    try {
      await logout();  // Call the logout function from the API
      setUser(null);  // Clear the user state
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div>
      <h1>Welcome to the EchoEcho!</h1>
      {user ? (
        <>
          <p>Welcome, {user.username}!</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </>
      )}
      <Link to="/Dashboard">Dashboard</Link>
    </div>
  );
}

export default HomePage;
