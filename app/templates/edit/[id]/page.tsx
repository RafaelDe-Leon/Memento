"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import TemplateForm from "@/components/templates/template-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { templates } from "@/data/templates"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function EditTemplatePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [template, setTemplate] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Find the template with the matching ID
    const foundTemplate = templates.find((t) => t.id === params.id)

    if (foundTemplate) {
      setTemplate(foundTemplate)
    } else {
      setError("Template not found")
    }

    setLoading(false)
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/30 dark:from-background dark:to-background">
        <Header />
        <main className="container mx-auto py-8 px-4 flex-1">
          <div className="flex items-center justify-center h-[60vh]">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        </main>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/30 dark:from-background dark:to-background">
        <Header />
        <main className="container mx-auto py-8 px-4 flex-1">
          <div className="mb-6">
            <Button variant="outline" className="flex items-center gap-2" asChild>
              <Link href="/templates">
                <ArrowLeft className="h-4 w-4" /> Back to Templates
              </Link>
            </Button>
          </div>

          <Alert variant="destructive" className="max-w-md mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/30 dark:from-background dark:to-background">
      <Header />
      <main className="container mx-auto py-8 px-4 flex-1">
        <div className="mb-6">
          <Button variant="outline" className="flex items-center gap-2" asChild>
            <Link href="/templates">
              <ArrowLeft className="h-4 w-4" /> Back to Templates
            </Link>
          </Button>
        </div>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Edit Template
          </h1>
          <p className="text-muted-foreground mb-8">Customize this template to better fit your needs</p>

          <TemplateForm initialData={template} isEditing />
        </div>
      </main>
      <footer className="py-4 border-t bg-muted/30">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          © 2023 Memento. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
