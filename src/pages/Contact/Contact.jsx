import React, { useState } from 'react';
import { Send, Mail, User, MessageSquare, MapPin } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';
import './Contact.css';

function Contact() {
    // REPLACE "YOUR_FORMSPREE_ID" WITH YOUR ACTUAL FORMSPREE FORM ID
    // Example: "xrgwjkqp"
    const [state, handleSubmit] = useForm("mqeavrjb");
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    if (state.succeeded) {
        return (
            <div className="contact-container">
                <div className="contact-success-card fade-in">
                    <div className="success-icon">
                        <Send size={48} />
                    </div>
                    <h2>Message Sent!</h2>
                    <p>Thank you for reaching out. We'll get back to you shortly.</p>
                    <button
                        className="btn-back"
                        onClick={() => window.location.reload()}
                    >
                        Send Another Message
                    </button>
                </div>
            </div>
        );
    }

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="contact-container">
            <div className="page-header">
                <h1>Contact Support</h1>
                <p>Get in touch with our team for assistance or feedback</p>
            </div>

            <div className="contact-grid">
                {/* Contact Form */}
                <div className="contact-card form-card">
                    <div className="card-header">
                        <h2>Send us a Message</h2>
                        <p>We typically reply within 24 hours.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="contact-form">
                        <div className="form-group">
                            <label htmlFor="name">
                                <User size={16} />
                                <span>Name</span>
                            </label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Your Name"
                                required
                                className="input-field"
                            />
                            <ValidationError
                                prefix="Name"
                                field="name"
                                errors={state.errors}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">
                                <Mail size={16} />
                                <span>Email Address</span>
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="you@example.com"
                                required
                                className="input-field"
                            />
                            <ValidationError
                                prefix="Email"
                                field="email"
                                errors={state.errors}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">
                                <MessageSquare size={16} />
                                <span>Message</span>
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                placeholder="How can we help you?"
                                required
                                rows="5"
                                className="input-field"
                            />
                            <ValidationError
                                prefix="Message"
                                field="message"
                                errors={state.errors}
                            />
                        </div>

                        <button type="submit" className="btn-submit" disabled={state.submitting}>
                            <Send size={18} />
                            {state.submitting ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </div>

                {/* Contact Info / Decor */}
                <div className="contact-info-column">
                    <div className="info-card">
                        <div className="info-item">
                            <div className="icon-circle">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h3>Email Us</h3>
                                <p>naveenkumarpoff@gmail.com</p>
                            </div>
                        </div>
                    </div>

                    <div className="feature-highlight-card">
                        <h3>Premium Support</h3>
                        <p>Priority assistance for enterprise users.</p>
                        <div className="feature-tags">
                            <span>24/7 Response</span>
                            <span>Dedicated Agent</span>
                            <span>Live Chat</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
