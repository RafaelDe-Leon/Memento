"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { templates as defaultTemplates } from "@/data/templates"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Check } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
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

// Available icons for templates
const iconOptions = [
  { name: "FileText", icon: FileText },
  { name: "Phone", icon: Phone },
  { name: "Video", icon: Video },
  { name: "Users", icon: Users },
  { name: "Home", icon: Home },
  { name: "Calendar", icon: Calendar },
  { name: "Mail", icon: Mail },
  { name: "MessageSquare", icon: MessageSquare },
  { name: "Clipboard", icon: Clipboard },
  { name: "Building", icon: Building },
  { name: "Map", icon: Map },
  { name: "Briefcase", icon: Briefcase },
]

// Available colors for templates
const colorOptions = [
  { name: "Blue", value: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300" },
  { name: "Green", value: "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300" },
  { name: "Purple", value: "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300" },
  { name: "Amber", value: "bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-300" },
  { name: "Rose", value: "bg-rose-100 text-rose-600 dark:bg-rose-900 dark:text-rose-300" },
  { name: "Indigo", value: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300" },
  { name: "Emerald", value: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-300" },
  { name: "Cyan", value: "bg-cyan-100 text-cyan-600 dark:bg-cyan-900 dark:text-cyan-300" },
  { name: "Fuchsia", value: "bg-fuchsia-100 text-fuchsia-600 dark:bg-fuchsia-900 dark:text-fuchsia-300" },
  { name: "Teal", value: "bg-teal-100 text-teal-600 dark:bg-teal-900 dark:text-teal-300" },
]

interface TemplateFormProps {
  initialData?: any
  isEditing?: boolean
}

export default function TemplateForm({ initialData, isEditing = false }: TemplateFormProps) {
  const router = useRouter()
  const [templates, setTemplates] = useState<any[]>([])
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("basic")

  // Form state
  const [formData, setFormData] = useState({
    id: initialData?.id || `template-${Date.now()}`,
    title: initialData?.title || "",
    description: initialData?.description || "",
    icon: initialData?.icon?.name || "FileText",
    color: initialData?.color || "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300",
    data: {
      contactType: initialData?.data?.contactType || "",
      sessionLocation: initialData?.data?.sessionLocation || "",
      sessionDuration: initialData?.data?.sessionDuration || "",
      contactPurpose: initialData?.data?.contactPurpose || [],
      servicesDiscussed: initialData?.data?.servicesDiscussed || [],
      familyInput: initialData?.data?.familyInput || [],
      actionSteps: initialData?.data?.actionSteps || [],
      followUpNeeded: initialData?.data?.followUpNeeded || [],
      additionalNotes: initialData?.data?.additionalNotes || "",
    },
  })

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

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value })
  }

  // Handle data field changes
  const handleDataChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      data: {
        ...formData.data,
        [field]: value,
      },
    })
  }

  // Handle checkbox changes for array fields
  const handleCheckboxChange = (field: string, value: string, checked: boolean) => {
    const currentValues = formData.data[field] || []

    let newValues
    if (checked) {
      newValues = [...currentValues, value]
    } else {
      newValues = currentValues.filter((item: string) => item !== value)
    }

    handleDataChange(field, newValues)
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccessMessage(null)

    // Validate form
    if (!formData.title) {
      setError("Template title is required")
      return
    }

    try {
      // Create the template object
      const templateObject = {
        ...formData,
        icon: iconOptions.find((icon) => icon.name === formData.icon)?.icon || FileText,
      }

      if (isEditing) {
        // Update existing template
        const updatedTemplates = templates.map((template) => (template.id === formData.id ? templateObject : template))
        setTemplates(updatedTemplates)
        localStorage.setItem("mementoTemplates", JSON.stringify(updatedTemplates))
        setSuccessMessage("Template updated successfully")
      } else {
        // Add new template
        const newTemplates = [...templates, templateObject]
        setTemplates(newTemplates)
        localStorage.setItem("mementoTemplates", JSON.stringify(newTemplates))
        setSuccessMessage("Template created successfully")
      }

      // Reset form if creating a new template
      if (!isEditing) {
        setFormData({
          id: `template-${Date.now()}`,
          title: "",
          description: "",
          icon: "FileText",
          color: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300",
          data: {
            contactType: "",
            sessionLocation: "",
            sessionDuration: "",
            contactPurpose: [],
            servicesDiscussed: [],
            familyInput: [],
            actionSteps: [],
            followUpNeeded: [],
            additionalNotes: "",
          },
        })
      }

      // Redirect after a delay
      setTimeout(() => {
        router.push("/templates")
      }, 1500)
    } catch (error) {
      console.error("Error saving template:", error)
      setError("An error occurred while saving the template")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {successMessage && (
        <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertTitle className="text-green-800 dark:text-green-300">Success</AlertTitle>
          <AlertDescription className="text-green-700 dark:text-green-400">{successMessage}</AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="basic">Basic Information</TabsTrigger>
          <TabsTrigger value="fields">Template Fields</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">
                Template Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter a title for your template"
                className="bg-muted/50 border-primary/20 focus:ring-primary/30"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="icon">Icon</Label>
              <Select value={formData.icon} onValueChange={(value) => handleSelectChange("icon", value)}>
                <SelectTrigger id="icon" className="bg-muted/50 border-primary/20 focus:ring-primary/30">
                  <SelectValue placeholder="Select an icon" />
                </SelectTrigger>
                <SelectContent>
                  {iconOptions.map((icon) => (
                    <SelectItem key={icon.name} value={icon.name}>
                      <div className="flex items-center gap-2">
                        <icon.icon className="h-4 w-4" />
                        <span>{icon.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="color">Color</Label>
              <Select value={formData.color} onValueChange={(value) => handleSelectChange("color", value)}>
                <SelectTrigger id="color" className="bg-muted/50 border-primary/20 focus:ring-primary/30">
                  <SelectValue placeholder="Select a color" />
                </SelectTrigger>
                <SelectContent>
                  {colorOptions.map((color) => (
                    <SelectItem key={color.name} value={color.value}>
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full ${color.value.split(" ")[0]}`}></div>
                        <span>{color.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter a description for your template"
                className="bg-muted/50 border-primary/20 focus:ring-primary/30"
                rows={3}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Template Preview</Label>
            <Card className="border-primary/10 w-full max-w-xs">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`p-2 rounded-md ${formData.color}`}>
                    {(() => {
                      const IconComponent = iconOptions.find((icon) => icon.name === formData.icon)?.icon
                      return IconComponent ? <IconComponent className="h-4 w-4" /> : null
                    })()}
                  </div>
                  <div>
                    <h3 className="text-base font-medium">{formData.title || "Template Title"}</h3>
                    <p className="text-xs text-muted-foreground">{formData.description || "Template description"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="fields" className="space-y-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="contactType">Default Contact Type</Label>
              <Select
                value={formData.data.contactType}
                onValueChange={(value) => handleDataChange("contactType", value)}
              >
                <SelectTrigger id="contactType" className="bg-muted/50 border-primary/20 focus:ring-primary/30">
                  <SelectValue placeholder="Select contact type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Phone Call">Phone Call</SelectItem>
                  <SelectItem value="In-person Meeting">In-person Meeting</SelectItem>
                  <SelectItem value="Email">Email</SelectItem>
                  <SelectItem value="Virtual Meeting">Virtual Meeting</SelectItem>
                  <SelectItem value="Text Message">Text Message</SelectItem>
                  <SelectItem value="Home Visit">Home Visit</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sessionLocation">Default Session Location</Label>
              <Select
                value={formData.data.sessionLocation}
                onValueChange={(value) => handleDataChange("sessionLocation", value)}
              >
                <SelectTrigger id="sessionLocation" className="bg-muted/50 border-primary/20 focus:ring-primary/30">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Home">Home</SelectItem>
                  <SelectItem value="Phone">Phone</SelectItem>
                  <SelectItem value="Virtual">Virtual</SelectItem>
                  <SelectItem value="Office">Office</SelectItem>
                  <SelectItem value="Community Site">Community Site</SelectItem>
                  <SelectItem value="Childcare Center">Childcare Center</SelectItem>
                  <SelectItem value="School">School</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sessionDuration">Default Session Duration</Label>
              <Input
                id="sessionDuration"
                value={formData.data.sessionDuration}
                onChange={(e) => handleDataChange("sessionDuration", e.target.value)}
                placeholder="e.g., 30 minutes"
                className="bg-muted/50 border-primary/20 focus:ring-primary/30"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Default Contact Purpose</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-4 bg-muted/50 rounded-md border border-primary/20">
              {[
                "IFSP Meeting",
                "Service Check-in",
                "Referral Support",
                "Transition Planning",
                "Initial Contact",
                "Follow-up",
                "Crisis Intervention",
                "Resource Coordination",
              ].map((purpose) => (
                <div key={purpose} className="flex items-center space-x-2">
                  <Checkbox
                    id={`contactPurpose-${purpose.toLowerCase().replace(/\s+/g, "-")}`}
                    checked={formData.data.contactPurpose.includes(purpose)}
                    onCheckedChange={(checked) => handleCheckboxChange("contactPurpose", purpose, checked as boolean)}
                  />
                  <Label
                    htmlFor={`contactPurpose-${purpose.toLowerCase().replace(/\s+/g, "-")}`}
                    className="font-normal"
                  >
                    {purpose}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Default Services/Concerns Discussed</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-4 bg-muted/50 rounded-md border border-primary/20">
              {[
                "Therapy Access",
                "Scheduling",
                "Family Concerns",
                "Developmental Concerns",
                "Financial Assistance",
                "Equipment Needs",
                "Childcare",
                "Medical Needs",
                "Housing",
                "Transportation",
              ].map((service) => (
                <div key={service} className="flex items-center space-x-2">
                  <Checkbox
                    id={`servicesDiscussed-${service.toLowerCase().replace(/\s+/g, "-")}`}
                    checked={formData.data.servicesDiscussed.includes(service)}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange("servicesDiscussed", service, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={`servicesDiscussed-${service.toLowerCase().replace(/\s+/g, "-")}`}
                    className="font-normal"
                  >
                    {service}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Default Family Input/Concerns</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-4 bg-muted/50 rounded-md border border-primary/20">
              {[
                "Satisfaction with Services",
                "New Concerns",
                "Changes in Routines",
                "Progress Updates",
                "Challenges with Services",
                "Questions about Development",
                "Resource Needs",
                "Family Stressors",
              ].map((input) => (
                <div key={input} className="flex items-center space-x-2">
                  <Checkbox
                    id={`familyInput-${input.toLowerCase().replace(/\s+/g, "-")}`}
                    checked={formData.data.familyInput.includes(input)}
                    onCheckedChange={(checked) => handleCheckboxChange("familyInput", input, checked as boolean)}
                  />
                  <Label htmlFor={`familyInput-${input.toLowerCase().replace(/\s+/g, "-")}`} className="font-normal">
                    {input}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Default Action Steps</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-4 bg-muted/50 rounded-md border border-primary/20">
              {[
                "Made Referrals",
                "Scheduled a Meeting",
                "Followed Up with Provider",
                "Provided Resources",
                "Updated IFSP",
                "Coordinated Services",
                "Addressed Concerns",
                "Provided Information",
              ].map((step) => (
                <div key={step} className="flex items-center space-x-2">
                  <Checkbox
                    id={`actionSteps-${step.toLowerCase().replace(/\s+/g, "-")}`}
                    checked={formData.data.actionSteps.includes(step)}
                    onCheckedChange={(checked) => handleCheckboxChange("actionSteps", step, checked as boolean)}
                  />
                  <Label htmlFor={`actionSteps-${step.toLowerCase().replace(/\s+/g, "-")}`} className="font-normal">
                    {step}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Default Follow-Up Needed</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-4 bg-muted/50 rounded-md border border-primary/20">
              {[
                "Update IFSP",
                "Check Back with Family",
                "Coordinate Transition",
                "Schedule Evaluation",
                "Contact Provider",
                "Send Resources",
                "Schedule Next Meeting",
                "No Follow-up Needed",
              ].map((followUp) => (
                <div key={followUp} className="flex items-center space-x-2">
                  <Checkbox
                    id={`followUpNeeded-${followUp.toLowerCase().replace(/\s+/g, "-")}`}
                    checked={formData.data.followUpNeeded.includes(followUp)}
                    onCheckedChange={(checked) => handleCheckboxChange("followUpNeeded", followUp, checked as boolean)}
                  />
                  <Label
                    htmlFor={`followUpNeeded-${followUp.toLowerCase().replace(/\s+/g, "-")}`}
                    className="font-normal"
                  >
                    {followUp}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalNotes">Default Additional Notes</Label>
            <Textarea
              id="additionalNotes"
              value={formData.data.additionalNotes}
              onChange={(e) => handleDataChange("additionalNotes", e.target.value)}
              placeholder="Enter any default additional notes"
              className="bg-muted/50 border-primary/20 focus:ring-primary/30"
              rows={3}
            />
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.push("/templates")}>
          Cancel
        </Button>
        <Button type="submit">{isEditing ? "Update Template" : "Create Template"}</Button>
      </div>
    </form>
  )
}
