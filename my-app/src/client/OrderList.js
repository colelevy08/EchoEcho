import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderList = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('/orders');
                setOrders(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchOrders();
    }, []);

    return (
        <ul>
            {orders.map((order) => (
                <li key={order.id}>
                    Order ID: {order.id}, Product ID: {order.product_id}
                </li>
            ))}
        </ul>
    );
};

export default OrderList;
