import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function UserForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  let history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5555/users', {
        username,
        email
      });
      console.log('User added:', response.data);
      // Redirect to the user list
      history.push('/users');
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <input type="submit" value="Add User" />
    </form>
  );
}

export default UserForm;

