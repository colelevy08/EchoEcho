import React, { useState } from 'react';
import { createProduct } from './api.js'; // Updated function name

function ProductForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await createProduct(name, description, price); // Using the imported function
      setMessage(`Product created successfully: ${data.name}`);
    } catch (error) {
      setMessage('Error creating product');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="block w-full p-2 border rounded" />
        </label>
        <label className="block">
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required className="block w-full p-2 border rounded" />
        </label>
        <label className="block">
          Price:
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required className="block w-full p-2 border rounded" />
        </label>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Create Product</button>
      </form>
      {message && <div className="text-green-500">{message}</div>}
    </div>
  );
}

export default ProductForm;
