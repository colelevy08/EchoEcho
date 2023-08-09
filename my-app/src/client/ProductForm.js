import React, { useState } from 'react';
import axios from 'axios';

function ProductForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/products', { name, description, price });
      setMessage(`Product created successfully: ${response.data.name}`);
    } catch (error) {
      setMessage('Error creating product');
    }
  };

  return (
    <div className="ProductForm">
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </label>
        <label>
          Price:
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </label>
        <button type="submit">Create Product</button>
      </form>
      {message && <div>{message}</div>}
    </div>
  );
}

export default ProductForm;
