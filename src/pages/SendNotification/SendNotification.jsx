import React, { useState } from "react";
import {
  Send,
  AlertCircle,
  CheckCircle2,
  Clock,
  Mail,
  MessageSquare,
  Bell,
  Smartphone,
  Zap,
  Calendar,
  User,
  ArrowLeft,
} from "lucide-react";
import { notificationAPI } from "../../utils/api";
import { useSettings } from "../../context/SettingsContext";
import "./SendNotification.css";

function SendNotification() {
  const { settings } = useSettings();
  const [formData, setFormData] = useState({
    notificationType: "USER_SIGNUP",
    recipient: "",
    channel: settings.defaultChannel || "EMAIL",
    priority: "MEDIUM",
    message: settings.emailSignature ? `\n\n${settings.emailSignature}` : "",
    subject: "",
    scheduledTime: "",
  });

  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);

  const notificationTypes = [
    "ALERT",
    "DELIVERY_DELAYED",
    "DELIVERY_OUT_FOR",
    "EMAIL",
    "LOW_BALANCE_ALERT",
    "ORDER_CONFIRMATION",
    "ORDER_SHIPPED",
    "OTP_VERIFICATION",
    "PASSWORD_RESET",
    "PAYMENT_FAILED",
    "PAYMENT_SUCCESS",
    "PROMO_OFFER",
    "PROMOTIONAL",
    "SYSTEM_ALERT",
    "USER_SIGNUP",
  ];

  const channels = ["EMAIL", "SMS", "PUSH"];
  const priorities = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];

  const getChannelIcon = (channel) => {
    switch (channel) {
      case "EMAIL":
        return <Mail size={16} />;
      case "SMS":
        return <MessageSquare size={16} />;
      case "PUSH":
        return <Bell size={16} />;
      case "INAPP":
        return <Smartphone size={16} />;
      default:
        return <Mail size={16} />;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.recipient || !formData.message) {
      setAlert({
        type: "warning",
        message: "Please fill in all required fields (Recipient & Message).",
      });
      return;
    }

    setLoading(true);
    try {
      // Prepare payload to match backend expectations
      const payload = { ...formData };

      // Backend likely validates 'subject' existence for SMS, so remove it
      if (payload.channel !== 'EMAIL') {
        delete payload.subject;
      }

      // Map recipient to phoneNumber for SMS
      if (payload.channel === 'SMS') {
        payload.phoneNumber = payload.recipient;
      }

      // Ensure null for empty scheduledTime
      if (!payload.scheduledTime) {
        payload.scheduledTime = null;
      }

      const response = await notificationAPI.sendNotification(payload);
      setAlert({
        type: "success",
        message: `Notification queued successfully${response.data?.eventId ? ` (Event ID: ${response.data.eventId})` : ""
          }`,
      });
      // Reset form
      setFormData({
        notificationType: "USER_SIGNUP",
        recipient: "",
        channel: settings.defaultChannel || "EMAIL",
        priority: "MEDIUM",
        message: settings.emailSignature ? `\n\n${settings.emailSignature}` : "",
        subject: "",
        scheduledTime: "",
      });
      setTimeout(() => setAlert(null), 4000);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to send notification. Please try again.";
      setAlert({
        type: "error",
        message: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="send-notification-container">
      <div className="page-header">
        <h1>Send Notification</h1>
        <p>Craft and distribute messages across all channels</p>
      </div>

      {alert && (
        <div className={`alert alert-${alert.type}`}>
          <div className="alert-content">
            {alert.type === "success" ? (
              <CheckCircle2 size={20} />
            ) : (
              <AlertCircle size={20} />
            )}
            <span>{alert.message}</span>
          </div>
        </div>
      )}

      <div className="grid-2 send-grid">
        {/* Left Column: Configuration */}
        <div className="card card-elevated form-card">
          <div className="card-header">
            <h2>Composition</h2>
            <span className="card-subtitle">Configure message details</span>
          </div>

          <form onSubmit={handleSubmit} className="card-body form">
            {/* Channel Selection - Cards */}
            <div className="form-group">
              <label className="section-label">Select Channel</label>
              <div className="channel-grid">
                {channels.map((channel) => (
                  <button
                    key={channel}
                    type="button"
                    className={`channel-card ${formData.channel === channel ? 'active' : ''}`}
                    onClick={() => setFormData(prev => ({ ...prev, channel }))}
                  >
                    <div className="channel-icon-wrapper">
                      {getChannelIcon(channel)}
                    </div>
                    <span className="channel-name">{channel === 'INAPP' ? 'In-App' : channel}</span>
                    {formData.channel === channel && <div className="active-dot" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="notificationType">Type</label>
                <div className="select-wrapper">
                  <select
                    id="notificationType"
                    name="notificationType"
                    value={formData.notificationType}
                    onChange={handleChange}
                    className="form-control"
                  >
                    {notificationTypes.map((type) => (
                      <option key={type} value={type}>
                        {type.replace(/_/g, ' ')}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Priority</label>
                <div className="priority-selector">
                  {priorities.map((p) => (
                    <button
                      key={p}
                      type="button"
                      className={`priority-pill ${formData.priority === p ? `active ${p.toLowerCase()}` : ''}`}
                      onClick={() => setFormData(prev => ({ ...prev, priority: p }))}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="recipient">Recipient</label>
              <input
                type="text"
                id="recipient"
                name="recipient"
                value={formData.recipient}
                onChange={handleChange}
                placeholder="Email, Phone ID, or User UUID"
                className="form-control input-lg"
                required
              />
            </div>

            {formData.channel === 'EMAIL' && (
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Notification Subject Line"
                  className="form-control"
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="message">Message Content</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Type your message here..."
                className="form-control"
                rows="6"
                required
              />
            </div>

            <div className="form-group">
              <label className="section-label">Delivery Preference</label>
              <div className="delivery-toggle">
                <button
                  type="button"
                  className={`toggle-option ${!formData.scheduledTime ? 'active' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, scheduledTime: '' }))}
                >
                  <div className="toggle-icon">
                    <Zap size={18} />
                  </div>
                  <div className="toggle-content">
                    <span className="toggle-title">Send Now</span>
                    <span className="toggle-desc">Dispatch immediately</span>
                  </div>
                  {!formData.scheduledTime && <div className="active-check"><CheckCircle2 size={16} /></div>}
                </button>

                <button
                  type="button"
                  className={`toggle-option ${formData.scheduledTime ? 'active' : ''}`}
                  onClick={() => {
                    // Set a default future time if none exists, e.g., 1 hour from now
                    if (!formData.scheduledTime) {
                      const now = new Date();
                      now.setHours(now.getHours() + 1);
                      // Format to YYYY-MM-DDTHH:mm for datetime-local
                      const defaultTime = now.toISOString().slice(0, 16);
                      setFormData(prev => ({ ...prev, scheduledTime: defaultTime }));
                    }
                  }}
                >
                  <div className="toggle-icon">
                    <Clock size={18} />
                  </div>
                  <div className="toggle-content">
                    <span className="toggle-title">Schedule</span>
                    <span className="toggle-desc">Pick date & time</span>
                  </div>
                  {formData.scheduledTime && <div className="active-check"><CheckCircle2 size={16} /></div>}
                </button>
              </div>

              {formData.scheduledTime && (
                <div className="schedule-input-wrapper slide-down">
                  <label className="sub-label">Select Date & Time</label>
                  <div className="input-with-icon">
                    <span className="input-icon left">
                      <Calendar size={18} />
                    </span>
                    <input
                      type="datetime-local"
                      id="scheduledTime"
                      name="scheduledTime"
                      value={formData.scheduledTime}
                      onChange={handleChange}
                      className="form-control with-left-icon input-lg"
                      min={new Date().toISOString().slice(0, 16)}
                      required={!!formData.scheduledTime}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                <Send size={18} />
                {loading ? "Sending..." : "Send Notification"}
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Preview */}
        <div className="preview-container-sticky">
          <div className="card card-elevated preview-card">
            <div className="card-header">
              <h2>Live Preview</h2>
            </div>
            <div className="card-body preview-area">

              {/* Device Frame */}
              <div className={`device-frame ${formData.channel === 'EMAIL' ? 'browser-frame' : 'mobile-frame'}`}>

                {/* Frame Header */}
                <div className="frame-header">
                  {formData.channel === 'EMAIL' ? (
                    <div className="browser-dots">
                      <span className="dot red"></span>
                      <span className="dot yellow"></span>
                      <span className="dot green"></span>
                    </div>
                  ) : (
                    <span className="notch"></span>
                  )}
                </div>

                {/* Content */}
                <div className="frame-content">
                  {formData.channel === 'EMAIL' ? (
                    <div className="preview-email-dark-wrapper">
                      <div className="preview-brand-header">
                        <h2><span className="preview-brand-accent">Your</span> Brand</h2>
                      </div>
                      <div className="preview-email-card">
                        <div className="preview-gradient-strip"></div>
                        <div className="preview-card-body">
                          <div className="preview-status-badge">
                            {formData.notificationType.replace(/_/g, ' ')}
                          </div>
                          <h1 className="preview-card-headline">New Notification</h1>
                        </div>
                        <div className="preview-message-content">
                          <p className="preview-greeting">Hello,</p>
                          <div className="preview-message-text">
                            {formData.message || "Your message will appear here..."}
                          </div>
                          <div className="preview-metadata-table">
                            <div className="preview-meta-row">
                              <span className="preview-meta-label">Channel</span>
                              <span className="preview-meta-value">EMAIL</span>
                            </div>
                            <div className="preview-meta-row">
                              <span className="preview-meta-label">Event ID</span>
                              <span className="preview-meta-value mono">EVT-Id</span>
                            </div>
                            <div className="preview-meta-row">
                              <span className="preview-meta-label">Time</span>
                              <span className="preview-meta-value">Now</span>
                            </div>
                          </div>
                        </div>
                        <div className="preview-footer">
                          <p>Need help? <a href="#" style={{ color: '#818cf8', textDecoration: 'none' }}>Contact Support</a></p>
                          <p style={{ marginTop: '8px', color: '#64748b' }}>This is an automated message.</p>
                        </div>
                      </div>
                      <div className="preview-copyright">
                        © {new Date().getFullYear()} Your Organization. All rights reserved.
                      </div>
                    </div>
                  ) : formData.channel === 'SMS' ? (
                    <div className="sms-preview-inner">
                      <div className="chat-header">
                        <div className="chat-back"><ArrowLeft size={16} /></div>
                        <div className="chat-avatar"><User size={16} /></div>
                        <div className="chat-contact">
                          <span className="contact-name">System</span>
                          <span className="contact-number">{formData.recipient || "+1 555-0123"}</span>
                        </div>
                      </div>
                      <div className="chat-body">
                        <div className="chat-timestamp">Today 10:42 AM</div>
                        <div className="chat-bubble received">
                          <p>{formData.message || "Your message will appear here..."}</p>
                          <span className="bubble-time">now</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="mobile-preview-inner">
                      <div className="push-notification">
                        <div className="push-icon-area">
                          <div className="push-icon-bg">
                            <Bell size={16} color="white" />
                          </div>
                        </div>
                        <div className="push-content">
                          <div className="push-header-row">
                            <span className="app-name">Notification App</span>
                            <span className="time-now">now</span>
                          </div>
                          <h4 className="push-title">{formData.notificationType.replace(/_/g, ' ')}</h4>
                          <p className="push-message">{formData.message || "New notification received"}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

              </div>

              <div className="preview-summary">
                <div className="summary-row">
                  <span>Recipient</span>
                  <strong>{formData.recipient || "Not set"}</strong>
                </div>
                <div className="summary-row">
                  <span>Priority</span>
                  <span className={`priority-tag ${formData.priority.toLowerCase()}`}>{formData.priority}</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SendNotification;
