import { Star } from "lucide-react"

interface StarRatingProps {
  rating: number // Expected to be on a scale of 1 to 5
  totalStars?: number
  size?: number
  className?: string
}

export function StarRating({ rating, totalStars = 5, size = 16, className }: StarRatingProps) {
  return (
    <div className={`flex items-center ${className}`}>
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1
        return (
          <Star
            key={index}
            size={size}
            className={`${starValue <= rating ? "text-yellow-400 fill-current" : "text-gray-500"}`}
          />
        )
      })}
    </div>
  )
}
