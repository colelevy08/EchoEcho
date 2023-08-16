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
    <div>
      <form onSubmit={handleSubmit}>

        <select value={selectedProduct} onChange={handleDropdownChange}>
            <option value="">Select a product</option>
            {products.map(product => (
                <option key={product.id} value={product.id}>{product.name}</option>
            ))}
        </select>

        <label>
          Rating:
          <input type="number" value={rating} onChange={e => setRating(e.target.value)} />
        </label>

        <label>
          Comment:
          <textarea value={comment} onChange={e => setComment(e.target.value)} />
        </label>

        <input type="submit" value="Create Review" />

      </form>

      {message && <p>{message}</p>} {/* Display the message */}

    </div>
  );
}

export default ReviewForm;
