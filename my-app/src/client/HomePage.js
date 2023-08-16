import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // CSS import
import { UserContext } from './UserContext.js';


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
      <Link to="/Dashboard">Groove</Link>
    </div>
  );
}

export default HomePage;
