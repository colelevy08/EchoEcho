import React, { useEffect, useState } from 'react';
import { getProductLikes } from './api';

function MyLikes({ productId }) { // Assuming productId is passed as a prop
    const [likes, setLikes] = useState([]);

    useEffect(() => {
        getProductLikes(productId)
            .then(data => setLikes(data))
            .catch(error => console.error(error));
    }, [productId]);

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
