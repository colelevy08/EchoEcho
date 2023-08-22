import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
    <div>
    <form onSubmit={handleSubmit} className="space-y-4">
      <label>
        Product ID:
        <input type="number" value={productId} onChange={e => setProductId(e.target.value)} className="block w-full p-2 border rounded" />
      </label>
      <label>
        Review:
        <input type="text" value={body} onChange={e => setBody(e.target.value)} className="block w-full p-2 border rounded" />
      </label>
      <label>
        Rating:
        <input type="number" value={rating} onChange={e => setRating(e.target.value)} className="block w-full p-2 border rounded" />
      </label>
      <input type="submit" value="Add Review" className="px-4 py-2 bg-blue-500 text-white rounded" />
    </form>
    <h2 className="text-lg mb-4"><Link to="/Dashboard" className="text-blue-500">Back to The Music</Link></h2>
    </div>
  );
}

export default ReviewForm;
