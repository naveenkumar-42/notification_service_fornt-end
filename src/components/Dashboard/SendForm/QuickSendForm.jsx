
import React, { useState } from 'react';
import { Send } from 'lucide-react';
import './QuickSendForm.css';

function QuickSendForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    notificationType: 'ALERT',
    recipient: '',
    message: '',
    channel: 'EMAIL',
    priority: 'MEDIUM'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    if (!formData.recipient || !formData.message) {
      setError('Please fill in all required fields');
      return;
    }
    
    setLoading(true);
    try {
      await onSubmit(formData);
      // Reset form only on success
      setFormData({ 
        notificationType: 'ALERT',
        recipient: '', 
        message: '', 
        channel: 'EMAIL',
        priority: 'MEDIUM'
      });
    } catch (err) {
      setError(err.message || 'Failed to send notification');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="quick-form">
      {error && (
        <div className="alert alert-error" style={{ marginBottom: '16px', padding: '12px' }}>
          {error}
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
        <label htmlFor="channel">Channel *</label>
        <select
          id="channel"
          name="channel"
          value={formData.channel}
          onChange={handleChange}
          className="form-control"
          required
        >
          <option value="EMAIL">Email</option>
          <option value="SMS">SMS</option>
          <option value="PUSH">Push</option>
          <option value="IN_APP">In-App</option>
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
          required
        >
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
          <option value="URGENT">Urgent</option>
        </select>
      </div>

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