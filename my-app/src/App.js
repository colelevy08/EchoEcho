import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import './App.css';

// Import your components here
import Dashboard from './client/Dashboard';
import HomePage from './client/HomePage';
import LoginForm from './client/LoginForm';
import OrderForm from './client/OrderForm';
import OrderList from './client/OrderList';
import ProductDetail from './client/ProductDetail';
import ProductForm from './client/ProductForm';
import ProductList from './client/ProductList';
import ReviewForm from './client/ReviewForm';
import ReviewList from './client/ReviewList';
import SignupForm from './client/SignupForm';
import UserDetail from './client/UserDetail';
import UserForm from './client/UserForm';
import UserList from './client/UserList';

function App() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const API_URL = 'http://localhost:5555';

  // Define your functions for interacting with the backend here
  const getUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/users`);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const addUser = async (username, email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, {
        username,
        email,
        password
      });
      return response.data;
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const loginUser = async (username, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        username,
        password
      });
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const getProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/marketplace`);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const addProduct = async (name, description, price) => {
    try {
      const response = await axios.post(`${API_URL}/marketplace`, {
        name,
        description,
        price
      });
      return response.data;
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const getOrders = async () => {
    try {
      const response = await axios.get(`${API_URL}/orders`);
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const addOrder = async (product_id, quantity) => {
    try {
      const response = await axios.post(`${API_URL}/orders`, {
        product_id,
        quantity
      });
      return response.data;
    } catch (error) {
      console.error('Error adding order:', error);
    }
  };

  const getReviews = async () => {
    try {
      const response = await axios.get(`${API_URL}/reviews`);
      return response.data;
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const addReview = async (product_id, body, rating) => {
    try {
      const response = await axios.post(`${API_URL}/reviews`, {
        product_id,
        body,
        rating
      });
      return response.data;
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  // Get user data when the app loads
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/users/me`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user', error);
        setError('Error fetching user');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Router>
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/login">
          <LoginForm loginUser={loginUser} />
        </Route>
        <Route path="/signup">
          <SignupForm addUser={addUser} />
        </Route>
        <Route path="/orders">
          <OrderList getOrders={getOrders} />
        </Route>
        <Route path="/order">
          <OrderForm addOrder={addOrder} />
        </Route>
        <Route path="/products">
          <ProductList getProducts={getProducts} />
        </Route>
        <Route path="/product/new">
          <ProductForm addProduct={addProduct} />
        </Route>
        <Route path="/product/:id">
          <ProductDetail />
        </Route>
        <Route path="/reviews">
          <ReviewList getReviews={getReviews} />
        </Route>
        <Route path="/review">
          <ReviewForm addReview={addReview} />
        </Route>
        <Route path="/users">
          <UserList getUsers={getUsers} />
        </Route>
        <Route path="/user/new">
          <UserForm addUser={addUser} />
        </Route>
        <Route path="/user/:id">
          <UserDetail />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
