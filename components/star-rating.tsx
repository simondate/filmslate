"use client"

import { Star } from "lucide-react"

interface StarRatingProps {
  rating: number
  maxRating?: number
  size?: "sm" | "md" | "lg"
  showNumber?: boolean
}

export function StarRating({ rating, maxRating = 5, size = "md", showNumber = false }: StarRatingProps) {
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  }

  const stars = []

  for (let i = 1; i <= maxRating; i++) {
    stars.push(
      <Star
        key={i}
        className={`${sizeClasses[size]} ${i <= rating ? "text-yellow-400 fill-current" : "text-gray-600"}`}
      />,
    )
  }

  return (
    <div className="flex items-center space-x-1">
      <div className="flex space-x-0.5">{stars}</div>
      {showNumber && <span className="text-sm text-gray-400 ml-2">{rating.toFixed(1)}</span>}
    </div>
  )
}
