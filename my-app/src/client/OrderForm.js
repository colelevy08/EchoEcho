import React, { useState, useEffect } from 'react';
import { getAvailableProducts, createOrder } from './api.js';

const OrderForm = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState();
    const [quantity, setQuantity] = useState(1);
    const [message, setMessage] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            const productsList = await getAvailableProducts();
            setProducts(productsList);
        };
        fetchProducts();
    }, []);

    const handleDropdownChange = (event) => {
        setSelectedProduct(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await createOrder(selectedProduct, quantity, address);
            setMessage(`Order created successfully for your product!`);
        } catch (error) {
            setMessage('Error creating order');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <form onSubmit={handleSubmit} className="space-y-4">
                <select value={selectedProduct} onChange={handleDropdownChange} className="block w-full p-2 border rounded">
                    <option value="">Select a product</option>
                    {products.map(product => (
                        <option key={product.id} value={product.id}>{product.name}</option>
                    ))}
                </select>

                <label className="block mb-4">
                    Quantity:
                    <input 
                        type="number" 
                        value={quantity} 
                        onChange={(e) => setQuantity(Number(e.target.value))} 
                        required 
                        className="block w-full p-2 border rounded"
                    />
                </label>

                <label className="block mb-4">
                    Address:
                    <input 
                        type="string" 
                        value={address} 
                        onChange={(e) => setAddress(e.target.value)} 
                        required 
                        className="block w-full p-2 border rounded"
                    />
                </label>

                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Create Order</button>
            </form>

            {message && <p className="text-green-500">{message}</p>}
        </div>
    );
};

export default OrderForm;
