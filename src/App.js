import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { SettingsProvider } from './context/SettingsContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import Loading from './components/common/Loading';

import './App.css';
import './theme-override.css';

// Lazy load pages for performance optimization
const Dashboard = lazy(() => import('./pages/Dashboard'));
const SendNotification = lazy(() => import('./pages/SendNotification/SendNotification'));
const History = lazy(() => import('./pages/History/History'));
const Analytics = lazy(() => import('./pages/Analytics/Analytics'));
const Settings = lazy(() => import('./pages/Settings/Settings'));
const Profile = lazy(() => import('./pages/Profile/Profile'));
const Contact = lazy(() => import('./pages/Contact/Contact'));
const Login = lazy(() => import('./pages/Login/Login'));
const Signup = lazy(() => import('./pages/Signup/Signup'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword/ForgotPassword'));

function AppContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  // Check if we are on an auth page
  const isAuthPage = ['/login', '/signup', '/forgot-password'].includes(location.pathname);

  const handleMenuToggle = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  // AUTO CLOSE: Close sidebar when route changes (mobile navigation)
  useEffect(() => {
    // Only apply sidebar logic if not on auth page
    if (isAuthPage) return;

    if (window.innerWidth <= 768) {
      setIsSidebarOpen(false);
    }
  }, [location.pathname, isAuthPage]);

  // Reset sidebar state on window resize (desktop always shows sidebar)
  useEffect(() => {
    const handleResize = () => {
      // Only apply sidebar logic if not on auth page
      if (isAuthPage) return;

      if (window.innerWidth > 768) {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Check initial load

    return () => window.removeEventListener('resize', handleResize);
  }, [isAuthPage]);

  // If we are on an auth page, render just the routes without the dashboard layout
  if (isAuthPage) {
    return (
      <Suspense fallback={<Loading fullScreen />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </Suspense>
    );
  }

  return (
    <div className="app-container">
      {/* Mobile overlay - closes sidebar when clicked */}
      <div
        className={`sidebar-overlay ${isSidebarOpen ? 'visible' : ''}`}
        onClick={handleCloseSidebar}
      />

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} />

      {/* Main content area */}
      <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <Header onMenuToggle={handleMenuToggle} />

        {/* Page content */}
        <div className="page-content">
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/send" element={<SendNotification />} />
              <Route path="/history" element={<History />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/profile" element={<Profile />} />
              {/* Redirect legacy or unknown routes if needed, or keeping them separate */}
            </Routes>
          </Suspense>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <SettingsProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </SettingsProvider>
    </Router>
  );
}

export default App;
