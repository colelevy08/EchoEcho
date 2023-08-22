// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { signUp } from './api.js';  // Import the signUp function from the API

// function UserForm() {
//   // Local states for form inputs
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
  
//   // useNavigate hook for redirecting to other routes
//   let navigate = useNavigate();

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       // Call the signUp API method to create a new user
//       const response = await signUp(username, email, password);
//       console.log('User added:', response.data);
//       // After successfully creating the user, redirect to the login page
//       navigate('/login');
//     } catch (error) {
//       console.error('Error adding user:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Username:
//         <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
//       </label>
//       <label>
//         Email:
//         <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
//       </label>
//       <label>
//         Password:
//         <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
//       </label>
//       <input type="submit" value="Add User" />
//     </form>
//   );
// }

// export default UserForm;
