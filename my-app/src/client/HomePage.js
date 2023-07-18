import React from 'react';
import { Link } from 'react-router-dom';

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
