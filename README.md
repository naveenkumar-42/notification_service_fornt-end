# Notification Service Frontend

A modern, responsive React-based admin dashboard for managing and monitoring a multi-channel notification service. This application allows users to send notifications (Email, SMS, Push), track their delivery status, view real-time analytics, and manage notification rules.

## 🚀 Features

- **Dashboard Overview**: Real-time summary of notification statistics (Total, Sent, Failed, Pending).
- **Send Notifications**: Interface to manually trigger notifications via Email, SMS, or Push channels.
- **Notification History**: Detailed logs of all notification events with filtering and status tracking.
- **Analytics**: Visualizations using Recharts to track delivery rates, channel usage, and failure trends.
- **Rule Management**: Configure priority, retry limits, and active status for different notification types.
- **Authentication**: secure Login, Signup, and Password Recovery pages.
- **Responsive Design**: customized UI with dark/light mode support (implied by theme structure) and mobile-responsive sidebar.

## 🛠️ Tech Stack

- **Frontend Framework**: [React 19](https://react.dev/)
- **Routing**: [React Router v6](https://reactrouter.com/)
- **State Management**: React Context API (`SettingsContext`)
- **Data Visualization**: [Recharts](https://recharts.org/)
- **Styling**: CSS Modules, Lucide React (Icons)
- **HTTP Client**: Axios
- **Backend Services**: Firebase (Integration present)
- **Build Tool**: Create React App (Scripts)

## 📂 Project Structure

```bash
notification_front-end/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components (Cards, Sidebar, Header)
│   ├── context/            # Global state (SettingsContext)
│   ├── firebase/           # Firebase configuration
│   ├── pages/              # Main Application Views
│   │   ├── Dashboard/      
│   │   ├── SendNotification/
│   │   ├── History/        
│   │   ├── Analytics/      
│   │   ├── Settings/       
│   │   └── Auth/           # Login, Signup, ForgotPassword
│   ├── utils/              # Helper functions
│   ├── App.js              # Main routing and layout logic
│   └── index.js            # Entry point
├── notification_db.sql     # Database schema and seed data
└── package.json            # Project dependencies and scripts
```

## 💾 Database Schema

The project includes a `notification_db.sql` file defining the MySQL/MariaDB schema:

- **`notification_event`**: Stores individual notification records (channel, recipient, status, retry_count).
- **`notification_rule`**: Defines configuration for notification types (priority, max retries).
- **`audit_log`**: Tracks system actions and state changes for auditing.

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn
- MySQL Server (for the backend database)

### Steps

1.  **Clone the Repository**
    ```bash
    git clone <repository-url>
    cd notification_front-end
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Database Setup**
    - Import the `notification_db.sql` file into your MySQL server to create the `notification_db` database and tables.

4.  **Configure Environment**
    - Create a `.env` file for your API variables if needed (e.g., `REACT_APP_API_BASE_URL`).
    - The `package.json` currently proxies requests to `http://localhost:8080`. Ensure your backend service is running on this port.

5.  **Run the Application**
    ```bash
    npm start
    ```
    The app will launch in development mode at `http://localhost:3000`.

## 📜 Scripts

- `npm start`: Runs the app in development mode.
- `npm run build`: Builds the app for production to the `build` folder.
- `npm test`: Launches the test runner.

## 🤝 Contributing

1.  Fork the project
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is licensed under the MIT License.
