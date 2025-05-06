import { NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"

export async function POST(request: Request) {
  try {
    const { customerId } = await request.json()
    const origin = request.headers.get("origin") || "http://localhost:3000"

    // Create a portal session for the customer
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${origin}/dashboard`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    console.error("Error creating portal session:", error)
    return NextResponse.json({ error: { message: error.message || "Something went wrong" } }, { status: 500 })
  }
}
