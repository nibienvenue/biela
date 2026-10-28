import { BrowserRouter } from 'react-router-dom';
import AppLayout from './components/Layout/AppLayout';
import AppRoutes from './router/AppRoutes';
import { AuthProvider } from './auth/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppLayout />
        <AppRoutes />

      </BrowserRouter>
    </AuthProvider>
  );
}

