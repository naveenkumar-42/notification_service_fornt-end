
import React, { useState } from 'react';
import { Send } from 'lucide-react';
import './QuickSendForm.css';

function QuickSendForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    recipient: '',
    message: '',
    channel: 'EMAIL'
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.recipient || !formData.message) return;
    
    setLoading(true);
    await onSubmit(formData);
    setLoading(false);
    setFormData({ recipient: '', message: '', channel: 'EMAIL' });
  };

  return (
    <form onSubmit={handleSubmit} className="quick-form">
      <div className="form-group">
        <label htmlFor="recipient">Recipient</label>
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
        <label htmlFor="channel">Channel</label>
        <select
          id="channel"
          name="channel"
          value={formData.channel}
          onChange={handleChange}
          className="form-control"
        >
          <option value="EMAIL">Email</option>
          <option value="SMS">SMS</option>
          <option value="PUSH">Push</option>
          <option value="IN_APP">In-App</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="message">Message</label>
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