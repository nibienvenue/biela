import axios from 'axios';

// NOTE: Replace VITE_API_BASE_URL with your backend URL.
// Examples:
// - http://localhost:8080/api
// - http://localhost:8080
const baseURL = import.meta.env.VITE_API_BASE_URL || '/api';

export const apiClient = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // supports cookie/session-based auth if backend uses it
});

