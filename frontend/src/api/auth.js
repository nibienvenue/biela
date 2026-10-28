import { apiClient } from './client';

export async function login({ username, password }) {
    // Expected backend contract (adjust if your backend differs):
    // POST /auth/login  { username, password }
    // Response can include { user, token } or rely on cookies.
    return apiClient.post('/auth/login', { username, password });
}

export async function logout() {
    return apiClient.post('/auth/logout');
}

export async function getMe() {
    return apiClient.get('/auth/me');
}

