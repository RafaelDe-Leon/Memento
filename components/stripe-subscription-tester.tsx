"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CreditCard, Info, AlertCircle } from "lucide-react"
import { loadStripe } from "@stripe/stripe-js"

// Load Stripe outside of component render to avoid recreating Stripe object on each render
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "")

// IMPORTANT: You need to use a PRICE ID, not a PRODUCT ID
// Your product ID is: prod_S8H8gI0ryxzxv5
// But you need to find or create a price for this product in your Stripe dashboard
// The price ID will look like: price_1234567890
const MONTHLY_SUBSCRIPTION_PRICE_ID = "price_1RE0aYHisOEVLy03dK1SiA4C" // Actual price ID for the monthly subscription

export default function StripeSubscriptionTester() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubscription = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/create-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId: MONTHLY_SUBSCRIPTION_PRICE_ID,
        }),
      })

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error.message || "Something went wrong")
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url
      } else if (data.sessionId) {
        const stripe = await stripePromise
        if (stripe) {
          const { error } = await stripe.redirectToCheckout({ sessionId: data.sessionId })
          if (error) {
            throw new Error(error.message || "Failed to redirect to checkout")
          }
        }
      }
    } catch (error: any) {
      console.error("Error:", error)
      setError(error.message || "Failed to initiate subscription checkout")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto border-primary/20 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-transparent">
        <div className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-primary" />
          <CardTitle>Stripe Subscription Testing</CardTitle>
        </div>
        <CardDescription>Test the Stripe subscription checkout flow</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Alert className="mb-6">
          <Info className="h-4 w-4" />
          <AlertTitle>Test Mode</AlertTitle>
          <AlertDescription>This is a test subscription. No real charges will be made.</AlertDescription>
        </Alert>

        {MONTHLY_SUBSCRIPTION_PRICE_ID === "price_monthly" && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Configuration Required</AlertTitle>
            <AlertDescription>
              You need to update the MONTHLY_SUBSCRIPTION_PRICE_ID constant with your actual Stripe price ID. Go to your
              Stripe dashboard, find product ID prod_S8H8gI0ryxzxv5, and get or create a price for it.
            </AlertDescription>
          </Alert>
        )}

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="text-center mb-4">
            <h3 className="text-xl font-bold">Monthly Subscription</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-2">Professional Plan</p>
            <div className="text-3xl font-bold mb-2">
              $19.99<span className="text-sm font-normal text-muted-foreground">/month</span>
            </div>
          </div>

          <div className="space-y-2 mb-6">
            <div className="flex items-center">
              <svg className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Unlimited note generation</span>
            </div>
            <div className="flex items-center">
              <svg className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Access to all templates</span>
            </div>
            <div className="flex items-center">
              <svg className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Priority support</span>
            </div>
          </div>

          <Button onClick={handleSubscription} disabled={isLoading} className="w-full bg-primary hover:bg-primary/90">
            {isLoading ? "Processing..." : "Test Subscription Checkout"}
          </Button>
        </div>

        {error && (
          <Alert variant="destructive" className="mt-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter className="bg-muted/30 flex flex-col items-start">
        <p className="text-sm text-muted-foreground">
          <strong>Note:</strong> For testing purposes only. This allows you to test the Stripe subscription checkout
          flow without making real charges.
        </p>
      </CardFooter>
    </Card>
  )
}
