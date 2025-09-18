export interface Task {
  id: string
  title: string
  description?: string
  completed: boolean
  createdAt: Date
  updatedAt: Date
  userId: string
}

export interface User {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
}

export interface AITaskMessage {
  message: string
  type: "motivational" | "tip" | "fun-fact" | "creative"
}

export interface CreateTaskData {
  title: string
  description?: string
}
