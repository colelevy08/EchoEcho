import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import HomePage from './components/HomePage';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Dashboard from './components/Dashboard';
import UserProfile from './components/UserProfile';
import UserEditForm from './components/UserEditForm';
import FriendsList from './components/FriendsList';
import MessagesList from './components/MessagesList';
import MessageForm from './components/MessageForm';
import Marketplace from './components/Marketplace';
import ProductForm from './components/ProductForm';
import ProductDetails from './components/ProductDetails';
import ProductEditForm from './components/ProductEditForm';
import UserOrders from './components/UserOrders';
import OrderForm from './components/OrderForm';
import OrderDetails from './components/OrderDetails';
import ReviewsList from './components/ReviewsList';
import ReviewForm from './components/ReviewForm';
import ReviewDetails from './components/ReviewDetails';
import ReviewEditForm from './components/ReviewEditForm';
import SearchForm from './components/SearchForm';

axios.defaults.baseURL = 'http://localhost:5000'; // replace with your backend server url

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" component={LoginForm} />
        <Route path="/signup" component={SignupForm} />
        <Route path="/home" component={Dashboard} />
        <Route path="/users/:id" exact component={UserProfile} />
        <Route path="/users/:id/edit" component={UserEditForm} />
        <Route path="/users/:id/friends" component={FriendsList} />
        <Route path="/users/:id/messages" exact component={MessagesList} />
        <Route path="/users/:id/messages/new" component={MessageForm} />
        <Route path="/marketplace" exact component={Marketplace} />
        <Route path="/marketplace/new" component={ProductForm} />
        <Route path="/marketplace/:id" exact component={ProductDetails} />
        <Route path="/marketplace/:id/edit" component={ProductEditForm} />
        <Route path="/orders" exact component={UserOrders} />
        <Route path="/orders/new" component={OrderForm} />
        <Route path="/orders/:id" component={OrderDetails} />
        <Route path="/reviews" exact component={ReviewsList} />
        <Route path="/reviews/new" component={ReviewForm} />
        <Route path="/reviews/:id" exact component={ReviewDetails} />
        <Route path="/reviews/:id/edit" component={ReviewEditForm} />
        <Route path="/search" component={SearchForm} />
        {/* Add more routes as needed */}
      </Switch>
    </Router>
  );
}

export default App;
