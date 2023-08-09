import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct, likeProduct, unlikeProduct } from './api.js';
import { UserContext } from './UserContext';

function ProductDetail() {
  const { id } = useParams();
  console.log(id);
  const [product, setProduct] = useState(null);
  const [liked, setLiked] = useState(false);  // State to keep track of whether the product is liked
  const { user } = useContext(UserContext);  // Access the user state

  const handleLike = async () => {
    try {
      if (liked) {
        // If the product is already liked, unlike it
        await unlikeProduct(id, user.token);  // Pass the user token
        setLiked(false);
      } else {
        // If the product is not liked, like it
        await likeProduct(id, user.token);  // Pass the user token
        setLiked(true);
      }
      // Fetch the product details again to ensure we have the latest data
      const updatedProduct = await getProduct(id);
      setProduct(updatedProduct);
    } catch (error) {
      console.error(error);
    }
};


  useEffect(() => {
    getProduct(id)
      .then(data => {
        setProduct(data.product);
        setLiked(data.liked);  // Set the initial state of whether the product is liked
      })
      .catch(error => console.error(error));
  }, [id]);

  if (!product) {
    return <div>Loading... Please make sure the server is running and properly connected</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>{product.price}</p>
      <button onClick={handleLike}>{liked ? 'Unlike' : 'Like'}</button>  // Change button text based on whether the product is liked
    </div>
  );
}

export default ProductDetail;