import React, { useState } from 'react';
import './NotificationForm.css';

const NotificationForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    notificationType: 'USER_SIGNUP',
    recipient: '',
    message: '',
  });

  const notificationTypes = ['USER_SIGNUP', 'ORDER_CONFIRMATION', 'PROMOTIONAL', 'ALERT'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      notificationType: 'USER_SIGNUP',
      recipient: '',
      message: '',
    });
  };

  return (
    <div className="notification-form">
      <h2>📝 Send Notification</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="notificationType">Notification Type</label>
          <select
            id="notificationType"
            name="notificationType"
            value={formData.notificationType}
            onChange={handleChange}
            required
          >
            {notificationTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="recipient">Recipient Email</label>
          <input
            id="recipient"
            type="email"
            name="recipient"
            value={formData.recipient}
            onChange={handleChange}
            placeholder="user@example.com"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter your notification message"
            rows="4"
            required
          />
        </div>

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? '⏳ Sending...' : '✉️ Send Notification'}
        </button>
      </form>
    </div>
  );
};

export default NotificationForm;
