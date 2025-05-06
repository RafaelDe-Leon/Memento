"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface SpeechLanguageFormProps {
  onGenerateNote: (note: string) => void
}

export default function SpeechLanguageForm({ onGenerateNote }: SpeechLanguageFormProps) {
  const [patientName, setPatientName] = useState("")
  const [date, setDate] = useState("")
  const [sessionType, setSessionType] = useState("Individual Therapy")
  const [duration, setDuration] = useState("")
  const [therapist, setTherapist] = useState("")
  const [articulation, setArticulation] = useState(false)
  const [language, setLanguage] = useState(false)
  const [fluency, setFluency] = useState(false)
  const [voice, setVoice] = useState(false)
  const [swallowing, setSwallowing] = useState(false)
  const [progress, setProgress] = useState("")
  const [homeActivities, setHomeActivities] = useState(false)
  const [nextSession, setNextSession] = useState("")
  const [additionalNotes, setAdditionalNotes] = useState("")

  const generateNote = () => {
    let note = `Patient Name: ${patientName}\n`
    note += `Date of Session: ${date}\n`
    note += `Session Type: ${sessionType}\n`
    note += `Duration: ${duration}\n`
    note += `Speech-Language Pathologist: ${therapist}\n\n`
    note += `Session Note:\n`

    let sessionContent = `${patientName} participated in a ${duration} ${sessionType.toLowerCase()} session`

    const focusAreas = []
    if (articulation) focusAreas.push("articulation")
    if (language) focusAreas.push("language development")
    if (fluency) focusAreas.push("fluency")
    if (voice) focusAreas.push("voice")
    if (swallowing) focusAreas.push("swallowing")

    if (focusAreas.length > 0) {
      if (focusAreas.length === 1) {
        sessionContent += ` focusing on ${focusAreas[0]}`
      } else {
        const lastArea = focusAreas.pop()
        sessionContent += ` focusing on ${focusAreas.join(", ")} and ${lastArea}`
      }
    }

    sessionContent += "."

    if (progress) {
      sessionContent += ` ${progress}`
    }

    if (homeActivities) {
      sessionContent += ` Home practice activities were provided to reinforce skills learned during the session.`
    }

    if (nextSession) {
      sessionContent += ` The next session is scheduled for ${nextSession}.`
    }

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
          <Label htmlFor="patientName">Patient Name</Label>
          <Input
            id="patientName"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            placeholder="Enter patient's name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="date">Date of Session</Label>
          <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="sessionType">Session Type</Label>
          <Select value={sessionType} onValueChange={setSessionType}>
            <SelectTrigger id="sessionType">
              <SelectValue placeholder="Select session type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Individual Therapy">Individual Therapy</SelectItem>
              <SelectItem value="Group Therapy">Group Therapy</SelectItem>
              <SelectItem value="Evaluation">Evaluation</SelectItem>
              <SelectItem value="Consultation">Consultation</SelectItem>
              <SelectItem value="Telepractice">Telepractice</SelectItem>
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
        <Label htmlFor="therapist">Speech-Language Pathologist</Label>
        <Input
          id="therapist"
          value={therapist}
          onChange={(e) => setTherapist(e.target.value)}
          placeholder="Enter therapist's name"
        />
      </div>

      <div className="space-y-3 pt-2">
        <Label>Focus Areas:</Label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="articulation"
              checked={articulation}
              onCheckedChange={(checked) => setArticulation(checked as boolean)}
            />
            <Label htmlFor="articulation" className="font-normal">
              Articulation/Phonology
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="language" checked={language} onCheckedChange={(checked) => setLanguage(checked as boolean)} />
            <Label htmlFor="language" className="font-normal">
              Language Development
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="fluency" checked={fluency} onCheckedChange={(checked) => setFluency(checked as boolean)} />
            <Label htmlFor="fluency" className="font-normal">
              Fluency/Stuttering
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="voice" checked={voice} onCheckedChange={(checked) => setVoice(checked as boolean)} />
            <Label htmlFor="voice" className="font-normal">
              Voice
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="swallowing"
              checked={swallowing}
              onCheckedChange={(checked) => setSwallowing(checked as boolean)}
            />
            <Label htmlFor="swallowing" className="font-normal">
              Swallowing/Feeding
            </Label>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="progress">Progress Notes</Label>
        <Textarea
          id="progress"
          value={progress}
          onChange={(e) => setProgress(e.target.value)}
          placeholder="Describe patient's progress during this session"
          rows={3}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="homeActivities"
          checked={homeActivities}
          onCheckedChange={(checked) => setHomeActivities(checked as boolean)}
        />
        <Label htmlFor="homeActivities" className="font-normal">
          Home practice activities provided
        </Label>
      </div>

      <div className="space-y-2">
        <Label htmlFor="nextSession">Next Session</Label>
        <Input
          id="nextSession"
          value={nextSession}
          onChange={(e) => setNextSession(e.target.value)}
          placeholder="e.g., June 15, 2023"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="slpAdditionalNotes">Additional Notes</Label>
        <Textarea
          id="slpAdditionalNotes"
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
