import { NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"

export async function POST(request: Request) {
  try {
    const { priceId, customerId } = await request.json()
    const origin = request.headers.get("origin") || "http://localhost:3000"

    // Create a checkout session for subscription
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      // Use existing customer if provided, otherwise let Stripe create one automatically
      // Remove the customer_creation parameter as it's not valid for subscription mode
      customer: customerId || undefined,
      success_url: `${origin}/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/subscription/canceled`,
      subscription_data: {
        metadata: {
          // Add any metadata you want to store with the subscription
          createdFrom: "web_checkout",
        },
      },
    })

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error: any) {
    console.error("Error creating subscription session:", error)
    return NextResponse.json({ error: { message: error.message || "Something went wrong" } }, { status: 500 })
  }
}
