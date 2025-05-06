import type { Metadata } from "next"
import Header from "@/components/header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"
import SubscriptionButton from "@/components/subscription-button"

export const metadata: Metadata = {
  title: "Pricing - Memento",
  description: "Choose the right plan for your documentation needs",
}

// In a real app, you would fetch these from your database or Stripe directly
const pricingPlans = [
  {
    name: "Basic",
    description: "Essential features for individual practitioners",
    price: "$9.99",
    interval: "month",
    priceId: "price_basic123", // Replace with your actual Stripe Price ID
    features: ["50 AI-generated notes per month", "5 custom templates", "Basic note editor", "Email support"],
    highlighted: false,
  },
  {
    name: "Professional",
    description: "Everything you need for professional documentation",
    price: "$29.99",
    interval: "month",
    priceId: "price_pro123", // Replace with your actual Stripe Price ID
    features: [
      "Unlimited AI-generated notes",
      "Unlimited custom templates",
      "Advanced note editor with formatting",
      "Priority support",
      "Export to PDF/EHR",
      "Team sharing (up to 3 users)",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    description: "Advanced features for larger organizations",
    price: "$99.99",
    interval: "month",
    priceId: "price_enterprise123", // Replace with your actual Stripe Price ID
    features: [
      "Everything in Professional",
      "Unlimited team members",
      "Custom branding",
      "Advanced analytics",
      "Dedicated account manager",
      "Custom API integrations",
      "HIPAA compliance audit logs",
    ],
    highlighted: false,
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/30 dark:from-background dark:to-background">
      <Header />
      <main className="container mx-auto py-12 px-4 flex-1">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that's right for you and your documentation needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan) => (
            <Card
              key={plan.name}
              className={`flex flex-col ${
                plan.highlighted
                  ? "border-2 border-primary shadow-lg shadow-primary/10"
                  : "border border-gray-200 dark:border-gray-700"
              }`}
            >
              {plan.highlighted && (
                <div className="bg-primary text-primary-foreground text-center py-2 text-base font-medium">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{plan.name}</CardTitle>
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex items-center mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-500 dark:text-gray-400 ml-2">/{plan.interval}</span>
                </div>

                <div className="space-y-4">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mr-3 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <SubscriptionButton
                  priceId={plan.priceId}
                  text={`Subscribe to ${plan.name}`}
                  variant={plan.highlighted ? "default" : "outline"}
                />
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            All plans include a 14-day free trial. No credit card required to start.
          </p>
          <p className="text-muted-foreground">
            Need a custom plan for your organization?{" "}
            <a href="#contact" className="text-primary hover:underline">
              Contact us
            </a>
          </p>
        </div>
      </main>
      <footer className="py-4 border-t bg-muted/30">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          © 2023 Memento. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
