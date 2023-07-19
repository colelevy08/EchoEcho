import React, { useEffect, useState } from 'react';
import { getReviews } from './api.js';

function ReviewList() {
  // Local state for storing the list of reviews
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // This function fetches the list of reviews from the API
    const fetchReviews = async () => {
      try {
        const response = await getReviews();
        // Update the reviews state with the fetched reviews
        // Set state to response directly, as the API might not return a 'data' field
        setReviews(response);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    // Call the function to fetch the reviews
    fetchReviews();
  }, []); // Empty dependency array ensures this useEffect hook runs once on component mount

  return (
    <div>
      <h1>Reviews</h1>
      {/* Iterate over each review and display its body and rating */}
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
