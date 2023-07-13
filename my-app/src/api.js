import axios from 'axios';

const API_URL = 'http://localhost:5555';

export function getUsers() {
  return axios.get(`${API_URL}/users`);
}

export function addProduct(product) {
  return axios.post(`${API_URL}/marketplace`, product);
}

export function createReview(review) {
  return axios.post(`${API_URL}/reviews`, review);
}
