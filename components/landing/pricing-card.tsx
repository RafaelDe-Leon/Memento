import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

interface PricingCardProps {
  title: string
  price: string
  description: string
  features: string[]
  buttonText: string
  buttonVariant: "default" | "outline"
  highlighted?: boolean
}

export default function PricingCard({
  title,
  price,
  description,
  features,
  buttonText,
  buttonVariant,
  highlighted = false,
}: PricingCardProps) {
  return (
    <div
      className={`rounded-xl overflow-hidden ${
        highlighted
          ? "border-2 border-primary shadow-lg shadow-primary/10"
          : "border border-gray-200 dark:border-gray-700"
      }`}
    >
      {highlighted && (
        <div className="bg-primary text-primary-foreground text-center py-2 text-base font-medium">{title}</div>
      )}
      <div className="bg-white dark:bg-gray-900 p-8">
        <div className="flex items-center justify-center mb-4">
          <span className="text-4xl font-bold">{price}</span>
          <span className="text-gray-500 dark:text-gray-400 ml-2">/month</span>
        </div>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8">{description}</p>

        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-8">
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary shrink-0 mr-3 mt-0.5" />
                <span className="text-gray-700 dark:text-gray-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <Button
          variant={buttonVariant}
          className={`w-full py-6 text-base ${highlighted ? "bg-primary hover:bg-primary/90" : ""}`}
          asChild
        >
          <Link href="/login">{buttonText}</Link>
        </Button>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
          No credit card required. Cancel anytime.
        </p>
      </div>
    </div>
  )
}
