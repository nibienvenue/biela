import { apiClient } from './client';

// Parking sales endpoints (adjust paths to match your backend)
export function insertParkingSale(payload) {
    return apiClient.post('/parking-sales', payload);
}

export function listParkingSales() {
    return apiClient.get('/parking-sales');
}

