"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Info, AlertCircle } from "lucide-react"
import { loadStripe } from "@stripe/stripe-js"

// Load Stripe outside of component render to avoid recreating Stripe object on each render
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "")

// Test price IDs - in a real app, you would get these from your Stripe dashboard
const TEST_PRICES = {
  oneTime: {
    basic: "price_1234", // Replace with your actual test price ID
    premium: "price_5678", // Replace with your actual test price ID
  },
  subscription: {
    monthly: "price_monthly", // Replace with your actual test price ID
    yearly: "price_yearly", // Replace with your actual test price ID
  },
}

export default function StripeTestPanel() {
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("one-time")
  const [selectedPrice, setSelectedPrice] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleCheckout = async (priceId: string, mode: "payment" | "subscription") => {
    setIsLoading(true)
    setError(null)

    try {
      // Determine which API endpoint to use based on the mode
      const endpoint = mode === "subscription" ? "/api/create-subscription" : "/api/create-checkout"

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId,
          // For subscription endpoint, you might need customerId, but for testing we'll omit it
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
        // For the create-checkout endpoint that returns sessionId
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
      setError(error.message || "Failed to initiate checkout")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto border-primary/20 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-transparent">
        <div className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-primary" />
          <CardTitle>Stripe Testing Panel</CardTitle>
        </div>
        <CardDescription>Test Stripe checkout flows with different payment scenarios</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Alert className="mb-6">
          <Info className="h-4 w-4" />
          <AlertTitle>Test Mode</AlertTitle>
          <AlertDescription>
            Use Stripe test cards to simulate different payment scenarios. No real charges will be made.
          </AlertDescription>
        </Alert>

        <div className="mb-6">
          <h3 className="text-sm font-medium mb-2">Test Cards:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3 bg-muted/50 rounded-md">
              <div className="flex justify-between">
                <span className="font-mono text-sm">4242 4242 4242 4242</span>
                <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                  Success
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Payment succeeds</p>
            </div>
            <div className="p-3 bg-muted/50 rounded-md">
              <div className="flex justify-between">
                <span className="font-mono text-sm">4000 0025 0000 3155</span>
                <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300">
                  3D Secure
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Requires authentication</p>
            </div>
            <div className="p-3 bg-muted/50 rounded-md">
              <div className="flex justify-between">
                <span className="font-mono text-sm">4000 0000 0000 9995</span>
                <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                  Declined
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Payment declined</p>
            </div>
            <div className="p-3 bg-muted/50 rounded-md">
              <div className="flex justify-between">
                <span className="font-mono text-sm">4000 0000 0000 0341</span>
                <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                  Declined
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Card declined (insufficient funds)</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Use any future expiration date, any 3-digit CVC, and any name/postal code.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="one-time">One-Time Payment</TabsTrigger>
            <TabsTrigger value="subscription">Subscription</TabsTrigger>
          </TabsList>

          <TabsContent value="one-time" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border-primary/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Basic Package</CardTitle>
                  <CardDescription>One-time payment</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">$19.99</p>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => handleCheckout(TEST_PRICES.oneTime.basic, "payment")}
                    disabled={isLoading}
                    className="w-full"
                  >
                    {isLoading ? "Processing..." : "Test Checkout"}
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border-primary/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Premium Package</CardTitle>
                  <CardDescription>One-time payment</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">$49.99</p>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => handleCheckout(TEST_PRICES.oneTime.premium, "payment")}
                    disabled={isLoading}
                    className="w-full"
                  >
                    {isLoading ? "Processing..." : "Test Checkout"}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="subscription" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border-primary/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Monthly Plan</CardTitle>
                  <CardDescription>Recurring subscription</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">
                    $9.99<span className="text-sm font-normal text-muted-foreground">/month</span>
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => handleCheckout(TEST_PRICES.subscription.monthly, "subscription")}
                    disabled={isLoading}
                    className="w-full"
                  >
                    {isLoading ? "Processing..." : "Test Subscription"}
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border-primary/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Annual Plan</CardTitle>
                  <CardDescription>Recurring subscription</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">
                    $99.99<span className="text-sm font-normal text-muted-foreground">/year</span>
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => handleCheckout(TEST_PRICES.subscription.yearly, "subscription")}
                    disabled={isLoading}
                    className="w-full"
                  >
                    {isLoading ? "Processing..." : "Test Subscription"}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

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
          <strong>Note:</strong> For testing purposes only. This panel allows you to test the Stripe checkout flow
          without making real charges.
        </p>
      </CardFooter>
    </Card>
  )
}
