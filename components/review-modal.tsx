"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Star, Heart, Calendar, Clock, X, Play } from "lucide-react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
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

// Update the founderReviews object to include all movie IDs and add external blog data

// Replace the existing founderReviews object with this expanded version:
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
  4: {
    rating: 4,
    excerpt:
      "Gerwig's directorial debut captures the universal experience of coming-of-age with remarkable specificity. Lady Bird is both deeply personal and universally relatable.",
    readTime: "5 min read",
    fullPostUrl: "/blog/lady-bird-coming-of-age-specificity",
  },
  5: {
    rating: 5,
    excerpt:
      "Jenkins creates a triptych of masculinity that's both tender and powerful. Moonlight redefines what it means to be vulnerable on screen.",
    readTime: "6 min read",
    fullPostUrl: "/blog/moonlight-masculinity-vulnerability",
  },
  6: {
    rating: 4,
    excerpt:
      "Zhao's contemplative road movie finds poetry in America's forgotten spaces. Nomadland is a meditation on resilience and the meaning of home.",
    readTime: "5 min read",
    fullPostUrl: "/blog/nomadland-american-spaces-resilience",
  },
  7: {
    rating: 5,
    excerpt:
      "Baker's vibrant portrait of childhood poverty refuses to sentimentalize its subjects. The Florida Project finds magic in the margins of society.",
    readTime: "4 min read",
    fullPostUrl: "/blog/florida-project-childhood-margins",
  },
  8: {
    rating: 4,
    excerpt:
      "Abrahamson's claustrophobic thriller becomes a story of liberation and healing. Room explores trauma with remarkable sensitivity and hope.",
    readTime: "5 min read",
    fullPostUrl: "/blog/room-trauma-healing-hope",
  },
  9: {
    rating: 4,
    excerpt:
      "Jonze's near-future romance asks profound questions about connection in the digital age. Her is both intimate and expansive in its vision.",
    readTime: "6 min read",
    fullPostUrl: "/blog/her-digital-connection-intimacy",
  },
  10: {
    rating: 5,
    excerpt:
      "Guadagnino's sensual coming-of-age story captures the intoxication of first love. Call Me By Your Name is a masterclass in desire and longing.",
    readTime: "5 min read",
    fullPostUrl: "/blog/call-me-by-your-name-desire-longing",
  },
  11: {
    rating: 5,
    excerpt:
      "Bong Joon-ho's masterwork uses architecture as a character, with each floor representing a different social stratum. It's a thriller that doubles as incisive social commentary.",
    readTime: "7 min read",
    fullPostUrl: "/blog/parasite-architecture-class",
  },
  12: {
    rating: 4,
    excerpt:
      "Eggers' psychological horror is a masterpiece of atmosphere and madness. The Lighthouse explores isolation and the breakdown of reality with haunting precision.",
    readTime: "6 min read",
    fullPostUrl: "/blog/lighthouse-isolation-madness",
  },
  13: {
    rating: 4,
    excerpt:
      "Aster's folk horror subverts expectations at every turn. Midsommar is a breakup movie disguised as a nightmare, beautiful and disturbing in equal measure.",
    readTime: "7 min read",
    fullPostUrl: "/blog/midsommar-folk-horror-breakup",
  },
  14: {
    rating: 4,
    excerpt:
      "Eggers' period horror feels authentically lived-in and terrifying. The Witch creates dread through historical accuracy and psychological terror.",
    readTime: "5 min read",
    fullPostUrl: "/blog/witch-historical-psychological-terror",
  },
  15: {
    rating: 5,
    excerpt:
      "The Safdie Brothers create a anxiety-inducing masterpiece of urban desperation. Uncut Gems is relentless in its pursuit of tension and authenticity.",
    readTime: "6 min read",
    fullPostUrl: "/blog/uncut-gems-urban-desperation-anxiety",
  },
  16: {
    rating: 5,
    excerpt:
      "The Daniels have created something unprecedented - a multiverse story that's ultimately about the simple, profound act of choosing love over cynicism. Chaos as a love language.",
    readTime: "8 min read",
    fullPostUrl: "/blog/everything-everywhere-chaos-love",
  },
  17: {
    rating: 5,
    excerpt:
      "Neville's documentary captures the essence of kindness in an increasingly cynical world. Won't You Be My Neighbor? reminds us of the power of genuine compassion.",
    readTime: "4 min read",
    fullPostUrl: "/blog/wont-you-be-my-neighbor-kindness-compassion",
  },
  18: {
    rating: 4,
    excerpt:
      "Vasarhelyi and Chin's documentary is a masterclass in tension and human determination. Free Solo makes the impossible feel both terrifying and inspiring.",
    readTime: "5 min read",
    fullPostUrl: "/blog/free-solo-determination-impossible",
  },
  19: {
    rating: 4,
    excerpt:
      "Wardle's documentary starts as a heartwarming reunion and becomes something much darker. Three Identical Strangers explores the ethics of scientific research.",
    readTime: "6 min read",
    fullPostUrl: "/blog/three-identical-strangers-ethics-research",
  },
  20: {
    rating: 5,
    excerpt:
      "Oppenheimer's controversial documentary forces us to confront uncomfortable truths about violence and memory. The Act of Killing is cinema as moral reckoning.",
    readTime: "8 min read",
    fullPostUrl: "/blog/act-of-killing-violence-memory",
  },
  21: {
    rating: 4,
    excerpt:
      "Kotevska and Stefanov's documentary finds profound beauty in simplicity. Honeyland is a meditation on balance, tradition, and environmental harmony.",
    readTime: "5 min read",
    fullPostUrl: "/blog/honeyland-balance-tradition-environment",
  },
}

