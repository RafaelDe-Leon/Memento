import Header from "@/components/header"
import TemplateForm from "@/components/templates/template-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CreateTemplatePage() {
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
            Create New Template
          </h1>
          <p className="text-muted-foreground mb-8">Design a custom template for your professional notes</p>

          <TemplateForm />
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
