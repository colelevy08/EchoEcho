import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from './api.js';

function ProductList() {
  // Products state which will store the list of products
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // This function is responsible for fetching the list of products from the API
    const fetchProducts = async () => {
      try {
        // Get the list of products
        const response = await getProducts();
        // Update the products state with the fetched products
        // Set state to response directly, as the API might not return a 'data' field
        setProducts(response);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    // Call the function to fetch the products
    fetchProducts();
  }, []);  // The empty dependency array ensures this useEffect hook runs once on component mount

  return (
    <div>
      <h1>Products</h1>
      <Link to="/products/create">Create Product</Link> {/* Link to the ProductForm */}
      {/* Iterate over each product and display its name, description, and price */}
      {products.map(product => (
        <div key={product.id}>
          <h2><Link to={`/products/${product.id}`}>{product.name}</Link></h2>
          <p>{product.description}</p>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
