import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductDetail = ({ match }) => {
    const [product, setProduct] = useState(null);
    const productId = match.params.id;

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`/marketplace/${productId}`);
                setProduct(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchProduct();
    }, [productId]);

    return product ? (
        <div>
            <h2>{product.name}</h2>
            <p>Description: {product.description}</p>
            <p>Price: ${product.price}</p>
        </div>
    ) : (
        <p>Loading...</p>
    );
};

export default ProductDetail;
