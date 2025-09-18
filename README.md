# Task Manager Application

A modern, scalable task management application built with React, TypeScript, Vite, Firebase, and AI integration. This application demonstrates full-stack development skills with a clean, responsive UI and secure backend integration.

## 🚀 Features

- **User Authentication**: Google Sign-In integration with Firebase Auth
- **Task Management**: Create, read, update, and delete tasks
- **Real-time Updates**: Live synchronization with Firestore
- **AI Integration**: OpenAI API integration for motivational messages
- **Responsive Design**: Modern UI with Tailwind CSS
- **Type Safety**: Full TypeScript implementation
- **Error Handling**: Comprehensive error boundaries and user feedback
- **Security**: Firestore security rules for data protection

## 🛠️ Tech Stack

- **Frontend**: React , TypeScript, Vite
- **Styling**: Tailwind CSS, Lucide React Icons
- **Backend**: Firebase (Authentication, Firestore)
- **AI**: OpenAI API
- **Deployment**: Firebase Hosting

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Firebase project
- Google Cloud Console project (for authentication)
- OpenAI API key (optional, for AI features)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd task-manager
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Copy the example environment file and configure your Firebase settings:

```bash
cp env.example .env.local
```

Update `.env.local` with your Firebase configuration:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your-app-id

# OpenAI API Key
VITE_OPENAI_API_KEY=your-openai-api-key
```

### 4. Firebase Setup

#### Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication and Firestore Database
4. Configure Google Sign-In in Authentication settings
5. Get your Firebase configuration from Project Settings

#### Initialize Firebase in Your Project

```bash
# Login to Firebase (if not already logged in)
npm run firebase:login

# Initialize Firebase (if needed)
npm run firebase:init
```

### 5. Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AddTaskForm.tsx  # Task creation form
│   ├── ErrorBoundary.tsx # Error handling component
│   ├── Header.tsx       # Application header
│   ├── LoginForm.tsx    # Authentication form
│   ├── TaskItem.tsx     # Individual task component
│   └── TaskList.tsx     # Task list container
├── contexts/            # React contexts
│   └── AuthContext.tsx  # Authentication context
├── hooks/               # Custom React hooks
│   └── useTasks.ts      # Task management hook
├── services/            # API and service layers
│   ├── aiService.ts     # OpenAI integration
│   ├── authService.ts   # Authentication service
│   ├── firebase.ts      # Firebase configuration
│   └── taskService.ts   # Task CRUD operations
├── types/               # TypeScript type definitions
│   └── index.ts         # Application types
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
└── index.css            # Global styles
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Build and deploy to Firebase
- `npm run deploy:hosting` - Deploy only hosting
- `npm run firebase:login` - Login to Firebase CLI
- `npm run firebase:serve` - Serve locally with Firebase

## 🔐 Security Features

- **Firestore Security Rules**: Users can only access their own tasks
- **Authentication Required**: All operations require valid authentication
- **Input Validation**: Client-side validation for all user inputs
- **Error Boundaries**: Graceful error handling throughout the application

## 🤖 AI Integration

The application includes AI integration using OpenAI's API:

- **Motivational Messages**: AI-generated encouragement for tasks
- **Productivity Tips**: Context-aware suggestions
- **Fun Facts**: Engaging content related to task completion
- **Fallback System**: Works without API key using predefined messages

## 🚀 Deployment

### Firebase Hosting

1. Build the application:

   ```bash
   npm run build
   ```

2. Deploy to Firebase:

   ```bash
   npm run deploy
   ```

3. Your application will be available at your Firebase hosting URL

### Environment Variables for Production

Make sure to set the same environment variables in your Firebase hosting configuration or build process.

## 🧪 Testing

The application includes comprehensive error handling and user feedback:

- **Loading States**: Visual feedback during async operations
- **Error Messages**: Clear error communication to users
- **Form Validation**: Real-time input validation
- **Responsive Design**: Works on all device sizes

## 📱 Features in Detail

### Authentication

- Google Sign-In integration
- Persistent authentication state
- Secure user session management
- User profile display

### Task Management

- Create tasks with title and optional description
- Mark tasks as complete/incomplete
- Delete tasks
- Real-time updates across devices
- Task organization (pending/completed)

### AI Features

- Click the sparkles icon on any task
- Get AI-generated motivational messages
- Works with or without OpenAI API key
- Multiple message types (motivational, tips, fun facts)

### User Experience

- Clean, modern interface
- Responsive design
- Smooth animations and transitions
- Intuitive navigation
- Error handling and loading states

## 🔧 Configuration

### Firebase Configuration

1. **Authentication**: Enable Google Sign-In provider
2. **Firestore**: Create database in production mode
3. **Hosting**: Configure for single-page application
4. **Security Rules**: Implement user-based access control

### OpenAI Configuration (Optional)

1. Get API key from [OpenAI Platform](https://platform.openai.com/)
2. Add to environment variables
3. Configure usage limits as needed

## 📄 License

This project is licensed under the MIT License.

---

Built with ❤️ using modern web technologies and best practices.
