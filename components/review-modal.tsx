"use client"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Star, ThumbsUp, ThumbsDown, MessageSquare, Share2, X } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { useState, useEffect } from "react"
import { StarRating } from "./star-rating"

interface ReviewModalProps {
  movie: {
    id: number
    title: string
    year: number
    rating: number
    duration: string
    poster: string
    genres: string[]
    director: string
    description: string
  } | null
  isOpen: boolean
  onClose: () => void
}

export function ReviewModal({ movie, isOpen, onClose }: ReviewModalProps) {
  if (!movie) return null

  const newsletterReviews = [
    {
      source: "Sebastian",
      score: 4,
      link: "#",
      summary:
        "A dazzling, heartfelt, and utterly original adventure that redefines the multiverse concept with emotional depth.",
    },
    {
      source: "Robyn",
      score: 3,
      link: "#",
      summary: "A chaotic masterpiece that blends genres with incredible skill and delivers a powerful message.",
    },
    {
      source: "Farah",  
      score:  3,
      link: "#",
      summary: "An exhilarating ride that is both hilarious and deeply moving, with standout performances.",
    },
  ]

  const communityReviews = [
    {
      id: 1,
      user: "IndieWatcher22",
      userAvatar: "/user-avatar-1.png",
      rating: 5,
      date: "2 days ago",
      reviewText:
        "Absolutely blown away! This film is a rollercoaster of emotions and ideas. The performances were incredible, especially Michelle Yeoh. A must-watch for anyone looking for something truly unique.",
      likes: 15,
      dislikes: 1,
    },
    {
      id: 2,
      user: "FilmBuffette",
      userAvatar: "/diverse-user-avatar-set-2.png",
      rating: 4,
      date: "1 week ago",
      reviewText:
        "A wild ride! It's visually stunning and incredibly creative. Some parts felt a bit overwhelming, but overall, it's a brilliant and thought-provoking film that stays with you.",
      likes: 8,
      dislikes: 0,
    },
    {
      id: 3,
      user: "CinemaLover",
      userAvatar: "/diverse-user-avatars-3.png",
      rating: 5,
      date: "2 weeks ago",
      reviewText:
        "One of the best films I've seen in years. It's funny, sad, action-packed, and surprisingly philosophical. The Daniels are geniuses. Highly recommend!",
      likes: 22,
      dislikes: 2,
    },
  ]

  const [userRating, setUserRating] = useState(0)

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

  const renderStars = (rating: number) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star key={i} className={`w-4 h-4 ${i <= rating ? "text-yellow-400 fill-current" : "text-gray-500"}`} />,
      )
    }
    return stars
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-gray-900 text-white p-0 border-gray-700">
        <DialogHeader className="relative h-48 md:h-64 overflow-hidden rounded-t-lg">
          <Image
            src={movie.poster || "/placeholder.svg"}
            alt={movie.title}
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 z-10">
            <DialogTitle className="text-3xl font-bold text-white">{movie.title}</DialogTitle>
            <DialogDescription className="text-gray-300">
              {movie.year} • {movie.duration} • {movie.director}
            </DialogDescription>
            <div className="flex flex-wrap gap-2 mt-2">
              {movie.genres.map((genre) => (
                <Badge key={genre} variant="secondary" className="bg-white/20 text-white border-none">
                  {genre}
                </Badge>
              ))}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/20 z-20"
            onClick={onClose}
          >
            <X className="w-6 h-6" />
          </Button>
        </DialogHeader>

        <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar">
          <h3 className="text-xl font-bold mb-4">Synopsis</h3>
          <p className="text-gray-300 mb-6">{movie.description}</p>

          <Separator className="bg-gray-700 my-6" />

          <h3 className="text-xl font-bold mb-4">FilmSlate newsletter</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {newsletterReviews.map((review, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-200">{review.source}</span>
                    <Badge variant="secondary" className="bg-green-600/20 text-green-400 border-none">
                      {renderStars(review.score)}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-400 line-clamp-3">{review.summary}</p>
                  <Button variant="link" className="p-0 h-auto text-purple-400 hover:text-purple-300 mt-2">
                    Read Full Review
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Separator className="bg-gray-700 my-6" />




          <h3 className="text-xl font-bold mb-4">Community Reviews</h3>

            <h3 className="text-lg font-semibold mb-3">FilmSlate average - 4.3</h3>

          {/* Your Rating */}
          <div className="bg-gray-900 rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-3">Your rating</h3>
            <div className="flex items-center space-x-4">
              <StarRating rating={userRating} onRatingChange={handleRatingChange} size="large" />
              {userRating > 0 && (
                <span className="text-gray-400">
                  You rated this {userRating} star{userRating !== 1 ? "s" : ""}
                </span>
              )}
            </div>
          </div>

          <div className="space-y-6">
            {communityReviews.map((review) => (
              <Card key={review.id} className="bg-gray-800 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4 mb-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={review.userAvatar || "/placeholder.svg"} />
                      <AvatarFallback>{review.user.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-200">{review.user}</span>
                        <span className="text-xs text-gray-500">{review.date}</span>
                      </div>
                      <div className="flex items-center space-x-1 mt-1">{renderStars(review.rating)}</div>
                      <p className="text-gray-300 mt-2">{review.reviewText}</p>
                      <div className="flex items-center space-x-4 mt-3 text-gray-400 text-sm">
                        <Button variant="ghost" size="sm" className="flex items-center space-x-1 hover:text-purple-400">
                          <ThumbsUp className="w-4 h-4" />
                          <span>{review.likes}</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center space-x-1 hover:text-purple-400">
                          <ThumbsDown className="w-4 h-4" />
                          <span>{review.dislikes}</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center space-x-1 hover:text-purple-400">
                          <MessageSquare className="w-4 h-4" />
                          <span>Reply</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center space-x-1 hover:text-purple-400">
                          <Share2 className="w-4 h-4" />
                          <span>Share</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
