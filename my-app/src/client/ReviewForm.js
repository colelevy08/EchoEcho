import React, { useState } from 'react';
import axios from 'axios';

function ReviewForm() {
  const [product, setProduct] = useState('');
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/reviews', { product, rating, review });
      setMessage(`Review created successfully for product: ${response.data.product}`);
    } catch (error) {
      setMessage('Error creating review');
    }
  };

  return (
    <div className="ReviewForm">
      <form onSubmit={handleSubmit}>
        <label>
          Product:
          <input type="text" value={product} onChange={(e) => setProduct(e.target.value)} required />
        </label>
        <label>
          Rating:
          <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} required />
        </label>
        <label>
          Review:
          <textarea value={review} onChange={(e) => setReview(e.target.value)} required />
        </label>
        <button type="submit">Create Review</button>
      </form>
      {message && <div>{message}</div>}
    </div>
  );
}

export default ReviewForm;
