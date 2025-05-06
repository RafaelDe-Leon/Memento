"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export default function ScrollToTopOnNavigate() {
  // Simplified version that doesn't rely on external dependencies
  const pathname = usePathname()

  // When the pathname changes, scroll to the top of the page
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
