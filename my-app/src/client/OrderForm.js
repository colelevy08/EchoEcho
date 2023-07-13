import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const OrderForm = () => {
    const [productId, setProductId] = useState('');
    let history = useHistory();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/orders', { product_id: productId });
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
