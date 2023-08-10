const API_URL = 'http://localhost:5555';

function getJwtPayload(token) {
    if (!token) {
        throw new Error('Token is undefined');
    }
    const parts = token.split('.');
    if (parts.length !== 3) {
        throw new Error('Token is not in the correct format');
    }
    const payloadBase64 = parts[1];
    try {
        const payloadJson = atob(payloadBase64);
        const payload = JSON.parse(payloadJson);
        return payload;
    } catch (error) {
        throw new Error('Error decoding the token payload');
    }
}



async function handleResponse(response) {
    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        const message = `An error has occurred: ${response.status} ${await response.text()}`;
        throw new Error(message);
    }
}

export async function getUsers() {
    const response = await fetch(`${API_URL}/users`);
    return handleResponse(response);
}

export async function getUser(id) {
    const response = await fetch(`${API_URL}/users/${id}`);
    return handleResponse(response);
}

export async function getCurrentUser() {
    const response = await fetch(`${API_URL}/users/current-user`);
    return handleResponse(response);
}

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
    const data = await response.json();
    console.log('Login response:', data); // Log the response

    if (!response.ok) {
        // Handle the error based on the JSON response
        const message = `An error has occurred: ${response.status} ${data.error || 'Unknown error'}`;
        throw new Error(message);
    }

    // Check if access_token is present in the response
    if (!data.access_token) {
        throw new Error('Access token is missing in the response');
    }

    const { access_token } = data;
    localStorage.setItem('access_token', access_token);
    return getJwtPayload(access_token);
}


export function logoutUser() {
    localStorage.removeItem('access_token');
}

export async function logout() {
    logoutUser();
    const response = await fetch(`${API_URL}/logout`);
    return handleResponse(response);
}

export async function updateUser(id, username, email, password) {
    const response = await fetch(`${API_URL}/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
    });
    return handleResponse(response);
}

export async function getProduct(id) {
    const response = await fetch(`${API_URL}/products/${id}`);
    const data = await handleResponse(response);
    console.log(data);
    return data;
}

export async function getProducts() {
    const response = await fetch(`${API_URL}/marketplace`);
    return handleResponse(response);
}
export async function addProduct(name, description, price) {
    const response = await fetch(`${API_URL}/marketplace`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, price })
    });
    return handleResponse(response);
}

export async function updateProduct(id, name, description, price) {
    const response = await fetch(`${API_URL}/marketplace/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, price })
    });
    return handleResponse(response);
}

export async function deleteProduct(id) {
    const response = await fetch(`${API_URL}/marketplace/${id}`, {
        method: 'DELETE'
    });
    return handleResponse(response);
}

export async function getOrders() {
    const response = await fetch(`${API_URL}/orders`);
    return handleResponse(response);
}

export async function addOrder(productId, quantity) {
    const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id: productId, quantity })
    });
    return handleResponse(response);
}

export async function getReviews() {
    const response = await fetch(`${API_URL}/reviews`);
    return handleResponse(response);
}

export async function createReview(review) {
    const response = await fetch(`${API_URL}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review)
    });
    return handleResponse(response);
}

export async function createOrder(orderData) {
    const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
    });
    return handleResponse(response);
}

export async function createProduct(productData) {
    const response = await fetch(`${API_URL}/marketplace`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
    });
    return handleResponse(response);
}
// Function to get product likes for a specific user
export async function getProductLikes(userId, token) {
    const response = await fetch(`${API_URL}/users/${userId}/likes`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    return handleResponse(response);
}

// Function to like a product
export async function likeProduct(productId, token) {
    const response = await fetch(`${API_URL}/products/${productId}/like`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
    });
    return handleResponse(response);
}

// Function to unlike a product
export async function unlikeProduct(productId, token) {
    const response = await fetch(`${API_URL}/products/${productId}/unlike`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    });
    return handleResponse(response);
}

export async function getProductLikesForAllProducts() {
    const response = await fetch(`${API_URL}/products/likes`); // Update this with your actual endpoint
    return handleResponse(response);
}
