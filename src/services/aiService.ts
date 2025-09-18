import OpenAI from "openai"
import type { AITaskMessage } from "../types"

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY

const openai = OPENAI_API_KEY
  ? new OpenAI({
      apiKey: OPENAI_API_KEY,
      dangerouslyAllowBrowser: true,
    })
  : null

// Simple in-memory cache to avoid duplicate requests
const messageCache = new Map<string, AITaskMessage>()
const lastRequestTime = new Map<string, number>()

const RATE_LIMIT_MS = 10000

const GLOBAL_RATE_LIMIT_MS = 60000 / 10 // 6 seconds between any requests
const globalLastRequestTime = { value: 0 }

const getFallbackMessage = (taskTitle: string): AITaskMessage => {
  const fallbackMessages = [
    {
      message: `"${taskTitle}" - Every great achievement starts with a single step! 🚀`,
      type: "motivational" as const,
    },
    {
      message: `Pro tip: Break down "${taskTitle}" into smaller, manageable chunks for better productivity! 💡`,
      type: "tip" as const,
    },
    {
      message: `Did you know? People who write down their tasks are 42% more likely to achieve them! 📝`,
      type: "fun-fact" as const,
    },
    {
      message: `"${taskTitle}" - You've got this! Channel your inner productivity superhero! 🦸‍♀️`,
      type: "creative" as const,
    },
  ]

  return fallbackMessages[Math.floor(Math.random() * fallbackMessages.length)]
}

export const generateTaskMessage = async (
  taskTitle: string
): Promise<AITaskMessage> => {
  if (messageCache.has(taskTitle)) {
    return messageCache.get(taskTitle)!
  }

  const now = Date.now()
  const lastRequest = lastRequestTime.get(taskTitle) || 0
  const globalLastRequest = globalLastRequestTime.value

  if (
    now - lastRequest < RATE_LIMIT_MS ||
    now - globalLastRequest < GLOBAL_RATE_LIMIT_MS
  ) {
    console.log("Rate limited, using fallback message")
    return getFallbackMessage(taskTitle)
  }

  if (!openai || !OPENAI_API_KEY) {
    console.log("OpenAI not configured, using fallback message")
    return getFallbackMessage(taskTitle)
  }

  try {
    lastRequestTime.set(taskTitle, now)
    globalLastRequestTime.value = now

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful productivity assistant. Generate a short, encouraging message related to a task. Make it motivational, provide a tip, share a fun fact, or be creative. Keep it under 100 characters and engaging.",
        },
        {
          role: "user",
          content: `Generate an encouraging message for this task: "${taskTitle}"`,
        },
      ],
      max_tokens: 100,
      temperature: 0.8,
    })

    const message =
      completion.choices[0]?.message?.content || "You can do this! 💪"

    const result: AITaskMessage = {
      message: message.trim(),
      type: "motivational",
    }

    messageCache.set(taskTitle, result)

    return result
  } catch (error: any) {
    console.error("Error generating AI message:", error)

    if (error.status === 429) {
      console.warn(
        "Rate limit exceeded (free tier limit: 20 requests/minute), using fallback message"
      )
    } else if (error.status === 401) {
      console.warn("Invalid API key or authentication failed")
    } else if (error.status === 402) {
      console.warn("Payment required - free tier credits may be exhausted")
    } else if (error.code === "insufficient_quota") {
      console.warn("Insufficient quota - free tier credits exhausted")
    }

    return getFallbackMessage(taskTitle)
  }
}
