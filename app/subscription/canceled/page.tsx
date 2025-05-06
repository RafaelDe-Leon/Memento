import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { XCircle } from "lucide-react"
import Header from "@/components/header"

export default function SubscriptionCanceledPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/30 dark:from-background dark:to-background">
      <Header />
      <main className="container mx-auto py-12 px-4 flex-1 flex items-center justify-center">
        <Card className="w-full max-w-md border-primary/20 shadow-lg shadow-primary/5">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
              <XCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
            <CardTitle className="text-2xl">Subscription Canceled</CardTitle>
            <CardDescription>Your subscription process was canceled. No charges were made.</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-4">
              If you encountered any issues or have questions about our subscription plans, please don't hesitate to
              contact our support team.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button asChild className="w-full">
              <Link href="/#stripe-testing">Try Again</Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}
