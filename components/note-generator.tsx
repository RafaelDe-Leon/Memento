"use client"

import { useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import NoteFormSimplified from "./note-form-simplified"
import NoteDisplay from "./note-display"

export type NoteType = "service-coordination" | "therapy-session" | "assessment" | "progress" | "consultation"

export default function NoteGenerator() {
  const [generatedNote, setGeneratedNote] = useState<string>("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const noteDisplayRef = useRef<HTMLDivElement>(null)

  const handleNoteGeneration = (note: string) => {
    setGeneratedNote(note)
    setIsGenerating(false)
    setError(null)

    // Scroll to the note display after generation
    if (noteDisplayRef.current) {
      noteDisplayRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleStartGeneration = () => {
    setIsGenerating(true)
    setError(null)
  }

  const handleError = (errorMessage: string) => {
    setError(errorMessage)
    setIsGenerating(false)
  }

  return (
    <div id="note-generator" className="grid gap-8 md:grid-cols-[1fr_1fr] lg:grid-cols-[2fr_3fr]">
      <Card className="h-fit border-primary/20 shadow-lg shadow-primary/5">
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4 text-primary">Service Coordination Note</h2>
          <NoteFormSimplified
            onGenerateNote={handleNoteGeneration}
            onStartGeneration={handleStartGeneration}
            onError={handleError}
            isGenerating={isGenerating}
          />
        </CardContent>
      </Card>

      <div ref={noteDisplayRef} id="note-display">
        <NoteDisplay note={generatedNote} isLoading={isGenerating} error={error} />
      </div>
    </div>
  )
}
