# TaskFlow

A modern task management application built with React and Vite, designed to streamline project workflows and team collaboration.

## 🚀 Features

### Admin Dashboard
- **User Management**: View and manage all users across different departments
- **Task Overview**: Monitor total tasks, completed tasks, and pending tasks
- **Analytics**: Track system performance and user activity
- **Settings**: Configure application preferences and system settings
- **Real-time Statistics**: Live dashboard with key metrics
- **System Health Monitoring**: Server status, database connectivity, and backup status

### Multi-Role Support
- **Admin**: Full system access with user and task management capabilities
- **Manager**: Department-specific task assignment and oversight
- **User**: Individual task management and progress tracking

### Department-Based Organization
- IT Department
- Design Department
- Telecommunication Department
- Database Department
- Networking Department

## 🛠️ Technology Stack

### Frontend
- **React 19.1.0** - Modern UI library for building interactive interfaces
- **Vite 7.0.4** - Fast build tool and development server
- **React Router DOM 7.7.1** - Client-side routing
- **Tailwind CSS 4.1.11** - Utility-first CSS framework
- **Lucide React 0.534.0** - Beautiful & consistent icon toolkit
- **Axios 1.11.0** - HTTP client for API requests

### Development Tools
- **ESLint 9.30.1** - Code linting and formatting
- **TypeScript Support** - Type definitions for React components

## 📁 Project Structure

```
TaskFlow/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Admin/
│   │   │   │   ├── AdminNavbar.jsx
│   │   │   │   ├── AdminSidebar.jsx
│   │   │   │   └── UserTableData.jsx
│   │   │   ├── Manager/
│   │   │   └── User/
│   │   ├── pages/
│   │   │   ├── Admin/
│   │   │   │   ├── AdminDashboard.jsx
│   │   │   │   ├── Analytics.jsx
│   │   │   │   ├── Layout.jsx
│   │   │   │   ├── Settings.jsx
│   │   │   │   └── User.jsx
│   │   │   ├── Manager/
│   │   │   ├── User/
│   │   │   └── Home.jsx
│   │   ├── assets/
│   │   │   └── assets.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/blessed-winner/TaskFlow.git
   cd TaskFlow
   ```

2. **Install dependencies**
   ```bash
   cd client
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 📊 Dashboard Features

### Admin Dashboard Overview
- **Total Users**: Track registered users across all departments
- **Total Tasks**: Monitor all tasks in the system
- **Completed Tasks**: View task completion progress
- **Active Managers**: Track active management personnel

### Recent Activity Feed
- Real-time updates on user registrations
- Task completion notifications
- New task assignments
- System status updates

### System Health Monitoring
- Server status indicators
- Database connectivity status
- Backup information
- Performance metrics

## 🎨 UI/UX Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern Interface**: Clean, intuitive design with Tailwind CSS
- **Icon Integration**: Beautiful icons from Lucide React
- **Color-coded Status**: Visual indicators for different task states
- **Card-based Layout**: Organized information display

## 🔧 Configuration

### Environment Setup
The application uses Vite for development and build processes. Configuration can be found in:
- `vite.config.js` - Vite configuration
- `eslint.config.js` - ESLint rules
- `tailwind.config.js` - Tailwind CSS configuration

### Routing
The application uses React Router for navigation:
- `/admin` - Admin dashboard
- `/admin/users` - User management
- `/admin/analytics` - Analytics page
- `/admin/settings` - Settings page

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Blessed Winner** - *Initial work* - [blessed-winner](https://github.com/blessed-winner)

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite team for the fast build tool
- Tailwind CSS for the utility-first CSS framework
- Lucide team for the beautiful icons

---

**TaskFlow** - Streamlining your workflow, one task at a time! 🎯 