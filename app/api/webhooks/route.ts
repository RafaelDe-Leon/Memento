import { NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { headers } from "next/headers"

export async function POST(request: Request) {
  const body = await request.text()
  const signature = headers().get("stripe-signature") || ""

  let event

  try {
    // Verify the webhook signature
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET || "")
  } catch (error: any) {
    console.error(`Webhook signature verification failed: ${error.message}`)
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  // Handle specific events
  try {
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object
        console.log(`✅ Checkout session completed: ${session.id}`)

        // If this is a subscription checkout, log the subscription details
        if (session.mode === "subscription" && session.subscription) {
          console.log(`🔄 Subscription created: ${session.subscription}`)
        }
        break

      case "customer.subscription.created":
        const newSubscription = event.data.object
        console.log(`🆕 New subscription created: ${newSubscription.id}`)
        // Here you would typically update your database to mark the user as subscribed
        break

      case "customer.subscription.updated":
        const updatedSubscription = event.data.object
        console.log(`📝 Subscription updated: ${updatedSubscription.id}, status: ${updatedSubscription.status}`)
        // Handle subscription updates (upgrades, downgrades, etc.)
        break

      case "customer.subscription.deleted":
        const canceledSubscription = event.data.object
        console.log(`❌ Subscription canceled: ${canceledSubscription.id}`)
        // Handle subscription cancellation
        break

      case "invoice.paid":
        const invoice = event.data.object
        console.log(`💰 Invoice paid: ${invoice.id} for subscription: ${invoice.subscription}`)
        // Handle successful payment, perhaps extend subscription period
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error(`Error handling webhook: ${error}`)
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 })
  }
}

export const config = {
  api: {
    bodyParser: false, // Don't parse the body, we need the raw body for signature verification
  },
}
