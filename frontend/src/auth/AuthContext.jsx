import { createContext, useContext, useEffect, useState } from 'react';
import { getMe } from '../api/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        function load() {
            getMe()
                .then((res) => {
                    if (cancelled) return;
                    setUser(res.data?.user ?? res.data);
                })
                .catch(() => {
                    if (cancelled) return;
                    setUser(null);
                })
                .finally(() => {
                    if (cancelled) return;
                    setLoading(false);
                });
        }

        load();

        return () => {
            cancelled = true;
        };
    }, []);

    return <AuthContext.Provider value={{ user, loading, setUser }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}


