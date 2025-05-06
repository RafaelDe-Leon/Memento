// This file is for reference only - you'll need to set up your environment variables
// in your deployment platform (like Vercel)

// Required environment variables:
// OPENAI_API_KEY - Your OpenAI API key

// Function to check if the API key is properly configured
export function checkApiKey() {
  if (!process.env.OPENAI_API_KEY) {
    console.error("OPENAI_API_KEY is not set in environment variables")
    return false
  }

  if (process.env.OPENAI_API_KEY.includes("your_api_key_here")) {
    console.error("OPENAI_API_KEY appears to be a placeholder value")
    return false
  }

  return true
}
