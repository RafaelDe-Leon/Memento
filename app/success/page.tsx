"use client"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Header from "@/components/header"

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/30 dark:from-background dark:to-background">
      <Header />
      <main className="container mx-auto py-12 px-4 flex-1 flex items-center justify-center">
        <Card className="w-full max-w-md border-primary/20 shadow-lg shadow-primary/5">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="text-2xl">Payment Successful!</CardTitle>
            <CardDescription>Thank you for your payment. Your transaction has been completed.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-md">
                <p className="text-sm font-medium">Transaction Details:</p>
                <p className="text-sm text-muted-foreground">Session ID: {sessionId || "Not available"}</p>
                <p className="text-sm text-muted-foreground">Status: Completed</p>
              </div>
              <p className="text-sm text-center">This was a test payment. No actual charges were made.</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button asChild>
              <Link href="/">Return to Home</Link>
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}
