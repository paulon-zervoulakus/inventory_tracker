import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LoginPage } from './pages/LoginPage';
import { Dashboard } from './pages/Dashboard';
import { ErrorPage } from './pages/ErrorPage';
import { LoadingSpinner } from './components/ui/LoadingSpinner';

function AppContent() {
  const { user, loading } = useAuth();

  // Handle error route
  if (window.location.pathname === '/auth/error') {
    return <ErrorPage />;
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  return user ? <Dashboard /> : <LoginPage />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
