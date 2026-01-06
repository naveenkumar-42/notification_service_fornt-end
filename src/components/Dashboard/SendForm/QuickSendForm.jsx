
import React, { useState } from 'react';
import { Send } from 'lucide-react';
import './QuickSendForm.css';

function QuickSendForm({ onSubmit, isReadOnly }) {
  const [formData, setFormData] = useState({
    notificationType: 'ALERT',
    recipient: '',
    message: '',
    channel: 'EMAIL',
    priority: 'MEDIUM'
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear alert when user starts typing
    if (alert) setAlert(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert(null);

    if (isReadOnly) {
      setAlert({
        type: 'error',
        message: "Action Denied: You do not have permission to send notifications.",
        isPopup: true
      });
      // Clear popup after 3 seconds
      setTimeout(() => setAlert(null), 3000);
      return;
    }

    if (!formData.recipient || !formData.message) {
      setAlert({ type: 'error', message: 'Please fill in all required fields' });
      return;
    }

    setLoading(true);
    try {
      await onSubmit(formData);
      // Reset form on success
      setFormData({
        notificationType: 'ALERT',
        recipient: '',
        message: '',
        channel: 'EMAIL',
        priority: 'MEDIUM'
      });
      setAlert({ type: 'success', message: 'Notification sent successfully!' });
      setTimeout(() => setAlert(null), 3000);
    } catch (err) {
      setAlert({ type: 'error', message: err.message || 'Failed to send notification' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="quick-form">
      {alert && (
        <div className={`alert alert-${alert.type} ${alert.isPopup ? 'popup-alert' : ''}`}>
          {alert.message}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="recipient">Recipient *</label>
        <input
          type="text"
          id="recipient"
          name="recipient"
          value={formData.recipient}
          onChange={handleChange}
          placeholder="Email or phone"
          className="form-control"
          required
        />
      </div>

      <div className="form-group">
        <label>Channel *</label>
        <div className="channel-group">
          {['EMAIL', 'SMS', 'PUSH', 'IN_APP'].map(ch => (
            <button
              key={ch}
              type="button"
              className={`channel-btn ${formData.channel === ch ? 'active' : ''}`}
              onClick={() => handleChange({ target: { name: 'channel', value: ch } })}
            >
              {ch === 'IN_APP' ? 'In-App' : ch.charAt(0) + ch.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {/* <div className="form-group">
        <label htmlFor="priority">Priority *</label>
        <select
          id="priority"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="form-control"
          required
        >
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
          <option value="URGENT">Urgent</option>
        </select>
      </div> */}

      <div className="form-group">
        <label htmlFor="message">Message *</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Type your message..."
          className="form-control"
          rows="4"
          required
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        disabled={loading}
      >
        <Send size={16} />
        {loading ? 'Sending...' : 'Send Quick'}
      </button>
    </form>
  );
}

export default QuickSendForm;