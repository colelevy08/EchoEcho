// Define the base URL for the API
const API_URL = 'http://localhost:5555';

// Helper function to handle responses from fetch requests
// If the response is OK, it will return the JSON data
// If not, it will throw an error with the status code
async function handleResponse(response) {
    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        const message = `An error has occurred: ${response.status}`;
        throw new Error(message);
    }
}

// Function to get all users
// It fetches the users from the API and then uses the handleResponse function to return the data or throw an error
export async function getUsers() {
    const response = await fetch(`${API_URL}/users`);
    return handleResponse(response);
}

// Function to get a specific user by id
export async function getUser(id) {
    const response = await fetch(`${API_URL}/users/${id}`);
    return handleResponse(response);
}

// Function to get the current user
export async function getCurrentUser() {
    const response = await fetch(`${API_URL}/users/current-user`);
    return handleResponse(response);
}

// Function to sign up a new user
// It sends a POST request with the username, email, and password as JSON in the body
export async function signUp(username, email, password) {
    const response = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
    });
    if (!response.ok) {
        const message = `An error has occurred: ${response.status} ${await response.text()}`;
        throw new Error(message);
    }
    return response.json();
}

export async function login(email, password) {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    return handleResponse(response);
}

// Function to log out a user
export async function logout() {
    const response = await fetch(`${API_URL}/logout`);
    return handleResponse(response);
}

// Function to update a user's information
// It sends a PATCH request with the new username, email, and password as JSON in the body
export async function updateUser(id, username, email, password) {
    const response = await fetch(`${API_URL}/users/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
    });
    return handleResponse(response);
}

// Function to get a specific product by id
export async function getProduct(id) {
    const response = await fetch(`${API_URL}/products/${id}`);
    return handleResponse(response);
}

// Function to like a product
// It sends a POST request to the like endpoint of a specific product
export async function likeProduct(id) {
    const response = await fetch(`${API_URL}/products/${id}/like`, {
        method: 'POST',
    });
    return handleResponse(response);
}

// Function to unlike a product
// It sends a POST request to the unlike endpoint of a specific product
export async function unlikeProduct(id) {
    const response = await fetch(`${API_URL}/products/${id}/unlike`, {
        method: 'POST',
    });
    return handleResponse(response);
}

// Function to get all products in the marketplace
export async function getProducts() {
    const response = await fetch(`${API_URL}/marketplace`);
    return handleResponse(response);
}

// Function to add a product to the marketplace
// It sends a POST request with the product's name, description, and price as JSON in the body
export async function addProduct(name, description, price) {
    const response = await fetch(`${API_URL}/marketplace`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, price })
    });
    return handleResponse(response);
}

// Function to update a product's information
// It sends a PATCH request with the new name, description, and price as JSON in the body
export async function updateProduct(id, name, description, price) {
    const response = await fetch(`${API_URL}/marketplace/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, price })
    });
    return handleResponse(response);
}

// Function to delete a product from the marketplace
// It sends a DELETE request to the specific product's endpoint
export async function deleteProduct(id) {
    const response = await fetch(`${API_URL}/marketplace/${id}`, {
        method: 'DELETE'
    });
    return handleResponse(response);
}

// Function to get all orders
export async function getOrders() {
    const response = await fetch(`${API_URL}/orders`);
    return handleResponse(response);
}

// Function to add an order
// It sends a POST request with the product id and quantity as JSON in the body
export async function addOrder(productId, quantity) {
    const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id: productId, quantity })
    });
    return handleResponse(response);
}

// Function to get all reviews
export async function getReviews() {
    const response = await fetch(`${API_URL}/reviews`);
    return handleResponse(response);
}

// Function to add a review
// It sends a POST request with the review as JSON in the body
export async function createReview(review) {
    const response = await fetch(`${API_URL}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review)
    });
    return handleResponse(response);
}

// Function to create an order
// It sends a POST request with the order data as JSON in the body
export async function createOrder(orderData) {
    const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
    });
    return handleResponse(response);
}

// Function to create a product
// It sends a POST request with the product data as JSON in the body
export async function createProduct(productData) {
    const response = await fetch(`${API_URL}/marketplace`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
    });
    return handleResponse(response);
}
