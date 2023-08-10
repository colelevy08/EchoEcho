import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext.js';  // Import UserContext

function HomePage() {
  const { user, setUser } = useContext(UserContext);  // Use UserContext

  const logout = () => {
    setUser(null);  // Clear the user state
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
      <Link to="/MyLikes">My Likes</Link>
    </div>
  );
}

export default HomePage;
