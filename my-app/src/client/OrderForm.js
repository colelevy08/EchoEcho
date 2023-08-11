import React, { useState } from 'react';

function OrderForm() {
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product, quantity }),
      });
      const data = await response.json();
      setMessage(`Order created successfully: ${data.product}`);
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
        <label> {/* Fixed the closing tag here */}
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
