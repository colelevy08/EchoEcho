import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        <li><Link to="/products">View Products</Link></li>
        <li><Link to="/reviews">View Reviews</Link></li>
        <li><Link to="/users">View Users</Link></li>
        <li><Link to="/orders">View Orders</Link></li>
      </ul>
    </div>
  );
}

export default Dashboard;
