import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct, likeProduct } from './api.js';  // Make sure to import the likeProduct function

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);  // Error state to handle any errors

  // Function to handle when the like button is clicked
  const handleLike = async () => {
    try {
      await likeProduct(id);  // Call the likeProduct function from the API
      console.log('Product liked');
    } catch (error) {
      console.error('Error liking product:', error);
      if (error.response && error.response.status === 401) {
        alert('You need to be logged in to like a product.');
      }
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProduct(id);
        setProduct(productData);
      } catch (error) {
        console.error('Error fetching product details:', error);
        setError('Error fetching product details');  // Set the error state
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <p>Loading... Check to make sure the code is correctly written</p>;
  }

  if (error) {
    return <p>{error}</p>;  // Display the error message
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Description: {product.description}</p>
      <p>Price: ${product.price}</p>
      <button onClick={handleLike}>Like</button>  {/* Like button */}
    </div>
  );
}

export default ProductDetail;
