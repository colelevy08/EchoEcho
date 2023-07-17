const API_URL = 'http://localhost:5555';

// Helper function to handle responses
async function handleResponse(response) {
    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        const message = `An error has occurred: ${response.status}`;
        throw new Error(message);
    }
}

// Users
export function getUsers() {
    return fetch(`${API_URL}/users`).then(handleResponse);
}

export function getUser(id) {
    return fetch(`${API_URL}/users/${id}`).then(handleResponse);
}


export function getCurrentUser() {
    return fetch(`${API_URL}/users/current-user`).then(handleResponse);
}


export function signUp(username, email, password) {
    return fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
    }).then(handleResponse);
}

export function login(username, password) {
    return fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    }).then(handleResponse);
}

export function logout() {
    return fetch(`${API_URL}/logout`).then(handleResponse);
}

export function updateUser(id, username, email, password) {
    return fetch(`${API_URL}/users/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
    }).then(handleResponse);
}

// Get a single product
export function getProduct(id) {
    return fetch(`${API_URL}/marketplace/${id}`).then(handleResponse);
}

export function likeProduct(id) {
    return fetch(`${API_URL}/products/${id}/like`, {
        method: 'POST',
    }).then(handleResponse);
}

export function unlikeProduct(id) {
    return fetch(`${API_URL}/products/${id}/unlike`, {
        method: 'POST',
    }).then(handleResponse);
}


// Marketplace
export function getProducts() {
    return fetch(`${API_URL}/marketplace`).then(handleResponse);
}

export function addProduct(name, description, price) {
    return fetch(`${API_URL}/marketplace`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, price })
    }).then(handleResponse);
}

export function updateProduct(id, name, description, price) {
    return fetch(`${API_URL}/marketplace/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, price })
    }).then(handleResponse);
}

export function deleteProduct(id) {
    return fetch(`${API_URL}/marketplace/${id}`, {
        method: 'DELETE'
    }).then(handleResponse);
}

// Orders
export function getOrders() {
    return fetch(`${API_URL}/orders`).then(handleResponse);
}

export function addOrder(productId, quantity) {
    return fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id: productId, quantity })
    }).then(handleResponse);
}

// Reviews
export function getReviews() {
    return fetch(`${API_URL}/reviews`).then(handleResponse);
}

export function createReview(review) {
    return fetch(`${API_URL}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review)
    }).then(handleResponse);
}
