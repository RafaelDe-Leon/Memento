import Header from "@/components/header"
import TemplatesList from "@/components/templates/templates-list"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export default function TemplatesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/30 dark:from-background dark:to-background">
      <Header />
      <main className="container mx-auto py-8 px-4 flex-1">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Templates
            </h1>
            <p className="text-muted-foreground">Browse, create, and customize templates for your professional notes</p>
          </div>
          <Button asChild className="flex items-center gap-2">
            <Link href="/templates/create">
              <PlusCircle className="h-4 w-4" />
              Create Template
            </Link>
          </Button>
        </div>

        <TemplatesList />
      </main>
      <footer className="py-4 border-t bg-muted/30">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          © 2023 Memento. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
