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
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Wishlist</h2>
      <h2 className="text-lg mb-4"><Link to="/Dashboard" className="text-blue-500">Back to The Music</Link></h2>
      <ul>
        {likes.map(like => (
          <li key={like.id} className="border p-4 mb-4">
            <p className="text-lg font-semibold">{like.product.name}</p>
            <p className="text-gray-600">{like.product.description}</p>
            <p className="text-green-500">${like.product.price}</p>
            <button onClick={() => handleToggleLike(like.id)} className={`px-4 py-2 rounded ${likedProducts[like.id] ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}>
              {likedProducts[like.id] ? 'Unlike' : 'Like'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyLikes;