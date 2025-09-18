import { useState, useEffect } from "react"
import type { Task } from "../types"
import {
  subscribeToUserTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskCompletion,
} from "../services/taskService"

export const useTasks = (userId: string | null) => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) {
      setTasks([])
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    const unsubscribe = subscribeToUserTasks(userId, (userTasks) => {
      setTasks(userTasks)
      setLoading(false)
    })

    return unsubscribe
  }, [userId])

  const addTask = async (taskData: { title: string; description?: string }) => {
    if (!userId) {
      setError("User not authenticated")
      return
    }

    try {
      setError(null)
      await createTask(taskData, userId)
    } catch (err) {
      setError("Failed to create task")
      console.error("Error creating task:", err)
    }
  }

  const updateTaskData = async (taskId: string, updates: Partial<Task>) => {
    try {
      setError(null)
      await updateTask(taskId, updates)
    } catch (err) {
      setError("Failed to update task")
      console.error("Error updating task:", err)
    }
  }

  const removeTask = async (taskId: string) => {
    try {
      setError(null)
      await deleteTask(taskId)
    } catch (err) {
      setError("Failed to delete task")
      console.error("Error deleting task:", err)
    }
  }

  const toggleTask = async (taskId: string, completed: boolean) => {
    try {
      setError(null)
      await toggleTaskCompletion(taskId, completed)
    } catch (err) {
      setError("Failed to update task")
      console.error("Error toggling task:", err)
    }
  }

  return {
    tasks,
    loading,
    error,
    addTask,
    updateTask: updateTaskData,
    deleteTask: removeTask,
    toggleTask,
  }
}
