import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext.js';


function HomePage() {
  const { user, setUser } = useContext(UserContext);  // Use UserContext

  const logout = async () => {
    try {
      await logout();  // Call the logout function from the API
      setUser(null);  // Clear the user state
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="text-center p-10">
      <h1 className="text-4xl font-bold mb-4">Welcome to EchoEcho!</h1>
      {user ? (
        <>
          <p className="text-xl mb-2">Let's Jam, {user.username}!</p>
          <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
        </>
      ) : (
        <>
          <Link to="/login" className="text-blue-500 underline mr-4">Login</Link>
          <Link to="/signup" className="text-blue-500 underline">Signup</Link>
        </>
      )}
      <div className="mt-4">
        <Link to="/Dashboard" className="text-blue-500 underline mr-4">Dashboard</Link>
      </div>
    </div>
  );
}

export default HomePage;
