import React, { useEffect, useState } from 'react';
import { getReviews, getProducts } from './api.js';
import { Link } from 'react-router-dom';

function ReviewList() {
  // Local state for storing the list of reviews and the product being reviewed
  const [reviews, setReviews] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch the list of reviews from the API
    const fetchReviews = async () => {
      try {
        const response = await getReviews();
        setReviews(response);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    // Fetch the reviews
    fetchReviews();
  }, []); // Empty dependency array ensures this useEffect hook runs once on component mount

  useEffect(() => {
    // Fetch the list of products from the API
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    // Fetch the products
    fetchProducts();
  }, []);  // Empty dependency array ensures this useEffect hook runs once on component mount

  return (
    <div>
      <h1>Reviews</h1>
      <h2><Link to={`./ReviewForm`}>Leave a Review</Link></h2>
      <h2><Link to="/Dashboard">Back to The Music</Link></h2> {/* Corrected link */}
      {/* Iterate over each review and display its product, comment, and rating */}
      {reviews.map(review => {
        // Find the corresponding product for the review
        const product = products.find(p => p.id === review.product_id);
        return (
          <div key={review.id}>
            <h3>{product ? product.name : 'Product not found'}</h3> {/* Displaying the product name */}
            <p>{review.comment}</p>
            <p>Rating: {review.rating}</p>
          </div>
        );
      })}
    </div>
  );
}

export default ReviewList;
