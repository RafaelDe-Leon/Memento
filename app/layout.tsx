import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import ScrollToTop from "@/components/scroll-to-top"
// Add back the import
import ScrollToTopOnNavigate from "@/components/scroll-to-top-on-navigate"

export const metadata = {
  title: "Memento - Professional Documentation Made Easy",
  description:
    "Generate professional notes in seconds with our AI-powered platform tailored for healthcare professionals.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ScrollToTopOnNavigate />
          {children}
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  )
}
