import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct } from './api.js';

function ProductDetail() {
  const { id } = useParams();  // Extract the product ID from the URL parameters
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProduct(id);  // Fetch the product details from the API
        setProduct(productData);  // Set the product state
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [id]);  // Depend on the id, so the effect reruns when the id changes

  if (!product) {
    return <p>Loading...</p>;  // Show a loading message while the product details are being fetched
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Description: {product.description}</p>
      <p>Price: ${product.price}</p>
    </div>
  );
}

export default ProductDetail;
