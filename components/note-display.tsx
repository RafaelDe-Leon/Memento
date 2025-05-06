"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Check, FileText, AlertTriangle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
// Import the utility function at the top of the file
import { extractNoteBody } from "@/utils/extract-note-body"

interface NoteDisplayProps {
  note: string
  isLoading?: boolean
  error?: string | null
}

export default function NoteDisplay({ note, isLoading = false, error = null }: NoteDisplayProps) {
  const [copied, setCopied] = useState(false)

  // Update the copyToClipboard function to use the utility
  const copyToClipboard = async () => {
    try {
      // Extract only the session notes body
      const textToCopy = extractNoteBody(note)

      await navigator.clipboard.writeText(textToCopy)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  // Check if the note is an error message
  const isErrorMessage = (noteText: string) => {
    return noteText.startsWith("Error generating note:")
  }

  // Display error alert if there's an error
  if (error) {
    return (
      <Card className="h-fit border-primary/20 shadow-lg shadow-primary/5 transition-all">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-transparent rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Generated Note
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive" className="mt-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/40 rounded border border-red-200 dark:border-red-800/50 text-sm">
            <p className="font-medium mb-1">Troubleshooting steps:</p>
            <ol className="list-decimal ml-5 space-y-1">
              <li>Check that your OpenAI API key is correctly configured in your .env.local file</li>
              <li>Make sure you have sufficient credits in your OpenAI account</li>
              <li>Verify that your API key has the necessary permissions</li>
              <li>Try restarting your development server after updating the .env.local file</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Format the note into sections for better readability
  const formatNote = (noteText: string) => {
    if (!noteText) return null

    // Check if the note is an error message
    if (isErrorMessage(noteText)) {
      return (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md text-red-800 dark:text-red-300">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-5 w-5" />
            <h3 className="font-semibold">Error</h3>
          </div>
          <p>{noteText}</p>
          <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/40 rounded border border-red-200 dark:border-red-800/50 text-sm">
            <p className="font-medium mb-1">Troubleshooting steps:</p>
            <ol className="list-decimal ml-5 space-y-1">
              <li>Check that your OpenAI API key is correctly configured in your .env.local file</li>
              <li>Make sure you have sufficient credits in your OpenAI account</li>
              <li>Verify that your API key has the necessary permissions</li>
              <li>Try restarting your development server after updating the .env.local file</li>
            </ol>
          </div>
        </div>
      )
    }

    // Extract sections from the note
    const sections = extractSections(noteText)

    return (
      <div className="space-y-6">
        {sections.title && <h2 className="text-xl font-bold text-primary text-center">{sections.title}</h2>}

        {/* Client Information Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sections.clientName && (
            <div className="bg-muted/30 p-3 rounded-md">
              <h3 className="font-semibold text-sm text-muted-foreground">Client's Name</h3>
              <p>{sections.clientName}</p>
            </div>
          )}

          {sections.date && (
            <div className="bg-muted/30 p-3 rounded-md">
              <h3 className="font-semibold text-sm text-muted-foreground">Session Date</h3>
              <p>{sections.date}</p>
            </div>
          )}

          {sections.duration && (
            <div className="bg-muted/30 p-3 rounded-md">
              <h3 className="font-semibold text-sm text-muted-foreground">Duration</h3>
              <p>{sections.duration}</p>
            </div>
          )}

          {sections.location && (
            <div className="bg-muted/30 p-3 rounded-md">
              <h3 className="font-semibold text-sm text-muted-foreground">Location</h3>
              <p>{sections.location}</p>
            </div>
          )}

          {sections.provider && (
            <div className="bg-muted/30 p-3 rounded-md">
              <h3 className="font-semibold text-sm text-muted-foreground">Provider</h3>
              <p>{sections.provider}</p>
            </div>
          )}
        </div>

        {/* Goals Section */}
        {sections.goals && (
          <div className="bg-muted/30 p-4 rounded-md">
            <h3 className="font-semibold mb-2 text-primary">Targeted Skills/Goals</h3>
            <div className="pl-4" dangerouslySetInnerHTML={{ __html: formatListItems(sections.goals) }} />
          </div>
        )}

        {/* Activities Section */}
        {sections.activities && (
          <div className="bg-muted/30 p-4 rounded-md">
            <h3 className="font-semibold mb-2 text-primary">Activities or Strategies Used</h3>
            <div className="pl-4" dangerouslySetInnerHTML={{ __html: formatListItems(sections.activities) }} />
          </div>
        )}

        {/* Response Section */}
        {sections.response && (
          <div className="bg-muted/30 p-4 rounded-md">
            <h3 className="font-semibold mb-2 text-primary">Client's Response/Performance</h3>
            <div className="pl-4" dangerouslySetInnerHTML={{ __html: formatListItems(sections.response) }} />
          </div>
        )}

        {/* Caregiver Section */}
        {sections.caregiver && (
          <div className="bg-muted/30 p-4 rounded-md">
            <h3 className="font-semibold mb-2 text-primary">Caregiver Participation/Strategies</h3>
            <div className="pl-4" dangerouslySetInnerHTML={{ __html: formatListItems(sections.caregiver) }} />
          </div>
        )}

        {/* Next Steps Section */}
        {sections.nextSteps && (
          <div className="bg-muted/30 p-4 rounded-md">
            <h3 className="font-semibold mb-2 text-primary">Next Steps or Plan</h3>
            <div className="pl-4" dangerouslySetInnerHTML={{ __html: formatListItems(sections.nextSteps) }} />
          </div>
        )}

        {/* Main Content Section - for any content not captured in specific sections */}
        {sections.mainContent && (
          <div className="bg-muted/30 p-4 rounded-md">
            <div dangerouslySetInnerHTML={{ __html: formatParagraphs(sections.mainContent) }} />
          </div>
        )}
      </div>
    )
  }

  // Helper function to extract sections from the note
  const extractSections = (noteText: string) => {
    const sections: any = {
      mainContent: noteText,
    }

    // Try to extract a title (Early Intervention Session Note, etc.)
    const titleMatch = noteText.match(/^\s*\*\*(.*?)\*\*\s*$/m)
    if (titleMatch) {
      sections.title = titleMatch[1].replace(/\*\*/g, "")
      sections.mainContent = sections.mainContent.replace(titleMatch[0], "")
    }

    // Extract client name
    const clientNameMatch = noteText.match(/\*\*Child's Name:\*\*\s*(.*?)(?:\r?\n|$)/)
    if (clientNameMatch) {
      sections.clientName = clientNameMatch[1].trim()
      sections.mainContent = sections.mainContent.replace(clientNameMatch[0], "")
    }

    // Extract session date
    const dateMatch = noteText.match(/\*\*Session Date:\*\*\s*(.*?)(?:\r?\n|$)/)
    if (dateMatch) {
      sections.date = dateMatch[1].trim()
      sections.mainContent = sections.mainContent.replace(dateMatch[0], "")
    }

    // Extract duration
    const durationMatch = noteText.match(/\*\*Session Duration:\*\*\s*(.*?)(?:\r?\n|$)/)
    if (durationMatch) {
      sections.duration = durationMatch[1].trim()
      sections.mainContent = sections.mainContent.replace(durationMatch[0], "")
    }

    // Extract location
    const locationMatch = noteText.match(/\*\*Location of Session:\*\*\s*(.*?)(?:\r?\n|$)/)
    if (locationMatch) {
      sections.location = locationMatch[1].trim()
      sections.mainContent = sections.mainContent.replace(locationMatch[0], "")
    }

    // Extract provider/therapist
    const providerMatch = noteText.match(/\*\*(?:Therapist's Name|Provider):\*\*\s*(.*?)(?:\r?\n|$)/)
    if (providerMatch) {
      sections.provider = providerMatch[1].trim()
      sections.mainContent = sections.mainContent.replace(providerMatch[0], "")
    }

    // Extract goals section
    const goalsMatch = noteText.match(
      /\*\*Targeted Skills\/Goals[^:]*:\*\*([\s\S]*?)(?=\*\*Activities|\*\*Child's Response|\*\*Caregiver|\*\*Next Steps|\*\*Therapist|\*\*Signature|\*\*Date|\*\*Note:|Z)/,
    )
    if (goalsMatch) {
      sections.goals = goalsMatch[1].trim()
      sections.mainContent = sections.mainContent.replace(goalsMatch[0], "")
    }

    // Extract activities section
    const activitiesMatch = noteText.match(
      /\*\*Activities or Strategies Used:\*\*([\s\S]*?)(?=\*\*Child's Response|\*\*Caregiver|\*\*Next Steps|\*\*Therapist|\*\*Signature|\*\*Date|\*\*Note:|Z)/,
    )
    if (activitiesMatch) {
      sections.activities = activitiesMatch[1].trim()
      sections.mainContent = sections.mainContent.replace(activitiesMatch[0], "")
    }

    // Extract response section
    const responseMatch = noteText.match(
      /\*\*Child's Response\/Performance:\*\*([\s\S]*?)(?=\*\*Caregiver|\*\*Next Steps|\*\*Therapist|\*\*Signature|\*\*Date|\*\*Note:|Z)/,
    )
    if (responseMatch) {
      sections.response = responseMatch[1].trim()
      sections.mainContent = sections.mainContent.replace(responseMatch[0], "")
    }

    // Extract caregiver section
    const caregiverMatch = noteText.match(
      /\*\*Caregiver Participation\/Strategies[^:]*:\*\*([\s\S]*?)(?=\*\*Next Steps|\*\*Therapist|\*\*Signature|\*\*Date|\*\*Note:|Z)/,
    )
    if (caregiverMatch) {
      sections.caregiver = caregiverMatch[1].trim()
      sections.mainContent = sections.mainContent.replace(caregiverMatch[0], "")
    }

    // Extract next steps section
    const nextStepsMatch = noteText.match(
      /\*\*Next Steps[^:]*:\*\*([\s\S]*?)(?=\*\*Therapist|\*\*Signature|\*\*Date|\*\*Note:|Z)/,
    )
    if (nextStepsMatch) {
      sections.nextSteps = nextStepsMatch[1].trim()
      sections.mainContent = sections.mainContent.replace(nextStepsMatch[0], "")
    }

    // Clean up the main content
    sections.mainContent = sections.mainContent.trim()
    if (!sections.mainContent) {
      delete sections.mainContent
    }

    return sections
  }

  // Helper function to format list items with bullet points
  const formatListItems = (text: string) => {
    // Replace numbered list items (1., 2., etc.)
    let formatted = text.replace(/^\s*(\d+\.)\s*(.*?)$/gm, "<li>$2</li>")

    // Replace bullet points
    formatted = formatted.replace(/^\s*[-•]\s*(.*?)$/gm, "<li>$1</li>")

    // Replace bold sections
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")

    // If we found list items, wrap them in a ul
    if (formatted.includes("<li>")) {
      formatted = '<ul class="list-disc ml-4 space-y-1">' + formatted + "</ul>"
    } else {
      // Otherwise format as paragraphs
      formatted = formatParagraphs(formatted)
    }

    return formatted
  }

  // Helper function to format paragraphs
  const formatParagraphs = (text: string) => {
    // Replace bold sections
    const formatted = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")

    // Split by newlines and wrap in paragraph tags
    return formatted
      .split(/\r?\n\r?\n/)
      .map((para) => (para.trim() ? `<p class="mb-2">${para.trim()}</p>` : ""))
      .join("")
  }

  return (
    <Card className="h-fit border-primary/20 shadow-lg shadow-primary/5 transition-all">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-transparent rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Generated Note
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center bg-muted/50 p-6 rounded-md min-h-[300px] mt-6">
            <div className="mb-4 relative">
              <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping"></div>
              <svg
                className="animate-spin h-12 w-12 text-primary relative z-10"
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
            </div>
            <p className="text-primary font-medium">Generating your note with AI...</p>
            <p className="text-xs text-muted-foreground mt-2">This may take a few moments</p>
          </div>
        ) : note ? (
          <div className="bg-white dark:bg-gray-900 p-4 rounded-md min-h-[300px] max-h-[600px] overflow-y-auto border border-primary/10 mt-6">
            {formatNote(note)}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center bg-muted/50 p-6 rounded-md min-h-[300px] border border-dashed border-primary/20 mt-6">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Your generated note will appear here</p>
            <p className="text-xs text-muted-foreground mt-2">Fill out the form and click "Generate Note"</p>
          </div>
        )}
      </CardContent>
      {note && !isLoading && !isErrorMessage(note) && (
        <CardFooter>
          <Button
            onClick={copyToClipboard}
            variant="outline"
            className="ml-auto flex gap-2 border-primary/20 hover:bg-primary/10 hover:text-primary transition-colors"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy to Clipboard
              </>
            )}
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
