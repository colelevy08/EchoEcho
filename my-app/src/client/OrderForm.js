import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addOrder } from './api.js';

const OrderForm = () => {
    const [productId, setProductId] = useState('');
    let history = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await addOrder({ product_id: productId });
            console.log(response.data);
            // Redirect to the order list
            history.push('/orders');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Product ID:
                <input type="text" value={productId} onChange={(e) => setProductId(e.target.value)} />
            </label>
            <button type="submit">Place Order</button>
        </form>
    );
};

export default OrderForm;
