"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"
import { useRouter } from "next/navigation"
import { templates } from "@/data/templates"

export default function TemplateShortcuts() {
  const router = useRouter()
  const [isApplying, setIsApplying] = useState<string | null>(null)

  const applyTemplate = (templateId: string) => {
    setIsApplying(templateId)

    const template = templates.find((t) => t.id === templateId)
    if (template) {
      // Store the complete template data in localStorage
      localStorage.setItem("mementoTemplate", JSON.stringify(template.data))

      // Dispatch a custom event to notify the form that a template has been selected
      window.dispatchEvent(
        new CustomEvent("templateSelected", {
          detail: { templateId, templateData: template.data },
        }),
      )

      // Simulate a delay before redirecting or updating UI
      setTimeout(() => {
        setIsApplying(null)
        // Scroll to the form
        window.scrollTo({
          top: document.getElementById("note-generator")?.offsetTop || 0,
          behavior: "smooth",
        })
      }, 500)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {templates.map((template) => (
        <Card key={template.id} className="border-primary/10 hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <div className={`p-2 rounded-md ${template.color}`}>
                <template.icon className="h-4 w-4" />
              </div>
              <CardTitle className="text-base">{template.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <CardDescription>{template.description}</CardDescription>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs border-primary/20 hover:bg-primary/5"
              onClick={() => applyTemplate(template.id)}
              disabled={isApplying !== null}
            >
              {isApplying === template.id ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-primary"
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
                  Applying...
                </span>
              ) : (
                <span className="flex items-center">
                  <FileText className="mr-1 h-3 w-3" />
                  Use Template
                </span>
              )}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
