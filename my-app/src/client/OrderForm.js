import React, { useState } from 'react';
import axios from 'axios';

function OrderForm() {
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/orders', { product, quantity });
      setMessage(`Order created successfully: ${response.data.product}`);
    } catch (error) {
      setMessage('Error creating order');
    }
  };

  return (
    <div className="OrderForm">
      <form onSubmit={handleSubmit}>
        <label>
          Product:
          <input type="text" value={product} onChange={(e) => setProduct(e.target.value)} required />
        </label>
        <label>
          Quantity:
          <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
        </label>
        <button type="submit">Create Order</button>
      </form>
      {message && <div>{message}</div>}
    </div>
  );
}

export default OrderForm;
