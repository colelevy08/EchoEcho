import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from './api.js';

function ProductForm() {
  // Local states for form inputs
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  
  // useNavigate hook for redirecting to other routes
  let history = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Call the createProduct API method to create a new product
      const response = await createProduct({
        name,
        description,
        price
      });
      console.log('Product created:', response.data);
      // After successfully creating the product, redirect to the product list
      history.push('/products');
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
      </label>
      <label>
        Description:
        <input type="text" value={description} onChange={e => setDescription(e.target.value)} />
      </label>
      <label>
        Price:
        <input type="number" value={price} onChange={e => setPrice(e.target.value)} />
      </label>
      <input type="submit" value="Create Product" />
    </form>
  );
}

export default ProductForm;
