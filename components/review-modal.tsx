"use client"

import { useState, useEffect } from "react"
import { Star, Heart, Calendar, Clock, X, Play, Plus } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StarRating } from "./star-rating"

interface Movie {
  id: number
  title: string
  year: number
  rating: number
  duration: string
  poster: string
  genres: string[]
  director: string
  description: string
}

interface ReviewModalProps {
  movie: Movie | null
  isOpen: boolean
  onClose: () => void
}

// Mock founder reviews data
const founderReviews: Record<
  number,
  {
    rating: number
    excerpt: string
    readTime: string
    fullPostUrl: string
  }
> = {
  1: {
    rating: 5,
    excerpt:
      "Wang's masterpiece explores the delicate balance between truth and compassion in family relationships. The film's gentle humor masks profound questions about cultural identity and the weight of love.",
    readTime: "4 min read",
    fullPostUrl: "/blog/the-farewell-cultural-storytelling",
  },
  2: {
    rating: 5,
    excerpt:
      "Chung crafts a deeply personal meditation on the American Dream through the lens of a Korean immigrant family. Every frame breathes with authenticity and quiet determination.",
    readTime: "5 min read",
    fullPostUrl: "/blog/minari-american-dream-poetry",
  },
  3: {
    rating: 5,
    excerpt:
      "Lonergan delivers a devastating portrait of grief that refuses easy answers. Manchester by the Sea understands that some wounds never fully heal, and that's okay.",
    readTime: "6 min read",
    fullPostUrl: "/blog/manchester-grief-without-answers",
  },
  11: {
    rating: 5,
    excerpt:
      "Bong Joon-ho's masterwork uses architecture as a character, with each floor representing a different social stratum. It's a thriller that doubles as incisive social commentary.",
    readTime: "7 min read",
    fullPostUrl: "/blog/parasite-architecture-class",
  },
  16: {
    rating: 5,
    excerpt:
      "The Daniels have created something unprecedented - a multiverse story that's ultimately about the simple, profound act of choosing love over cynicism. Chaos as a love language.",
    readTime: "8 min read",
    fullPostUrl: "/blog/everything-everywhere-chaos-love",
  },
}

// Mock community reviews
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
    likes: 12,
  },
  {
    id: 2,
    user: {
      name: "Marcus Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MR",
    },
    rating: 4,
    date: "2024-01-10",
    likes: 8,
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
    likes: 15,
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
    likes: 6,
  },
]

export function ReviewModal({ movie, isOpen, onClose }: ReviewModalProps) {
  const [userRating, setUserRating] = useState(0)
  const [likedReviews, setLikedReviews] = useState<Set<number>>(new Set())

  useEffect(() => {
    if (movie && typeof window !== "undefined") {
      const savedRating = localStorage.getItem(`rating-${movie.id}`)
      setUserRating(savedRating ? Number.parseInt(savedRating) : 0)
    }
  }, [movie])

  const handleRatingChange = (rating: number) => {
    if (movie) {
      setUserRating(rating)
      if (typeof window !== "undefined") {
        localStorage.setItem(`rating-${movie.id}`, rating.toString())
      }
    }
  }

  const toggleLike = (reviewId: number) => {
    setLikedReviews((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(reviewId)) {
        newSet.delete(reviewId)
      } else {
        newSet.add(reviewId)
      }
      return newSet
    })
  }

  if (!movie) return null

  const founderReview = founderReviews[movie.id]
  const averageRating = 8.4 // Mock average rating

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] bg-black text-white border-gray-800 p-0">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header with movie info */}
          <div className="flex flex-col md:flex-row p-6 border-b border-gray-800">
            <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
              <Image
                src={movie.poster || "/placeholder.svg"}
                alt={movie.title}
                width={150}
                height={225}
                className="rounded-lg object-cover mx-auto md:mx-0"
              />
            </div>

            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-2">{movie.title}</h2>
              <p className="text-gray-400 mb-3">Directed by {movie.director}</p>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-semibold">{movie.rating}</span>
                  <span className="text-gray-400 text-sm">community</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">{movie.year}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">{movie.duration}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {movie.genres.map((genre) => (
                  <Badge key={genre} variant="secondary" className="bg-gray-700 text-gray-300">
                    {genre}
                  </Badge>
                ))}
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed">{movie.description}</p>

              <div className="flex space-x-3">
                <Button className="bg-white text-black hover:bg-gray-200">
                  <Play className="w-4 h-4 mr-2" />
                  Watch Now
                </Button>
                <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800 bg-transparent">
                  <Plus className="w-4 h-4 mr-2" />
                  My List
                </Button>
              </div>
            </div>
          </div>

          {/* Content area with scrolling */}
          <div className="max-h-96 overflow-y-auto p-6 space-y-6">
            {/* Your Rating */}
            <div className="bg-gray-900 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-3">Rate this film</h3>
              <div className="flex items-center space-x-4">
                <StarRating rating={userRating} onRatingChange={handleRatingChange} size="large" />
                {userRating > 0 && (
                  <span className="text-gray-400">
                    You rated this {userRating} star{userRating !== 1 ? "s" : ""}
                  </span>
                )}
              </div>
            </div>

            {/* Founder's Thoughts */}
            {founderReview && (
              <div className="bg-gradient-to-r from-red-900/20 to-red-800/20 border border-red-800/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
                      FS
                    </div>
                    <div>
                      <h4 className="font-semibold">Founder's Thoughts</h4>
                      <div className="flex items-center space-x-2">
                        <StarRating rating={founderReview.rating} readOnly size="small" />
                        <Badge className="bg-red-600 text-white text-xs">Editorial</Badge>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">{founderReview.readTime}</span>
                </div>

                <p className="text-gray-300 mb-3 leading-relaxed">{founderReview.excerpt}</p>

                <Button variant="link" className="text-red-400 hover:text-red-300 p-0 h-auto" asChild>
                  <a href={founderReview.fullPostUrl}>Read full post →</a>
                </Button>
              </div>
            )}

            {/* Community Ratings */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Community Ratings</h3>
              <div className="space-y-3">
                {communityReviews.map((review) => (
                  <div key={review.id} className="flex items-center justify-between p-3 bg-gray-900 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={review.user.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-gray-700 text-white text-xs">
                          {review.user.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{review.user.name}</p>
                        <div className="flex items-center space-x-2">
                          <StarRating rating={review.rating} readOnly size="small" />
                          <span className="text-xs text-gray-400">{new Date(review.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleLike(review.id)}
                      className="flex items-center space-x-1 text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <Heart className={`w-4 h-4 ${likedReviews.has(review.id) ? "fill-current text-red-400" : ""}`} />
                      <span className="text-xs">{review.likes + (likedReviews.has(review.id) ? 1 : 0)}</span>
                    </button>
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
