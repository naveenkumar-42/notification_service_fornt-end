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
      const response = await notificationAPI.sendNotification(formData);
      setAlert({
        type: "success",
        message: `Notification queued successfully${response.data?.eventId ? ` (Event ID: ${response.data.eventId})` : ""
          }`,
      });
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
        <p>
          Craft and send notifications with type, priority, schedule and live
          preview.
        </p>
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
        <div className="card card-elevated">
          <div className="card-header">
            <h2>Notification Details</h2>
            <span className="card-subtitle">
              All fields marked * are required
            </span>
          </div>

          <form onSubmit={handleSubmit} className="card-body form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="notificationType">Notification Type *</label>
                <select
                  id="notificationType"
                  name="notificationType"
                  value={formData.notificationType}
                  onChange={handleChange}
                  className="form-control"
                >
                  {notificationTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="channel">Channel *</label>
                <div className="input-with-icon">
                  <span className="input-icon left">
                    {getChannelIcon(formData.channel)}
                  </span>
                  <select
                    id="channel"
                    name="channel"
                    value={formData.channel}
                    onChange={handleChange}
                    className="form-control with-left-icon"
                  >
                    {channels.map((channel) => (
                      <option key={channel} value={channel}>
                        {channel}
                      </option>
                    ))}
                  </select>
                </div>
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
                  {priorities.map((priority) => (
                    <option key={priority} value={priority}>
                      {priority}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="recipient">
                Recipient (Email / Phone / User ID) *
              </label>
              <input
                type="text"
                id="recipient"
                name="recipient"
                value={formData.recipient}
                onChange={handleChange}
                placeholder="e.g. user@example.com or +91936XXXXXXX"
                className="form-control"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject (Email)</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Welcome to our platform!"
                className="form-control"
              />
              <small className="field-hint">
                If empty, a default subject will be generated from the
                notification type.
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write the notification message..."
                className="form-control"
                rows="5"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="scheduledTime">Schedule (Optional)</label>
              <div className="input-with-icon">
                <span className="input-icon left clock">
                  <Clock size={16} />
                </span>
                <input
                  type="datetime-local"
                  id="scheduledTime"
                  name="scheduledTime"
                  value={formData.scheduledTime}
                  onChange={handleChange}
                  className="form-control with-left-icon"
                />
              </div>
              <small className="field-hint">
                Leave empty to send immediately. If set, notification will be
                queued and sent at the scheduled time.
              </small>
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="btn btn-primary btn-lg"
                disabled={loading}
              >
                <Send size={18} />
                {loading ? "Sending..." : "Send Notification"}
              </button>
            </div>
          </form>
        </div>

        <div className="card card-elevated">
          <div className="card-header">
            <h2>Live Preview</h2>
            <span className="card-subtitle">
              See how your notification will look
            </span>
          </div>
          <div className="card-body preview-section">
            <div className="preview-box email-template-preview">
              <div className="email-outer">
                <div className="email-inner">
                  {/* Header */}
                  <div className="email-header">
                    <h1>Enterprise Notification</h1>
                  </div>

                  {/* Body */}
                  <div className="email-body">
                    <p>Hello,</p>

                    <p className="email-message">
                      {formData.message ||
                        "Your notification message will appear here..."}
                    </p>

                    <hr className="email-divider" />

                    <table className="email-meta">
                      <tbody>
                        <tr>
                          <td className="meta-label">
                            <strong>Notification Type:</strong>
                          </td>
                          <td className="meta-value">
                            {formData.notificationType || "N/A"}
                          </td>
                        </tr>
                        <tr>
                          <td className="meta-label">
                            <strong>Channel:</strong>
                          </td>
                          <td className="meta-value">
                            {formData.channel || "EMAIL"}
                          </td>
                        </tr>
                        <tr>
                          <td className="meta-label">
                            <strong>Subject:</strong>
                          </td>
                          <td className="meta-value">
                            {formData.subject ||
                              `[Notification] ${formData.notificationType || "Update"
                              }`}
                          </td>
                        </tr>
                        <tr>
                          <td className="meta-label">
                            <strong>Recipient:</strong>
                          </td>
                          <td className="meta-value">
                            {formData.recipient || "recipient@example.com"}
                          </td>
                        </tr>
                        {formData.scheduledTime && (
                          <tr>
                            <td className="meta-label">
                              <strong>Scheduled:</strong>
                            </td>
                            <td className="meta-value">
                              {new Date(
                                formData.scheduledTime
                              ).toLocaleString()}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Footer */}
                  <div className="email-footer">
                    <p>This is an automated message. Do not reply.</p>
                  </div>
                </div>

                <p className="email-copyline">
                  © {new Date().getFullYear()} Your Organization. All rights
                  reserved.
                </p>
              </div>
            </div>

            <div className="info-section">
              <h3>Configuration Summary</h3>
              <ul>
                <li>
                  <strong>Type:</strong> {formData.notificationType}
                </li>
                <li>
                  <strong>Channel:</strong> {formData.channel}
                </li>
                <li>
                  <strong>Priority:</strong> {formData.priority}
                </li>
                <li>
                  <strong>Recipient:</strong> {formData.recipient || "Not set"}
                </li>
                {formData.scheduledTime && (
                  <li>
                    <strong>Scheduled:</strong>{" "}
                    {new Date(formData.scheduledTime).toLocaleString()}
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SendNotification;