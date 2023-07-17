import React, { useEffect, useState } from 'react';
import { getProduct, getCurrentUser, likeProduct, unlikeProduct } from './api.js';

const ProductDetail = ({ match }) => {
    const [product, setProduct] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const productId = match.params.id;

    useEffect(() => {
        const fetchProductAndUser = async () => {
            try {
                const response = await getProduct(productId);
                setProduct(response.data);
                const user = await getCurrentUser();
                setCurrentUser(user);
                setIsLiked(response.data.liked_by.includes(user.id));
            } catch (error) {
                console.error(error);
            }
        };
        fetchProductAndUser();
    }, [productId]);

    const handleLikeClick = async () => {
        try {
            if (isLiked) {
                await unlikeProduct(product.id);
                setIsLiked(false);
            } else {
                await likeProduct(product.id);
                setIsLiked(true);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return product ? (
        <div>
            <h2>{product.name}</h2>
            <p>Description: {product.description}</p>
            <p>Price: ${product.price}</p>
            <button onClick={handleLikeClick}>{isLiked ? 'Unlike' : 'Like'}</button>
        </div>
    ) : (
        <p>Loading product failed. Please try again.</p>
    );
};

export default ProductDetail;
