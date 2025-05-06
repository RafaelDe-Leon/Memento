"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Download, CheckCircle2, Info, AlertCircle, Plus, Edit2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { loadStripe } from "@stripe/stripe-js"
import { PaymentMethodPanel, type PaymentMethod } from "./payment-method-panel"

// Load Stripe outside of component render to avoid recreating Stripe object on each render
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "")

// IMPORTANT: You need to use a PRICE ID, not a PRODUCT ID
// The price ID will look like: price_1234567890
const MONTHLY_SUBSCRIPTION_PRICE_ID = "price_1RE0aYHisOEVLy03dK1SiA4C" // Your actual price ID

export function BillingForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Payment method panel state
  const [panelOpen, setPanelOpen] = useState(false)
  const [panelMode, setPanelMode] = useState<"add" | "edit">("add")
  const [currentMethod, setCurrentMethod] = useState<PaymentMethod | undefined>(undefined)

  // Mock payment methods (in a real app, these would come from your backend)
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "card-1",
      cardNumber: "•••• •••• •••• 4242",
      expiryMonth: "12",
      expiryYear: "2024",
      cardholderName: "John Doe",
      isDefault: true,
    },
  ])

  const handleSubscription = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Create a checkout session
      const response = await fetch("/api/create-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId: MONTHLY_SUBSCRIPTION_PRICE_ID,
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
      setError(error.message || "Failed to initiate subscription checkout")
    } finally {
      setIsLoading(false)
    }
  }

  const openAddPaymentMethod = () => {
    setPanelMode("add")
    setCurrentMethod(undefined)
    setPanelOpen(true)
  }

  const openEditPaymentMethod = (method: PaymentMethod) => {
    setPanelMode("edit")
    setCurrentMethod(method)
    setPanelOpen(true)
  }

  const handleSavePaymentMethod = (method: PaymentMethod) => {
    if (panelMode === "add") {
      // For add mode, just set the new method (replacing any existing ones)
      setPaymentMethods([{ ...method, isDefault: true }])
    } else {
      // For edit mode, update the existing method
      setPaymentMethods([{ ...method, isDefault: true }])
    }
  }

  const handleDeletePaymentMethod = () => {
    // Simply clear all payment methods
    setPaymentMethods([])
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Subscription Plan</CardTitle>
            <Badge className="bg-primary/20 text-primary hover:bg-primary/30 dark:bg-primary/30">Active</Badge>
          </div>
          <CardDescription>You are currently on the Professional plan.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium">Professional Plan</h3>
                <p className="text-sm text-muted-foreground">$29.99/month</p>
              </div>
              <Badge variant="outline" className="border-green-500 text-green-600 dark:text-green-400">
                Current
              </Badge>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span className="text-sm">Unlimited note generation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span className="text-sm">Access to all note templates</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span className="text-sm">Priority support</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span className="text-sm">Cloud storage for notes</span>
              </div>
            </div>
          </div>

          <Alert className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-900">
            <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <AlertTitle className="text-blue-800 dark:text-blue-300">Test Mode</AlertTitle>
            <AlertDescription className="text-blue-700 dark:text-blue-400">
              This is a test environment. No real charges will be made when testing the subscription.
            </AlertDescription>
          </Alert>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Button onClick={handleSubscription} disabled={isLoading} className="w-full sm:w-auto">
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Add Plan"
              )}
            </Button>
            <Button variant="outline" className="w-full sm:w-auto text-destructive hover:text-destructive">
              Cancel Subscription
            </Button>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>Manage your payment methods and billing information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {paymentMethods.length > 0 ? (
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div key={method.id} className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="rounded-md bg-muted p-2">
                        <CreditCard className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">{method.cardNumber}</p>
                        <p className="text-xs text-muted-foreground">
                          Expires {method.expiryMonth}/{method.expiryYear.substring(2)}
                        </p>
                      </div>
                    </div>
                    {method.isDefault && <Badge variant="outline">Default</Badge>}
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEditPaymentMethod(method)}
                      className="h-8 px-2 text-xs"
                    >
                      <Edit2 className="mr-1 h-3 w-3" />
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed p-8 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <CreditCard className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="mb-1 text-lg font-medium">No payment methods</h3>
              <p className="text-sm text-muted-foreground">Add a payment method to manage your subscription.</p>
            </div>
          )}

          <div className="flex flex-col gap-2 sm:flex-row">
            {paymentMethods.length === 0 ? (
              <Button variant="outline" className="w-full sm:w-auto" onClick={openAddPaymentMethod}>
                <Plus className="mr-1 h-4 w-4" />
                Add Payment Method
              </Button>
            ) : (
              <Button
                variant="outline"
                className="w-full sm:w-auto"
                onClick={() => openEditPaymentMethod(paymentMethods[0])}
              >
                Edit Payment Method
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>View and download your past invoices.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg border">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Amount</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                    <th className="px-4 py-3 text-right text-sm font-medium">Invoice</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="px-4 py-3 text-sm">May 1, 2023</td>
                    <td className="px-4 py-3 text-sm">$29.99</td>
                    <td className="px-4 py-3 text-sm">
                      <Badge variant="outline" className="border-green-500 text-green-600 dark:text-green-400">
                        Paid
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download</span>
                      </Button>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3 text-sm">Apr 1, 2023</td>
                    <td className="px-4 py-3 text-sm">$29.99</td>
                    <td className="px-4 py-3 text-sm">
                      <Badge variant="outline" className="border-green-500 text-green-600 dark:text-green-400">
                        Paid
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download</span>
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm">Mar 1, 2023</td>
                    <td className="px-4 py-3 text-sm">$29.99</td>
                    <td className="px-4 py-3 text-sm">
                      <Badge variant="outline" className="border-green-500 text-green-600 dark:text-green-400">
                        Paid
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download</span>
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full sm:w-auto">
            View All Invoices
          </Button>
        </CardFooter>
      </Card>

      {/* Payment Method Panel */}
      <PaymentMethodPanel
        open={panelOpen}
        onOpenChange={setPanelOpen}
        mode={panelMode}
        currentMethod={currentMethod}
        onSave={handleSavePaymentMethod}
        onDelete={handleDeletePaymentMethod}
      />
    </div>
  )
}
