import { Suspense } from "react"
import NoteGenerator from "@/components/note-generator"
import Header from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, MessageSquare, ArrowRight } from "lucide-react"
import Link from "next/link"
import TemplateShortcuts from "@/components/template-shortcuts"

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/30 dark:from-background dark:to-background">
      <Header />
      <main className="container mx-auto py-8 px-4 flex-1">
        {/* Beta Welcome Hero */}
        <Card className="mb-8 border-primary/20 bg-primary/5">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="bg-primary/20 p-2 rounded-full">
                  <AlertCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-1">Welcome to Memento Beta Early Access</h2>
                  <p className="text-muted-foreground">
                    Thank you for trying our early access version. We're actively improving the platform based on user
                    feedback.
                  </p>
                </div>
              </div>
              <Button asChild className="whitespace-nowrap">
                <Link href="/feedback">
                  Leave Feedback <MessageSquare className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Professional Note Generator
        </h1>
        <p className="text-muted-foreground mb-8">Create detailed professional notes with AI assistance</p>

        {/* Template Shortcuts */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Quick Templates</h2>
            <Button variant="ghost" size="sm" className="text-primary" asChild>
              <Link href="/templates">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <TemplateShortcuts />
        </div>

        <Suspense fallback={<div className="p-8 text-center">Loading note generator...</div>}>
          <NoteGenerator />
        </Suspense>
      </main>
      <footer className="py-4 border-t bg-muted/30">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          © 2023 Memento. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
