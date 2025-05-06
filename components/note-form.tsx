"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import React from "react"

interface NoteFormProps {
  onGenerateNote: (note: string) => void
  onStartGeneration?: () => void
  onError?: (error: string) => void
  isGenerating?: boolean
}

export default function NoteForm({
  onGenerateNote,
  onStartGeneration = () => {},
  onError = () => {},
  isGenerating = false,
}: NoteFormProps) {
  const [validationError, setValidationError] = useState<string | null>(null)

  // Form fields
  const [childName, setChildName] = useState("")
  const [sessionDate, setSessionDate] = useState("")
  const [sessionDuration, setSessionDuration] = useState("")
  const [sessionLocation, setSessionLocation] = useState("")
  const [contactType, setContactType] = useState("")
  const [contactPurpose, setContactPurpose] = useState<string[]>([])
  const [servicesDiscussed, setServicesDiscussed] = useState<string[]>([])
  const [familyInput, setFamilyInput] = useState<string[]>([])
  const [actionSteps, setActionSteps] = useState<string[]>([])
  const [followUpNeeded, setFollowUpNeeded] = useState<string[]>([])
  const [additionalNotes, setAdditionalNotes] = useState("")

  // Check for template data in localStorage when component mounts
  React.useEffect(() => {
    const handleTemplateSelected = () => {
      const storedTemplate = localStorage.getItem("mementoTemplate")
      if (storedTemplate) {
        try {
          const templateData = JSON.parse(storedTemplate)
          console.log("Applying template data:", templateData)

          // Apply template data to form fields
          if (templateData.contactType) setContactType(templateData.contactType)
          if (templateData.contactPurpose) setContactPurpose(templateData.contactPurpose)
          if (templateData.servicesDiscussed) setServicesDiscussed(templateData.servicesDiscussed)
          if (templateData.familyInput) setFamilyInput(templateData.familyInput)
          if (templateData.actionSteps) setActionSteps(templateData.actionSteps)
          if (templateData.followUpNeeded) setFollowUpNeeded(templateData.followUpNeeded)
          if (templateData.sessionLocation) setSessionLocation(templateData.sessionLocation)
          if (templateData.sessionDuration) setSessionDuration(templateData.sessionDuration)
          if (templateData.additionalNotes) setAdditionalNotes(templateData.additionalNotes)

          // Clear the template from localStorage after applying
          localStorage.removeItem("mementoTemplate")
        } catch (error) {
          console.error("Error applying template:", error)
        }
      }
    }

    // Check for template data on initial load
    handleTemplateSelected()

    // Listen for template selection events
    window.addEventListener("templateSelected", handleTemplateSelected)

    // Clean up event listener
    return () => {
      window.removeEventListener("templateSelected", handleTemplateSelected)
    }
  }, []) // Empty dependency array ensures this only runs once on mount

  // Function to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  // Validate form
  const validateForm = () => {
    if (!childName) {
      setValidationError("Please enter the child's name")
      return false
    }
    if (!sessionDate) {
      setValidationError("Please select the session date")
      return false
    }
    if (!sessionLocation) {
      setValidationError("Please select the location of session")
      return false
    }
    if (!contactType) {
      setValidationError("Please select the type of contact")
      return false
    }
    if (contactPurpose.length === 0) {
      setValidationError("Please select at least one purpose of the contact")
      return false
    }
    if (servicesDiscussed.length === 0) {
      setValidationError("Please select at least one service or concern discussed")
      return false
    }
    if (familyInput.length === 0) {
      setValidationError("Please select at least one family input/concern")
      return false
    }
    if (actionSteps.length === 0) {
      setValidationError("Please select at least one action step taken")
      return false
    }
    if (followUpNeeded.length === 0) {
      setValidationError("Please select at least one follow-up needed")
      return false
    }

    setValidationError(null)
    return true
  }

  // Generate a sample note directly without API calls
  const generateSampleNote = () => {
    // Scroll to top immediately after button click, regardless of validation result
    scrollToTop()

    // Validate form
    if (!validateForm()) {
      return
    }

    onStartGeneration()

    // Create a sample note using the form data
    const sampleNote = `**Service Coordination Note**

**Child's Name:** ${childName}

**Session Date:** ${sessionDate}

**Session Duration:** ${sessionDuration || "45 minutes"}

**Location of Session:** ${sessionLocation}

**Type of Contact:** ${contactType}

**Purpose of Contact:**
${contactPurpose.map((purpose) => `- ${purpose}`).join("\n")}

**Services/Concerns Discussed:**
${servicesDiscussed.map((service) => `- ${service}`).join("\n")}

**Family Input/Concerns:**
${familyInput.map((input) => `- ${input}`).join("\n")}

**Action Steps Taken:**
${actionSteps.map((step) => `- ${step}`).join("\n")}

**Follow-Up Needed:**
${followUpNeeded.map((followUp) => `- ${followUp}`).join("\n")}

**Overview of Note:**
I conducted a ${contactType.toLowerCase()} with the family of ${childName} to discuss their early intervention services. We focused on ${servicesDiscussed.join(", ")}. The family shared information about ${familyInput.join(", ")}. I ${actionSteps.join(" and ")}. For follow-up, I will ${followUpNeeded.join(" and ")}.

${additionalNotes ? `**Additional Notes:**\n${additionalNotes}` : ""}

This note was generated as a sample response.`

    // Wait a moment to simulate processing time
    setTimeout(() => {
      onGenerateNote(sampleNote)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      {validationError && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Required Fields Missing</AlertTitle>
          <AlertDescription>{validationError}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="childName" className="text-base font-medium text-foreground">
          Child's Name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="childName"
          value={childName}
          onChange={(e) => setChildName(e.target.value)}
          placeholder="What is the full name of the child receiving early intervention services?"
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
          value={sessionDate}
          onChange={(e) => setSessionDate(e.target.value)}
          className="bg-muted/50 border-primary/20 focus:ring-primary/30"
          placeholder="What date did the coordination session/contact occur?"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="sessionDuration" className="text-base font-medium text-foreground">
          Session Duration <span className="text-gray-400 text-sm">(optional)</span>
        </Label>
        <Input
          id="sessionDuration"
          value={sessionDuration}
          onChange={(e) => setSessionDuration(e.target.value)}
          placeholder="How long did the session/contact last?"
          className="bg-muted/50 border-primary/20 focus:ring-primary/30"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="sessionLocation" className="text-base font-medium text-foreground">
          Location of Session <span className="text-red-500">*</span>
        </Label>
        <Select value={sessionLocation} onValueChange={setSessionLocation}>
          <SelectTrigger id="sessionLocation" className="bg-muted/50 border-primary/20 focus:ring-primary/30">
            <SelectValue placeholder="Where did the session/contact take place?" />
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
        <Label htmlFor="contactType" className="text-base font-medium text-foreground">
          Type of Contact <span className="text-red-500">*</span>
        </Label>
        <Select value={contactType} onValueChange={setContactType}>
          <SelectTrigger id="contactType" className="bg-muted/50 border-primary/20 focus:ring-primary/30">
            <SelectValue placeholder="What kind of contact was this?" />
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
        <Label htmlFor="contactPurpose" className="text-base font-medium text-foreground">
          Purpose of the Contact <span className="text-red-500">*</span>
        </Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-4 bg-muted/50 rounded-md border border-primary/20">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="contactPurpose-ifsp"
              checked={contactPurpose.includes("IFSP Meeting")}
              onCheckedChange={(checked) => {
                if (checked) {
                  setContactPurpose([...contactPurpose, "IFSP Meeting"])
                } else {
                  setContactPurpose(contactPurpose.filter((item) => item !== "IFSP Meeting"))
                }
              }}
            />
            <Label htmlFor="contactPurpose-ifsp" className="font-normal">
              IFSP Meeting
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="contactPurpose-checkin"
              checked={contactPurpose.includes("Service Check-in")}
              onCheckedChange={(checked) => {
                if (checked) {
                  setContactPurpose([...contactPurpose, "Service Check-in"])
                } else {
                  setContactPurpose(contactPurpose.filter((item) => item !== "Service Check-in"))
                }
              }}
            />
            <Label htmlFor="contactPurpose-checkin" className="font-normal">
              Service Check-in
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="contactPurpose-referral"
              checked={contactPurpose.includes("Referral Support")}
              onCheckedChange={(checked) => {
                if (checked) {
                  setContactPurpose([...contactPurpose, "Referral Support"])
                } else {
                  setContactPurpose(contactPurpose.filter((item) => item !== "Referral Support"))
                }
              }}
            />
            <Label htmlFor="contactPurpose-referral" className="font-normal">
              Referral Support
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="contactPurpose-transition"
              checked={contactPurpose.includes("Transition Planning")}
              onCheckedChange={(checked) => {
                if (checked) {
                  setContactPurpose([...contactPurpose, "Transition Planning"])
                } else {
                  setContactPurpose(contactPurpose.filter((item) => item !== "Transition Planning"))
                }
              }}
            />
            <Label htmlFor="contactPurpose-transition" className="font-normal">
              Transition Planning
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="contactPurpose-initial"
              checked={contactPurpose.includes("Initial Contact")}
              onCheckedChange={(checked) => {
                if (checked) {
                  setContactPurpose([...contactPurpose, "Initial Contact"])
                } else {
                  setContactPurpose(contactPurpose.filter((item) => item !== "Initial Contact"))
                }
              }}
            />
            <Label htmlFor="contactPurpose-initial" className="font-normal">
              Initial Contact
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="contactPurpose-followup"
              checked={contactPurpose.includes("Follow-up")}
              onCheckedChange={(checked) => {
                if (checked) {
                  setContactPurpose([...contactPurpose, "Follow-up"])
                } else {
                  setContactPurpose(contactPurpose.filter((item) => item !== "Follow-up"))
                }
              }}
            />
            <Label htmlFor="contactPurpose-followup" className="font-normal">
              Follow-up
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="contactPurpose-crisis"
              checked={contactPurpose.includes("Crisis Intervention")}
              onCheckedChange={(checked) => {
                if (checked) {
                  setContactPurpose([...contactPurpose, "Crisis Intervention"])
                } else {
                  setContactPurpose(contactPurpose.filter((item) => item !== "Crisis Intervention"))
                }
              }}
            />
            <Label htmlFor="contactPurpose-crisis" className="font-normal">
              Crisis Intervention
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="contactPurpose-resource"
              checked={contactPurpose.includes("Resource Coordination")}
              onCheckedChange={(checked) => {
                if (checked) {
                  setContactPurpose([...contactPurpose, "Resource Coordination"])
                } else {
                  setContactPurpose(contactPurpose.filter((item) => item !== "Resource Coordination"))
                }
              }}
            />
            <Label htmlFor="contactPurpose-resource" className="font-normal">
              Resource Coordination
            </Label>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="servicesDiscussed" className="text-base font-medium text-foreground">
          Services or Concerns Discussed <span className="text-red-500">*</span>
        </Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-4 bg-muted/50 rounded-md border border-primary/20">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="servicesDiscussed-therapy"
              checked={servicesDiscussed.includes("Therapy Access")}
              onCheckedChange={(checked) => {
                if (checked) {
                  setServicesDiscussed([...servicesDiscussed, "Therapy Access"])
                } else {
                  setServicesDiscussed(servicesDiscussed.filter((item) => item !== "Therapy Access"))
                }
              }}
            />
            <Label htmlFor="servicesDiscussed-therapy" className="font-normal">
              Therapy Access
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="servicesDiscussed-scheduling"
              checked={servicesDiscussed.includes("Scheduling")}
              onCheckedChange={(checked) => {
                if (checked) {
                  setServicesDiscussed([...servicesDiscussed, "Scheduling"])
                } else {
                  setServicesDiscussed(servicesDiscussed.filter((item) => item !== "Scheduling"))
                }
              }}
            />
            <Label htmlFor="servicesDiscussed-scheduling" className="font-normal">
              Scheduling
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="servicesDiscussed-family"
              checked={servicesDiscussed.includes("Family Concerns")}
              onCheckedChange={(checked) => {
                if (checked) {
                  setServicesDiscussed([...servicesDiscussed, "Family Concerns"])
                } else {
                  setServicesDiscussed(servicesDiscussed.filter((item) => item !== "Family Concerns"))
                }
              }}
            />
            <Label htmlFor="servicesDiscussed-family" className="font-normal">
              Family Concerns
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="servicesDiscussed-development"
              checked={servicesDiscussed.includes("Developmental Concerns")}
              onCheckedChange={(checked) => {
                if (checked) {
                  setServicesDiscussed([...servicesDiscussed, "Developmental Concerns"])
                } else {
                  setServicesDiscussed(servicesDiscussed.filter((item) => item !== "Developmental Concerns"))
                }
              }}
            />
            <Label htmlFor="servicesDiscussed-development" className="font-normal">
              Developmental Concerns
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="servicesDiscussed-financial"
              checked={servicesDiscussed.includes("Financial Assistance")}
              onCheckedChange={(checked) => {
                if (checked) {
                  setServicesDiscussed([...servicesDiscussed, "Financial Assistance"])
                } else {
                  setServicesDiscussed(servicesDiscussed.filter((item) => item !== "Financial Assistance"))
                }
              }}
            />
            <Label htmlFor="servicesDiscussed-financial" className="font-normal">
              Financial Assistance
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="servicesDiscussed-equipment"
              checked={servicesDiscussed.includes("Equipment Needs")}
              onCheckedChange={(checked) => {
                if (checked) {
                  setServicesDiscussed([...servicesDiscussed, "Equipment Needs"])
                } else {
                  setServicesDiscussed(servicesDiscussed.filter((item) => item !== "Equipment Needs"))
                }
              }}
            />
            <Label htmlFor="servicesDiscussed-equipment" className="font-normal">
              Equipment Needs
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="servicesDiscussed-childcare"
              checked={servicesDiscussed.includes("Childcare")}
              onCheckedChange={(checked) => {
                if (checked) {
                  setServicesDiscussed([...servicesDiscussed, "Childcare"])
                } else {
                  setServicesDiscussed(servicesDiscussed.filter((item) => item !== "Childcare"))
                }
              }}
            />
            <Label htmlFor="servicesDiscussed-childcare" className="font-normal">
              Childcare
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="servicesDiscussed-medical"
              checked={servicesDiscussed.includes("Medical Needs")}
              onCheckedChange={(checked) => {
                if (checked) {
                  setServicesDiscussed([...servicesDiscussed, "Medical Needs"])
                } else {
                  setServicesDiscussed(servicesDiscussed.filter((item) => item !== "Medical Needs"))
                }
              }}
            />
            <Label htmlFor="servicesDiscussed-medical" className="font-normal">
              Medical Needs
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="servicesDiscussed-housing"
              checked={servicesDiscussed.includes("Housing")}
              onCheckedChange={(checked) => {
                if (checked) {
                  setServicesDiscussed([...servicesDiscussed, "Housing"])
                } else {
                  setServicesDiscussed(servicesDiscussed.filter((item) => item !== "Housing"))
                }
              }}
            />
            <Label htmlFor="servicesDiscussed-housing" className="font-normal">
              Housing
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="servicesDiscussed-transportation"
              checked={servicesDiscussed.includes("Transportation")}
              onCheckedChange={(checked) => {
                if (checked) {
                  setServicesDiscussed([...servicesDiscussed, "Transportation"])
                } else {
                  setServicesDiscussed(servicesDiscussed.filter((item) => item !== "Transportation"))
                }
              }}
            />
            <Label htmlFor="servicesDiscussed-transportation" className="font-normal">
              Transportation
            </Label>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="familyInput" className="text-base font-medium text-foreground">
          Family Input/Concerns <span className="text-red-500">*</span>
        </Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-4 bg-muted/50 rounded-md border border-primary/20">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="familyInput-satisfaction"
              checked={familyInput.includes("Satisfaction with Services")}
              onCheckedChange={(checked) => {
                if (checked) {
                  setFamilyInput([...familyInput, "Satisfaction with Services"])
                } else {
                  setFamilyInput(familyInput.filter((item) => item !== "Satisfaction with Services"))
                }
              }}
            />
            <Label htmlFor="familyInput-satisfaction" className="font-normal">
              Satisfaction with Services
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="familyInput-concerns"
              checked={familyInput.includes("New Concerns")}
              onCheckedChange={(checked) => {
                if (checked) {
                  setFamilyInput([...familyInput, "New Concerns"])
                } else {
                  setFamilyInput(familyInput.filter((item) => item !== "New Concerns"))
                }
              }}
            />
            <Label htmlFor="familyInput-concerns" className="font-normal">
              New Concerns
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="familyInput-routines"
              checked={familyInput.includes("Changes in Routines")}
              onCheckedChange={(checked) => {
                if (checked) {
                  setFamilyInput([...familyInput, "Changes in Routines"])
                } else {
                  setFamilyInput(familyInput.filter((item) => item !== "Changes in Routines"))
                }
              }}
            />
            <Label htmlFor="familyInput-routines" className="font-normal">
              Changes in Routines
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="familyInput-progress"
              checked={familyInput.includes("Progress Updates")}
              onCheckedChange={(checked) => {
                if (checked) {
                  setFamilyInput([...familyInput, "Progress Updates"])
                } else {
                  setFamilyInput(familyInput.filter((item) => item !== "Progress Updates"))
                }
              }}
            />
            <Label htmlFor="familyInput-progress" className="font-normal">
              Progress Updates
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="familyInput-challenges"
              checked={familyInput.includes("Challenges with Services")}
              onCheckedChange={(checked) => {
                if (checked) {
                  setFamilyInput([...familyInput, "Challenges with Services"])
                } else {
                  setFamilyInput(familyInput.filter((item) => item !== "Challenges with Services"))
                }
              }}
            />
            <Label htmlFor="familyInput-challenges" className="font-normal">
              Challenges with Services
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="familyInput-questions"
              checked={familyInput.includes("Questions about Development")}
              onCheckedChange={(checked) => {
                if (checked) {
                  setFamilyInput([...familyInput, "Questions about Development"])
                } else {
                  setFamilyInput(familyInput.filter((item) => item !== "Questions about Development"))
                }
              }}
            />
            <Label htmlFor="familyInput-questions" className="font-normal">
              Questions about Development
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="familyInput-resources"
              checked={familyInput.includes("Resource Needs")}
              onCheckedChange={(checked) => {
                if (checked) {
                  setFamilyInput([...familyInput, "Resource Needs"])
                } else {
                  setFamilyInput(familyInput.filter((item) => item !== "Resource Needs"))
                }
              }}
            />
            <Label htmlFor="familyInput-resources" className="font-normal">
              Resource Needs
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="familyInput-stressors"
              checked={familyInput.includes("Family Stressors")}
              onCheckedChange={(checked) => {
                if (checked) {
                  setFamilyInput([...familyInput, "Family Stressors"])
                } else {
                  setFamilyInput(familyInput.filter((item) => item !== "Family Stressors"))
                }
              }}
            />
            <Label htmlFor="familyInput-stressors" className="font-normal">
              Family Stressors
            </Label>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="actionSteps" className="text-base font-medium text-foreground">
          Action Steps Taken <span className="text-red-500">*</span>
        </Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-4 bg-muted/50 rounded-md border border-primary/20">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="actionSteps-referrals"
              checked={actionSteps.includes("Made Referrals")}
              onCheckedChange={(checked) => {
                if (checked) {
                  setActionSteps([...actionSteps, "Made Referrals"])
                } else {
                  setActionSteps(actionSteps.filter((item) => item !== "Made Referrals"))
                }
              }}
            />
            <Label htmlFor="actionSteps-referrals" className="font-normal">
              Made Referrals
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="actionSteps-meeting"
              checked={actionSteps.includes("Scheduled a Meeting")}
              onCheckedChange={(checked) => {
                if (checked) {
                  setActionSteps([...actionSteps, "Scheduled a Meeting"])
                } else {
                  setActionSteps(actionSteps.filter((item) => item !== "Scheduled a Meeting"))
                }
              }}
            />
            <Label htmlFor="actionSteps-meeting" className="font-normal">
              Scheduled a Meeting
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="actionSteps-provider"
              checked={actionSteps.includes("Followed Up with Provider")}
              onCheckedChange={(checked) => {
                if (checked) {
                  setActionSteps([...actionSteps, "Followed Up with Provider"])
                } else {
                  setActionSteps(actionSteps.filter((item) => item !== "Followed Up with Provider"))
                }
              }}
            />
            <Label htmlFor="actionSteps-provider" className="font-normal">
              Followed Up with Provider
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="actionSteps-resources"
              checked={actionSteps.includes("Provided Resources")}
              onCheckedChange={(checked) => {
                if (checked) {
                  setActionSteps([...actionSteps, "Provided Resources"])
                } else {
                  setActionSteps(actionSteps.filter((item) => item !== "Provided Resources"))
                }
              }}
            />
            <Label htmlFor="actionSteps-resources" className="font-normal">
              Provided Resources
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="actionSteps-ifsp"
              checked={actionSteps.includes("Updated IFSP")}
              onCheckedChange={(checked) => {
                if (checked) {
                  setActionSteps([...actionSteps, "Updated IFSP"])
                } else {
                  setActionSteps(actionSteps.filter((item) => item !== "Updated IFSP"))
                }
              }}
            />
            <Label htmlFor="actionSteps-ifsp" className="font-normal">
              Updated IFSP
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="actionSteps-coordinated"
              checked={actionSteps.includes("Coordinated Services")}
              onCheckedChange={(checked) => {
                if (checked) {
                  setActionSteps([...actionSteps, "Coordinated Services"])
                } else {
                  setActionSteps(actionSteps.filter((item) => item !== "Coordinated Services"))
                }
              }}
            />
            <Label htmlFor="actionSteps-coordinated" className="font-normal">
              Coordinated Services
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="actionSteps-concerns"
              checked={actionSteps.includes("Addressed Concerns")}
              onCheckedChange={(checked) => {
                if (checked) {
                  setActionSteps([...actionSteps, "Addressed Concerns"])
                } else {
                  setActionSteps(actionSteps.filter((item) => item !== "Addressed Concerns"))
                }
              }}
            />
            <Label htmlFor="actionSteps-concerns" className="font-normal">
              Addressed Concerns
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="actionSteps-information"
              checked={actionSteps.includes("Provided Information")}
              onCheckedChange={(checked) => {
                if (checked) {
                  setActionSteps([...actionSteps, "Provided Information"])
                } else {
                  setActionSteps(actionSteps.filter((item) => item !== "Provided Information"))
                }
              }}
            />
            <Label htmlFor="actionSteps-information" className="font-normal">
              Provided Information
            </Label>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="followUpNeeded" className="text-base font-medium text-foreground">
          Follow-Up Needed <span className="text-red-500">*</span>
        </Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-4 bg-muted/50 rounded-md border border-primary/20">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="followUpNeeded-ifsp"
              checked={followUpNeeded.includes("Update IFSP")}
              onCheckedChange={(checked) => {
                if (checked) {
                  setFollowUpNeeded([...followUpNeeded, "Update IFSP"])
                } else {
                  setFollowUpNeeded(followUpNeeded.filter((item) => item !== "Update IFSP"))
                }
              }}
            />
            <Label htmlFor="followUpNeeded-ifsp" className="font-normal">
              Update IFSP
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="followUpNeeded-family"
              checked={followUpNeeded.includes("Check Back with Family")}
              onCheckedChange={(checked) => {
                if (checked) {
                  setFollowUpNeeded([...followUpNeeded, "Check Back with Family"])
                } else {
                  setFollowUpNeeded(followUpNeeded.filter((item) => item !== "Check Back with Family"))
                }
              }}
            />
            <Label htmlFor="followUpNeeded-family" className="font-normal">
              Check Back with Family
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="followUpNeeded-transition"
              checked={followUpNeeded.includes("Coordinate Transition")}
              onCheckedChange={(checked) => {
                if (checked) {
                  setFollowUpNeeded([...followUpNeeded, "Coordinate Transition"])
                } else {
                  setFollowUpNeeded(followUpNeeded.filter((item) => item !== "Coordinate Transition"))
                }
              }}
            />
            <Label htmlFor="followUpNeeded-transition" className="font-normal">
              Coordinate Transition
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="followUpNeeded-evaluation"
              checked={followUpNeeded.includes("Schedule Evaluation")}
              onCheckedChange={(checked) => {
                if (checked) {
                  setFollowUpNeeded([...followUpNeeded, "Schedule Evaluation"])
                } else {
                  setFollowUpNeeded(followUpNeeded.filter((item) => item !== "Schedule Evaluation"))
                }
              }}
            />
            <Label htmlFor="followUpNeeded-evaluation" className="font-normal">
              Schedule Evaluation
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="followUpNeeded-provider"
              checked={followUpNeeded.includes("Contact Provider")}
              onCheckedChange={(checked) => {
                if (checked) {
                  setFollowUpNeeded([...followUpNeeded, "Contact Provider"])
                } else {
                  setFollowUpNeeded(followUpNeeded.filter((item) => item !== "Contact Provider"))
                }
              }}
            />
            <Label htmlFor="followUpNeeded-provider" className="font-normal">
              Contact Provider
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="followUpNeeded-resources"
              checked={followUpNeeded.includes("Send Resources")}
              onCheckedChange={(checked) => {
                if (checked) {
                  setFollowUpNeeded([...followUpNeeded, "Send Resources"])
                } else {
                  setFollowUpNeeded(followUpNeeded.filter((item) => item !== "Send Resources"))
                }
              }}
            />
            <Label htmlFor="followUpNeeded-resources" className="font-normal">
              Send Resources
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="followUpNeeded-meeting"
              checked={followUpNeeded.includes("Schedule Next Meeting")}
              onCheckedChange={(checked) => {
                if (checked) {
                  setFollowUpNeeded([...followUpNeeded, "Schedule Next Meeting"])
                } else {
                  setFollowUpNeeded(followUpNeeded.filter((item) => item !== "Schedule Next Meeting"))
                }
              }}
            />
            <Label htmlFor="followUpNeeded-meeting" className="font-normal">
              Schedule Next Meeting
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="followUpNeeded-none"
              checked={followUpNeeded.includes("No Follow-up Needed")}
              onCheckedChange={(checked) => {
                if (checked) {
                  setFollowUpNeeded([...followUpNeeded, "No Follow-up Needed"])
                } else {
                  setFollowUpNeeded(followUpNeeded.filter((item) => item !== "No Follow-up Needed"))
                }
              }}
            />
            <Label htmlFor="followUpNeeded-none" className="font-normal">
              No Follow-up Needed
            </Label>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="additionalNotes" className="text-base font-medium text-foreground">
          Additional Notes <span className="text-gray-400 text-sm">(optional)</span>
        </Label>
        <Textarea
          id="additionalNotes"
          value={additionalNotes}
          onChange={(e) => setAdditionalNotes(e.target.value)}
          placeholder="Enter any additional notes or details"
          rows={3}
          className="bg-muted/50 border-primary/20 focus:ring-primary/30"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          onClick={generateSampleNote}
          className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground shadow-md transition-all hover:shadow-lg"
          disabled={isGenerating}
        >
          {isGenerating ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-4 w-4 text-primary-foreground"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
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
    </div>
  )
}
