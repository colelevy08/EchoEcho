import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrder } from './api.js';

function OrderForm() {
  // Local states for form inputs
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  
  // useNavigate hook for redirecting to other routes
  let history = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Call the createOrder API method to create a new order
      const response = await createOrder({
        product_id: productId,
        quantity
      });
      console.log('Order created:', response.data);
      // After successfully creating the order, redirect to the order list
      history.push('/orders');
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Product ID:
        <input type="number" value={productId} onChange={e => setProductId(e.target.value)} />
      </label>
      <label>
        Quantity:
        <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} />
      </label>
      <input type="submit" value="Create Order" />
    </form>
  );
}

export default OrderForm;
