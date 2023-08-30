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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Reviews</h1>
      <h2 className="text-lg mb-4"><Link to={`./ReviewForm`} className="text-blue-500">Leave a Review</Link></h2>
      <h2 className="text-lg mb-4"><Link to="/Dashboard" className="text-blue-500">Back to The Music</Link></h2>
      {reviews.map(review => {
        const product = products.find(p => p.id === review.product_id);
        return (
          <div key={review.id} className="border p-4 mb-4">
            <h3 className="text-lg font-semibold">{product ? product.name : 'Product not listed in marketplace'}</h3>
            <p className="text-gray-600">{review.comment}</p>
            <p className="text-yellow-500">Rating: {review.rating}</p>
          </div>
        );
      })}
    </div>
  );
}

export default ReviewList;