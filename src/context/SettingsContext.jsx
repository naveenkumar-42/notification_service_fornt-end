import React, { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext(null);

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
};

export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState({
        apiKey: '',
        autoRefreshInterval: 10,
        defaultChannel: 'EMAIL',
        maxRetries: 3,
        enableNotifications: true,
        enableAnalytics: true,
        theme: 'light',
        dateFormat: 'local', // 'local', 'utc', 'relative'
        emailSignature: '',
        density: 'comfortable' // 'comfortable', 'compact'
    });

    // Load from localStorage on mount
    useEffect(() => {
        const savedSettings = localStorage.getItem('notificationSettings');
        if (savedSettings) {
            try {
                const parsed = JSON.parse(savedSettings);
                setSettings((prev) => ({ ...prev, ...parsed }));
            } catch (error) {
                console.error('Failed to parse settings:', error);
            }
        }
    }, []);

    // Save to localStorage and apply side effects whenever settings change
    const updateSettings = (newSettings) => {
        setSettings((prev) => {
            const updated = { ...prev, ...newSettings };
            localStorage.setItem('notificationSettings', JSON.stringify(updated));
            return updated;
        });
    };

    // Apply theme effect
    useEffect(() => {
        const root = document.documentElement;
        // Fix: Use data-color-scheme to match App.css variables
        root.dataset.colorScheme = settings.theme;
    }, [settings.theme]);

    // Apply density effect
    useEffect(() => {
        const root = document.documentElement;
        root.dataset.density = settings.density;
    }, [settings.density]);

    // Specific setter for individual keys for convenience
    const setSetting = (key, value) => {
        updateSettings({ [key]: value });
    };

    return (
        <SettingsContext.Provider value={{ settings, updateSettings, setSetting }}>
            {children}
        </SettingsContext.Provider>
    );
};
