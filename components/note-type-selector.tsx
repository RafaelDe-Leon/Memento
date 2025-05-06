"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import type { NoteType } from "./note-generator"

interface NoteTypeSelectorProps {
  selectedType: NoteType
  onTypeChange: (type: NoteType) => void
}

export default function NoteTypeSelector({ selectedType, onTypeChange }: NoteTypeSelectorProps) {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-medium mb-3">Select Note Type</h2>
      <RadioGroup
        value={selectedType}
        onValueChange={(value) => onTypeChange(value as NoteType)}
        className="grid grid-cols-1 gap-3"
      >
        <div
          className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-muted transition-colors"
          onClick={() => onTypeChange("service-coordination")}
        >
          <RadioGroupItem value="service-coordination" id="service-coordination" />
          <Label htmlFor="service-coordination" className="cursor-pointer font-medium">
            Service Coordination Note
          </Label>
        </div>
        <div
          className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-muted transition-colors"
          onClick={() => onTypeChange("therapy-session")}
        >
          <RadioGroupItem value="therapy-session" id="therapy-session" />
          <Label htmlFor="therapy-session" className="cursor-pointer font-medium">
            Therapy Session Note
          </Label>
        </div>
        <div
          className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-muted transition-colors"
          onClick={() => onTypeChange("assessment")}
        >
          <RadioGroupItem value="assessment" id="assessment" />
          <Label htmlFor="assessment" className="cursor-pointer font-medium">
            Assessment Note
          </Label>
        </div>
        <div
          className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-muted transition-colors"
          onClick={() => onTypeChange("progress")}
        >
          <RadioGroupItem value="progress" id="progress" />
          <Label htmlFor="progress" className="cursor-pointer font-medium">
            Progress Note
          </Label>
        </div>
        <div
          className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-muted transition-colors"
          onClick={() => onTypeChange("consultation")}
        >
          <RadioGroupItem value="consultation" id="consultation" />
          <Label htmlFor="consultation" className="cursor-pointer font-medium">
            Consultation Note
          </Label>
        </div>
      </RadioGroup>
    </div>
  )
}
