import type { Metadata } from "next"
import { SecurityForm } from "@/components/settings/security-form"

export const metadata: Metadata = {
  title: "Security Settings",
  description: "Manage your security settings and password.",
}

export default function SettingsSecurityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Security</h3>
        <p className="text-sm text-muted-foreground">Manage your password and security settings.</p>
      </div>
      <SecurityForm />
    </div>
  )
}
