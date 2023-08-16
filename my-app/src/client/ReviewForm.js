import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createReview } from './api.js'; // Make sure to define the createReview function in your API file

function ReviewForm() {
  // Local states for form inputs
  const [productId, setProductId] = useState("");
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  
  // useNavigate hook for redirecting to other routes
  let history = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Call the createReview API method to create a new review
      const response = await createReview({
        product_id: productId,
        rating,
        comment
      });
      console.log('Review created:', response.data);
      // After successfully creating the review, redirect to the review list
      history.push('/reviews');
    } catch (error) {
      console.error('Error creating review:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Product ID:
        <input type="number" value={productId} onChange={e => setProductId(e.target.value)} />
      </label>
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
  );
}

export default ReviewForm;
