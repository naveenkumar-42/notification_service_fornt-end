
import React, { useState, useEffect } from 'react';
import { Save, AlertCircle, CheckCircle } from 'lucide-react';
import './Settings.css';

function Settings() {
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
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedSettings = localStorage.getItem('notificationSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseInt(value) : value
    }));
  };

  const handleSave = () => {
    try {
      localStorage.setItem('notificationSettings', JSON.stringify(settings));
      setAlert({ type: 'success', message: 'Settings saved successfully!' });
      setSaved(true);
      setTimeout(() => {
        setAlert(null);
        setSaved(false);
      }, 3000);
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to save settings' });
    }
  };

  return (
    <div className="settings-container">
      <div className="page-header">
        <h1>Settings</h1>
        <p>Configure your notification management preferences</p>
      </div>

      {alert && (
        <div className={`alert alert-${alert.type}`}>
          <div className="alert-content">
            {alert.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            <span>{alert.message}</span>
          </div>
        </div>
      )}

      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <h2>API Configuration</h2>
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
              <small>Keep your API key secure and never share it publicly</small>
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
                <option value="IN_APP">In-App</option>
              </select>
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
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2>Application Settings</h2>
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
            </div>

            <div className="form-group">
              <label htmlFor="theme">Theme</label>
              <select
                id="theme"
                name="theme"
                value={settings.theme}
                onChange={handleChange}
                className="form-control"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
              </select>
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
              </label>
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
          <p>A comprehensive notification management platform for sending, tracking, and analyzing notifications.</p>
        </div>
      </div>

      <div className="form-actions mt-6">
        <button 
          className="btn btn-primary btn-lg"
          onClick={handleSave}
        >
          <Save size={18} />
          Save Settings
        </button>
      </div>
    </div>
  );
}

export default Settings;