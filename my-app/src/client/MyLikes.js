import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {getProductLikes, unlikeProduct } from './api.js'; // Import unlikeProduct

function MyLikes() {
  const [likes, setLikes] = useState([]);

  // Function to handle when the unlike button is clicked
  const handleUnlike = async (id) => {
    try {
      await unlikeProduct(id); // Call the unlikeProduct function from the API
      console.log('Product unliked');
      fetchLikes(); // Refresh the likes data
    } catch (error) {
      console.error('Error unliking product:', error);
    }
  };

  const fetchLikes = async () => {
    try {
      const data = await getProductLikes();
      setLikes(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserLikes(currentUserId) // Assuming you have the current user's ID
        .then(data => setLikes(data))
        .catch(error => console.error(error));
}, []);

  return (
    <div>
      <h2>My Likes</h2>
      <h2><Link to="/Dashboard">Back to The Music</Link></h2> {/* Corrected link */}
      <ul>
        {likes.map(like => (
          <li key={like.id}>
            <p>{like.product.name}</p>
            <p>{like.product.description}</p>
            <p>{like.product.price}</p>
            <button onClick={() => handleUnlike(like.id)}>Unlike</button> {/* Unlike button */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyLikes;
