import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

// Import your components here
import Dashboard from './client/Dashboard.js';
import HomePage from './client/HomePage.js';
import LoginForm from './client/LoginForm.js';
import OrderForm from './client/OrderForm.js';
import OrderList from './client/OrderList.js';
import ProductDetail from './client/ProductDetail.js';
import ProductForm from './client/ProductForm.js';
import ProductList from './client/ProductList.js';
import ReviewForm from './client/ReviewForm.js';
import ReviewList from './client/ReviewList.js';
import SignupForm from './client/SignupForm.js';
import UserDetail from './client/UserDetail.js';
import UserForm from './client/UserForm.js';
import UserList from './client/UserList.js';

function App() {
  // Using React hooks to manage the state
  // These states hold the user information and the loading status
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const logoutUser = () => {
    setUser(null); // Clear the user upon logout
  };

  // The useEffect hook runs when the component mounts and fetches the user data
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        // Uncomment this line and make sure the function getUsers exists and is imported from './api'
        // const userData = await getUsers();
        setUser({});
        setError(null);
      } catch (error) {
        setError('Error fetching current user');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []); // Empty dependency array means this effect runs once on component mount

  // Show a loading message if the data is still being fetched
  if (loading) {
    return <p>Loading...</p>;
  }

  // If an error occurred while fetching the data, display the error message
  if (error) {
    return <p>Error: {error}</p>;
  }

  // Render the routes for the application
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/orders" element={<OrderList />} />
        <Route path="/order" element={<OrderForm />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/product/new" element={<ProductForm />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/reviews" element={<ReviewList />} />
        <Route path="/review" element={<ReviewForm />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/user/new" element={<UserForm />} />
        <Route path="/user/:id" element={<UserDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
