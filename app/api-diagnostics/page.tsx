import ApiKeyTester from "@/components/api-key-tester"
import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ApiDiagnosticsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/30 dark:from-background dark:to-background">
      <Header />
      <main className="container mx-auto py-8 px-4 flex-1">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            API Key Diagnostics
          </h1>
          <p className="text-muted-foreground mb-8">
            This page helps diagnose issues with your OpenAI API key configuration.
          </p>

          <div className="mb-8">
            <ApiKeyTester />
          </div>

          <div className="space-y-6">
            <div className="bg-muted/50 p-6 rounded-lg border border-primary/10">
              <h2 className="text-xl font-semibold mb-4">Troubleshooting Steps</h2>
              <ol className="list-decimal ml-5 space-y-3">
                <li>
                  <strong>Check your API key format:</strong> Make sure your API key starts with "sk-" and is the
                  correct length.
                </li>
                <li>
                  <strong>Verify environment variables:</strong> In Vercel, go to your project settings and check that
                  the OPENAI_API_KEY environment variable is set correctly.
                </li>
                <li>
                  <strong>Check for whitespace:</strong> Ensure there are no extra spaces before or after your API key.
                </li>
                <li>
                  <strong>Redeploy your application:</strong> After updating environment variables, redeploy your
                  application to ensure the changes take effect.
                </li>
                <li>
                  <strong>Check API key permissions:</strong> Make sure your OpenAI API key has the necessary
                  permissions to use the models you're trying to access.
                </li>
                <li>
                  <strong>Verify API key billing:</strong> Ensure your OpenAI account has valid billing information and
                  sufficient credits.
                </li>
              </ol>
            </div>

            <div className="flex justify-center">
              <Button asChild>
                <Link href="/dashboard">Return to Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
