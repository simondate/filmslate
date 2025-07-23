"use client"

import { useState } from "react"
import { Heart, MessageCircle, Calendar } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { StarRating } from "./star-rating"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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

interface UserReview {
  id: string
  userId: string
  userName: string
  userAvatar: string
  rating: number
  review: string
  date: string
  likes: number
  isLiked: boolean
}

interface ReviewModalProps {
  movie: Movie | null
  isOpen: boolean
  onClose: () => void
}

// Mock user reviews data
const mockReviews: UserReview[] = [
  {
    id: "1",
    userId: "user1",
    userName: "CinemaLover92",
    userAvatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    review:
      "Absolutely mind-blowing! This film redefined what cinema can be. The multiverse concept is executed flawlessly with incredible attention to detail.",
    date: "2024-01-15",
    likes: 24,
    isLiked: false,
  },
  {
    id: "2",
    userId: "user2",
    userName: "IndieFilmCritic",
    userAvatar: "/placeholder.svg?height=40&width=40",
    rating: 4,
    review:
      "A beautiful exploration of family dynamics wrapped in sci-fi brilliance. Some pacing issues in the middle act, but the emotional payoff is worth it.",
    date: "2024-01-10",
    likes: 18,
    isLiked: true,
  },
  {
    id: "3",
    userId: "user3",
    userName: "MovieBuff2024",
    userAvatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    review:
      "This movie changed my perspective on life. The performances are outstanding, especially Michelle Yeoh. A masterpiece of modern cinema.",
    date: "2024-01-08",
    likes: 31,
    isLiked: false,
  },
]

// Mock founder reviews data
const founderReviews: Record<
  number,
  {
    title: string
    excerpt: string
    date: string
    readTime: string
    fullPostUrl?: string
  }
> = {
  1: {
    title: "The Farewell: A Masterclass in Cultural Storytelling",
    excerpt:
      "Lulu Wang's deeply personal film about family, lies, and love transcends cultural boundaries while remaining authentically Chinese-American. What struck me most during my third viewing was how Wang uses silence and subtext to convey more emotion than most films achieve with grand gestures. The grandmother's performance is nothing short of luminous, and the film's exploration of how we protect those we love—even through deception—feels both universal and deeply specific. This is exactly the kind of nuanced, character-driven storytelling that IndieStream was built to celebrate.",
    date: "2024-01-20",
    readTime: "4 min read",
    fullPostUrl: "/blog/the-farewell-cultural-storytelling",
  },
  2: {
    title: "Minari: The Poetry of the American Dream",
    excerpt:
      "Lee Isaac Chung's semi-autobiographical masterpiece reminds us that the American Dream isn't just about success—it's about belonging. Watching this film, I was transported to my own childhood memories of family sacrifice and the weight of expectations. The way Chung captures the Arkansas landscape as both beautiful and unforgiving mirrors the immigrant experience perfectly. Youn Yuh-jung's grandmother is a force of nature, bringing humor and wisdom that anchors the entire film. Minari grows quietly, just like the plant it's named after, and by the end, you realize you've witnessed something profound.",
    date: "2024-01-18",
    readTime: "5 min read",
    fullPostUrl: "/blog/minari-american-dream-poetry",
  },
  3: {
    title: "Manchester by the Sea: Grief Without Easy Answers",
    excerpt:
      "Kenneth Lonergan has crafted something rare in cinema—a film about grief that doesn't try to fix or explain it away. Casey Affleck's Lee Chandler is a man drowning in his own past, and Lonergan never asks us to forgive him or find redemption. Instead, we're asked to witness. The film's pacing mirrors the weight of depression itself—slow, heavy, but punctuated by moments of unexpected beauty. What makes this film essential viewing is its refusal to provide comfort. Sometimes, the most honest thing art can do is sit with us in our pain.",
    date: "2024-01-15",
    readTime: "6 min read",
    fullPostUrl: "/blog/manchester-by-the-sea-grief",
  },
  11: {
    title: "Parasite: The Staircase as Social Commentary",
    excerpt:
      "Bong Joon-ho's genre-defying thriller is a masterpiece of visual storytelling that uses architecture as character. Every staircase in this film—going up to the Parks' house, down to the Kims' semi-basement, deeper still to the bunker—tells us exactly where we are in the social hierarchy. What begins as a dark comedy about class envy transforms into something far more sinister and profound. The film's final act is a gut punch that forces us to confront uncomfortable truths about inequality and the lengths people will go to survive. This is cinema at its most powerful—entertaining, beautiful, and deeply unsettling.",
    date: "2024-01-12",
    readTime: "7 min read",
    fullPostUrl: "/blog/parasite-staircase-social-commentary",
  },
  16: {
    title: "Everything Everywhere All at Once: Chaos as Love Language",
    excerpt:
      "The Daniels have created something unprecedented—a multiverse action comedy that's actually about a mother learning to accept her daughter. Beneath all the googly eyes, hot dog fingers, and bagel black holes lies the most tender exploration of generational trauma I've seen in years. Michelle Yeoh gives a career-defining performance as a woman who must literally become everything to save everyone. The film's maximalist approach mirrors the overwhelming nature of modern life, but at its core, it's asking a simple question: What if the chaos is just love trying to find its way? This is why independent cinema matters—only here could such ambitious, heartfelt weirdness exist.",
    date: "2024-01-25",
    readTime: "8 min read",
    fullPostUrl: "/blog/everything-everywhere-chaos-love",
  },
}

