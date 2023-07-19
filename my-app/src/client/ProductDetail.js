import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct, likeProduct } from './api';  // Make sure to import the likeProduct function

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  // Function to handle when the like button is clicked
  const handleLike = async () => {
    try {
      await likeProduct(id);  // Call the likeProduct function from the API
      console.log('Product liked');
    } catch (error) {
      console.error('Error liking product:', error);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProduct(id);
        setProduct(productData);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <p>Loading...</p>;
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
