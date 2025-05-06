import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

export async function GET() {
  try {
    // Check if OpenAI API key is configured
    const apiKey = process.env.OPENAI_API_KEY

    if (!apiKey) {
      return Response.json({
        status: "error",
        message: "OPENAI_API_KEY is not set in environment variables",
        environment: process.env.NODE_ENV,
        vercelEnv: process.env.VERCEL_ENV || "Not a Vercel environment",
      })
    }

    // Mask the API key for security
    const maskedKey = apiKey.substring(0, 7) + "..." + apiKey.substring(apiKey.length - 4)

    // Try a simple completion to verify the API key works
    try {
      const { text } = await generateText({
        model: openai("gpt-4.1-nano-2025-04-14"),
        prompt: "Say hello",
        system: "You are a helpful assistant.",
      })

      return Response.json({
        status: "success",
        message: "API key is working correctly",
        keyInfo: {
          prefix: apiKey.substring(0, 7),
          length: apiKey.length,
          masked: maskedKey,
        },
        testResponse: text,
        environment: process.env.NODE_ENV,
        vercelEnv: process.env.VERCEL_ENV || "Not a Vercel environment",
      })
    } catch (aiError: any) {
      return Response.json({
        status: "error",
        message: "API key is configured but failed to generate text",
        error: aiError.message || "Unknown error",
        keyInfo: {
          prefix: apiKey.substring(0, 7),
          length: apiKey.length,
          masked: maskedKey,
        },
        environment: process.env.NODE_ENV,
        vercelEnv: process.env.VERCEL_ENV || "Not a Vercel environment",
      })
    }
  } catch (error: any) {
    return Response.json({
      status: "error",
      message: "Error checking API key",
      error: error.message || "Unknown error",
      environment: process.env.NODE_ENV,
      vercelEnv: process.env.VERCEL_ENV || "Not a Vercel environment",
    })
  }
}