export function ReviewModal({ movie, isOpen, onClose }: ReviewModalProps) {
  const [userRating, setUserRating] = useState(0)
  const [userReview, setUserReview] = useState("")
  const [hasSubmittedReview, setHasSubmittedReview] = useState(false)
  const [reviews, setReviews] = useState<UserReview[]>(mockReviews)
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!movie) return null

  const handleSubmitReview = async () => {
    if (userRating === 0) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newReview: UserReview = {
      id: Date.now().toString(),
      userId: "current-user",
      userName: "You",
      userAvatar: "/placeholder.svg?height=40&width=40",
      rating: userRating,
      review: userReview,
      date: new Date().toISOString().split("T")[0],
      likes: 0,
      isLiked: false,
    }

    setReviews([newReview, ...reviews])
    setHasSubmittedReview(true)
    setIsSubmitting(false)
  }

  const handleEditReview = () => {
    setHasSubmittedReview(false)
    // Find and populate existing review
    const existingReview = reviews.find((r) => r.userId === "current-user")
    if (existingReview) {
      setUserRating(existingReview.rating)
      setUserReview(existingReview.review)
    }
  }

  const handleLikeReview = (reviewId: string) => {
    setReviews(
      reviews.map((review) =>
        review.id === reviewId
          ? {
              ...review,
              isLiked: !review.isLiked,
              likes: review.isLiked ? review.likes - 1 : review.likes + 1,
            }
          : review,
      ),
    )
  }

  const averageRating =
    reviews.length > 0 ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : movie.rating

  const userReviewData = reviews.find((r) => r.userId === "current-user")

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] bg-black text-white border-gray-800 overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Reviews & Ratings</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col lg:flex-row gap-6 max-h-[calc(90vh-120px)] overflow-hidden">
          {/* Movie Info Sidebar */}
          <div className="lg:w-1/3 flex-shrink-0">
            <div className="sticky top-0">
              <div className="flex flex-col items-center text-center">
                <Image
                  src={movie.poster || "/placeholder.svg"}
                  alt={movie.title}
                  width={200}
                  height={300}
                  className="rounded-lg object-cover mb-4"
                />
                <h3 className="text-xl font-bold mb-2">{movie.title}</h3>
                <p className="text-gray-400 text-sm mb-2">Directed by {movie.director}</p>
                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-gray-300">{movie.year}</span>
                  <span className="text-gray-300">{movie.duration}</span>
                </div>
                <div className="flex flex-wrap gap-1 mb-4">
                  {movie.genres.map((genre) => (
                    <Badge key={genre} variant="secondary" className="bg-gray-700 text-gray-300 text-xs">
                      {genre}
                    </Badge>
                  ))}
                </div>

                {/* Average Rating */}
                <div className="bg-gray-900 p-4 rounded-lg w-full">
                  <div className="text-center mb-3">
                    <div className="text-3xl font-bold text-yellow-400 mb-1">{averageRating.toFixed(1)}</div>
                    <StarRating rating={averageRating} readonly size="lg" className="justify-center mb-2" />
                    <p className="text-sm text-gray-400">
                      Based on {reviews.length} review{reviews.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="lg:w-2/3 flex flex-col min-h-0">
            {/* User Review Section */}
            <div className="bg-gray-900 p-6 rounded-lg mb-6 flex-shrink-0">
              <h4 className="text-lg font-semibold mb-4">{hasSubmittedReview ? "Your Review" : "Rate This Movie"}</h4>

              {!hasSubmittedReview ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Your Rating</label>
                    <StarRating rating={userRating} onRatingChange={setUserRating} size="lg" showValue />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Your Review (Optional)</label>
                    <Textarea
                      placeholder="Share your thoughts about this movie..."
                      value={userReview}
                      onChange={(e) => setUserReview(e.target.value)}
                      className="bg-black border-gray-700 text-white placeholder-gray-400 min-h-[100px]"
                    />
                  </div>

                  <Button
                    onClick={handleSubmitReview}
                    disabled={userRating === 0 || isSubmitting}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Review"}
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {userReviewData && (
                    <div className="border border-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <StarRating rating={userReviewData.rating} readonly size="sm" />
                          <span className="text-sm text-gray-400">
                            {new Date(userReviewData.date).toLocaleDateString()}
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleEditReview}
                          className="text-gray-400 hover:text-white"
                        >
                          Edit
                        </Button>
                      </div>
                      {userReviewData.review && <p className="text-gray-300 text-sm">{userReviewData.review}</p>}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Founder's Thoughts Section */}
            {founderReviews[movie.id] && (
              <div className="bg-gradient-to-r from-red-900/20 to-red-800/20 border border-red-800/30 p-6 rounded-lg mb-6 flex-shrink-0">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">IS</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="text-lg font-semibold text-red-400">Founder's Thoughts</h4>
                      <Badge variant="outline" className="border-red-600 text-red-400 text-xs">
                        Editorial
                      </Badge>
                    </div>
                    <h5 className="font-medium text-white mb-3">{founderReviews[movie.id].title}</h5>
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">{founderReviews[movie.id].excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-xs text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(founderReviews[movie.id].date).toLocaleDateString()}</span>
                        </div>
                        <span>{founderReviews[movie.id].readTime}</span>
                      </div>
                      {founderReviews[movie.id].fullPostUrl && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-400 hover:text-red-300 hover:bg-red-900/20 text-xs"
                        >
                          Read Full Post →
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Community Reviews */}
            <div className="flex-1 min-h-0">
              <h4 className="text-lg font-semibold mb-4">Community Reviews</h4>
              <div className="space-y-4 overflow-y-auto max-h-full pr-2">
                {reviews
                  .filter((review) => review.userId !== "current-user")
                  .map((review) => (
                    <div key={review.id} className="bg-gray-900 p-4 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <Avatar className="w-10 h-10 flex-shrink-0">
                          <AvatarImage src={review.userAvatar || "/placeholder.svg"} />
                          <AvatarFallback>{review.userName[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-sm">{review.userName}</span>
                              <StarRating rating={review.rating} readonly size="sm" />
                            </div>
                            <div className="flex items-center space-x-1 text-xs text-gray-400">
                              <Calendar className="w-3 h-3" />
                              <span>{new Date(review.date).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <p className="text-gray-300 text-sm mb-3 leading-relaxed">{review.review}</p>
                          <div className="flex items-center space-x-4">
                            <button
                              onClick={() => handleLikeReview(review.id)}
                              className={`flex items-center space-x-1 text-xs transition-colors ${
                                review.isLiked ? "text-red-400 hover:text-red-300" : "text-gray-400 hover:text-gray-300"
                              }`}
                            >
                              <Heart className={`w-3 h-3 ${review.isLiked ? "fill-current" : ""}`} />
                              <span>{review.likes}</span>
                            </button>
                            <button className="flex items-center space-x-1 text-xs text-gray-400 hover:text-gray-300 transition-colors">
                              <MessageCircle className="w-3 h-3" />
                              <span>Reply</span>
                            </button>
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
