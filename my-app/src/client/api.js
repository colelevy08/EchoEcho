// Define the base URL for the API 
const API_URL = 'http://localhost:5555';

// Helper function to handle responses from fetch requests
async function handleResponse(response) {
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const message = `An error has occurred: ${response.status} ${await response.text()}`;
      throw new Error(message);
    }
  }
  
  // Function to get the current user
  export async function getCurrentUser() {
    const response = await fetch(`${API_URL}/users/current-user`);
    return handleResponse(response) ?? null; // Return null if no user is found
  }
  
// Function to get all users
export async function getUsers() {
    const response = await fetch(`${API_URL}/users`);
    return handleResponse(response);
}

// Function to get a specific user by id
export async function getUser(id) {
    const response = await fetch(`${API_URL}/users/${id}`);
    return handleResponse(response);
}


// Function to sign up a new user
export async function signUp(username, email, password, first_name, last_name, shipping_address) {
    const response = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, first_name, last_name, shipping_address })
    });
    if (!response.ok) {
        const message = `An error has occurred: ${response.status} ${await response.text()}`;
        throw new Error(message);
    }
    return response.json();
}

// Function to log in a user
export async function login(email, password) {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    if (!response.ok) {
        const message = `An error has occurred: ${response.status} ${await response.text()}`;
        throw new Error(message);
    }
    return handleResponse(response);
}

// Function to log out a user
export async function logout() {
    const response = await fetch(`${API_URL}/logout`);
    return handleResponse(response);
}

// Function to update a user's information
export async function updateUser(id, username, email, password) {
    const response = await fetch(`${API_URL}/users/${id}`, {
        method: 'PUT', // Updated to PUT
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
export async function unlikeProduct(id) {
    const response = await fetch(`${API_URL}/products/${id}/unlike`, {
        method: 'POST',
    });
    return handleResponse(response);
}

// Function to get liked products for a specific user
export async function getUserLikes(userId) {
    const response = await fetch(`${API_URL}/user/${userId}/likes`);
    return handleResponse(response);
}



// Function to get all products in the marketplace
export async function getProducts() {
    const response = await fetch(`${API_URL}/products`);
    return handleResponse(response);
}

export async function createProduct(name, description, price) {
    const response = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, price })
    });
    return handleResponse(response);
}


// Function to update a product's information
export async function updateProduct(id, name, description, price) {
    const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'PATCH', // Updated method
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, price })
    });
    return handleResponse(response);
}

// Function to delete a product from the marketplace
export async function deleteProduct(id) {
    const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE' // Updated method
    });
    return handleResponse(response);
}

// Function to get all orders
export async function getOrders() {
    const response = await fetch(`${API_URL}/orders`);
    return handleResponse(response);
}

// Function to get a specific order by id
export async function getOrder(id) {
    const response = await fetch(`${API_URL}/orders/${id}`);
    return handleResponse(response);
}

// Function to create an order
export async function createOrder(productId, quantity, shippingAddress) {
    const userId = getCurrentUser().id ?? 1; // Updated to userId
    const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity, shippingAddress, userId }) // Updated to productId, shippingAddress, userId
    });
    return handleResponse(response);
}

// Function to update an order's information
export async function updateOrder(id, productIds, quantities, shippingAddress) {
    const response = await fetch(`${API_URL}/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productIds, quantities, shippingAddress })
    });
    return handleResponse(response);
}

// Function to delete an order
export async function deleteOrder(id) {
    const response = await fetch(`${API_URL}/orders/${id}`, {
        method: 'DELETE'
    });
    return handleResponse(response);
}

// Function to get all likes for a specific product
export async function getLikes(productId) {
    const response = await fetch(`${API_URL}/products/${productId}/likes`);
    return handleResponse(response);
}


//this is to get total likes for a product not liked by user
// Function to get product likes by product id
export async function getProductLikes(productId) {
    const response = await fetch(`${API_URL}/products/${productId}/likes`);
    return handleResponse(response);
}

// Function to create a review
export async function createReview(productId, rating, comment, date_posted) {
    const userId = getCurrentUser().id ?? 1; // Updated to userId
    const reviewData = { productId, userId, comment, rating, date_posted }; // Constructing the review data object
    const response = await fetch(`${API_URL}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewData) // Passing the review data object
    });
    return handleResponse(response);
}


// Function to get all reviews
export async function getReviews() {
    const response = await fetch(`${API_URL}/reviews`);
    return handleResponse(response);
}

export async function getAvailableProducts() {
   const response = await fetch(`${API_URL}/products`)
    return handleResponse(response)
}

