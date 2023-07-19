import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <ul className="dashboard-links">
        <li><Link className="dashboard-link" to="/products">View Products</Link></li>
        <li><Link className="dashboard-link" to="/reviews">View Reviews</Link></li>
        <li><Link className="dashboard-link" to="/users">View Users</Link></li>
        <li><Link className="dashboard-link" to="/orders">View Orders</Link></li>
      </ul>
    </div>
  );
}

export default Dashboard;
