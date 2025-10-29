import axios from 'axios';
const API = axios.create({ baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api' });

export const fetchProducts = () => API.get('/products');
export const fetchCart = () => API.get('/cart');
export const addToCart = (productId, qty=1) => API.post('/cart', { productId, qty });
export const removeFromCart = (productId) => API.delete(`/cart/${productId}`);
export const checkout = (payload) => API.post('/cart/checkout', payload);