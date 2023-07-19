import React from 'react';
import { Link } from 'react-router-dom';

// The Dashboard component is a simple navigation menu with links to the various parts of the application
function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        <li><Link to="/products">View Products</Link></li> {/* Link to the products page */}
        <li><Link to="/reviews">View Reviews</Link></li> {/* Link to the reviews page */}
        <li><Link to="/users">View Users</Link></li> {/* Link to the users page */}
        <li><Link to="/orders">View Orders</Link></li> {/* Link to the orders page */}
      </ul>
    </div>
  );
}

export default Dashboard;
