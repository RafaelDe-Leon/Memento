"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface SubscriptionButtonProps {
  priceId: string
  customerId?: string
  text?: string
  variant?: "default" | "outline" | "secondary" | "destructive" | "ghost" | "link"
}

export default function SubscriptionButton({
  priceId,
  customerId,
  text = "Subscribe",
  variant = "default",
}: SubscriptionButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubscription = async () => {
    setIsLoading(true)

    try {
      // Create a checkout session
      const response = await fetch("/api/create-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId,
          customerId,
        }),
      })

      const { url, error } = await response.json()

      if (error) {
        throw new Error(error.message)
      }

      // Redirect to Stripe Checkout
      window.location.href = url
    } catch (error) {
      console.error("Error:", error)
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={handleSubscription} disabled={isLoading} variant={variant}>
      {isLoading ? "Loading..." : text}
    </Button>
  )
}
