import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUsers } from './api.js';

function UserList() {
  // Local state for storing the list of users
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // This function fetches the list of users from the API
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        // Update the users state with the fetched users
        // Set state to response directly, as the API might not return a 'data' field
        setUsers(response);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    // Call the function to fetch the users
    fetchUsers();
  }, []);  // Empty dependency array ensures this useEffect hook runs once on component mount

  return (
    <div>
      <h1>Users</h1>
      <h2><Link to="/Dashboard">Back to The Music</Link></h2> {/* Corrected link */}
      {/* Iterate over each user and display its username and email */}
      {users.map(user => (
        <div key={user.id}>
          <h2><Link to={`/users/${user.id}`}>{user.username}</Link></h2>
          <h3>{user.first_name} {user.last_name}</h3>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
}

export default UserList;
