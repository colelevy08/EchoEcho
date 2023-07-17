import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUser } from './api.js';  // Import the getUser function from API

function UserDetail() {
  const { id } = useParams();  // Extract the user ID from the URL parameters
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser(id);  // Fetch the user details from the API
        setUser(userData);  // Set the user state
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUser();
  }, [id]);  // Depend on the id, so the effect reruns when the id changes

  if (!user) {
    return <p>Loading...</p>;  // Show a loading message while the user details are being fetched
  }

  return (
    <div>
      <h1>{user.username}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}

export default UserDetail;
