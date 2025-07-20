"use client"

// This is a simple toast hook for Next.js
// For a full implementation, you might want to use react-hot-toast or sonner

import { useState, useCallback } from "react"

type ToastType = "default" | "destructive" | "success"

interface Toast {
  id: string
  title?: string
  description?: string
  variant?: ToastType
}

const toasts: Toast[] = []

export const useToast = () => {
  const [, forceUpdate] = useState({})

  const toast = useCallback(({ title, description, variant = "default" }: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast: Toast = { id, title, description, variant }
    
    toasts.push(newToast)
    forceUpdate({})

    // Auto remove after 5 seconds
    setTimeout(() => {
      const index = toasts.findIndex(t => t.id === id)
      if (index > -1) {
        toasts.splice(index, 1)
        forceUpdate({})
      }
    }, 5000)

    return id
  }, [])

  return { toast, toasts }
}