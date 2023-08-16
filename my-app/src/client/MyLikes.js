import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {  unlikeProduct, likeProduct, getUserLikes, getCurrentUser } from './api.js';

function MyLikes() {
  const [likes, setLikes] = useState([]);
  const [likedProducts, setLikedProducts] = useState({});

  const handleToggleLike = async (id) => {
    try {
      if (likedProducts[id]) {
        await unlikeProduct(id);
        setLikedProducts({ ...likedProducts, [id]: false });
      } else {
        await likeProduct(id);
        setLikedProducts({ ...likedProducts, [id]: true });
      }
      fetchLikes();
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const fetchLikes = async () => {
    try {
      const user = await getCurrentUser();
      const userLikes = await getUserLikes(user.id);
      setLikes(userLikes);

      // Initialize the likedProducts state based on user's likes
      const likedProductsMap = {};
      userLikes.forEach(like => {
        likedProductsMap[like.product.id] = true;
      });
      setLikedProducts(likedProductsMap);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLikes();
  }, []);

  return (
    <div>
      <h2>My Likes</h2>
      <h2><Link to="/Dashboard">Back to The Music</Link></h2>
      <ul>
        {likes.map(like => (
          <li key={like.id}>
            <p>{like.product.name}</p>
            <p>{like.product.description}</p>
            <p>{like.product.price}</p>
            <button onClick={() => handleToggleLike(like.id)}>
              {likedProducts[like.id] ? 'Unlike' : 'Like'} {/* Change button text based on like state */}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyLikes;
