"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Header from "@/components/header"

export default function SubscriptionSuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [subscription, setSubscription] = useState<any>(null)

  useEffect(() => {
    if (!sessionId) {
      setError("No session ID found")
      setLoading(false)
      return
    }

    async function fetchCheckoutSession() {
      try {
        const response = await fetch(`/api/get-checkout-session?session_id=${sessionId}`)
        const data = await response.json()

        if (data.error) {
          setError(data.error.message)
        } else {
          setSubscription(data.subscription)
        }
      } catch (err) {
        setError("Failed to fetch subscription details")
      } finally {
        setLoading(false)
      }
    }

    fetchCheckoutSession()
  }, [sessionId])

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/30 dark:from-background dark:to-background">
      <Header />
      <main className="container mx-auto py-12 px-4 flex-1 flex items-center justify-center">
        <Card className="w-full max-w-md border-primary/20 shadow-lg shadow-primary/5">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="text-2xl">Subscription Successful!</CardTitle>
            <CardDescription>Thank you for subscribing to Memento. Your subscription is now active.</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-4">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
              </div>
            ) : error ? (
              <div className="text-center text-red-500 py-4">{error}</div>
            ) : (
              <div className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-md">
                  <p className="text-sm font-medium">Subscription Details:</p>
                  <p className="text-sm text-muted-foreground">
                    Plan: {subscription?.plan?.nickname || "Monthly Plan"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Status: {subscription?.status === "active" ? "Active" : "Processing"}
                  </p>
                </div>
                <p className="text-sm text-center">
                  You'll receive a confirmation email with your subscription details shortly.
                </p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button asChild>
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}
