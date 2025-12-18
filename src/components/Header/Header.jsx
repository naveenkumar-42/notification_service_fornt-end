
import React from 'react';
import { Menu, Bell, User } from 'lucide-react';
import './Header.css';

function Header({ onMenuToggle }) {
  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-toggle" onClick={onMenuToggle}>
          <Menu size={24} />
        </button>
      </div>

      <div className="header-center">
        <h2>Notification Management System</h2>
      </div>

      <div className="header-right">
        <button className="icon-btn notification-btn">
          <Bell size={20} />
          <span className="badge">3</span>
        </button>
        <button className="icon-btn user-btn">
          <User size={20} />
        </button>
      </div>
    </header>
  );
}

export default Header;