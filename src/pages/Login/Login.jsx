import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, googleProvider } from '../../firebase/config';
import '../Auth/Auth.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            setLoading(true);

            // Execute reCAPTCHA
            if (window.grecaptcha) {
                const token = await window.grecaptcha.enterprise.execute('6LfMrzosAAAAAB45JSSZy6fyaYXDOzq1_LSC0xmu', { action: 'LOGIN' });
                console.log('reCAPTCHA Token:', token);
            }

            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('Login Success:', userCredential.user);
            navigate('/dashboard');
        } catch (err) {
            console.error('Login Error:', err);
            setError("Invalid email or password.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            console.log('Google Login Success:', result.user);
            navigate('/dashboard');
        } catch (error) {
            console.error('Google Login Error:', error);
            setError(`Google Sign-in failed: ${error.message}`);
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
                    <h2 className="visual-heading">Streamline your notifications.</h2>
                    <p className="visual-text">Manage, track, and analyze all your system notifications in one powerful dashboard.</p>
                </div>
                <div className="visual-overlay"></div>
            </div>

            {/* Form Side */}
            <div className="auth-form-side">
                <div className="auth-form-wrapper">
                    <div className="form-header">
                        <h1 className="form-title">Welcome back</h1>
                        <p className="form-subtitle">Please enter your details to sign in.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="premium-form">
                        {error && <div className="auth-error-message">{error}</div>}

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

                        <div className="form-group-premium">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-actions">
                            <Link to="/forgot-password">Forgot password?</Link>
                        </div>

                        <button type="submit" className="btn-premium" disabled={loading}>
                            {loading ? 'Signing in...' : 'Sign in'}
                        </button>

                        <button
                            type="button"
                            className="btn-premium btn-google"
                            onClick={handleGoogleLogin}
                        >
                            <span className="google-icon">G</span> Sign in with Google
                        </button>
                    </form>

                    <p className="form-footer">
                        Don't have an account? <Link to="/signup">Sign up for free</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
