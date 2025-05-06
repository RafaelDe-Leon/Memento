"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface CustomerPortalButtonProps {
  customerId: string
  text?: string
  variant?: "default" | "outline" | "secondary" | "destructive" | "ghost" | "link"
}

export default function CustomerPortalButton({
  customerId,
  text = "Manage Subscription",
  variant = "outline",
}: CustomerPortalButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handlePortalSession = async () => {
    setIsLoading(true)

    try {
      // Create a portal session
      const response = await fetch("/api/create-portal-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerId,
        }),
      })

      const { url, error } = await response.json()

      if (error) {
        throw new Error(error.message)
      }

      // Redirect to Stripe Customer Portal
      window.location.href = url
    } catch (error) {
      console.error("Error:", error)
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={handlePortalSession} disabled={isLoading} variant={variant}>
      {isLoading ? "Loading..." : text}
    </Button>
  )
}
