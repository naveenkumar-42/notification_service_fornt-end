import React, { useState, useEffect, useRef } from 'react';
import { Bell, AlertCircle, Clock, XCircle, CheckCircle, X, Check } from 'lucide-react';
import { notificationAPI } from '../../utils/api';
import './NotificationDropdown.css';

function NotificationDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [readNotifications, setReadNotifications] = useState([]);
    const [loading, setLoading] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        // Load read notifications from localStorage
        const stored = localStorage.getItem('readNotifications');
        if (stored) {
            try {
                setReadNotifications(JSON.parse(stored));
            } catch (e) {
                console.error('Failed to parse read notifications:', e);
            }
        }

        fetchNotifications();
        // Refresh every 30 seconds
        const interval = setInterval(fetchNotifications, 30000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // Close dropdown when clicking outside
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const fetchNotifications = async () => {
        try {
            setLoading(true);
            const response = await notificationAPI.getHistory();
            const data = response.data || [];

            // Filter for QUEUED, PENDING, and FAILED notifications
            const relevantNotifications = data.filter(
                n => n.status === 'QUEUED' || n.status === 'PENDING' || n.status === 'FAILED'
            );

            // Sort by createdAt (most recent first)
            relevantNotifications.sort((a, b) =>
                new Date(b.createdAt) - new Date(a.createdAt)
            );

            setNotifications(relevantNotifications.slice(0, 10)); // Show max 10
        } catch (error) {
            console.error('Failed to fetch notifications:', error);
            setNotifications([]);
        } finally {
            setLoading(false);
        }
    };

    const getNotificationIcon = (status) => {
        switch (status) {
            case 'FAILED':
                return <XCircle size={16} className="status-icon failed" />;
            case 'QUEUED':
                return <Clock size={16} className="status-icon queued" />;
            case 'PENDING':
                return <Clock size={16} className="status-icon pending" />;
            default:
                return <CheckCircle size={16} className="status-icon" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'FAILED':
                return 'failed';
            case 'QUEUED':
                return 'queued';
            case 'PENDING':
                return 'pending';
            default:
                return '';
        }
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        const diffHours = Math.floor(diffMins / 60);
        if (diffHours < 24) return `${diffHours}h ago`;
        const diffDays = Math.floor(diffHours / 24);
        return `${diffDays}d ago`;
    };

    const markAllAsRead = () => {
        const allIds = notifications.map(n => n.id);
        const newReadList = [...new Set([...readNotifications, ...allIds])];
        setReadNotifications(newReadList);
        localStorage.setItem('readNotifications', JSON.stringify(newReadList));
    };

    // Filter out read notifications
    const unreadNotifications = notifications.filter(n => !readNotifications.includes(n.id));
    const unreadCount = unreadNotifications.length;

    return (
        <div className="notification-dropdown" ref={dropdownRef}>
            <button
                className="icon-btn notification-btn"
                onClick={() => setIsOpen(!isOpen)}
            >
                <Bell size={20} />
                {unreadCount > 0 && (
                    <span className="notification-count-badge">{unreadCount > 99 ? '99+' : unreadCount}</span>
                )}
            </button>

            {isOpen && (
                <div className="notification-panel">
                    <div className="notification-header">
                        <div className="notification-title">
                            <AlertCircle size={18} />
                            <h3>Notifications</h3>
                        </div>
                        <div className="notification-header-actions">
                            {unreadNotifications.length > 0 && (
                                <button className="btn-mark-read" onClick={markAllAsRead}>
                                    <Check size={16} />
                                    Mark all as read
                                </button>
                            )}
                            <button className="btn-close" onClick={() => setIsOpen(false)}>
                                <X size={18} />
                            </button>
                        </div>
                    </div>

                    <div className="notification-body">
                        {loading ? (
                            <div className="notification-loading">
                                <div className="notification-spinner"></div>
                                <p>Loading...</p>
                            </div>
                        ) : unreadNotifications.length === 0 ? (
                            <div className="notification-empty">
                                <CheckCircle size={48} />
                                <h4>All clear!</h4>
                                <p>No pending or failed notifications</p>
                            </div>
                        ) : (
                            <div className="notification-list">
                                {unreadNotifications.map((notification) => (
                                    <div
                                        key={notification.id}
                                        className={`dropdown-notification-item ${getStatusColor(notification.status)}`}
                                    >
                                        <div className="notification-item-icon">
                                            {getNotificationIcon(notification.status)}
                                        </div>
                                        <div className="notification-item-content">
                                            <div className="notification-item-header">
                                                <span className="notification-channel">
                                                    {notification.channel}
                                                </span>
                                                <span className="notification-time">
                                                    {formatTime(notification.createdAt)}
                                                </span>
                                            </div>
                                            <div className="notification-item-subject">
                                                {notification.subject || 'No subject'}
                                            </div>
                                            <div className="notification-item-meta">
                                                <span className={`nd-status-badge ${getStatusColor(notification.status)}`}>
                                                    {notification.status}
                                                </span>
                                                {notification.retryCount > 0 && (
                                                    <span className="nd-retry-badge">
                                                        {notification.retryCount} retries
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="notification-footer">
                        <button className="btn-view-all" onClick={() => window.location.href = '/history'}>
                            View All History
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default NotificationDropdown;
