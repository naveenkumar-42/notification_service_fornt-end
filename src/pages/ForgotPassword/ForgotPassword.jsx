import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase/config';
import '../Auth/Auth.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        try {
            setLoading(true);
            await sendPasswordResetEmail(auth, email);
            setMessage('Password reset email sent! Check your inbox.');
        } catch (err) {
            console.error('Reset Password Error:', err);
            setError(err.message.replace('Firebase: ', ''));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-split-container">
            {/* Visual Side */}
            <div className="auth-visual-side">
                <div className="visual-content">
                    <div className="brand-logo">
                        <div className="logo-icon"></div>
                        <span>Notify</span>
                    </div>
                    <h2 className="visual-heading">Secure your access.</h2>
                    <p className="visual-text">We'll help you get back into your account in no time.</p>
                </div>
                <div className="visual-overlay"></div>
            </div>

            {/* Form Side */}
            <div className="auth-form-side">
                <div className="auth-form-wrapper">
                    <div className="form-header">
                        <h1 className="form-title">Forgot Password?</h1>
                        <p className="form-subtitle">Enter your email to reset your password.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="premium-form">
                        {error && <div className="auth-error-message">{error}</div>}
                        {message && (
                            <div className="auth-error-message" style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', color: '#16a34a', borderColor: 'rgba(34, 197, 94, 0.3)' }}>
                                {message}
                            </div>
                        )}

                        <div className="form-group-premium">
                            <label htmlFor="email">Email address</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className="btn-premium" disabled={loading}>
                            {loading ? 'Sending Link...' : 'Send Reset Link'}
                        </button>
                    </form>

                    <p className="form-footer">
                        Remember your password? <Link to="/login">Back to Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
