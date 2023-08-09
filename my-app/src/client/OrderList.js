import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getOrders } from './api.js';

function OrderList() {
  // Local state for storing the list of orders
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // This function fetches the list of orders from the API
    const fetchOrders = async () => {
      try {
        const response = await getOrders();
        // Update the orders state with the fetched orders
        // Set state to response directly, as the API might not return a 'data' field
        setOrders(response);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    // Call the function to fetch the orders
    fetchOrders();
  }, []);  // Empty dependency array ensures this useEffect hook runs once on component mount

  return (
    <div>
      <h1>Orders</h1>
      <h2><Link to={`./OrderForm`}>Place an Order</Link></h2>

      {/* Iterate over each order and display its details */}
      {orders.map(order => (
        <div key={order.id}>
          <p>Product ID: {order.product_id}</p>
          <p>Quantity: {order.quantity}</p>
        </div>
      ))}
    </div>
  );
}

export default OrderList;
