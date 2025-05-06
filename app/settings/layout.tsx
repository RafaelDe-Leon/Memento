import type React from "react"
import type { Metadata } from "next"
import { SettingsSidebar } from "@/components/settings/settings-sidebar"
import Header from "@/components/header"

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your account settings and preferences.",
}

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/30 dark:from-background dark:to-background">
      <Header />
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10 py-8">
        <aside className="fixed top-24 z-30 -ml-2 hidden h-[calc(100vh-6rem)] w-full shrink-0 md:sticky md:block">
          <SettingsSidebar />
        </aside>
        <main className="flex w-full flex-col overflow-hidden">{children}</main>
      </div>
    </div>
  )
}
