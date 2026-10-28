import { apiClient } from './client';

// Reports endpoints (adjust paths to match your backend)
export function payrollReportByMonth(month) {
    return apiClient.get('/reports/payroll', { params: { month } });
}

