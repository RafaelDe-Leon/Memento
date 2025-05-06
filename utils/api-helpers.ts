/**
 * Creates a sample note for preview mode
 */
export function createSampleNote(childName: string, sessionDate: string): string {
  // Create a simple, reliable sample note
  return `**Service Coordination Note**

**Child's Name:** ${childName || "Sample Child"}

**Session Date:** ${sessionDate || new Date().toLocaleDateString()}

**Session Duration:** 45 minutes

**Location of Session:** Home

**Type of Contact:** Phone Call

**Purpose of Contact:**
- Initial contact with family
- Service coordination

**Services/Concerns Discussed:**
- Early intervention services eligibility
- Developmental screening results

**Family Input/Concerns:**
- Parents expressed concerns about development
- Questions about the frequency of therapy sessions

**Action Steps Taken:**
- Provided information about early intervention process
- Discussed therapy options and frequency

**Follow-Up Needed:**
- Send resource materials via email
- Schedule next check-in call in two weeks

**Overview of Note:**
I conducted a phone call with the family to discuss their early intervention services. We reviewed the recent developmental screening results and addressed the family's concerns about development. I provided information about the early intervention process and discussed therapy options. We scheduled a follow-up meeting to continue the discussion.

This note was generated as a sample response.`
}
