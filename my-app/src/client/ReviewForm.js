import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function ReviewForm() {
  const [productId, setProductId] = useState("");
  const [body, setBody] = useState("");
  const [rating, setRating] = useState("");
  let history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5555/reviews', {
        product_id: productId,
        body,
        rating
      });
      console.log('Review added:', response.data);
      // Redirect to the review list
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
