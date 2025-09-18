import React, { useState } from "react"
import { Check, Trash2, Sparkles, X, Circle } from "lucide-react"
import type { Task } from "../types"
import { generateTaskMessage } from "../services/aiService"

interface TaskItemProps {
  task: Task
  onToggle: (taskId: string, completed: boolean) => void
  onDelete: (taskId: string) => void
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggle,
  onDelete,
}) => {
  const [showAIMessage, setShowAIMessage] = useState(false)
  const [aiMessage, setAiMessage] = useState<string>("")
  const [loadingAI, setLoadingAI] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  const handleAIClick = async () => {
    // Hide tooltip when button is clicked (important for mobile)
    setShowTooltip(false)

    if (showAIMessage) {
      setShowAIMessage(false)
      return
    }

    setLoadingAI(true)
    try {
      const response = await generateTaskMessage(task.title)
      setAiMessage(response.message)
      setShowAIMessage(true)
    } catch (error) {
      console.error("Error generating AI message:", error)
      setAiMessage("You can do this! 💪")
      setShowAIMessage(true)
    } finally {
      setLoadingAI(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-3">
        <button
          onClick={() => onToggle(task.id, !task.completed)}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors cursor-pointer ${
            task.completed
              ? "bg-green-500 border-green-500 text-white"
              : "border-gray-300 hover:border-green-500 hover:bg-green-50"
          }`}
          title={task.completed ? "Mark as incomplete" : "Mark as complete"}
        >
          {task.completed ? (
            <Check className="w-4 h-4 stroke-2" />
          ) : (
            <Circle className="w-4 h-4 text-gray-400" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <h3
            className={`text-lg font-medium truncate ${
              task.completed ? "text-gray-500 line-through" : "text-gray-900"
            }`}
            title={task.title}
          >
            {task.title}
          </h3>

          {task.description && (
            <p
              className={`mt-1 text-sm truncate ${
                task.completed ? "text-gray-400" : "text-gray-600"
              }`}
              title={task.description}
            >
              {task.description}
            </p>
          )}

          <div className="mt-2 flex items-center space-x-2 text-xs text-gray-500">
            <span>Created {task.createdAt.toLocaleString()}</span>
            {task.updatedAt.getTime() !== task.createdAt.getTime() && (
              <span>• Updated {task.updatedAt.toLocaleString()}</span>
            )}
          </div>

          {showAIMessage && (
            <div className="mt-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
              <div className="flex items-start justify-between">
                <p className="text-sm text-gray-700 font-medium">{aiMessage}</p>
                <button
                  onClick={() => setShowAIMessage(false)}
                  className="flex-shrink-0 ml-2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2 flex-shrink-0">
          {!task.completed && (
            <div className="relative">
              <button
                onClick={handleAIClick}
                disabled={loadingAI}
                className="flex items-center justify-center w-8 h-8 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                onTouchStart={() => setShowTooltip(true)}
                onTouchEnd={() => setShowTooltip(false)}
              >
                {loadingAI ? (
                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
              </button>

              {showTooltip && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg whitespace-nowrap z-10">
                  {loadingAI
                    ? "Generating AI motivation..."
                    : "Get AI motivation and tips for this task"}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              )}
            </div>
          )}

          <button
            onClick={() => onDelete(task.id)}
            className="flex items-center justify-center w-8 h-8 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
