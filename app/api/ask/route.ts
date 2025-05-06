import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

export async function POST(request: Request) {
  try {
    // Parse the request body
    const { message } = await request.json()

    // Check if OpenAI API key is configured
    const apiKey = process.env.OPENAI_API_KEY

    if (!apiKey) {
      console.error("OPENAI_API_KEY is not set")
      return Response.json(
        {
          error: "OpenAI API key is not configured",
          environment: process.env.NODE_ENV,
          vercelEnv: process.env.VERCEL_ENV || "Not a Vercel environment",
        },
        { status: 500 },
      )
    }

    // Check if the API key looks valid (either traditional or project-scoped)
    if (!apiKey.startsWith("sk-")) {
      console.error("OPENAI_API_KEY does not appear to be in the correct format")
      return Response.json(
        {
          error: "OpenAI API key does not appear to be in the correct format",
          keyPrefix: apiKey.substring(0, 5) + "...",
          environment: process.env.NODE_ENV,
          vercelEnv: process.env.VERCEL_ENV || "Not a Vercel environment",
        },
        { status: 500 },
      )
    }

    // Also add detailed logging to help debug the issue
    console.log("Using OpenAI API key starting with:", apiKey.substring(0, 7) + "...")
    console.log("Environment:", process.env.NODE_ENV)
    console.log("Vercel environment:", process.env.VERCEL_ENV || "Not a Vercel environment")

    try {
      // Generate text using the AI SDK
      const { text } = await generateText({
        model: openai("gpt-4.1-nano-2025-04-14"),
        prompt: message,
        system:
          "Create a professional early intervention service coordination note using markdown formatting with ** for headings and important terms. Include these sections: **Service Coordination Note**, **Child's Name**, **Session Date**, **Session Duration** (if provided), **Location of Session**, **Type of Contact**, **Purpose of Contact**, **Services/Concerns Discussed**, **Family Input/Concerns**, **Action Steps Taken**, **Follow-Up Needed**, and **Overview of Note** (This will be an overview of what was done. The goal of this section is to allow the user to copy this section with all the valid information. This section can't be more than 2 paragraphs, and should be in the first person point of view of the service coordinator). Make it sound detailed, structured, and in line with early intervention documentation standards. Use bullet points with - for lists and number items where appropriate.",
      })

      return Response.json({ reply: text })
    } catch (aiError: any) {
      console.error("OpenAI API error:", aiError)

      // Extract more detailed error information
      const errorMessage = aiError.message || "Unknown error"
      const errorCode = aiError.code || "unknown_error"
      const errorStatus = aiError.status || 500

      return Response.json(
        {
          error: `Error from OpenAI API: ${errorMessage}`,
          code: errorCode,
          status: errorStatus,
          details: aiError.toString(),
          environment: process.env.NODE_ENV,
          vercelEnv: process.env.VERCEL_ENV || "Not a Vercel environment",
        },
        { status: 500 },
      )
    }
  } catch (error: any) {
    console.error("Error processing request:", error)
    return Response.json(
      {
        error: `Error processing request: ${error.message || "Unknown error"}`,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
        environment: process.env.NODE_ENV,
        vercelEnv: process.env.VERCEL_ENV || "Not a Vercel environment",
      },
      { status: 500 },
    )
  }
}
