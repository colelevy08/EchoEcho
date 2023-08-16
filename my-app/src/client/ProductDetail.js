import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct, likeProduct, unlikeProduct } from './api.js';
function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [error, setError] = useState(null); // Add this line to define the error state

  useEffect(() => {
    const fetchProduct = async () => { // Move fetchProduct inside useEffect
      try {
        const productData = await getProduct(id);
        setProduct(productData);
        setError(null); // Reset the error state if successful
      } catch (error) {
        console.error('Error fetching product details:', error);
        setError('Error fetching product details'); // Set the error state if an error occurs
      }
    };

    fetchProduct();
  }, [id]); // No warning now as fetchProduct is defined inside useEffect

  const handleLikeUnlike = async () => {
    try {
      if (isLiked) {
        await unlikeProduct(id);
        console.log('Product unliked');
      } else {
        await likeProduct(id);
        console.log('Product liked');
      }
      setIsLiked(!isLiked);
      await getProduct(id); // Refresh the product data
    } catch (error) {
      console.error('Error liking/unliking product:', error);
      if (error.response && error.response.status === 401) {
        alert('You need to be logged in to like/unlike a product.');
      }
    }
  };

  if (error) {
    return <p>{error}</p>; // Display the error message if there's an error
  }


  return (
    <div>
      <h1>{product.name}</h1>
      <p>Description: {product.description}</p>
      <p>Price: ${product.price}</p>
      <button onClick={handleLikeUnlike}>{isLiked ? 'Unlike' : 'Like'}</button> {/* Toggle button text */}
    </div>
  );
}

export default ProductDetail;
