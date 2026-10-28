import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth';
import { useAuth } from '../auth/AuthContext';

export default function LoginPage() {
    const navigate = useNavigate();
    const { setUser } = useAuth();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function onSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await login({ username, password });
            const nextUser = res.data?.user ?? res.data;
            setUser(nextUser || { username });
            navigate('/reports', { replace: true });
        } catch (err) {
            setError(err?.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-[70svh] flex items-center justify-center p-4">
            <form
                onSubmit={onSubmit}
                className="w-full max-w-md border border-gray-200 dark:border-gray-800 rounded-xl p-6 bg-white/90 dark:bg-gray-900/50 backdrop-blur"
            >
                <h1 className="text-2xl font-semibold mb-2">Login</h1>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">Use your username and password.</p>

                {error ? <div className="mb-4 text-red-600 text-sm">{error}</div> : null}

                <label className="block mb-3">
                    <span className="text-sm">Username</span>
                    <input
                        className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>

                <label className="block mb-5">
                    <span className="text-sm">Password</span>
                    <input
                        type="password"
                        className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-purple-600 text-white py-2.5 font-medium hover:bg-purple-700 disabled:opacity-60"
                >
                    {loading ? 'Signing in...' : 'Login'}
                </button>

                <div className="mt-4 text-center text-sm">
                    <button
                        type="button"
                        className="text-purple-700 hover:underline"
                        onClick={() => navigate('/register')}
                    >
                        Create new account
                    </button>
                </div>
            </form>
        </div>
    );
}

