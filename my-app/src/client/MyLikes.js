import React, { useEffect, useState, useContext } from 'react';
import { getProductLikes } from './api.js';
import { UserContext } from './UserContext';  // Import UserContext

function MyLikes() {
    const [likes, setLikes] = useState([]);
    const { user } = useContext(UserContext);  // Access the user state

    useEffect(() => {
        if(user && user.token) {  // Check if user and user.token are not null
            getProductLikes(user.id, user.token)  // Pass the user id and token
                .then(data => setLikes(data))
                .catch(error => console.error(error));
        }
    }, [user]);  // Re-run the effect when user changes
    
    return (
        <div>
            <h1>My Likes</h1>
            {likes.map(product => (
                <div key={product.id}>
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <p>{product.price}</p>
                </div>
            ))}
        </div>
    );
}

export default MyLikes;
