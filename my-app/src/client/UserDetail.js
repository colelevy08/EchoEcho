import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUser } from './api.js';  // Import the getUser function from API

function UserDetail() {
  const { id } = useParams();  // Extract the user ID from the URL parameters
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser(id);  // Fetch the user details from the API
        setUser(userData);  // Set the user state
        setError(null);
      } catch (error) {
        setError('Error fetching user details');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);  // Depend on the id, so the effect reruns when the id changes

  if (loading) {
    return <p>Loading...</p>;  // Show a loading message while the user details are being fetched
  }

  if (error) {
    return <p>{error}</p>;  // Show error message if there was an error fetching user details
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-100 rounded shadow">
      <h1 className="text-2xl font-bold mb-2">{user.username}</h1>
      <p>Email: {user.email}</p>
      <p>First Name: {user.first_name}</p>
      <p>Last Name: {user.last_name}</p>
      <p>Shipping Address: {user.shipping_address}</p>
    </div>
  );
}

export default UserDetail;
