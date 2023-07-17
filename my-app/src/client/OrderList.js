import React, { useEffect, useState } from 'react';
import { getOrders } from './api.js';

const OrderList = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await getOrders();
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
