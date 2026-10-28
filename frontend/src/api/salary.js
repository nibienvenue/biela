import { apiClient } from './client';

// Salary/Payroll endpoints (adjust paths to match your backend)
export function insertSalary(payload) {
    return apiClient.post('/salary', payload);
}

export function listSalaryByMonth(month) {
    return apiClient.get('/salary', { params: { month } });
}

export function updateSalary(id, payload) {
    return apiClient.put(`/salary/${id}`, payload);
}

export function deleteSalary(id) {
    return apiClient.delete(`/salary/${id}`);
}

