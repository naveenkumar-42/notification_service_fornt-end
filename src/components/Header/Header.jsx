
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, User } from 'lucide-react';
import { auth } from '../../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import NotificationDropdown from '../NotificationDropdown/NotificationDropdown';
import './Header.css';

function Header({ onMenuToggle }) {
  const navigate = useNavigate();
  const [photoURL, setPhotoURL] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setPhotoURL(user.photoURL);
      } else {
        setPhotoURL(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-toggle" onClick={onMenuToggle}>
          <Menu size={24} />
        </button>
      </div>

      <div className="header-center">
        <h2> Nk's Notification Management System</h2>
      </div>

      <div className="header-right">
        <NotificationDropdown />
        <button className="icon-btn user-btn" onClick={() => navigate('/profile')}>
          {photoURL ? (
            <img
              src={photoURL}
              alt="Profile"
              className="header-profile-img"
            />
          ) : (
            <User size={20} />
          )}
        </button>
      </div>
    </header>
  );
}

export default Header;