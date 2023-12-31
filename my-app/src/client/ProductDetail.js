import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct, likeProduct, unlikeProduct } from './api.js';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProduct(id);
        setProduct(productData);
        setLoading(false); // Set loading to false when data is fetched
        setError(null);
      } catch (error) {
        console.error('Error fetching product details:', error);
        setError('Error fetching product details');
        setLoading(false); // Set loading to false even if there's an error
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

  if (loading) {
    return <p>Loading... Please Wait.</p>; // Display loading message while fetching data
  }

  if (error) {
    return <p>{error}</p>; // Display the error message if there's an error
  }


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <p className="text-lg text-gray-600 mb-2">Description: {product.description}</p>
      <p className="text-green-500 mb-4">Price: ${product.price}</p>
      <button onClick={handleLikeUnlike} className={`px-4 py-2 rounded ${isLiked ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}>{isLiked ? 'Unlike' : 'Like'}</button>
    </div>
  );
}

export default ProductDetail;