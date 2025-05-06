import type { Metadata } from "next"
import { NotificationsForm } from "@/components/settings/notifications-form"

export const metadata: Metadata = {
  title: "Notification Settings",
  description: "Manage your notification preferences.",
}

export default function SettingsNotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Notifications</h3>
        <p className="text-sm text-muted-foreground">Configure how you receive notifications and updates.</p>
      </div>
      <NotificationsForm />
    </div>
  )
}
