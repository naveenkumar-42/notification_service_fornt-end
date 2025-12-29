import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Calendar, Shield, LogOut, Edit } from 'lucide-react';
import { auth } from '../../firebase/config';
import { signOut } from 'firebase/auth';
import './Profile.css';

function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Get current user from Firebase Auth
        const currentUser = auth.currentUser;
        if (currentUser) {
            setUser({
                displayName: currentUser.displayName || 'User',
                email: currentUser.email,
                photoURL: currentUser.photoURL,
                emailVerified: currentUser.emailVerified,
                createdAt: currentUser.metadata.creationTime,
                lastSignIn: currentUser.metadata.lastSignInTime,
                uid: currentUser.uid
            });
        }
        setLoading(false);
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
            alert('Failed to logout. Please try again.');
        }
    };

    if (loading) {
        return (
            <div className="profile-container">
                <div className="loading-state">Loading...</div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="profile-container">
                <div className="error-state">No user logged in</div>
            </div>
        );
    }

    return (
        <div className="profile-container">
            <div className="page-header">
                <h1>Profile</h1>
                <p>Manage your account information and preferences</p>
            </div>

            <div className="profile-layout">
                {/* Profile Card */}
                <div className="profile-card">
                    <div className="profile-avatar-section">
                        <div className="profile-avatar">
                            {user.photoURL ? (
                                <img src={user.photoURL} alt={user.displayName} />
                            ) : (
                                <div className="avatar-placeholder">
                                    <User size={48} />
                                </div>
                            )}
                        </div>
                        <button className="btn-edit-avatar">
                            <Edit size={16} />
                            Change Photo
                        </button>
                    </div>

                    <div className="profile-info">
                        <h2>{user.displayName}</h2>
                        <p className="profile-email">{user.email}</p>
                        {user.emailVerified ? (
                            <span className="badge badge-verified">
                                <Shield size={14} />
                                Verified
                            </span>
                        ) : (
                            <span className="badge badge-unverified">
                                <Shield size={14} />
                                Not Verified
                            </span>
                        )}
                    </div>
                </div>

                {/* Account Details */}
                <div className="account-details-card">
                    <h3>Account Details</h3>

                    <div className="detail-row">
                        <div className="detail-label">
                            <Mail size={18} />
                            <span>Email Address</span>
                        </div>
                        <div className="detail-value">{user.email}</div>
                    </div>

                    <div className="detail-row">
                        <div className="detail-label">
                            <User size={18} />
                            <span>Display Name</span>
                        </div>
                        <div className="detail-value">{user.displayName}</div>
                    </div>

                    <div className="detail-row">
                        <div className="detail-label">
                            <Calendar size={18} />
                            <span>Account Created</span>
                        </div>
                        <div className="detail-value">
                            {new Date(user.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </div>
                    </div>

                    <div className="detail-row">
                        <div className="detail-label">
                            <Calendar size={18} />
                            <span>Last Sign In</span>
                        </div>
                        <div className="detail-value">
                            {new Date(user.lastSignIn).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </div>
                    </div>

                    <div className="detail-row">
                        <div className="detail-label">
                            <Shield size={18} />
                            <span>User ID</span>
                        </div>
                        <div className="detail-value detail-uid">{user.uid}</div>
                    </div>
                </div>

                {/* Danger Zone */}
                <div className="danger-zone-card">
                    <h3>Account Actions</h3>
                    <p>Sign out from your account</p>
                    <button className="btn-logout" onClick={handleLogout}>
                        <LogOut size={18} />
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Profile;
