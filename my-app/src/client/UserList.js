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
      <div className="max-w-lg mx-auto p-4 bg-gray-100 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Users</h1>
        <h2><Link to="/Dashboard" className="text-blue-500 underline">Back to The Music</Link></h2>
        {users.map(user => (
          <div key={user.id} className="border-b pb-2 mb-2">
            <h2><Link to={`/users/${user.id}`} className="text-blue-500 underline">{user.username}</Link></h2>
            <h3 className="text-lg">{user.first_name} {user.last_name}</h3>
            <p className="text-gray-600">{user.email}</p>
          </div>
        ))}
      </div>
    );
  }
  
  export default UserList;
  
