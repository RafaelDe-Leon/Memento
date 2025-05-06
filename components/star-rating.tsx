"use client"

import { useState } from "react"
import StarButton from "./star-button"

interface StarRatingProps {
  onChange?: (rating: number | null) => void
  defaultValue?: number | null
}

export default function StarRating({ onChange, defaultValue = null }: StarRatingProps) {
  const [selectedRating, setSelectedRating] = useState<number | null>(defaultValue)

  const handleRatingChange = (rating: number | null) => {
    setSelectedRating(rating)
    if (onChange) {
      onChange(rating)
    }
  }

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((rating) => (
        <StarButton key={rating} rating={rating} selectedRating={selectedRating} onRatingChange={handleRatingChange} />
      ))}
    </div>
  )
}
