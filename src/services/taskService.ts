import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  onSnapshot,
  Timestamp,
} from "firebase/firestore"
import { db } from "./firebase"
import type { Task, CreateTaskData } from "../types"

const TASKS_COLLECTION = "tasks"

export const createTask = async (
  taskData: CreateTaskData,
  userId: string
): Promise<string> => {
  try {
    const taskDoc: any = {
      title: taskData.title,
      completed: false,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      userId,
    }

    if (taskData.description && taskData.description.trim()) {
      taskDoc.description = taskData.description.trim()
    }

    const docRef = await addDoc(collection(db, TASKS_COLLECTION), taskDoc)
    return docRef.id
  } catch (error) {
    console.error("Error creating task:", error)
    throw error
  }
}

export const updateTask = async (
  taskId: string,
  updates: Partial<Task>
): Promise<void> => {
  try {
    const taskRef = doc(db, TASKS_COLLECTION, taskId)
    await updateDoc(taskRef, {
      ...updates,
      updatedAt: Timestamp.now(),
    })
  } catch (error) {
    console.error("Error updating task:", error)
    throw error
  }
}

export const deleteTask = async (taskId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, TASKS_COLLECTION, taskId))
  } catch (error) {
    console.error("Error deleting task:", error)
    throw error
  }
}

export const toggleTaskCompletion = async (
  taskId: string,
  completed: boolean
): Promise<void> => {
  try {
    await updateTask(taskId, { completed })
  } catch (error) {
    console.error("Error toggling task completion:", error)
    throw error
  }
}

export const subscribeToUserTasks = (
  userId: string,
  callback: (tasks: Task[]) => void
) => {
  const q = query(
    collection(db, TASKS_COLLECTION),
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  )

  return onSnapshot(q, (snapshot) => {
    const tasks: Task[] = snapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        id: doc.id,
        title: data.title,
        description: data.description || undefined,
        completed: data.completed,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
        userId: data.userId,
      }
    })
    callback(tasks)
  })
}
