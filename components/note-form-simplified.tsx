"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { checkboxGroups, type CheckboxGroup } from "@/data/checkboxGroups"

interface NoteFormProps {
  onGenerateNote: (note: string) => void
  onStartGeneration?: () => void
  onError?: (error: string) => void
  isGenerating?: boolean
}

export default function NoteFormSimplified({
  onGenerateNote,
  onStartGeneration = () => {},
  onError = () => {},
  isGenerating = false,
}: NoteFormProps) {
  const [formData, setFormData] = useState({
    childName: "",
    sessionDate: "",
    sessionDuration: "",
    sessionLocation: "",
    contactType: "",
    contactPurpose: [] as string[],
    servicesDiscussed: [] as string[],
    familyInput: [] as string[],
    actionSteps: [] as string[],
    followUpNeeded: [] as string[],
    additionalNotes: "",
  })

  const [validationError, setValidationError] = useState<string | null>(null)

  // Listen for template selection events
  useEffect(() => {
    const handleTemplateSelected = (event: CustomEvent) => {
      const templateData = event.detail.templateData
      if (templateData) {
        setFormData({
          childName: templateData.childName || "",
          sessionDate: templateData.sessionDate || "",
          sessionDuration: templateData.sessionDuration || "",
          sessionLocation: templateData.sessionLocation || "",
          contactType: templateData.contactType || "",
          contactPurpose: templateData.contactPurpose || [],
          servicesDiscussed: templateData.servicesDiscussed || [],
          familyInput: templateData.familyInput || [],
          actionSteps: templateData.actionSteps || [],
          followUpNeeded: templateData.followUpNeeded || [],
          additionalNotes: templateData.additionalNotes || "",
        })
      }
    }

    // Add event listener
    window.addEventListener("templateSelected", handleTemplateSelected as EventListener)

    // Check for existing template data on mount
    const existingTemplate = localStorage.getItem("mementoTemplate")
    if (existingTemplate) {
      try {
        const templateData = JSON.parse(existingTemplate)
        setFormData({
          childName: templateData.childName || "",
          sessionDate: templateData.sessionDate || "",
          sessionDuration: templateData.sessionDuration || "",
          sessionLocation: templateData.sessionLocation || "",
          contactType: templateData.contactType || "",
          contactPurpose: templateData.contactPurpose || [],
          servicesDiscussed: templateData.servicesDiscussed || [],
          familyInput: templateData.familyInput || [],
          actionSteps: templateData.actionSteps || [],
          followUpNeeded: templateData.followUpNeeded || [],
          additionalNotes: templateData.additionalNotes || "",
        })
        // Clear the template from localStorage after using it
        localStorage.removeItem("mementoTemplate")
      } catch (error) {
        console.error("Error parsing template data:", error)
      }
    }

    // Cleanup event listener
    return () => {
      window.removeEventListener("templateSelected", handleTemplateSelected as EventListener)
    }
  }, [])

  // Generic handler for text inputs
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Generic handler for checkbox arrays
  const handleCheckboxChange = (field: string, value: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: checked
        ? [...(prev[field as keyof typeof prev] as string[]), value]
        : (prev[field as keyof typeof prev] as string[]).filter((item) => item !== value),
    }))
  }

  // Validation
  const validateForm = () => {
    const requiredFields = [
      { field: "childName", message: "Please enter the child's name" },
      { field: "sessionDate", message: "Please select the session date" },
      { field: "sessionLocation", message: "Please select the location of session" },
      { field: "contactType", message: "Please select the type of contact" },
    ]

    for (const { field, message } of requiredFields) {
      if (!formData[field as keyof typeof formData]) {
        setValidationError(message)
        return false
      }
    }

    // Check required checkbox groups
    for (const [key, config] of Object.entries(checkboxGroups)) {
      if (config.required && (formData[key as keyof typeof formData] as string[]).length === 0) {
        setValidationError(`Please select at least one ${config.label.toLowerCase()}`)
        return false
      }
    }

    setValidationError(null)
    return true
  }

  const generateNote = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })

    if (!validateForm()) return

    onStartGeneration()

    const note = `**Service Coordination Note**

**Child's Name:** ${formData.childName}
**Session Date:** ${formData.sessionDate}
**Session Duration:** ${formData.sessionDuration || "45 minutes"}
**Location of Session:** ${formData.sessionLocation}
**Type of Contact:** ${formData.contactType}

**Purpose of Contact:**
${formData.contactPurpose.map((item) => `- ${item}`).join("\n")}

**Services/Concerns Discussed:**
${formData.servicesDiscussed.map((item) => `- ${item}`).join("\n")}

**Family Input/Concerns:**
${formData.familyInput.map((item) => `- ${item}`).join("\n")}

**Action Steps Taken:**
${formData.actionSteps.map((item) => `- ${item}`).join("\n")}

**Follow-Up Needed:**
${formData.followUpNeeded.map((item) => `- ${item}`).join("\n")}

**Overview of Note:**
I conducted a ${formData.contactType.toLowerCase()} with the family of ${formData.childName} to discuss their early intervention services. We focused on ${formData.servicesDiscussed.join(", ")}. The family shared information about ${formData.familyInput.join(", ")}. I ${formData.actionSteps.join(" and ")}. For follow-up, I will ${formData.followUpNeeded.join(" and ")}.

${formData.additionalNotes ? `**Additional Notes:**\n${formData.additionalNotes}` : ""}

This note was generated as a sample response.`

    setTimeout(() => onGenerateNote(note), 1000)
  }

  // Reusable checkbox group component
  const CheckboxGroup = ({ groupKey, config }: { groupKey: string; config: CheckboxGroup }) => (
    <div className="space-y-2">
      <Label className="text-base font-medium text-foreground">
        {config.label} {config.required && <span className="text-red-500">*</span>}
      </Label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-4 bg-muted/50 rounded-md border border-primary/20">
        {config.options.map((option) => (
          <div key={option} className="flex items-center space-x-2">
            <Checkbox
              id={`${groupKey}-${option}`}
              checked={(formData[groupKey as keyof typeof formData] as string[]).includes(option)}
              onCheckedChange={(checked) => handleCheckboxChange(groupKey, option, checked as boolean)}
            />
            <Label htmlFor={`${groupKey}-${option}`} className="font-normal">
              {option}
            </Label>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {validationError && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Required Fields Missing</AlertTitle>
          <AlertDescription>{validationError}</AlertDescription>
        </Alert>
      )}

      {/* Basic Info */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="childName" className="text-base font-medium text-foreground">
            Child's Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="childName"
            value={formData.childName}
            onChange={(e) => handleInputChange("childName", e.target.value)}
            placeholder="Enter child's name"
            className="bg-muted/50 border-primary/20 focus:ring-primary/30"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="sessionDate" className="text-base font-medium text-foreground">
            Session Date <span className="text-red-500">*</span>
          </Label>
          <Input
            id="sessionDate"
            type="date"
            value={formData.sessionDate}
            onChange={(e) => handleInputChange("sessionDate", e.target.value)}
            className="bg-muted/50 border-primary/20 focus:ring-primary/30"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="sessionDuration" className="text-base font-medium text-foreground">
            Session Duration <span className="text-gray-400 text-sm">(optional)</span>
          </Label>
          <Input
            id="sessionDuration"
            value={formData.sessionDuration}
            onChange={(e) => handleInputChange("sessionDuration", e.target.value)}
            placeholder="e.g., 30 minutes"
            className="bg-muted/50 border-primary/20 focus:ring-primary/30"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="sessionLocation" className="text-base font-medium text-foreground">
            Location of Session <span className="text-red-500">*</span>
          </Label>
          <Select
            value={formData.sessionLocation}
            onValueChange={(value) => handleInputChange("sessionLocation", value)}
          >
            <SelectTrigger className="bg-muted/50 border-primary/20 focus:ring-primary/30">
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              {["Home", "Phone", "Virtual", "Office", "Community Site", "Childcare Center", "School"].map(
                (location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ),
              )}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contactType" className="text-base font-medium text-foreground">
          Type of Contact <span className="text-red-500">*</span>
        </Label>
        <Select value={formData.contactType} onValueChange={(value) => handleInputChange("contactType", value)}>
          <SelectTrigger className="bg-muted/50 border-primary/20 focus:ring-primary/30">
            <SelectValue placeholder="Select contact type" />
          </SelectTrigger>
          <SelectContent>
            {["Phone Call", "In-person Meeting", "Email", "Virtual Meeting", "Text Message", "Home Visit"].map(
              (type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ),
            )}
          </SelectContent>
        </Select>
      </div>

      {/* Dynamic Checkbox Groups */}
      {Object.entries(checkboxGroups).map(([key, config]) => (
        <CheckboxGroup key={key} groupKey={key} config={config} />
      ))}

      <div className="space-y-2">
        <Label htmlFor="additionalNotes" className="text-base font-medium text-foreground">
          Additional Notes <span className="text-gray-400 text-sm">(optional)</span>
        </Label>
        <Textarea
          id="additionalNotes"
          value={formData.additionalNotes}
          onChange={(e) => handleInputChange("additionalNotes", e.target.value)}
          placeholder="Enter any additional notes"
          rows={3}
          className="bg-muted/50 border-primary/20 focus:ring-primary/30"
        />
      </div>

      <Button
        onClick={generateNote}
        className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground shadow-md transition-all hover:shadow-lg"
        disabled={isGenerating}
      >
        {isGenerating ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Generating Note...
          </span>
        ) : (
          "Generate Note"
        )}
      </Button>
    </div>
  )
}
