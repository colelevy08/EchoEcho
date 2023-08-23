import React, { useEffect, useState, useContext, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { unlikeProduct, likeProduct, getUserLikes } from './api.js';
import { UserContext } from './UserContext.js';

function MyLikes() {
  const [likes, setLikes] = useState([]);
  const [likedProducts, setLikedProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);

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

  const fetchLikes = useCallback(async () => {
    setLoading(true);
    try {
      const userId = user.id;
      if (userId) {
        const response = await getUserLikes(userId);
        if (response.message) {
          console.log(response.message);
          setLikes([]);
        } else {
          setLikes(response);
          const likedProductsMap = response.reduce((acc, like) => {
            acc[like.id] = true;
            return acc;
          }, {});
          setLikedProducts(likedProductsMap);
        }
      } else {
        console.error('User ID is undefined');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  }, [user.id]);

  useEffect(() => {
    fetchLikes();
  }, [fetchLikes]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Wishlist</h2>
      <h2 className="text-lg mb-4"><Link to="/Dashboard" className="text-blue-500">Back to The Music</Link></h2>
      <ul>
        {likes.map(like => (
          <li key={like.product.id} className="border p-4 mb-4">
            <h2><Link to={`/products/${like.product.id}`} className="text-blue-500 text-lg font-semibold">{like.product.name}</Link></h2>
            <p className="text-gray-600">{like.product.description}</p>
            <p className="text-green-500">${like.product.price}</p>
            <button onClick={() => handleToggleLike(like.product.id)} className={`px-4 py-2 rounded ${likedProducts[like.product.id] ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}>
              {likedProducts[like.product.id] ? 'Unlike' : 'Like'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyLikes;
