import type { Metadata } from "next"
import { BillingForm } from "@/components/settings/billing-form"

export const metadata: Metadata = {
  title: "Billing Settings",
  description: "Manage your billing information and subscription.",
}

export default function SettingsBillingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Billing</h3>
        <p className="text-sm text-muted-foreground">
          Manage your billing information and view your subscription details.
        </p>
      </div>
      <BillingForm />
    </div>
  )
}
