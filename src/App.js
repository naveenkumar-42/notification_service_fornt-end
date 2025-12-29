// App.js - Complete file with AUTO sidebar close on mobile navigation
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { SettingsProvider } from './context/SettingsContext.jsx';

import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import Dashboard from './pages/Dashboard';
import SendNotification from './pages/SendNotification/SendNotification';
import History from './pages/History/History';
import Analytics from './pages/Analytics/Analytics';
import Settings from './pages/Settings/Settings';

import './App.css';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';

function AppContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  // Check if we are on an auth page
  const isAuthPage = ['/login', '/signup'].includes(location.pathname);

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
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
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
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/send" element={<SendNotification />} />
            <Route path="/history" element={<History />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
            {/* Redirect legacy or unknown routes if needed, or keeping them separate */}
          </Routes>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <SettingsProvider>
        <AppContent />
      </SettingsProvider>
    </Router>
  );
}

export default App;
