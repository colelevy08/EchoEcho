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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Available Items For Purchase</h1>
      <Link to="/products/create" className="text-blue-500 mb-4">Sell an item</Link>
      <h2 className="text-lg mb-4"><Link to="/Dashboard" className="text-blue-500">Back to The Music</Link></h2>
      {products.map(product => (
        <div key={product.id} className="border p-4 mb-4">
          <h2><Link to={`/products/${product.id}`} className="text-blue-500 text-lg font-semibold">{product.name}</Link></h2>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-green-500">${product.price}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductList;