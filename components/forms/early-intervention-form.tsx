"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface EarlyInterventionFormProps {
  onGenerateNote: (note: string) => void
}

export default function EarlyInterventionForm({ onGenerateNote }: EarlyInterventionFormProps) {
  const [childName, setChildName] = useState("")
  const [date, setDate] = useState("")
  const [contactType, setContactType] = useState("Phone Call")
  const [duration, setDuration] = useState("")
  const [coordinator, setCoordinator] = useState("")
  const [discussedSnap, setDiscussedSnap] = useState(false)
  const [providedSupport, setProvidedSupport] = useState(false)
  const [addressedQuestions, setAddressedQuestions] = useState(false)
  const [offeredResources, setOfferedResources] = useState(false)
  const [familyAppreciation, setFamilyAppreciation] = useState(false)
  const [followUp, setFollowUp] = useState(false)
  const [additionalNotes, setAdditionalNotes] = useState("")

  const generateNote = () => {
    let note = `Child's Name: ${childName}\n`
    note += `Date of Contact: ${date}\n`
    note += `Type of Contact: ${contactType}\n`
    note += `Duration: ${duration}\n`
    note += `Service Coordinator: ${coordinator}\n\n`
    note += `Session Note:\n`

    let sessionContent = `A ${contactType.toLowerCase()} was made with ${childName}'s parent/guardian`

    if (discussedSnap) {
      sessionContent += ` to discuss the current status and next steps related to ${
        childName.endsWith("s") ? childName + "'" : childName + "'s"
      } Supplemental Nutrition Assistance Program (SNAP) application.`
    } else {
      sessionContent += " to discuss their early intervention services."
    }

    if (providedSupport) {
      sessionContent += ` During the ${contactType.toLowerCase()}, the Service Coordinator provided support in understanding the application process, including required documentation and deadlines.`
    }

    if (addressedQuestions) {
      sessionContent += ` Questions from the family regarding eligibility and timelines were addressed.`
    }

    if (offeredResources) {
      sessionContent += ` The Service Coordinator offered additional community resources that may assist while the application is pending.`
    }

    if (familyAppreciation) {
      sessionContent += ` The family expressed appreciation for the guidance`

      if (followUp) {
        sessionContent += ` and indicated they would follow up with the necessary documents as soon as possible.`
      } else {
        sessionContent += "."
      }
    }

    if (!sessionContent.endsWith(".")) {
      sessionContent += "."
    }

    sessionContent += " Continued support will be offered as needed."

    if (additionalNotes) {
      sessionContent += `\n\nAdditional Notes: ${additionalNotes}`
    }

    note += sessionContent

    onGenerateNote(note)
  }

  return (
    <div className="space-y-4 pt-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="childName">Child's Name</Label>
          <Input
            id="childName"
            value={childName}
            onChange={(e) => setChildName(e.target.value)}
            placeholder="Enter child's name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="date">Date of Contact</Label>
          <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="contactType">Type of Contact</Label>
          <Select value={contactType} onValueChange={setContactType}>
            <SelectTrigger id="contactType">
              <SelectValue placeholder="Select contact type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Phone Call">Phone Call</SelectItem>
              <SelectItem value="Home Visit">Home Visit</SelectItem>
              <SelectItem value="Video Conference">Video Conference</SelectItem>
              <SelectItem value="Office Meeting">Office Meeting</SelectItem>
              <SelectItem value="Email">Email</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="duration">Duration</Label>
          <Input
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="e.g., 30 minutes"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="coordinator">Service Coordinator</Label>
        <Input
          id="coordinator"
          value={coordinator}
          onChange={(e) => setCoordinator(e.target.value)}
          placeholder="Enter coordinator's name"
        />
      </div>

      <div className="space-y-3 pt-2">
        <Label>Topics Discussed:</Label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="discussedSnap"
              checked={discussedSnap}
              onCheckedChange={(checked) => setDiscussedSnap(checked as boolean)}
            />
            <Label htmlFor="discussedSnap" className="font-normal">
              Discussed SNAP application
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="providedSupport"
              checked={providedSupport}
              onCheckedChange={(checked) => setProvidedSupport(checked as boolean)}
            />
            <Label htmlFor="providedSupport" className="font-normal">
              Provided support with documentation
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="addressedQuestions"
              checked={addressedQuestions}
              onCheckedChange={(checked) => setAddressedQuestions(checked as boolean)}
            />
            <Label htmlFor="addressedQuestions" className="font-normal">
              Addressed questions about eligibility
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="offeredResources"
              checked={offeredResources}
              onCheckedChange={(checked) => setOfferedResources(checked as boolean)}
            />
            <Label htmlFor="offeredResources" className="font-normal">
              Offered additional resources
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="familyAppreciation"
              checked={familyAppreciation}
              onCheckedChange={(checked) => setFamilyAppreciation(checked as boolean)}
            />
            <Label htmlFor="familyAppreciation" className="font-normal">
              Family expressed appreciation
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="followUp" checked={followUp} onCheckedChange={(checked) => setFollowUp(checked as boolean)} />
            <Label htmlFor="followUp" className="font-normal">
              Family will follow up with documents
            </Label>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="additionalNotes">Additional Notes</Label>
        <Textarea
          id="additionalNotes"
          value={additionalNotes}
          onChange={(e) => setAdditionalNotes(e.target.value)}
          placeholder="Enter any additional notes"
          rows={3}
        />
      </div>

      <Button onClick={generateNote} className="w-full mt-6">
        Generate Note
      </Button>
    </div>
  )
}
