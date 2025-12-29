import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';
import '../Auth/Auth.css';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords don't match!");
            return;
        }

        try {
            setLoading(true);
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            console.log('Signup Success:', userCredential.user);
            // Optionally update profile with name here using updateProfile
            navigate('/');
        } catch (err) {
            console.error('Signup Error:', err);
            setError(err.message.replace('Firebase: ', ''));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-split-container">
            {/* Visual Side */}
            <div className="auth-visual-side signup-visual">
                <div className="visual-content">
                    <div className="brand-logo">
                        <div className="logo-icon"></div>
                        <span>Notify</span>
                    </div>
                    <h2 className="visual-heading">Join the future of tracking.</h2>
                    <p className="visual-text">Create an account to start monitoring your services with real-time analytics.</p>
                </div>
                <div className="visual-overlay"></div>
            </div>

            {/* Form Side */}
            <div className="auth-form-side">
                <div className="auth-form-wrapper">
                    <div className="form-header">
                        <h1 className="form-title">Create account</h1>
                        <p className="form-subtitle">Start your 30-day free trial.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="premium-form">
                        {error && <div className="auth-error-message">{error}</div>}

                        <div className="form-group-premium">
                            <label htmlFor="name">Full Name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group-premium">
                            <label htmlFor="email">Email address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group-premium">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Create a password"
                                value={formData.password}
                                onChange={handleChange}
                                minLength="6"
                                required
                            />
                        </div>

                        <div className="form-group-premium">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                placeholder="Repeat password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                minLength="6"
                                required
                            />
                        </div>

                        <button type="submit" className="btn-premium" disabled={loading}>
                            {loading ? 'Creating Account...' : 'Create account'}
                        </button>
                    </form>

                    <p className="form-footer">
                        Already have an account? <Link to="/login">Log in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
