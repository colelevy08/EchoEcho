import React, { useState, useEffect } from 'react';
import { getAvailableProducts, createOrder } from './api.js'; // Import createOrder too

const Dropdown = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState();
    const [quantity, setQuantity] = useState(1);  // Initialize quantity
    const [message, setMessage] = useState(''); // To show success or error messages
    const [address, setAddress] = useState(''); // Initialize address

    useEffect(() => {
        const fetchProducts = async () => {
            const productsList = await getAvailableProducts();
            setProducts(productsList);
        };
        fetchProducts();
    }, []);

    const handleDropdownChange = (event) => {
        setSelectedProduct(event.target.value);
        alert(JSON.stringify(event.target.value))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Use selectedProduct as the product to be ordered
            const data = await createOrder(selectedProduct, quantity, address); //was undefined becuase this function does not return anythings
            setMessage(`Order created successfully for your product!`);
        } catch (error) {
            setMessage('Error creating order');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                
                <select value={selectedProduct} onChange={handleDropdownChange}>
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
                    />
                </label>

                <label>
                    Address:
                    <input 
                        type="string" 
                        value={address} 
                        onChange={(e) => setAddress(e.target.value)} 
                        required 
                    />
                </label>

                <button type="submit">Create Order</button>  {/* Move button inside form */}

            </form>

            {message && <p>{message}</p>} {/* Display the message */}

        </div>
    );
};

export default Dropdown;
