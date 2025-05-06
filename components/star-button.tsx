"use client"

import { useState } from "react"
import { Star } from "lucide-react"

interface StarButtonProps {
  rating: number
  selectedRating: number | null
  onRatingChange: (rating: number | null) => void
}

export default function StarButton({ rating, selectedRating, onRatingChange }: StarButtonProps) {
  const [hoveredRating, setHoveredRating] = useState<number | null>(null)

  const handleMouseEnter = () => {
    setHoveredRating(rating)
  }

  const handleMouseLeave = () => {
    setHoveredRating(null)
  }

  const handleClick = () => {
    // If the same star is clicked again, clear the rating
    if (selectedRating === rating) {
      onRatingChange(null)
    } else {
      // Otherwise, set the new rating
      onRatingChange(rating)
    }
  }

  // Star is filled if:
  // 1. We're hovering and this star's rating is less than or equal to the hovered rating
  // 2. We're not hovering and there's a selected rating, and this star's rating is less than or equal to the selected rating
  const isFilled =
    (hoveredRating !== null && rating <= hoveredRating) ||
    (hoveredRating === null && selectedRating !== null && rating <= selectedRating)

  return (
    <button
      className="p-1 transition-colors"
      aria-label={`Rate ${rating} stars`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <Star className={`h-6 w-6 ${isFilled ? "fill-primary text-primary" : "text-muted-foreground"}`} />
    </button>
  )
}
