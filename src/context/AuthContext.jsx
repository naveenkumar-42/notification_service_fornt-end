import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

// List of emails allowed to SEND notifications
// In a real app, this might be fetched from a database "roles" collection
const AUTHORIZED_SENDERS = [
    'naveenkumarpoff@gmail.com'
    // 'naveenkumar.it22@bitsathy.ac.in'
];

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [canSend, setCanSend] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);

            if (currentUser && currentUser.email) {
                // Check if email is in the authorized list
                const isAuthorized = AUTHORIZED_SENDERS.includes(currentUser.email);
                setCanSend(isAuthorized);
            } else {
                setCanSend(false);
            }

            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        user,
        canSend,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
