import React, { useState } from "react"
import { Plus } from "lucide-react"

interface AddTaskFormProps {
  onAddTask: (taskData: { title: string; description?: string }) => void
  loading?: boolean
}

export const AddTaskForm: React.FC<AddTaskFormProps> = ({
  onAddTask,
  loading = false,
}) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isExpanded, setIsExpanded] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim()) {
      onAddTask({
        title: title.trim(),
        description: description.trim() || undefined,
      })
      setTitle("")
      setDescription("")
      setIsExpanded(false)
    }
  }

  const handleCancel = () => {
    setTitle("")
    setDescription("")
    setIsExpanded(false)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="flex-1">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What needs to be done?"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            disabled={!title.trim() || loading}
            className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Plus className="w-5 h-5" />
            )}
          </button>
        </div>

        {isExpanded && (
          <div className="space-y-3">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a description (optional)"
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 resize-none"
              disabled={loading}
            />
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {!isExpanded && (
          <button
            type="button"
            onClick={() => setIsExpanded(true)}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            disabled={loading}
          >
            Add description
          </button>
        )}
      </form>
    </div>
  )
}
