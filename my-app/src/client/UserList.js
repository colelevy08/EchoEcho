import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUsers } from './api.js';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Users</h1>
      {users.map(user => (
        <div key={user.id}>
          <h2><Link to={`/user/${user.id}`}>{user.username}</Link></h2>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
}

export default UserList;
