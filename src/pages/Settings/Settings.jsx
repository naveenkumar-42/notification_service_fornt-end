import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, AlertCircle, CheckCircle, Bell, Moon, SunMedium, Monitor, Key, Settings as SettingsIcon, Palette, Clock, Mail, Info, LogOut } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import { auth } from '../../firebase/config';
import { signOut } from 'firebase/auth';
import './Settings.css';

function Settings() {
  const { settings, updateSettings } = useSettings();
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);
  const [saving, setSaving] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState(Notification?.permission || 'default');
  const [activeSection, setActiveSection] = useState('api');

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      setAlert({ type: 'error', message: 'Failed to logout. Please try again.' });
      setTimeout(() => setAlert(null), 3000);
    }
  };

  // Browser notification permission initial
  useEffect(() => {
    if (!('Notification' in window)) {
      setNotificationPermission('unsupported');
    } else {
      setNotificationPermission(Notification.permission);
    }
  }, []);

  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
      setNotificationPermission('unsupported');
      setAlert({ type: 'error', message: 'Browser does not support notifications.' });
      return;
    }
    try {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
      if (permission === 'granted') {
        setAlert({ type: 'success', message: 'Browser notifications enabled.' });
      } else if (permission === 'denied') {
        setAlert({ type: 'warning', message: 'Notifications denied in browser settings.' });
      }
    } catch (e) {
      setAlert({ type: 'error', message: 'Failed to request notification permission.' });
    } finally {
      setTimeout(() => setAlert(null), 3000);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    updateSettings({
      [name]:
        type === 'checkbox'
          ? checked
          : type === 'number'
            ? Number(value || 0)
            : value
    });
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setAlert({ type: 'success', message: 'Settings saved successfully!' });
      setSaving(false);
      setTimeout(() => setAlert(null), 3000);
    }, 500);
  };

  const renderNotificationStatus = () => {
    if (notificationPermission === 'granted') {
      return <span className="badge badge-success">Allowed</span>;
    }
    if (notificationPermission === 'denied') {
      return <span className="badge badge-danger">Blocked</span>;
    }
    if (notificationPermission === 'unsupported') {
      return <span className="badge badge-warning">Not supported</span>;
    }
    return <span className="badge badge-info">Not requested</span>;
  };

  const sections = [
    { id: 'api', label: 'API & Integration', icon: Key },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'preferences', label: 'Preferences', icon: SettingsIcon },
    { id: 'about', label: 'About', icon: Info }
  ];

  return (
    <div className="settings-container">
      <div className="page-header">
        <h1>Settings</h1>
        <p>Customize your notification dashboard experience</p>
      </div>

      {alert && (
        <div className={`alert alert-${alert.type}`}>
          <div className="alert-content">
            {alert.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            <span>{alert.message}</span>
          </div>
        </div>
      )}

      <div className="settings-layout">
        {/* Sidebar Navigation */}
        <div className="settings-sidebar">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                className={`settings-nav-item ${activeSection === section.id ? 'active' : ''}`}
                onClick={() => setActiveSection(section.id)}
              >
                <Icon size={18} />
                <span>{section.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="settings-content">
          {/* API Configuration */}
          {activeSection === 'api' && (
            <div className="settings-section fade-in">
              <div className="section-header">
                <Key size={24} />
                <div>
                  <h2>API & Integration</h2>
                  <p>Connect and configure your backend services</p>
                </div>
              </div>

              <div className="settings-group">
                <div className="form-field">
                  <label htmlFor="apiKey">
                    <span className="label-text">API Key</span>
                    <span className="label-badge">Secure</span>
                  </label>
                  <input
                    type="password"
                    id="apiKey"
                    name="apiKey"
                    value={settings.apiKey}
                    onChange={handleChange}
                    placeholder="Enter your API key"
                    className="input-field"
                  />
                  <small>Stored only in your browser (localStorage). Never share this key.</small>
                </div>

                <div className="form-field">
                  <label htmlFor="defaultChannel">
                    <span className="label-text">Default Channel</span>
                  </label>
                  <select
                    id="defaultChannel"
                    name="defaultChannel"
                    value={settings.defaultChannel}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="EMAIL">📧 Email</option>
                    <option value="SMS">💬 SMS</option>
                    <option value="PUSH">🔔 Push Notification</option>
                    <option value="INAPP">📱 In-App</option>
                  </select>
                  <small>Used as the default channel in the Send Notification page.</small>
                </div>

                <div className="form-field">
                  <label htmlFor="maxRetries">
                    <span className="label-text">Max Retries</span>
                  </label>
                  <input
                    type="number"
                    id="maxRetries"
                    name="maxRetries"
                    value={settings.maxRetries}
                    onChange={handleChange}
                    min="0"
                    max="10"
                    className="input-field"
                  />
                  <small>Maximum retry attempts per notification.</small>
                </div>
              </div>
            </div>
          )}

          {/* Appearance */}
          {activeSection === 'appearance' && (
            <div className="settings-section fade-in">
              <div className="section-header">
                <Palette size={24} />
                <div>
                  <h2>Appearance</h2>
                  <p>Customize the look and feel of your dashboard</p>
                </div>
              </div>

              <div className="settings-group">
                <div className="form-field">
                  <label>
                    <span className="label-text">Theme Mode</span>
                  </label>
                  <div className="theme-selector">
                    <button
                      type="button"
                      className={`theme-option ${settings.theme === 'light' ? 'active' : ''}`}
                      onClick={() => updateSettings({ theme: 'light' })}
                    >
                      <SunMedium size={20} />
                      <span>Light</span>
                    </button>
                    <button
                      type="button"
                      className={`theme-option ${settings.theme === 'dark' ? 'active' : ''}`}
                      onClick={() => updateSettings({ theme: 'dark' })}
                    >
                      <Moon size={20} />
                      <span>Dark</span>
                    </button>
                    <button
                      type="button"
                      className={`theme-option ${settings.theme === 'auto' ? 'active' : ''}`}
                      onClick={() => updateSettings({ theme: 'auto' })}
                    >
                      <Monitor size={20} />
                      <span>Auto</span>
                    </button>
                  </div>
                  <small>Auto mode follows your system appearance settings.</small>
                </div>

                <div className="form-field">
                  <label>
                    <span className="label-text">Information Density</span>
                  </label>
                  <div className="density-selector">
                    <button
                      type="button"
                      className={`density-option ${settings.density === 'comfortable' ? 'active' : ''}`}
                      onClick={() => updateSettings({ density: 'comfortable' })}
                    >
                      <div className="density-preview">
                        <div className="line"></div>
                        <div className="line"></div>
                        <div className="line"></div>
                      </div>
                      <span>Comfortable</span>
                    </button>
                    <button
                      type="button"
                      className={`density-option ${settings.density === 'compact' ? 'active' : ''}`}
                      onClick={() => updateSettings({ density: 'compact' })}
                    >
                      <div className="density-preview compact">
                        <div className="line"></div>
                        <div className="line"></div>
                        <div className="line"></div>
                        <div className="line"></div>
                      </div>
                      <span>Compact</span>
                    </button>
                  </div>
                  <small>Adjusts the spacing of lists and tables.</small>
                </div>
              </div>
            </div>
          )}

          {/* Notifications */}
          {activeSection === 'notifications' && (
            <div className="settings-section fade-in">
              <div className="section-header">
                <Bell size={24} />
                <div>
                  <h2>Notifications</h2>
                  <p>Manage browser notifications and alerts</p>
                </div>
              </div>

              <div className="settings-group">
                <div className="toggle-card">
                  <div className="toggle-header">
                    <div>
                      <h3>Browser Notifications</h3>
                      <p>Receive real-time alerts in your browser</p>
                    </div>
                    <label className="switch">
                      <input
                        type="checkbox"
                        name="enableNotifications"
                        checked={settings.enableNotifications}
                        onChange={handleChange}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="toggle-status">
                    <span>Status: {renderNotificationStatus()}</span>
                    {settings.enableNotifications && notificationPermission !== 'granted' && (
                      <button
                        type="button"
                        className="btn-request"
                        onClick={requestNotificationPermission}
                      >
                        <Bell size={16} />
                        Request Permission
                      </button>
                    )}
                  </div>
                </div>

                <div className="toggle-card">
                  <div className="toggle-header">
                    <div>
                      <h3>Analytics Tracking</h3>
                      <p>Enable data collection for analytics</p>
                    </div>
                    <label className="switch">
                      <input
                        type="checkbox"
                        name="enableAnalytics"
                        checked={settings.enableAnalytics}
                        onChange={handleChange}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Preferences */}
          {activeSection === 'preferences' && (
            <div className="settings-section fade-in">
              <div className="section-header">
                <SettingsIcon size={24} />
                <div>
                  <h2>Preferences</h2>
                  <p>Configure dashboard behavior and defaults</p>
                </div>
              </div>

              <div className="settings-group">
                <div className="form-field">
                  <label htmlFor="autoRefreshInterval">
                    <Clock size={16} />
                    <span className="label-text">Auto-Refresh Interval</span>
                  </label>
                  <div className="input-with-unit">
                    <input
                      type="number"
                      id="autoRefreshInterval"
                      name="autoRefreshInterval"
                      value={settings.autoRefreshInterval}
                      onChange={handleChange}
                      min="5"
                      max="60"
                      className="input-field"
                    />
                    <span className="unit">seconds</span>
                  </div>
                  <small>Controls how often the History & Analytics pages refresh.</small>
                </div>

                <div className="form-field">
                  <label htmlFor="dateFormat">
                    <span className="label-text">Date Format</span>
                  </label>
                  <select
                    id="dateFormat"
                    name="dateFormat"
                    value={settings.dateFormat}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="local">📅 Local Time (e.g. 10/24/2024, 2:30 PM)</option>
                    <option value="utc">🌍 UTC (e.g. 2024-10-24 14:30:00 UTC)</option>
                    <option value="relative">⏱️ Relative (e.g. 5 minutes ago)</option>
                  </select>
                  <small>How timestamps are displayed in History and Dashboard.</small>
                </div>

                <div className="form-field">
                  <label htmlFor="emailSignature">
                    <Mail size={16} />
                    <span className="label-text">Default Email Signature</span>
                  </label>
                  <textarea
                    id="emailSignature"
                    name="emailSignature"
                    value={settings.emailSignature}
                    onChange={handleChange}
                    className="input-field"
                    rows="4"
                    placeholder="e.g. Kind Regards,&#10;Support Team"
                  />
                  <small>Automatically appended to email notifications.</small>
                </div>
              </div>
            </div>
          )}

          {/* About */}
          {activeSection === 'about' && (
            <div className="settings-section fade-in">
              <div className="section-header">
                <Info size={24} />
                <div>
                  <h2>About</h2>
                  <p>Application information and version</p>
                </div>
              </div>

              <div className="about-card">
                <div className="about-icon">
                  <Bell size={48} />
                </div>
                <h3>Notification Management System</h3>
                <div className="version-badge">Version 1.0.0</div>
                <p>
                  A comprehensive notification management platform for sending, tracking,
                  and analyzing notifications with rule-based routing and analytics.
                </p>
                <div className="about-features">
                  <div className="feature-tag">Multi-Channel</div>
                  <div className="feature-tag">Real-time Analytics</div>
                  <div className="feature-tag">Smart Routing</div>
                </div>

                {/* Logout Button */}
                <div className="settings-logout-section">
                  <button className="btn-settings-logout" onClick={handleLogout}>
                    <LogOut size={18} />
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fixed Save Bar */}
      <div className="settings-save-bar">
        <div className="save-bar-content">
          <div className="save-info">
            <CheckCircle size={18} />
            <span>All changes are auto-saved</span>
          </div>
          <button
            className="btn-save"
            onClick={handleSave}
            disabled={saving}
          >
            <Save size={18} />
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
