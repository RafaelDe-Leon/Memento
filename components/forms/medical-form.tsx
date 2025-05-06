"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface MedicalFormProps {
  onGenerateNote: (note: string) => void
}

export default function MedicalForm({ onGenerateNote }: MedicalFormProps) {
  const [patientName, setPatientName] = useState("")
  const [date, setDate] = useState("")
  const [visitType, setVisitType] = useState("Follow-up")
  const [provider, setProvider] = useState("")
  const [chiefComplaint, setChiefComplaint] = useState("")
  const [vitals, setVitals] = useState(false)
  const [examination, setExamination] = useState(false)
  const [diagnosis, setDiagnosis] = useState("")
  const [treatment, setTreatment] = useState("")
  const [medications, setMedications] = useState(false)
  const [labOrders, setLabOrders] = useState(false)
  const [followUp, setFollowUp] = useState("")
  const [additionalNotes, setAdditionalNotes] = useState("")

  const generateNote = () => {
    let note = `Patient Name: ${patientName}\n`
    note += `Date of Visit: ${date}\n`
    note += `Visit Type: ${visitType}\n`
    note += `Provider: ${provider}\n\n`
    note += `SOAP Note:\n\n`

    // Subjective
    note += `S: `
    if (chiefComplaint) {
      note += `Patient presents with ${chiefComplaint}. `
    } else {
      note += `Patient presents for a ${visitType.toLowerCase()} visit. `
    }

    // Objective
    note += `\n\nO: `
    if (vitals) {
      note += `Vitals were taken and recorded. `
    }
    if (examination) {
      note += `Physical examination was performed. `
    }

    // Assessment
    note += `\n\nA: `
    if (diagnosis) {
      note += diagnosis
    } else {
      note += `Assessment pending further evaluation.`
    }

    // Plan
    note += `\n\nP: `
    if (treatment) {
      note += `${treatment} `
    }

    if (medications) {
      note += `Medications were prescribed/adjusted. `
    }

    if (labOrders) {
      note += `Laboratory tests were ordered. `
    }

    if (followUp) {
      note += `Follow-up appointment scheduled for ${followUp}.`
    }

    if (additionalNotes) {
      note += `\n\nAdditional Notes: ${additionalNotes}`
    }

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
          <Label htmlFor="date">Date of Visit</Label>
          <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="visitType">Visit Type</Label>
          <Select value={visitType} onValueChange={setVisitType}>
            <SelectTrigger id="visitType">
              <SelectValue placeholder="Select visit type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Initial Consultation">Initial Consultation</SelectItem>
              <SelectItem value="Follow-up">Follow-up</SelectItem>
              <SelectItem value="Annual Physical">Annual Physical</SelectItem>
              <SelectItem value="Urgent Care">Urgent Care</SelectItem>
              <SelectItem value="Telemedicine">Telemedicine</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="provider">Provider</Label>
          <Input
            id="provider"
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
            placeholder="Enter provider's name"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="chiefComplaint">Chief Complaint</Label>
        <Input
          id="chiefComplaint"
          value={chiefComplaint}
          onChange={(e) => setChiefComplaint(e.target.value)}
          placeholder="Enter chief complaint"
        />
      </div>

      <div className="space-y-3 pt-2">
        <Label>Objective Findings:</Label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="vitals" checked={vitals} onCheckedChange={(checked) => setVitals(checked as boolean)} />
            <Label htmlFor="vitals" className="font-normal">
              Vitals recorded
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="examination"
              checked={examination}
              onCheckedChange={(checked) => setExamination(checked as boolean)}
            />
            <Label htmlFor="examination" className="font-normal">
              Physical examination performed
            </Label>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="diagnosis">Assessment/Diagnosis</Label>
        <Textarea
          id="diagnosis"
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
          placeholder="Enter assessment or diagnosis"
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="treatment">Treatment Plan</Label>
        <Textarea
          id="treatment"
          value={treatment}
          onChange={(e) => setTreatment(e.target.value)}
          placeholder="Enter treatment plan"
          rows={2}
        />
      </div>

      <div className="space-y-3 pt-2">
        <Label>Plan:</Label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="medications"
              checked={medications}
              onCheckedChange={(checked) => setMedications(checked as boolean)}
            />
            <Label htmlFor="medications" className="font-normal">
              Medications prescribed/adjusted
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="labOrders"
              checked={labOrders}
              onCheckedChange={(checked) => setLabOrders(checked as boolean)}
            />
            <Label htmlFor="labOrders" className="font-normal">
              Laboratory tests ordered
            </Label>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="followUp">Follow-up</Label>
        <Input
          id="followUp"
          value={followUp}
          onChange={(e) => setFollowUp(e.target.value)}
          placeholder="e.g., 2 weeks"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="medicalAdditionalNotes">Additional Notes</Label>
        <Textarea
          id="medicalAdditionalNotes"
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
