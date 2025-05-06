"use client"

import { useState, useEffect } from "react"
import { templates as defaultTemplates } from "@/data/templates"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Edit,
  Copy,
  Trash2,
  FileText,
  Phone,
  Video,
  Users,
  Home,
  Calendar,
  Mail,
  MessageSquare,
  Clipboard,
  Building,
  Map,
  Briefcase,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function TemplatesList() {
  const router = useRouter()
  const [templates, setTemplates] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [deleteTemplateId, setDeleteTemplateId] = useState<string | null>(null)
  const [duplicateTemplate, setDuplicateTemplate] = useState<any | null>(null)
  const [newTemplateName, setNewTemplateName] = useState("")

  // Load templates from localStorage if available, otherwise use default templates
  useEffect(() => {
    const storedTemplates = localStorage.getItem("mementoTemplates")
    if (storedTemplates) {
      try {
        setTemplates(JSON.parse(storedTemplates))
      } catch (error) {
        console.error("Error parsing stored templates:", error)
        setTemplates(defaultTemplates)
      }
    } else {
      setTemplates(defaultTemplates)
    }
  }, [])

  // Save templates to localStorage whenever they change
  useEffect(() => {
    if (templates.length > 0) {
      localStorage.setItem("mementoTemplates", JSON.stringify(templates))
    }
  }, [templates])

  // Filter templates based on search query
  const filteredTemplates = templates.filter(
    (template) =>
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Handle template deletion
  const handleDeleteTemplate = (id: string) => {
    setTemplates(templates.filter((template) => template.id !== id))
    setDeleteTemplateId(null)
  }

  // Handle template duplication
  const handleDuplicateTemplate = () => {
    if (!duplicateTemplate) return

    const newTemplate = {
      ...duplicateTemplate,
      id: `${duplicateTemplate.id}-copy-${Date.now()}`,
      title: newTemplateName || `${duplicateTemplate.title} (Copy)`,
    }

    setTemplates([...templates, newTemplate])
    setDuplicateTemplate(null)
    setNewTemplateName("")
  }

  // Apply a template
  const applyTemplate = (templateId: string) => {
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

      // Navigate to dashboard
      router.push("/dashboard")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <Input
          placeholder="Search templates..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
        <div className="text-sm text-muted-foreground">
          {filteredTemplates.length} template{filteredTemplates.length !== 1 ? "s" : ""} found
        </div>
      </div>

      {filteredTemplates.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
            <FileText className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">No templates found</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery ? "Try a different search term" : "Create your first template to get started"}
          </p>
          {searchQuery ? (
            <Button variant="outline" onClick={() => setSearchQuery("")}>
              Clear search
            </Button>
          ) : (
            <Button asChild>
              <Link href="/templates/create">Create Template</Link>
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="border-primary/10 hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`p-2 rounded-md ${template.color || "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"}`}
                  >
                    {(() => {
                      // Map icon names to actual components
                      const iconMap = {
                        FileText,
                        Phone,
                        Video,
                        Users,
                        Home,
                        Calendar,
                        Mail,
                        MessageSquare,
                        Clipboard,
                        Building,
                        Map,
                        Briefcase,
                      }

                      // Get the icon name from the template
                      const iconName =
                        typeof template.icon === "object" && template.icon !== null
                          ? template.icon.name
                          : typeof template.icon === "string"
                            ? template.icon
                            : "FileText"

                      // Get the component from the map
                      const IconComponent = iconMap[iconName] || FileText

                      // Render the icon component
                      return <IconComponent className="h-4 w-4" />
                    })()}
                  </div>
                  <CardTitle className="text-base">{template.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <CardDescription>{template.description}</CardDescription>
              </CardContent>
              <CardFooter className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-xs border-primary/20 hover:bg-primary/5"
                  onClick={() => applyTemplate(template.id)}
                >
                  <FileText className="mr-1 h-3 w-3" />
                  Use
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-xs border-primary/20 hover:bg-primary/5"
                  asChild
                >
                  <Link href={`/templates/edit/${template.id}`}>
                    <Edit className="mr-1 h-3 w-3" />
                    Edit
                  </Link>
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-xs border-primary/20 hover:bg-primary/5"
                      onClick={() => setDuplicateTemplate(template)}
                    >
                      <Copy className="mr-1 h-3 w-3" />
                      Duplicate
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Duplicate Template</DialogTitle>
                      <DialogDescription>Create a copy of this template with a new name.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="template-name">Template Name</Label>
                        <Input
                          id="template-name"
                          placeholder="Enter template name"
                          value={newTemplateName}
                          onChange={(e) => setNewTemplateName(e.target.value)}
                          defaultValue={duplicateTemplate?.title ? `${duplicateTemplate.title} (Copy)` : ""}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button onClick={handleDuplicateTemplate}>Duplicate</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-xs border-destructive/20 text-destructive hover:bg-destructive/5"
                      onClick={() => setDeleteTemplateId(template.id)}
                    >
                      <Trash2 className="mr-1 h-3 w-3" />
                      Delete
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete Template</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to delete this template? This action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button variant="destructive" onClick={() => handleDeleteTemplate(deleteTemplateId || "")}>
                        Delete
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
