import React from 'react';
import { Link } from 'react-router-dom';

// The HomePage component is the landing page of the application
// It includes a welcome message and links to the login, signup, and dashboard pages
function HomePage() {
  return (
    <div>
      <h1>Welcome to the EchoEcho!</h1>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
      <Link to="/Dashboard">Dashboard</Link>
    </div>
  );
}

export default HomePage;
