import React, { useState } from 'react';
import './NotificationForm.css';

const NotificationForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    notificationType: 'USER_SIGNUP',
    recipient: '',
    message: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};
    if (!formData.recipient) newErrors.recipient = 'Email is required';
    if (!formData.message) newErrors.message = 'Message is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
    setFormData({
      notificationType: 'USER_SIGNUP',
      recipient: '',
      message: ''
    });
  };

  return (
    <form className="notification-form glass" onSubmit={handleSubmit}>
      <h2>Send Notification</h2>

      <div className="form-group">
        <label htmlFor="type">Notification Type</label>
        <select
          id="type"
          name="notificationType"
          value={formData.notificationType}
          onChange={handleChange}
          className="form-input"
        >
          <option value="USER_SIGNUP">User Signup</option>
          <option value="ORDER_CONFIRMATION">Order Confirmation</option>
          <option value="PROMOTIONAL">Promotional</option>
          <option value="ALERT">Alert</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="email">Recipient Email</label>
        <input
          id="email"
          type="email"
          name="recipient"
          value={formData.recipient}
          onChange={handleChange}
          placeholder="user@example.com"
          className={`form-input ${errors.recipient ? 'error' : ''}`}
        />
        {errors.recipient && <span className="error-text">{errors.recipient}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Enter your notification message..."
          className={`form-input textarea ${errors.message ? 'error' : ''}`}
          rows="4"
        />
        {errors.message && <span className="error-text">{errors.message}</span>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary btn-submit"
      >
        {loading ? '⏳ Sending...' : '📤 Send Notification'}
      </button>
    </form>
  );
};

export default NotificationForm;
