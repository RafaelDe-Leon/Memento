"use client"

import { useEffect } from "react"

export default function ScrollToSection() {
  useEffect(() => {
    // Function to handle anchor link clicks
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest("a")

      if (anchor && anchor.hash && anchor.hash.startsWith("#")) {
        e.preventDefault()

        const targetId = anchor.hash.substring(1)
        const targetElement = document.getElementById(targetId)

        if (targetElement) {
          // Get header height to offset scroll position
          const headerHeight = 64 // Adjust this value based on your header height
          const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          })

          // Update URL without scrolling
          window.history.pushState(null, "", anchor.hash)
        }
      }
    }

    // Add event listener to document
    document.addEventListener("click", handleAnchorClick)

    // Clean up
    return () => {
      document.removeEventListener("click", handleAnchorClick)
    }
  }, [])

  return null
}
