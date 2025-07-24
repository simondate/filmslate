"use client"

import { Star } from "lucide-react"
import { useState } from "react"

interface StarRatingProps {
  rating: number
  onRatingChange?: (rating: number) => void
  readOnly?: boolean
  size?: "small" | "medium" | "large"
}

export function StarRating({ rating, onRatingChange, readOnly = false, size = "medium" }: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0)

  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-5 h-5",
    large: "w-6 h-6",
  }

  const handleClick = (starRating: number) => {
    if (!readOnly && onRatingChange) {
      onRatingChange(starRating)
    }
  }

  const handleMouseEnter = (starRating: number) => {
    if (!readOnly) {
      setHoverRating(starRating)
    }
  }

  const handleMouseLeave = () => {
    if (!readOnly) {
      setHoverRating(0)
    }
  }

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const isActive = star <= (hoverRating || rating)
        return (
          <button
            key={star}
            type="button"
            onClick={() => handleClick(star)}
            onMouseEnter={() => handleMouseEnter(star)}
            onMouseLeave={handleMouseLeave}
            disabled={readOnly}
            className={`${readOnly ? "cursor-default" : "cursor-pointer hover:scale-110"} transition-transform`}
          >
            <Star
              className={`${sizeClasses[size]} ${
                isActive ? "text-yellow-400 fill-current" : "text-gray-600"
              } transition-colors`}
            />
          </button>
        )
      })}
    </div>
  )
}
