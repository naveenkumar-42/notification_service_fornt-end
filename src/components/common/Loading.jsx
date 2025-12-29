import React from 'react';
import { Loader } from 'lucide-react';
import './Loading.css';

const Loading = ({ fullScreen = true, message = 'Loading...' }) => {
    return (
        <div className={`loading-container ${fullScreen ? 'fullscreen' : ''}`}>
            <Loader className="loading-spinner" size={40} />
            {message && <p className="loading-message">{message}</p>}
        </div>
    );
};

export default Loading;
