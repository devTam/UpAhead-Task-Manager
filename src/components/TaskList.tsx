import React from "react"
import type { Task } from "../types"
import { TaskItem } from "./TaskItem"
import { CheckCircle, Circle } from "lucide-react"

interface TaskListProps {
  tasks: Task[]
  loading: boolean
  onToggleTask: (taskId: string, completed: boolean) => void
  onDeleteTask: (taskId: string) => void
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  loading,
  onToggleTask,
  onDeleteTask,
}) => {
  const completedTasks = tasks.filter((task) => task.completed)
  const pendingTasks = tasks.filter((task) => !task.completed)

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 animate-pulse"
          >
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks yet</h3>
        <p className="text-gray-500">Add your first task to get started!</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {pendingTasks.length > 0 && (
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Circle className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">
              Pending Tasks ({pendingTasks.length})
            </h2>
          </div>
          <div className="space-y-3">
            {pendingTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={onToggleTask}
                onDelete={onDeleteTask}
              />
            ))}
          </div>
        </div>
      )}

      {completedTasks.length > 0 && (
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <h2 className="text-lg font-semibold text-gray-900">
              Completed Tasks ({completedTasks.length})
            </h2>
          </div>
          <div className="space-y-3">
            {completedTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={onToggleTask}
                onDelete={onDeleteTask}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
