import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'; // CSS import
import { UserProvider } from './client/UserContext.js';
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
import MyLikes from './client/MyLikes.js';

function App() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const logoutUser = () => {
    setUser(null); 
  };

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
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
  }, []); 

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

    return (
    <Router>
      <UserProvider value={{ user, setUser, logoutUser }}> {/* Pass the user context values */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/create" element={<ProductForm />} /> {/* Create product */}
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/orders" element={<OrderList />} />
          <Route path="/orders/create" element={<OrderForm />} /> {/* Create order */}
          <Route path="/reviews" element={<ReviewList />} />
          <Route path="/reviews/create" element={<ReviewForm />} /> {/* Create review */}
          <Route path="/users" element={<UserList />} />
          <Route path="/users/create" element={<UserForm />} />
          <Route path="/users/:id" element={<UserDetail />} />
          <Route path="/my-likes" element={<MyLikes />} />
          <Route path="/orders/OrderForm" element={<OrderForm />} />
          
        </Routes>
      </UserProvider>
    </Router>
    );
  }
    
  export default App;