// Add external blog data after the founderReviews object:
const externalBlogs: Record<
  number,
  {
    source: string
    title: string
    excerpt: string
    url: string
    author: string
    publication: string
  }
> = {
  1: {
    source: "The New Yorker",
    title: "The Farewell and the Art of Cultural Translation",
    excerpt:
      "Lulu Wang's film navigates the complex terrain between Eastern and Western approaches to family, death, and truth-telling with remarkable nuance.",
    url: "https://newyorker.com/culture/the-farewell-cultural-translation",
    author: "Naomi Fry",
    publication: "The New Yorker",
  },
  2: {
    source: "The Atlantic",
    title: "Minari and the Quiet Revolution of Immigrant Stories",
    excerpt:
      "Lee Isaac Chung's semi-autobiographical film redefines the American Dream through the lens of a Korean family's struggle and perseverance.",
    url: "https://theatlantic.com/culture/minari-immigrant-stories",
    author: "Hannah Giorgis",
    publication: "The Atlantic",
  },
  3: {
    source: "The Guardian",
    title: "Manchester by the Sea: A Masterpiece of Grief",
    excerpt:
      "Kenneth Lonergan's devastating drama understands that some wounds never heal, and that's perhaps the most honest thing cinema can tell us.",
    url: "https://theguardian.com/film/manchester-by-the-sea-grief-masterpiece",
    author: "Peter Bradshaw",
    publication: "The Guardian",
  },
  4: {
    source: "Rolling Stone",
    title: "Lady Bird: Greta Gerwig's Coming-of-Age Triumph",
    excerpt:
      "Gerwig's directorial debut captures the universal experience of adolescence with specificity that makes it feel both personal and universal.",
    url: "https://rollingstone.com/movies/lady-bird-gerwig-triumph",
    author: "Peter Travers",
    publication: "Rolling Stone",
  },
  5: {
    source: "Variety",
    title: "Moonlight: Redefining Black Masculinity on Screen",
    excerpt:
      "Barry Jenkins creates a triptych of identity that challenges every assumption about masculinity, sexuality, and what it means to be seen.",
    url: "https://variety.com/film/moonlight-black-masculinity",
    author: "Owen Gleiberman",
    publication: "Variety",
  },
  6: {
    source: "The New York Times",
    title: "Nomadland and America's Hidden Homeless",
    excerpt:
      "Chloé Zhao's contemplative road movie reveals the invisible population of Americans living on society's margins with dignity and grace.",
    url: "https://nytimes.com/movies/nomadland-americas-hidden-homeless",
    author: "A.O. Scott",
    publication: "The New York Times",
  },
  7: {
    source: "The Washington Post",
    title: "The Florida Project: Childhood in the Shadow of Disney",
    excerpt:
      "Sean Baker's vibrant film finds magic and heartbreak in the shadow of the Magic Kingdom, revealing America's invisible poverty.",
    url: "https://washingtonpost.com/entertainment/florida-project-childhood-disney",
    author: "Ann Hornaday",
    publication: "The Washington Post",
  },
  8: {
    source: "Entertainment Weekly",
    title: "Room: From Captivity to Freedom",
    excerpt:
      "Lenny Abrahamson's adaptation transforms Emma Donoghue's novel into a powerful meditation on trauma, resilience, and the bonds between mother and child.",
    url: "https://ew.com/movies/room-captivity-freedom-review",
    author: "Chris Nashawaty",
    publication: "Entertainment Weekly",
  },
  9: {
    source: "The Los Angeles Times",
    title: "Her: Love in the Age of Artificial Intelligence",
    excerpt:
      "Spike Jonze's near-future romance asks profound questions about connection, loneliness, and what it means to love in an increasingly digital world.",
    url: "https://latimes.com/entertainment/her-ai-love-story",
    author: "Kenneth Turan",
    publication: "The Los Angeles Times",
  },
  10: {
    source: "The Hollywood Reporter",
    title: "Call Me By Your Name: The Poetry of First Love",
    excerpt:
      "Luca Guadagnino's sensual adaptation captures the intoxication and pain of first love with remarkable sensitivity and visual poetry.",
    url: "https://hollywoodreporter.com/movies/call-me-by-your-name-first-love",
    author: "David Rooney",
    publication: "The Hollywood Reporter",
  },
  11: {
    source: "The New Yorker",
    title: "Parasite: Class Warfare Through Architecture",
    excerpt:
      "Bong Joon-ho's masterwork uses physical space as a metaphor for social stratification, creating a thriller that's also incisive social commentary.",
    url: "https://newyorker.com/culture/parasite-class-architecture",
    author: "Anthony Lane",
    publication: "The New Yorker",
  },
  12: {
    source: "The Atlantic",
    title: "The Lighthouse: Madness and Isolation",
    excerpt:
      "Robert Eggers' psychological horror explores the breakdown of reality through the lens of two lighthouse keepers slowly losing their minds.",
    url: "https://theatlantic.com/culture/lighthouse-madness-isolation",
    author: "Sophie Gilbert",
    publication: "The Atlantic",
  },
  13: {
    source: "Vulture",
    title: "Midsommar: Horror in Broad Daylight",
    excerpt:
      "Ari Aster's folk horror subverts genre expectations by setting its nightmare in perpetual daylight, creating something beautiful and disturbing.",
    url: "https://vulture.com/movies/midsommar-horror-daylight-review",
    author: "Emily Yoshida",
    publication: "Vulture",
  },
  14: {
    source: "The Guardian",
    title: "The Witch: Authentic Period Horror",
    excerpt:
      "Robert Eggers' debut creates dread through historical accuracy and psychological terror, making the past feel genuinely alien and frightening.",
    url: "https://theguardian.com/film/the-witch-period-horror-authentic",
    author: "Jordan Hoffman",
    publication: "The Guardian",
  },
  15: {
    source: "The New York Times",
    title: "Uncut Gems: Anxiety as Art Form",
    excerpt:
      "The Safdie Brothers create a masterpiece of urban anxiety, following a man's desperate gamble with relentless energy and authenticity.",
    url: "https://nytimes.com/movies/uncut-gems-anxiety-art",
    author: "Manohla Dargis",
    publication: "The New York Times",
  },
  16: {
    source: "The Atlantic",
    title: "Everything Everywhere All at Once: Chaos as Love Language",
    excerpt:
      "The Daniels create a multiverse epic that's ultimately about choosing love over cynicism, finding meaning in chaos and connection in confusion.",
    url: "https://theatlantic.com/culture/everything-everywhere-chaos-love",
    author: "Hannah Giorgis",
    publication: "The Atlantic",
  },
  17: {
    source: "The Washington Post",
    title: "Won't You Be My Neighbor?: The Power of Kindness",
    excerpt:
      "Morgan Neville's documentary about Fred Rogers reminds us of the radical power of genuine kindness and compassion in an increasingly cynical world.",
    url: "https://washingtonpost.com/entertainment/wont-you-be-my-neighbor-kindness",
    author: "Ann Hornaday",
    publication: "The Washington Post",
  },
  18: {
    source: "Rolling Stone",
    title: "Free Solo: The Art of Impossible Dreams",
    excerpt:
      "This documentary about Alex Honnold's attempt to climb El Capitan without ropes is a masterclass in tension and human determination.",
    url: "https://rollingstone.com/movies/free-solo-impossible-dreams",
    author: "Peter Travers",
    publication: "Rolling Stone",
  },
  19: {
    source: "Variety",
    title: "Three Identical Strangers: The Ethics of Science",
    excerpt:
      "What begins as a heartwarming reunion story becomes a disturbing exploration of scientific ethics and the nature versus nurture debate.",
    url: "https://variety.com/film/three-identical-strangers-ethics",
    author: "Caroline Framke",
    publication: "Variety",
  },
  20: {
    source: "The New Yorker",
    title: "The Act of Killing: Cinema as Moral Reckoning",
    excerpt:
      "Joshua Oppenheimer's controversial documentary forces viewers to confront uncomfortable truths about violence, memory, and complicity.",
    url: "https://newyorker.com/culture/act-of-killing-moral-reckoning",
    author: "Richard Brody",
    publication: "The New Yorker",
  },
  21: {
    source: "The Guardian",
    title: "Honeyland: Nature's Delicate Balance",
    excerpt:
      "This documentary finds profound beauty in the simple life of Europe's last wild bee hunter, exploring themes of tradition and environmental harmony.",
    url: "https://theguardian.com/film/honeyland-nature-balance",
    author: "Peter Bradshaw",
    publication: "The Guardian",
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
    review:
      "Absolutely stunning film. The emotional depth and cultural nuances are beautifully portrayed. A masterpiece that stays with you long after watching.",
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
    review:
      "Great storytelling and excellent performances. The pacing is perfect and the cinematography is gorgeous. Highly recommend!",
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
    review:
      "This film touched my heart in ways I didn't expect. The authenticity of the performances and the raw emotion make it unforgettable.",
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
    review:
      "Solid indie film with great character development. The director's vision is clear and the story is compelling throughout.",
  },
  {
    id: 5,
    user: {
      name: "Lisa Park",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "LP",
    },
    rating: 5,
    date: "2024-01-03",
    likes: 11,
    review:
      "One of the best films I've seen this year. The way it handles complex themes with such grace is remarkable. A true work of art.",
  },
  {
    id: 6,
    user: {
      name: "James Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JW",
    },
    rating: 3,
    date: "2024-01-01",
    likes: 4,
    review:
      "Good film overall, though it felt a bit slow at times. The performances are strong but the pacing could be improved.",
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
  const externalBlog = externalBlogs[movie.id]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] bg-black text-white border-gray-800 overflow-hidden flex flex-col">
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
              <div className="bg-gradient-to-r from-purple-900/20 to-purple-800/20 border border-purple-800/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      FS
                    </div>
                    <div>
                      <h4 className="font-semibold">Founder's Thoughts</h4>
                      <div className="flex items-center space-x-2">
                        <StarRating rating={founderReview.rating} readOnly size="small" />
                        <Badge className="bg-purple-600 text-white text-xs">Editorial</Badge>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">{founderReview.readTime}</span>
                </div>

                <p className="text-gray-300 mb-3 leading-relaxed">{founderReview.excerpt}</p>

                <Button variant="link" className="text-purple-400 hover:text-purple-300 p-0 h-auto" asChild>
                  <a href={founderReview.fullPostUrl}>Read full post →</a>
                </Button>
              </div>
            )}

            {/* External Review */}
            {externalBlog && (
              <div className="bg-gradient-to-r from-blue-900/20 to-blue-800/20 border border-blue-800/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {externalBlog.publication
                        .split(" ")
                        .map((word) => word[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                    <div>
                      <h4 className="font-semibold">External Review</h4>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-400">{externalBlog.author}</span>
                        <Badge className="bg-blue-600 text-white text-xs">{externalBlog.publication}</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <h5 className="font-semibold text-white mb-2">{externalBlog.title}</h5>
                <p className="text-gray-300 mb-3 leading-relaxed">{externalBlog.excerpt}</p>

                <Button variant="link" className="text-blue-400 hover:text-blue-300 p-0 h-auto" asChild>
                  <a href={externalBlog.url} target="_blank" rel="noopener noreferrer">
                    Read full article →
                  </a>
                </Button>
              </div>
            )}

            {/* Community Ratings */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Community Reviews</h3>
              <div className="space-y-4">
                {communityReviews.map((review) => (
                  <div key={review.id} className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={review.user.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-gray-700 text-white text-sm">
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
                        className="flex items-center space-x-1 text-gray-400 hover:text-purple-400 transition-colors"
                      >
                        <Heart
                          className={`w-4 h-4 ${likedReviews.has(review.id) ? "fill-current text-purple-400" : ""}`}
                        />
                        <span className="text-xs">{review.likes + (likedReviews.has(review.id) ? 1 : 0)}</span>
                      </button>
                    </div>

                    <p className="text-gray-300 text-sm leading-relaxed">{review.review}</p>
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
