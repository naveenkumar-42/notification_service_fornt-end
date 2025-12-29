
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, User } from 'lucide-react';
import NotificationDropdown from '../NotificationDropdown/NotificationDropdown';
import './Header.css';

function Header({ onMenuToggle }) {
  const navigate = useNavigate();

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
        <NotificationDropdown />
        <button className="icon-btn user-btn" onClick={() => navigate('/profile')}>
          <User size={20} />
        </button>
      </div>
    </header>
  );
}

export default Header;