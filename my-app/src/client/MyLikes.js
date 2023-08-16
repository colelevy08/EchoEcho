// MyLikes.jsx

import React, { useEffect, useState } from 'react';
import { getProductLikes } from './api.js';

function MyLikes() {
    const [likes, setLikes] = useState([]);

    useEffect(() => {
        getProductLikes()
            .then(data => setLikes(data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h2>My Likes</h2>
            <ul>
                {likes.map(like => (
                    <li key={like.id}>
                        <p>{like.productName}</p>
                        <p>{like.description}</p>
                        <p>{like.price}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MyLikes;
