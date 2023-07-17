import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addProduct } from './api.js';

function ProductForm() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    let history = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await addProduct(name, description, price);
            console.log('Product added:', response.data);
            // Redirect to the product list
            history.push('/products');
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" value={name} onChange={e => setName(e.target.value)} />
            </label>
            <label>
                Description:
                <input type="text" value={description} onChange={e => setDescription(e.target.value)} />
            </label>
            <label>
                Price:
                <input type="number" value={price} onChange={e => setPrice(e.target.value)} />
            </label>
            <input type="submit" value="Add Product" />
        </form>
    );
}

export default ProductForm;
