"use client"

import { Star, ThumbsUp, Calendar } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { StarRating } from "@/components/star-rating"

interface ReviewModalProps {
  movie: any
  isOpen: boolean
  onClose: () => void
}

const externalReviews = [
  {
    id: 1,
    source: "The Guardian",
    rating: 4,
    excerpt: "A masterpiece of storytelling that transcends cultural boundaries...",
    author: "Peter Bradshaw",
    date: "2019-08-15",
    fullReview:
      "This is a film that speaks to the universal experience of family, loss, and the lies we tell to protect those we love. Lulu Wang has crafted something truly special here.",
  },
  {
    id: 2,
    source: "Rolling Stone",
    rating: 4.5,
    excerpt: "Emotionally devastating and beautifully crafted...",
    author: "David Fear",
    date: "2019-07-20",
    fullReview:
      "The Farewell is a quiet masterpiece that finds profound meaning in the smallest moments. Wang's direction is assured and the performances are uniformly excellent.",
  },
  {
    id: 3,
    source: "Variety",
    rating: 4,
    excerpt: "A deeply personal story told with universal appeal...",
    author: "Jessica Kiang",
    date: "2019-01-25",
    fullReview:
      "What could have been a simple culture-clash comedy becomes something much more profound in Wang's capable hands. This is filmmaking at its most empathetic.",
  },
]

const communityReviews = [
  {
    id: 1,
    user: {
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SC",
    },
    rating: 5,
    date: "2024-01-15",
    likes: 24,
    review:
      "This film hit me right in the feels. As someone with a similar cultural background, I found myself crying throughout the entire movie. The way it handles family dynamics and cultural differences is just perfect. Awkwafina's performance is surprisingly nuanced and heartfelt.",
  },
  {
    id: 2,
    user: {
      name: "Michael Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MR",
    },
    rating: 4,
    date: "2024-01-10",
    likes: 18,
    review:
      "Beautiful storytelling that doesn't rely on stereotypes. The grandmother's performance is absolutely incredible - she brings such warmth and authenticity to the role. The film's exploration of truth vs. kindness is thought-provoking.",
  },
  {
    id: 3,
    user: {
      name: "Emma Thompson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "ET",
    },
    rating: 5,
    date: "2024-01-08",
    likes: 31,
    review:
      "One of the best films I've seen this year. The way it balances humor and heartbreak is masterful. Every scene feels authentic and lived-in. This is the kind of intimate, character-driven storytelling that we need more of in cinema.",
  },
  {
    id: 4,
    user: {
      name: "David Kim",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "DK",
    },
    rating: 4,
    date: "2024-01-05",
    likes: 12,
    review:
      "Incredibly moving film about family, culture, and the complexity of love. The performances are all top-notch, and the direction is subtle yet powerful. It's a quiet film that speaks volumes.",
  },
]

export function ReviewModal({ movie, isOpen, onClose }: ReviewModalProps) {
  const [likedReviews, setLikedReviews] = useState<number[]>([])

  if (!movie) return null

  const toggleLike = (reviewId: number) => {
    setLikedReviews((prev) => (prev.includes(reviewId) ? prev.filter((id) => id !== reviewId) : [...prev, reviewId]))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{movie.title}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col md:flex-row gap-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Movie Info */}
          <div className="md:w-1/3 flex-shrink-0">
            <div className="relative w-full h-96 mb-4">
              <Image
                src={movie.poster || "/placeholder.svg"}
                alt={movie.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-lg">{movie.title}</h3>
                <p className="text-gray-400">Directed by {movie.director}</p>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-300">
                <span>{movie.year}</span>
                <span>{movie.duration}</span>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span>{movie.rating.toFixed(1)}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre: string) => (
                  <Badge key={genre} variant="secondary" className="bg-gray-800 text-gray-300 border-none">
                    {genre}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">{movie.description}</p>
            </div>
          </div>

          {/* Reviews */}
          <div className="md:w-2/3 space-y-6">
            {/* External Reviews */}
            <div>
              <h3 className="text-xl font-bold mb-4">Critics Reviews</h3>
              <div className="space-y-4">
                {externalReviews.map((review) => (
                  <div key={review.id} className="bg-gray-800/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <span className="font-semibold text-red-400">{review.source}</span>
                        <StarRating rating={review.rating} size="sm" />
                      </div>
                      <span className="text-xs text-gray-400">{review.date}</span>
                    </div>
                    <p className="text-gray-300 text-sm mb-2">"{review.excerpt}"</p>
                    <p className="text-gray-400 text-sm">{review.fullReview}</p>
                    <p className="text-xs text-gray-500 mt-2">— {review.author}</p>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="bg-gray-800" />

            {/* Community Reviews */}
            <div>
              <h3 className="text-xl font-bold mb-4">Community Reviews</h3>
              <div className="space-y-4">
                {communityReviews.map((review) => (
                  <div key={review.id} className="bg-gray-800/30 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={review.user.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-gray-700 text-white text-sm">
                          {review.user.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <span className="font-semibold text-white">{review.user.name}</span>
                            <StarRating rating={review.rating} size="sm" />
                          </div>
                          <div className="flex items-center space-x-2 text-xs text-gray-400">
                            <Calendar className="w-3 h-3" />
                            <span>{review.date}</span>
                          </div>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed mb-3">{review.review}</p>
                        <div className="flex items-center space-x-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`text-xs ${
                              likedReviews.includes(review.id)
                                ? "text-red-400 hover:text-red-300"
                                : "text-gray-400 hover:text-gray-300"
                            }`}
                            onClick={() => toggleLike(review.id)}
                          >
                            <ThumbsUp className="w-3 h-3 mr-1" />
                            {review.likes + (likedReviews.includes(review.id) ? 1 : 0)}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
