
import React, { useState } from 'react';
import { Send, AlertCircle, CheckCircle } from 'lucide-react';
import { notificationAPI } from '../../utils/api';
import './SendNotification.css';

function SendNotification() {
  const [formData, setFormData] = useState({
    notificationType: 'USER_SIGNUP',
    recipient: '',
    channel: 'EMAIL',
    priority: 'MEDIUM',
    message: '',
    subject: '',
    scheduledTime: ''
  });
  
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);

  const notificationTypes = [
    'USER_SIGNUP',
    'ORDER_CONFIRMATION',
    'PAYMENT_SUCCESS',
    'DELIVERY_UPDATE',
    'PROMOTIONAL',
    'REMINDER',
    'ALERT',
    'CUSTOM'
  ];

  const channels = ['EMAIL', 'SMS', 'PUSH', 'IN_APP'];
  const priorities = ['LOW', 'MEDIUM', 'HIGH', 'URGENT'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.recipient || !formData.message) {
      setAlert({ type: 'warning', message: 'Please fill in all required fields' });
      return;
    }

    setLoading(true);
    try {
      const response = await notificationAPI.sendNotification(formData);
      setAlert({ 
        type: 'success', 
        message: `✓ Notification sent successfully!${response.data?.eventId ? ` Event ID: ${response.data.eventId}` : ''}` 
      });
      setFormData({
        notificationType: 'USER_SIGNUP',
        recipient: '',
        channel: 'EMAIL',
        priority: 'MEDIUM',
        message: '',
        subject: '',
        scheduledTime: ''
      });
      setTimeout(() => setAlert(null), 5000);
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to send notification. Please check your connection and try again.';
      setAlert({ 
        type: 'error', 
        message: errorMessage
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="send-notification-container">
      <div className="page-header">
        <h1>Send Notification</h1>
        <p>Create and send notifications to your users with advanced options.</p>
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
            <h2>Notification Details</h2>
          </div>
          <form onSubmit={handleSubmit} className="card-body form">
            <div className="form-group">
              <label htmlFor="notificationType">Notification Type *</label>
              <select
                id="notificationType"
                name="notificationType"
                value={formData.notificationType}
                onChange={handleChange}
                className="form-control"
              >
                {notificationTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="channel">Channel *</label>
              <select
                id="channel"
                name="channel"
                value={formData.channel}
                onChange={handleChange}
                className="form-control"
              >
                {channels.map(channel => (
                  <option key={channel} value={channel}>{channel}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="priority">Priority *</label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="form-control"
              >
                {priorities.map(priority => (
                  <option key={priority} value={priority}>{priority}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="recipient">Recipient (Email/Phone/User ID) *</label>
              <input
                type="text"
                id="recipient"
                name="recipient"
                value={formData.recipient}
                onChange={handleChange}
                placeholder="Enter recipient email or phone"
                className="form-control"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Notification subject"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Enter notification message"
                className="form-control"
                rows="5"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="scheduledTime">Schedule (Optional)</label>
              <input
                type="datetime-local"
                id="scheduledTime"
                name="scheduledTime"
                value={formData.scheduledTime}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-lg"
              disabled={loading}
            >
              <Send size={18} />
              {loading ? 'Sending...' : 'Send Notification'}
            </button>
          </form>
        </div>

        <div className="card">
          <div className="card-header">
            <h2>Preview</h2>
          </div>
          <div className="card-body preview-section">
            <div className="preview-box">
              {formData.subject && (
                <div className="preview-subject">
                  <strong>Subject:</strong> {formData.subject}
                </div>
              )}
              <div className="preview-message">
                {formData.message || 'Your message will appear here...'}
              </div>
              <div className="preview-meta">
                <span className={`priority-badge priority-${formData.priority.toLowerCase()}`}>
                  {formData.priority}
                </span>
                <span className="channel-badge">
                  {formData.channel}
                </span>
              </div>
            </div>

            <div className="info-section">
              <h3>Configuration Summary</h3>
              <ul>
                <li><strong>Type:</strong> {formData.notificationType}</li>
                <li><strong>Channel:</strong> {formData.channel}</li>
                <li><strong>Priority:</strong> {formData.priority}</li>
                <li><strong>Recipient:</strong> {formData.recipient || 'Not set'}</li>
                {formData.scheduledTime && <li><strong>Scheduled:</strong> {new Date(formData.scheduledTime).toLocaleString()}</li>}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SendNotification;