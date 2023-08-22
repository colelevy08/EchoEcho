import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
// import UserForm from './client/UserForm.js';
import UserList from './client/UserList.js';
import MyLikes from './client/MyLikes.js';
import { getCurrentUser } from './client/api.js';

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
        const fetchedUser = await getCurrentUser();
        setUser(fetchedUser);
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
    return <p className="text-center text-lg">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <Router>
      <UserProvider value={{ user, setUser, logoutUser }}>
        <div className="container mx-auto text-center p-10">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/create" element={<ProductForm />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/orders" element={<OrderList />} />
          <Route path="/orders/create" element={<OrderForm />} />
          <Route path="/reviews" element={<ReviewList />} />
          <Route path="/reviews/create" element={<ReviewForm />} />
          <Route path="/users" element={<UserList />} />
          {/* <Route path="/users/create" element={<UserForm />} /> */}
          <Route path="/users/:id" element={<UserDetail />} />
          <Route path="/MyLikes" element={<MyLikes />} />
          <Route path="/orders/OrderForm" element={<OrderForm />} />
          <Route path="/reviews/ReviewForm" element={<ReviewForm />} />
          <Route path="/HomePage" element={<HomePage />} />
        </Routes>
        </div>
      </UserProvider>
    </Router>
  );
}

export default App;
