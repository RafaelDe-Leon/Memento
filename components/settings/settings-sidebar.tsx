"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { User, CreditCard, Bell, Lock, HelpCircle } from "lucide-react"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items?: {
    href: string
    title: string
    icon: React.ReactNode
  }[]
}

export function SettingsSidebar({ className, ...props }: SidebarNavProps) {
  const pathname = usePathname()

  const items = [
    {
      href: "/settings",
      title: "Account",
      icon: <User className="mr-2 h-4 w-4" />,
    },
    {
      href: "/settings/security",
      title: "Security",
      icon: <Lock className="mr-2 h-4 w-4" />,
    },
    {
      href: "/settings/billing",
      title: "Billing",
      icon: <CreditCard className="mr-2 h-4 w-4" />,
    },
    {
      href: "/settings/notifications",
      title: "Notifications",
      icon: <Bell className="mr-2 h-4 w-4" />,
    },
    {
      href: "/settings/help",
      title: "Help & Support",
      icon: <HelpCircle className="mr-2 h-4 w-4" />,
    },
  ]

  return (
    <nav className={cn("flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1", className)} {...props}>
      {items.map((item) => (
        <Button
          key={item.href}
          variant={pathname === item.href ? "secondary" : "ghost"}
          className={cn(
            "justify-start",
            pathname === item.href ? "bg-muted hover:bg-muted" : "hover:bg-transparent hover:underline",
          )}
          asChild
        >
          <Link href={item.href}>
            {item.icon}
            {item.title}
          </Link>
        </Button>
      ))}
    </nav>
  )
}
