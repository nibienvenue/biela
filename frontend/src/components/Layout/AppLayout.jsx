import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import { logout } from '../../api/auth';

export default function AppLayout() {
    const navigate = useNavigate();
    const { user } = useAuth();

    const onLogout = () => {
        logout().finally(() => {
            navigate('/login', { replace: true });
        });
    };


    return (
        <div className="min-h-dvh flex flex-col">
            <header className="border-b border-gray-200 dark:border-gray-800">

                <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-purple-600 text-white flex items-center justify-center font-bold">
                            P
                        </div>
                        <div className="leading-tight">
                            <div className="font-semibold">Parking + HR System</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">{user?.username ? user.username : ''}</div>
                        </div>
                    </div>

                    <nav className="hidden md:flex gap-4 text-sm">
                        <Link className="hover:text-purple-600" to="/employees">Employee</Link>
                        <Link className="hover:text-purple-600" to="/departments">Department</Link>
                        <Link className="hover:text-purple-600" to="/salary">Salary Reports</Link>
                        <Link className="hover:text-purple-600" to="/parking-sales">Parking Sales</Link>
                        <Link className="hover:text-purple-600" to="/reports">Monthly Report</Link>
                    </nav>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={onLogout}
                            className="rounded-lg border border-gray-200 dark:border-gray-800 px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                <div className="md:hidden px-4 pb-3">
                    <div className="flex gap-2 overflow-x-auto">
                        <Link className="shrink-0 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-800 text-sm" to="/employees">Employee</Link>
                        <Link className="shrink-0 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-800 text-sm" to="/departments">Department</Link>
                        <Link className="shrink-0 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-800 text-sm" to="/salary">Salary</Link>
                        <Link className="shrink-0 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-800 text-sm" to="/parking-sales">Parking</Link>
                        <Link className="shrink-0 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-800 text-sm" to="/reports">Report</Link>
                    </div>
                </div>
            </header>

            <main className="flex-1">
                <div className="max-w-6xl mx-auto px-4 py-6">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

