import React, { useEffect, useState } from 'react';
import { getReviews } from './api.js';

function ReviewList() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await getReviews();
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div>
      <h1>Reviews</h1>
      {reviews.map(review => (
        <div key={review.id}>
          <p>{review.body}</p>
          <p>Rating: {review.rating}</p>
        </div>
      ))}
    </div>
  );
}

export default ReviewList;
