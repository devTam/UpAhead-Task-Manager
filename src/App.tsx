import React from "react"
import { Helmet } from "react-helmet-async"
import { AuthProvider, useAuth } from "./contexts/AuthContext"
import { useTasks } from "./hooks/useTasks"
import { Header } from "./components/Header"
import { LoginForm } from "./components/LoginForm"
import { AddTaskForm } from "./components/AddTaskForm"
import { TaskList } from "./components/TaskList"
import { ErrorBoundary } from "./components/ErrorBoundary"

const AppContent: React.FC = () => {
  const { user, loading: authLoading } = useAuth()
  const {
    tasks,
    loading: tasksLoading,
    addTask,
    toggleTask,
    deleteTask,
    error,
  } = useTasks(user?.uid || null)

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <LoginForm />
  }

  return (
    <>
      <Helmet>
        <title>My Tasks - UpAhead Task Manager</title>
        <meta
          name="description"
          content="Manage your tasks efficiently with UpAhead Task Manager. Stay organized and productive with AI-powered motivation and smart task management."
        />
      </Helmet>
      <div className="min-h-screen bg-gray-50">
        <Header />

        <main className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Your Tasks
            </h2>
            <p className="text-gray-600">
              Manage your tasks efficiently and stay productive
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          <AddTaskForm onAddTask={addTask} loading={tasksLoading} />

          <TaskList
            tasks={tasks}
            loading={tasksLoading}
            onToggleTask={toggleTask}
            onDeleteTask={deleteTask}
          />
        </main>
      </div>
    </>
  )
}

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App
