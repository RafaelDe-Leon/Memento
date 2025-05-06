"use client"

import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="container flex items-center justify-center min-h-[70vh]">
      <div className="text-center p-8 max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Something went wrong</h2>
        <p className="mb-4 text-gray-600 dark:text-gray-300">
          We encountered an error while trying to process your request.
        </p>
        <Button onClick={() => reset()} className="mb-2 w-full">
          Try again
        </Button>
        <Button variant="outline" onClick={() => (window.location.href = "/")} className="w-full">
          Return to home
        </Button>
      </div>
    </div>
  )
}
