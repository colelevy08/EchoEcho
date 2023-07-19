import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createReview } from './api.js';

function ReviewForm() {
  // Set up local states for form inputs
  const [productId, setProductId] = useState("");
  const [body, setBody] = useState("");
  const [rating, setRating] = useState("");
  
  // useNavigate hook for redirecting to other routes
  let history = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Call the createReview API method to add a new review
      const response = await createReview({
        product_id: productId,
        body,
        rating
      });
      console.log('Review added:', response.data);
      // After successfully adding the review, redirect to the review list
      history.push('/reviews');
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Product ID:
        <input type="number" value={productId} onChange={e => setProductId(e.target.value)} />
      </label>
      <label>
        Review:
        <input type="text" value={body} onChange={e => setBody(e.target.value)} />
      </label>
      <label>
        Rating:
        <input type="number" value={rating} onChange={e => setRating(e.target.value)} />
      </label>
      <input type="submit" value="Add Review" />
    </form>
  );
}

export default ReviewForm;
