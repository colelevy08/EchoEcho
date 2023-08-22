import React, { useState, useEffect } from 'react';
import { getAvailableProducts, createReview } from './api.js'; // Make sure to define the createReview function in your API file

function ReviewForm() {
  // Local states for form inputs
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState();
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState(''); // To show success or error messages

  useEffect(() => {
    const fetchProducts = async () => {
        const productsList = await getAvailableProducts();
        setProducts(productsList);
    };
    fetchProducts();
  }, []);
  
  const handleDropdownChange = (event) => {
    setSelectedProduct(event.target.value);
    alert(JSON.stringify(event.target.value))
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Use selectedProduct as the product to be reviewed
      const date_posted = new Date().toISOString(); // Example of adding a date_posted, modify as needed
      const data = await createReview(selectedProduct, rating, comment, date_posted);
      setMessage('Review submitted successfully!');
    } catch (error) {
      setMessage('Error creating review');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <select value={selectedProduct} onChange={handleDropdownChange} className="block w-full p-2 border rounded">
          <option value="">Select a product</option>
          {products.map(product => (
            <option key={product.id} value={product.id}>{product.name}</option>
          ))}
        </select>

        <label className="block">
          Rating:
          <select value={rating} onChange={e => setRating(e.target.value)} className="block w-full p-2 border rounded">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </label>


        <label className="block">
          Comment:
          <textarea value={comment} onChange={e => setComment(e.target.value)} className="block w-full p-2 border rounded" />
        </label>

        <input type="submit" value="Create Review" className="px-4 py-2 bg-blue-500 text-white rounded" />
      </form>

      {message && <p className="text-green-500">{message}</p>}
    </div>
  );
}

export default ReviewForm;
