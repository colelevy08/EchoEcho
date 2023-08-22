import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getOrders, getAvailableProducts } from './api.js';

function OrderList() {
  // Local state for storing the list of orders and products
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // This function fetches the list of orders from the API
    const fetchOrders = async () => {
      try {
        const response = await getOrders();
        // Update the orders state with the fetched orders
        setOrders(response);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    // Call the function to fetch the orders
    fetchOrders();
  }, []);  // Empty dependency array ensures this useEffect hook runs once on component mount

  useEffect(() => {
    // Fetch the list of products from the API
    const fetchProducts = async () => {
      try {
        const response = await getAvailableProducts(); // Corrected function name
        setProducts(response);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    // Fetch the products
    fetchProducts();
  }, []);  // Empty dependency array ensures this useEffect hook runs once on component mount

    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Orders</h1>
        <h2 className="text-lg mb-4"><Link to={`./OrderForm`} className="text-blue-500">Place an Order</Link></h2>
        <h2 className="text-lg mb-4"><Link to="/Dashboard" className="text-blue-500">Back to The Music</Link></h2>
  
        {orders.map(order => {
          const product = products.find(p => p.id === order.product_id);
  
          return (
            <div key={order.id} className="border p-4 mb-4">
              <h3 className="text-lg font-semibold">Order ID: {order.id}</h3>
              <p>User ID: {order.user_id}</p>
              <p>Product Name: {product ? product.name : 'Product not found'}</p>
              <p>Product ID: {order.product_id}</p>
              <p>Quantity: {order.quantity}</p>
              <p>Status: {order.status}</p>
              <p>Shipping Address: {order.shippingAddress}</p>
            </div>
          );
        })}
      </div>
    );
  }
  
  export default OrderList;
  

