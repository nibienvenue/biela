import { apiClient } from './client';

// HR endpoints (adjust paths to match your backend)
export function insertEmployee(payload) {
    return apiClient.post('/employees', payload);
}

export function listEmployees() {
    return apiClient.get('/employees');
}

export function insertDepartment(payload) {
    return apiClient.post('/departments', payload);
}

export function listDepartments() {
    return apiClient.get('/departments');
}

