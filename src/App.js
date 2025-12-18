import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import Dashboard from './pages/Dashboard';
import SendNotification from './pages/SendNotification/SendNotification';
import History from './pages/History/History';
import Analytics from './pages/Analytics/Analytics';
import Settings from './pages/Settings/Settings';
import './App.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleMenuToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleOverlayClick = () => {
    setIsSidebarOpen(false);
  };

  // In your index.js or App.js
if (process.env.NODE_ENV === 'development') {
  const originalError = console.error;
  console.error = (...args) => {
    if (typeof args[0] === 'string' && args[0].includes('Download the React DevTools')) {
      return;
    }
    originalError(...args);
  };
}

  return (
    <Router>
      <div className="app-container">
        <Sidebar isOpen={isSidebarOpen} />
        <div className={`sidebar-overlay ${isSidebarOpen ? 'visible' : ''}`} onClick={handleOverlayClick} />
        <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
          <Header onMenuToggle={handleMenuToggle} />
          <main className="page-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/send" element={<SendNotification />} />
              <Route path="/history" element={<History />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;