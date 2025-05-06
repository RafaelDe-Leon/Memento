export async function GET() {
  try {
    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return Response.json({
        status: "error",
        message: "OPENAI_API_KEY is not set",
      })
    }

    // Return a masked version of the key for verification
    const maskedKey =
      process.env.OPENAI_API_KEY.substring(0, 10) +
      "..." +
      process.env.OPENAI_API_KEY.substring(process.env.OPENAI_API_KEY.length - 4)

    return Response.json({
      status: "success",
      message: "API key is configured",
      keyPrefix: process.env.OPENAI_API_KEY.substring(0, 7),
      keyLength: process.env.OPENAI_API_KEY.length,
      maskedKey,
    })
  } catch (error: any) {
    return Response.json({
      status: "error",
      message: error.message || "Unknown error",
    })
  }
}
