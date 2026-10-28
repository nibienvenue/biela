import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, logout } from '../api/auth';
import { useAuth } from '../auth/AuthContext';

// Beginner/simple register UI.
// NOTE: Backend integration is assumed as POST /auth/register.
// If your backend differs, update src/api/auth.js.
export default function RegisterPage() {
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
            // If backend supports auto-login after register, you can adjust.
            // For now we register then login.
            // eslint-disable-next-line no-undef
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || '/api'}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ username, password }),
            });

            if (!res.ok) {
                const data = await res.json().catch(() => null);
                throw new Error(data?.message || 'Register failed');
            }

            // Login after register
            const loginRes = await login({ username, password });
            const nextUser = loginRes.data?.user ?? loginRes.data;
            setUser(nextUser || { username });
            navigate('/reports', { replace: true });
        } catch (err) {
            setError(err?.message || 'Register failed');
        } finally {
            setLoading(false);
        }
    }

    function goToLogin() {
        navigate('/login');
    }

    return (
        <div className="min-h-[70svh] flex items-center justify-center p-4">
            <form
                onSubmit={onSubmit}
                className="w-full max-w-md border border-gray-200 dark:border-gray-800 rounded-xl p-6 bg-white/90 dark:bg-gray-900/50 backdrop-blur"
            >
                <h1 className="text-2xl font-semibold mb-2">Create account</h1>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">Enter username and password</p>

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
                    {loading ? 'Creating...' : 'Create'}
                </button>

                <div className="mt-4 text-center text-sm">
                    <button type="button" className="text-purple-700 hover:underline" onClick={goToLogin}>
                        Already have an account? Login
                    </button>
                </div>
            </form>
        </div>
    );
}

