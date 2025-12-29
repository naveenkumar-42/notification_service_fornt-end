
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Send, Clock, BarChart3, Settings } from 'lucide-react';
import './Sidebar.css';

function Sidebar({ isOpen }) {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/send', icon: Send, label: 'Send Notification' },
    { path: '/history', icon: Clock, label: 'History' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/settings', icon: Settings, label: 'Settings' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <div className="logo">
          <Send size={28} />
          <span>Notifications</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <p>© 2024 Notification Manager</p>
      </div>
    </aside>
  );
}

export default Sidebar;