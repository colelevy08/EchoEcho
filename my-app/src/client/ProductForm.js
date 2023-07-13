import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function ProductForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  let history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5555/marketplace', {
        name,
        description,
        price
      });
      console.log('Product added:', response.data);
      // Redirect to the product list
      history.push('/products');
    } catch (error) {
      console.error('Error adding product:', error);
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
      <input type="submit" value="Add Product" />
    </form>
  );
}

export default ProductForm;
