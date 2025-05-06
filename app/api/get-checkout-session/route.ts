import { NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const sessionId = searchParams.get("session_id")

  if (!sessionId) {
    return NextResponse.json({ error: { message: "Missing session_id parameter" } }, { status: 400 })
  }

  try {
    // Retrieve the checkout session
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["subscription", "customer"],
    })

    // Return the session details
    return NextResponse.json({
      customer: session.customer,
      subscription: session.subscription,
    })
  } catch (error: any) {
    console.error("Error retrieving checkout session:", error)
    return NextResponse.json({ error: { message: error.message || "Something went wrong" } }, { status: 500 })
  }
}
