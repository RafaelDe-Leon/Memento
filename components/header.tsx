"use client"

import { useRouter } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  LogOut,
  Settings,
  UserCircle,
  HelpCircle,
  Bell,
  ChevronDown,
  Clock,
  AlertCircle,
  Info,
  Sun,
  Moon,
  Menu,
  X,
  FileText,
  Home,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "next-themes"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function Header() {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const isMobile = useMediaQuery("(max-width: 768px)")

  // State for dropdowns
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [themeOpen, setThemeOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Refs for dropdown containers
  const notificationsRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)
  const themeRef = useRef<HTMLDivElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false)
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false)
      }
      if (themeRef.current && !themeRef.current.contains(event.target as Node)) {
        setThemeOpen(false)
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Close mobile menu when switching to desktop
  useEffect(() => {
    if (!isMobile) {
      setMobileMenuOpen(false)
    }
  }, [isMobile])

  const handleLogout = () => {
    // In a real app, you would handle logout logic here
    router.push("/login")
  }

  const navigateToSettings = (path = "") => {
    router.push(`/settings${path}`)
    setProfileOpen(false)
    setMobileMenuOpen(false)
  }

  // Sample notifications data
  const notifications = [
    {
      id: 1,
      title: "Your subscription has been renewed",
      description: "Your Professional plan has been automatically renewed for the next month.",
      time: "Just now",
      read: false,
      type: "info",
    },
    {
      id: 2,
      title: "New feature available",
      description: "Try our new AI-powered note suggestions feature.",
      time: "2 hours ago",
      read: false,
      type: "update",
    },
    {
      id: 3,
      title: "Security alert",
      description: "A new device was used to log in to your account.",
      time: "Yesterday",
      read: true,
      type: "alert",
    },
    {
      id: 4,
      title: "Reminder: Complete your profile",
      description: "Add your professional credentials to enhance your profile.",
      time: "3 days ago",
      read: true,
      type: "reminder",
    },
  ]

  // Count unread notifications
  const unreadCount = notifications.filter((notification) => !notification.read).length

  // Get notification icon based on type
  const getNotificationIcon = (type) => {
    switch (type) {
      case "info":
        return <Info className="h-4 w-4 text-blue-500" />
      case "update":
        return <Clock className="h-4 w-4 text-green-500" />
      case "alert":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case "reminder":
        return <Bell className="h-4 w-4 text-amber-500" />
      default:
        return <Info className="h-4 w-4" />
    }
  }

  return (
    <header className="border-b bg-gradient-to-r from-primary/10 via-background to-primary/10 dark:from-primary/5 dark:via-background dark:to-primary/5">
      <div className="container flex h-16 items-center justify-between">
        <Link
          href="/dashboard"
          className="font-bold text-xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent hover:opacity-80 transition-opacity cursor-pointer"
        >
          Memento
        </Link>

        {/* Navigation Links - Desktop */}
        {!isMobile && (
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/dashboard"
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/templates"
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors flex items-center gap-1"
            >
              <FileText className="h-4 w-4" />
              Templates
            </Link>
          </nav>
        )}

        <div className="flex items-center gap-4">
          {/* Notifications Dropdown - Always visible */}
          <div className="relative" ref={notificationsRef}>
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-primary/10"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 min-w-[1.25rem] px-1 flex items-center justify-center text-xs bg-primary text-primary-foreground">
                  {unreadCount}
                </Badge>
              )}
              <span className="sr-only">Notifications</span>
            </Button>

            {notificationsOpen && (
              <div
                className={`
                  fixed md:absolute 
                  ${isMobile ? "inset-x-0 top-16 mx-4" : "right-0 mt-2 w-80"} 
                  rounded-md border bg-popover p-1 text-popover-foreground shadow-md z-50
                `}
              >
                <div className="px-2 py-1.5 text-sm font-semibold flex items-center justify-between">
                  <span>Notifications</span>
                  {unreadCount > 0 && (
                    <Badge variant="outline" className="ml-auto">
                      {unreadCount} new
                    </Badge>
                  )}
                </div>
                <div className="-mx-1 my-1 h-px bg-muted"></div>
                <div className="max-h-[300px] overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`w-full p-3 flex gap-3 cursor-default ${notification.read ? "" : "bg-muted/50"}`}
                      >
                        <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-start justify-between gap-2">
                            <p
                              className={`text-sm font-medium leading-none ${notification.read ? "" : "text-foreground"}`}
                            >
                              {notification.title}
                            </p>
                            <div className="flex items-center gap-1">
                              <span className="text-xs text-muted-foreground whitespace-nowrap">
                                {notification.time}
                              </span>
                              {!notification.read && <div className="h-2 w-2 rounded-full bg-primary"></div>}
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2">{notification.description}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-6 text-center">
                      <div className="flex justify-center mb-3">
                        <Bell className="h-10 w-10 text-muted-foreground/50" />
                      </div>
                      <p className="text-sm text-muted-foreground">No notifications yet</p>
                    </div>
                  )}
                </div>
                <div className="-mx-1 my-1 h-px bg-muted"></div>
                <div className="flex items-center justify-between p-2">
                  <Button variant="ghost" size="sm" className="text-xs h-8">
                    Mark all as read
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs h-8"
                    onClick={() => {
                      navigateToSettings("/notifications")
                      setNotificationsOpen(false)
                    }}
                  >
                    Notification settings
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Desktop Menu */}
          {!isMobile && (
            <>
              {/* Theme Toggle Dropdown */}
              <div className="relative" ref={themeRef}>
                <Button variant="ghost" size="icon" onClick={() => setThemeOpen(!themeOpen)}>
                  {theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                  <span className="sr-only">Toggle theme</span>
                </Button>

                {themeOpen && (
                  <div className="absolute right-0 mt-2 w-36 rounded-md border bg-popover p-1 text-popover-foreground shadow-md z-50">
                    <button
                      className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
                      onClick={() => {
                        setTheme("light")
                        setThemeOpen(false)
                      }}
                    >
                      Light
                    </button>
                    <button
                      className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
                      onClick={() => {
                        setTheme("dark")
                        setThemeOpen(false)
                      }}
                    >
                      Dark
                    </button>
                    <button
                      className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
                      onClick={() => {
                        setTheme("system")
                        setThemeOpen(false)
                      }}
                    >
                      System
                    </button>
                  </div>
                )}
              </div>

              {/* Profile Dropdown */}
              <div className="relative" ref={profileRef}>
                <Button
                  variant="ghost"
                  className="relative flex items-center gap-2 h-9 px-2 hover:bg-primary/10"
                  onClick={() => setProfileOpen(!profileOpen)}
                >
                  <Avatar className="h-7 w-7">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback className="bg-primary/20 text-primary">JD</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start text-sm">
                    <span className="font-medium">John Doe</span>
                    <span className="text-xs text-muted-foreground">Professional</span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-md border bg-popover p-1 text-popover-foreground shadow-md z-50">
                    <div className="px-2 py-1.5 text-sm font-semibold">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">John Doe</p>
                        <p className="text-xs leading-none text-muted-foreground">john.doe@example.com</p>
                      </div>
                    </div>
                    <div className="-mx-1 my-1 h-px bg-muted"></div>
                    <div>
                      <button
                        className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
                        onClick={() => navigateToSettings()}
                      >
                        <UserCircle className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </button>
                      <button
                        className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
                        onClick={() => navigateToSettings("/security")}
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </button>
                      <button
                        className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
                        onClick={() => navigateToSettings("/billing")}
                      >
                        <Bell className="mr-2 h-4 w-4" />
                        <span>Billing</span>
                      </button>
                    </div>
                    <div className="-mx-1 my-1 h-px bg-muted"></div>
                    <button
                      className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
                      onClick={() => navigateToSettings("/help")}
                    >
                      <HelpCircle className="mr-2 h-4 w-4" />
                      <span>Help & Support</span>
                    </button>
                    <div className="-mx-1 my-1 h-px bg-muted"></div>
                    <button
                      className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none text-destructive hover:bg-destructive/10"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Mobile Menu Hamburger */}
          {isMobile && (
            <div className="relative" ref={mobileMenuRef}>
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                <span className="sr-only">Menu</span>
              </Button>

              {mobileMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-md border bg-popover p-1 text-popover-foreground shadow-md z-50">
                  <div className="p-2">
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                        <AvatarFallback className="bg-primary/20 text-primary">JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">John Doe</p>
                        <p className="text-xs text-muted-foreground">john.doe@example.com</p>
                      </div>
                    </div>

                    <div className="-mx-1 my-2 h-px bg-muted"></div>

                    {/* Navigation Links - Mobile */}
                    <div className="mb-2">
                      <p className="text-xs font-medium text-muted-foreground mb-1 px-2">NAVIGATION</p>
                      <button
                        className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
                        onClick={() => {
                          router.push("/dashboard")
                          setMobileMenuOpen(false)
                        }}
                      >
                        <Home className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </button>
                      <button
                        className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
                        onClick={() => {
                          router.push("/templates")
                          setMobileMenuOpen(false)
                        }}
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        <span>Templates</span>
                      </button>
                    </div>

                    {/* Theme Options */}
                    <div className="mb-2">
                      <p className="text-xs font-medium text-muted-foreground mb-1 px-2">THEME</p>
                      <button
                        className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
                        onClick={() => {
                          setTheme("light")
                          setMobileMenuOpen(false)
                        }}
                      >
                        <Sun className="mr-2 h-4 w-4" />
                        <span>Light</span>
                      </button>
                      <button
                        className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
                        onClick={() => {
                          setTheme("dark")
                          setMobileMenuOpen(false)
                        }}
                      >
                        <Moon className="mr-2 h-4 w-4" />
                        <span>Dark</span>
                      </button>
                      <button
                        className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
                        onClick={() => {
                          setTheme("system")
                          setMobileMenuOpen(false)
                        }}
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        <span>System</span>
                      </button>
                    </div>

                    <div className="-mx-1 my-2 h-px bg-muted"></div>

                    {/* User Settings */}
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1 px-2">SETTINGS</p>
                      <button
                        className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
                        onClick={() => navigateToSettings()}
                      >
                        <UserCircle className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </button>
                      <button
                        className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
                        onClick={() => navigateToSettings("/security")}
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </button>
                      <button
                        className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
                        onClick={() => navigateToSettings("/billing")}
                      >
                        <Bell className="mr-2 h-4 w-4" />
                        <span>Billing</span>
                      </button>
                      <button
                        className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
                        onClick={() => navigateToSettings("/help")}
                      >
                        <HelpCircle className="mr-2 h-4 w-4" />
                        <span>Help & Support</span>
                      </button>
                    </div>

                    <div className="-mx-1 my-2 h-px bg-muted"></div>

                    <button
                      className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none text-destructive hover:bg-destructive/10"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
