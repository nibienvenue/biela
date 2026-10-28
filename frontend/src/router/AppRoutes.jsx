import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import EmployeeInsertPage from '../pages/employees/EmployeeInsertPage';
import DepartmentInsertPage from '../pages/departments/DepartmentInsertPage';
import SalaryPayrollPage from '../pages/salary/SalaryPayrollPage';
import ParkingSalesPage from '../pages/parking/ParkingSalesPage';
import ReportsPage from '../pages/reports/ReportsPage';

const RequireAuth = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return null;
    if (!user) return <Navigate to="/login" replace />;
    return children;
};

const RequireRole = ({ allowed, children }) => {
    const { user, loading } = useAuth();
    if (loading) return null;
    if (!user) return <Navigate to="/login" replace />;

    const role = user.role || user?.user?.role;
    const ok = !allowed || allowed.length === 0 || (role && allowed.includes(role));
    if (!ok) return <Navigate to="/reports" replace />;

    return children;
};

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route
                path="/"
                element={
                    <RequireAuth>
                        <Navigate to="/reports" replace />
                    </RequireAuth>
                }
            />

            <Route
                path="/employees"
                element={
                    <RequireAuth>
                        <RequireRole allowed={['ADMIN', 'HR']}> <EmployeeInsertPage /> </RequireRole>
                    </RequireAuth>
                }
            />

            <Route
                path="/departments"
                element={
                    <RequireAuth>
                        <RequireRole allowed={['ADMIN', 'HR']}> <DepartmentInsertPage /> </RequireRole>
                    </RequireAuth>
                }
            />

            <Route
                path="/salary"
                element={
                    <RequireAuth>
                        <RequireRole allowed={['ADMIN', 'HR']}> <SalaryPayrollPage /> </RequireRole>
                    </RequireAuth>
                }
            />

            <Route
                path="/parking-sales"
                element={
                    <RequireAuth>
                        <RequireRole allowed={['ADMIN', 'PARKING']}> <ParkingSalesPage /> </RequireRole>
                    </RequireAuth>
                }
            />

            <Route
                path="/reports"
                element={
                    <RequireAuth>
                        <RequireRole allowed={['ADMIN', 'HR', 'PARKING']}> <ReportsPage /> </RequireRole>
                    </RequireAuth>
                }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}




