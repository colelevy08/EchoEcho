import React, { useEffect, useState } from 'react';
import { getUserLikes, getCurrentUser } from './api.js';

function MyLikes() {
    const [product, setProducts] = useState([]);
    useEffect(() => {
        getCurrentUser()
        .then((user) => getUserLikes(user.id)
        .then(data => setProducts(data)))
        .catch(error => console.error(error));
    });
    

    return (
        <div>
            <h2>My Likes</h2>
            <ul>
                {product.map(like => (
                    <li key={product.id}>
                        <p>{product.productName}</p>
                        <p>{product.description}</p>
                        <p>{product.price}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MyLikes;
