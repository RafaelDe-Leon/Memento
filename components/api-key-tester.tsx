"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, AlertTriangle, RefreshCw } from "lucide-react"

export default function ApiKeyTester() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const testApiKey = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/debug-openai")

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`)
      }

      const data = await res.json()
      setResult(data)
    } catch (err: any) {
      setError(err.message || "An error occurred while testing the API key")
      setResult(null)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    testApiKey()
  }, [])

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>OpenAI API Key Diagnostics</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-6">
            <RefreshCw className="h-8 w-8 animate-spin text-primary mb-4" />
            <p>Testing API key...</p>
          </div>
        ) : error ? (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : result ? (
          <div className="space-y-4">
            {result.status === "success" ? (
              <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                <AlertTitle className="text-green-800 dark:text-green-300">Success</AlertTitle>
                <AlertDescription className="text-green-700 dark:text-green-400">
                  Your OpenAI API key is working correctly.
                </AlertDescription>
              </Alert>
            ) : (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>API Key Issue</AlertTitle>
                <AlertDescription>{result.message}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2 text-sm">
              <div className="grid grid-cols-2 gap-2 border-b pb-2">
                <span className="font-medium">Environment:</span>
                <span>{result.environment}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 border-b pb-2">
                <span className="font-medium">Vercel Environment:</span>
                <span>{result.vercelEnv}</span>
              </div>
              {result.keyInfo && (
                <>
                  <div className="grid grid-cols-2 gap-2 border-b pb-2">
                    <span className="font-medium">API Key Prefix:</span>
                    <span>{result.keyInfo.prefix}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 border-b pb-2">
                    <span className="font-medium">API Key Length:</span>
                    <span>{result.keyInfo.length} characters</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 border-b pb-2">
                    <span className="font-medium">Masked API Key:</span>
                    <span>{result.keyInfo.masked}</span>
                  </div>
                </>
              )}
              {result.testResponse && (
                <div className="grid grid-cols-2 gap-2 border-b pb-2">
                  <span className="font-medium">Test Response:</span>
                  <span>{result.testResponse}</span>
                </div>
              )}
              {result.error && (
                <div className="grid grid-cols-2 gap-2 border-b pb-2">
                  <span className="font-medium">Error Details:</span>
                  <span className="text-red-600 dark:text-red-400">{result.error}</span>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </CardContent>
      <CardFooter>
        <Button onClick={testApiKey} disabled={isLoading} className="w-full">
          {isLoading ? (
            <span className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4 animate-spin" />
              Testing...
            </span>
          ) : (
            "Test API Key Again"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
