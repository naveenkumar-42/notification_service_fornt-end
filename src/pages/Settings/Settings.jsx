import React, { useState, useEffect } from 'react';
import { Save, AlertCircle, CheckCircle, Bell, Moon, SunMedium, Monitor } from 'lucide-react';
import './Settings.css';

function Settings({ onSettingsChange }) {
  const [settings, setSettings] = useState({
    apiKey: '',
    autoRefreshInterval: 10,
    defaultChannel: 'EMAIL',
    maxRetries: 3,
    enableNotifications: true,
    enableAnalytics: true,
    theme: 'light'
  });

  const [alert, setAlert] = useState(null);
  const [saving, setSaving] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState(Notification?.permission || 'default');

  // Load settings on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('notificationSettings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings((prev) => ({ ...prev, ...parsed }));
      } catch {
        // ignore parse errors
      }
    }
  }, []);

  // Apply theme immediately when changed
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = settings.theme; // e.g. [data-theme="dark"] in global CSS
    if (typeof onSettingsChange === 'function') {
      onSettingsChange(settings);
    }
  }, [settings, onSettingsChange]);

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
    setSettings((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? checked
          : type === 'number'
          ? Number(value || 0)
          : value
    }));
  };

  const handleSave = () => {
    try {
      setSaving(true);
      localStorage.setItem('notificationSettings', JSON.stringify(settings));
      setAlert({ type: 'success', message: 'Settings saved successfully!' });
      setTimeout(() => setAlert(null), 3000);
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to save settings.' });
    } finally {
      setSaving(false);
    }
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

  return (
    <div className="settings-container">
      <div className="page-header">
        <h1>Settings</h1>
        <p>Configure how your notification dashboard behaves.</p>
      </div>

      {alert && (
        <div className={`alert alert-${alert.type}`}>
          <div className="alert-content">
            {alert.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            <span>{alert.message}</span>
          </div>
        </div>
      )}

      <div className="grid-2 settings-grid">
        {/* API Configuration */}
        <div className="card card-elevated">
          <div className="card-header">
            <h2>API Configuration</h2>
            <span className="card-subtitle">Connect your backend services</span>
          </div>
          <div className="card-body">
            <div className="form-group">
              <label htmlFor="apiKey">API Key</label>
              <input
                type="password"
                id="apiKey"
                name="apiKey"
                value={settings.apiKey}
                onChange={handleChange}
                placeholder="Enter your API key"
                className="form-control"
              />
              <small>Stored only in your browser (localStorage). Never share this key.</small>
            </div>

            <div className="form-group">
              <label htmlFor="defaultChannel">Default Channel</label>
              <select
                id="defaultChannel"
                name="defaultChannel"
                value={settings.defaultChannel}
                onChange={handleChange}
                className="form-control"
              >
                <option value="EMAIL">Email</option>
                <option value="SMS">SMS</option>
                <option value="PUSH">Push Notification</option>
                <option value="INAPP">In-App</option>
              </select>
              <small>Used as the default channel in the Send Notification page.</small>
            </div>

            <div className="form-group">
              <label htmlFor="maxRetries">Max Retries</label>
              <input
                type="number"
                id="maxRetries"
                name="maxRetries"
                value={settings.maxRetries}
                onChange={handleChange}
                min="0"
                max="10"
                className="form-control"
              />
              <small>Frontend hint for how many retry attempts you expect per notification.</small>
            </div>
          </div>
        </div>

        {/* Application Settings */}
        <div className="card card-elevated">
          <div className="card-header">
            <h2>Application Settings</h2>
            <span className="card-subtitle">Customize dashboard behavior</span>
          </div>
          <div className="card-body">
            <div className="form-group">
              <label htmlFor="autoRefreshInterval">Auto-Refresh Interval (seconds)</label>
              <input
                type="number"
                id="autoRefreshInterval"
                name="autoRefreshInterval"
                value={settings.autoRefreshInterval}
                onChange={handleChange}
                min="5"
                max="60"
                className="form-control"
              />
              <small>
                Controls how often the History & Analytics pages can refresh in the background.
              </small>
            </div>

            <div className="form-group">
              <label>Theme</label>
              <div className="theme-toggle-group">
                <button
                  type="button"
                  className={`theme-pill ${settings.theme === 'light' ? 'active' : ''}`}
                  onClick={() => setSettings((s) => ({ ...s, theme: 'light' }))}
                >
                  <SunMedium size={16} />
                  <span>Light</span>
                </button>
                <button
                  type="button"
                  className={`theme-pill ${settings.theme === 'dark' ? 'active' : ''}`}
                  onClick={() => setSettings((s) => ({ ...s, theme: 'dark' }))}
                >
                  <Moon size={16} />
                  <span>Dark</span>
                </button>
                <button
                  type="button"
                  className={`theme-pill ${settings.theme === 'auto' ? 'active' : ''}`}
                  onClick={() => setSettings((s) => ({ ...s, theme: 'auto' }))}
                >
                  <Monitor size={16} />
                  <span>Auto</span>
                </button>
              </div>
              <small>Auto will follow your system appearance.</small>
            </div>

            <div className="form-group checkbox">
              <label>
                <input
                  type="checkbox"
                  name="enableNotifications"
                  checked={settings.enableNotifications}
                  onChange={handleChange}
                />
                <span>Enable Browser Notifications</span>
                <span className="notification-status">{renderNotificationStatus()}</span>
              </label>
              {settings.enableNotifications && notificationPermission !== 'granted' && (
                <button
                  type="button"
                  className="btn btn-outline btn-xs"
                  onClick={requestNotificationPermission}
                >
                  <Bell size={14} />
                  Request Permission
                </button>
              )}
              <small>
                When enabled, the app can trigger browser notifications for important events (if allowed).
              </small>
            </div>

            <div className="form-group checkbox">
              <label>
                <input
                  type="checkbox"
                  name="enableAnalytics"
                  checked={settings.enableAnalytics}
                  onChange={handleChange}
                />
                <span>Enable Analytics</span>
              </label>
              <small>
                If disabled, the Analytics page can hide charts or reduce data fetching.
              </small>
            </div>
          </div>
        </div>
      </div>

      <div className="card mt-6">
        <div className="card-header">
          <h2>About</h2>
        </div>
        <div className="card-body">
          <p><strong>Notification Management System</strong></p>
          <p>Version: 1.0.0</p>
          <p>
            A comprehensive notification management platform for sending, tracking,
            and analyzing notifications with rule-based routing and analytics.
          </p>
        </div>
      </div>

      <div className="form-actions mt-6">
        <button
          className="btn btn-primary btn-lg"
          onClick={handleSave}
          disabled={saving}
        >
          <Save size={18} />
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </div>
  );
}

export default Settings;
