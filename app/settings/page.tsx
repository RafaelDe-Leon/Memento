import type { Metadata } from "next"
import { AccountForm } from "@/components/settings/account-form"

export const metadata: Metadata = {
  title: "Account Settings",
  description: "Manage your account settings and preferences.",
}

export default function SettingsAccountPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account Settings</h3>
        <p className="text-sm text-muted-foreground">
          Update your account settings and manage your personal information.
        </p>
      </div>
      <AccountForm />
    </div>
  )
}
