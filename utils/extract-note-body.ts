/**
 * Extracts just the session notes body from the full note text
 * and removes any markdown formatting
 */
export function extractNoteBody(fullNote: string): string {
  // Find the "Session Note:" or similar section
  const sessionNoteIndex = fullNote.indexOf("Session Note:")
  const assessmentNoteIndex = fullNote.indexOf("Assessment Note:")
  const progressNoteIndex = fullNote.indexOf("Progress Note:")
  const consultationNoteIndex = fullNote.indexOf("Consultation Note:")
  const soapNoteIndex = fullNote.indexOf("SOAP Note:")

  // Find which section exists and extract from there
  let startIndex = -1
  if (sessionNoteIndex !== -1) startIndex = sessionNoteIndex + "Session Note:".length
  else if (assessmentNoteIndex !== -1) startIndex = assessmentNoteIndex + "Assessment Note:".length
  else if (progressNoteIndex !== -1) startIndex = progressNoteIndex + "Progress Note:".length
  else if (consultationNoteIndex !== -1) startIndex = consultationNoteIndex + "Consultation Note:".length
  else if (soapNoteIndex !== -1) startIndex = soapNoteIndex + "SOAP Note:".length

  // If we found a section, extract only that part
  if (startIndex !== -1) {
    let bodyText = fullNote.substring(startIndex).trim()

    // Remove any "Additional Notes:" section if present
    const additionalNotesIndex = bodyText.indexOf("Additional Notes:")
    if (additionalNotesIndex !== -1) {
      bodyText = bodyText.substring(0, additionalNotesIndex).trim()
    }

    // Remove markdown formatting (** for bold)
    bodyText = bodyText.replace(/\*\*/g, "")

    return bodyText
  }

  // If no section found, return the original text with markdown removed
  return fullNote.replace(/\*\*/g, "")
}
