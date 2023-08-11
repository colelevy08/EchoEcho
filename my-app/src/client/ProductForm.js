import React, { useState } from 'react';
import '../App.css'; // CSS import
import { addProduct } from './api.js'; // Updated function name

function ProductForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await addProduct(name, description, price); // Using the imported function
      setMessage(`Product created successfully: ${data.name}`);
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
