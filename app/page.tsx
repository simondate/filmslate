"use client"

import { Search, Play, Info, Star, Clock, Calendar } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SearchModal } from "@/components/search-modal"
import { ReviewModal } from "@/components/review-modal"
import { FounderBlog } from "@/components/founder-blog"

const movieCategories = [
  {
    title: "Sundance Winners",
    movies: [
      {
        id: 1,
        title: "The Farewell",
        year: 2019,
        rating: 8.2,
        duration: "100 min",
        poster: "/placeholder.svg?height=300&width=200&text=The+Farewell+Movie+Poster",
      },
      {
        id: 2,
        title: "Minari",
        year: 2020,
        rating: 8.1,
        duration: "115 min",
        poster: "/placeholder.svg?height=300&width=200&text=Minari+Movie+Poster",
      },
      {
        id: 3,
        title: "Manchester by the Sea",
        year: 2016,
        rating: 8.5,
        duration: "137 min",
        poster: "/placeholder.svg?height=300&width=200&text=Manchester+by+the+Sea+Poster",
      },
      {
        id: 4,
        title: "Lady Bird",
        year: 2017,
        rating: 8.3,
        duration: "94 min",
        poster: "/placeholder.svg?height=300&width=200&text=Lady+Bird+Movie+Poster",
      },
      {
        id: 5,
        title: "Moonlight",
        year: 2016,
        rating: 8.7,
        duration: "111 min",
        poster: "/placeholder.svg?height=300&width=200&text=Moonlight+Movie+Poster",
      },
    ],
  },
  {
    title: "Independent Dramas",
    movies: [
      {
        id: 6,
        title: "Nomadland",
        year: 2020,
        rating: 8.0,
        duration: "107 min",
        poster: "/placeholder.svg?height=300&width=200&text=Nomadland+Movie+Poster",
      },
      {
        id: 7,
        title: "The Florida Project",
        year: 2017,
        rating: 8.1,
        duration: "111 min",
        poster: "/placeholder.svg?height=300&width=200&text=The+Florida+Project+Poster",
      },
      {
        id: 8,
        title: "Room",
        year: 2015,
        rating: 8.2,
        duration: "118 min",
        poster: "/placeholder.svg?height=300&width=200&text=Room+Movie+Poster",
      },
      {
        id: 9,
        title: "Her",
        year: 2013,
        rating: 8.0,
        duration: "126 min",
        poster: "/placeholder.svg?height=300&width=200&text=Her+Movie+Poster",
      },
      {
        id: 10,
        title: "Call Me By Your Name",
        year: 2017,
        rating: 8.4,
        duration: "132 min",
        poster: "/placeholder.svg?height=300&width=200&text=Call+Me+By+Your+Name+Poster",
      },
    ],
  },
  {
    title: "Art House Cinema",
    movies: [
      {
        id: 11,
        title: "Parasite",
        year: 2019,
        rating: 8.9,
        duration: "132 min",
        poster: "/placeholder.svg?height=300&width=200&text=Parasite+Movie+Poster",
      },
      {
        id: 12,
        title: "The Lighthouse",
        year: 2019,
        rating: 8.1,
        duration: "109 min",
        poster: "/placeholder.svg?height=300&width=200&text=The+Lighthouse+Movie+Poster",
      },
      {
        id: 13,
        title: "Midsommar",
        year: 2019,
        rating: 7.8,
        duration: "148 min",
        poster: "/placeholder.svg?height=300&width=200&text=Midsommar+Movie+Poster",
      },
      {
        id: 14,
        title: "The Witch",
        year: 2015,
        rating: 7.5,
        duration: "92 min",
        poster: "/placeholder.svg?height=300&width=200&text=The+Witch+Movie+Poster",
      },
      {
        id: 15,
        title: "Uncut Gems",
        year: 2019,
        rating: 8.2,
        duration: "135 min",
        poster: "/placeholder.svg?height=300&width=200&text=Uncut+Gems+Movie+Poster",
      },
    ],
  },
  {
    title: "Documentary Features",
    movies: [
      {
        id: 16,
        title: "Won't You Be My Neighbor?",
        year: 2018,
        rating: 8.5,
        duration: "94 min",
        poster: "/placeholder.svg?height=300&width=200&text=Won't+You+Be+My+Neighbor+Poster",
      },
      {
        id: 17,
        title: "Free Solo",
        year: 2018,
        rating: 8.2,
        duration: "100 min",
        poster: "/placeholder.svg?height=300&width=200&text=Free+Solo+Documentary+Poster",
      },
      {
        id: 18,
        title: "Three Identical Strangers",
        year: 2018,
        rating: 8.1,
        duration: "96 min",
        poster: "/placeholder.svg?height=300&width=200&text=Three+Identical+Strangers+Poster",
      },
      {
        id: 19,
        title: "The Act of Killing",
        year: 2012,
        rating: 8.2,
        duration: "117 min",
        poster: "/placeholder.svg?height=300&width=200&text=The+Act+of+Killing+Poster",
      },
      {
        id: 20,
        title: "Honeyland",
        year: 2019,
        rating: 8.0,
        duration: "85 min",
        poster: "/placeholder.svg?height=300&width=200&text=Honeyland+Documentary+Poster",
      },
    ],
  },
]

const featuredMovie = {
  title: "Everything Everywhere All at Once",
  year: 2022,
  rating: 8.9,
  duration: "139 min",
  description:
    "A mind-bending multiverse adventure that follows a Chinese-American laundromat owner who discovers she must connect with parallel universe versions of herself to prevent a powerful being from destroying everything.",
  genres: ["Sci-Fi", "Comedy", "Drama"],
  backdrop: "/placeholder.svg?height=600&width=1200&text=Everything+Everywhere+All+at+Once+Backdrop",
}

export default function IndieFilmApp() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState<any>(null)
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold text-red-500">
              FilmSlate
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="hover:text-gray-300 transition-colors">
                Home
              </Link>
              <Link href="/browse" className="hover:text-gray-300 transition-colors">
                Browse
              </Link>
              <Link href="/watchlist" className="hover:text-gray-300 transition-colors">
                My List
              </Link>
              <Link href="/festivals" className="hover:text-gray-300 transition-colors">
                Festivals
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-black/50 border border-gray-700 rounded-md text-gray-400 hover:text-white hover:border-gray-600 transition-colors w-64"
              >
                <Search className="w-4 h-4" />
                <span>Search indie films...</span>
              </button>
            </div>
            <button
              onClick={() => setIsSearchOpen(true)}
              className="md:hidden p-2 hover:bg-gray-800 rounded-md transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
            <Avatar className="w-8 h-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0">
          <Image
            src={featuredMovie.backdrop || "/placeholder.svg"}
            alt={featuredMovie.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>

        <div className="relative z-10 px-6 max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">{featuredMovie.title}</h1>
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center space-x-1">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="font-semibold">{featuredMovie.rating}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-gray-300">{featuredMovie.year}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-gray-300">{featuredMovie.duration}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            {featuredMovie.genres.map((genre) => (
              <Badge key={genre} variant="secondary" className="bg-white/20 text-white border-none">
                {genre}
              </Badge>
            ))}
          </div>
          <p className="text-lg text-gray-200 mb-8 leading-relaxed">{featuredMovie.description}</p>
          <div className="flex space-x-4">
            <Button size="lg" className="bg-white text-black hover:bg-gray-200 font-semibold">
              <Play className="w-5 h-5 mr-2" />
              Play Now
            </Button>
            <Button size="lg" variant="outline" className="border-gray-400 text-white hover:bg-white/10 bg-transparent">
              <Info className="w-5 h-5 mr-2" />
              More Info
            </Button>
          </div>
        </div>
      </section>

      {/* Movie Categories */}
      <main className="relative z-10 -mt-32 pb-20">
        {movieCategories.map((category, categoryIndex) => (
          <section key={category.title} className="mb-12 px-6">
            <h2 className="text-2xl font-bold mb-6">{category.title}</h2>
            <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
              {category.movies.map((movie) => (
                <div
                  key={movie.id}
                  className="flex-shrink-0 group cursor-pointer transition-transform hover:scale-105"
                  onClick={() => {
                    const fullMovie = {
                      ...movie,
                      genres: ["Drama", "Independent"], // Add default genres
                      director: "Various Directors", // Add default director
                      description: `An acclaimed independent film from ${movie.year}.`, // Add default description
                    }
                    setSelectedMovie(fullMovie)
                    setIsReviewModalOpen(true)
                  }}
                >
                  <div className="relative w-48 h-72 rounded-lg overflow-hidden">
                    <Image
                      src={movie.poster || "/placeholder.svg"}
                      alt={movie.title}
                      fill
                      className="object-cover transition-opacity group-hover:opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform">
                      <h3 className="font-semibold text-sm mb-1 line-clamp-2">{movie.title}</h3>
                      <div className="flex items-center justify-between text-xs text-gray-300">
                        <span>{movie.year}</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span>{movie.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 mt-1">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-400">{movie.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>

      {/* Founder's Blog Section */}
      <FounderBlog />

      {/* Footer */}
      <footer className="bg-gray-900 px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-red-500 mb-4">FilmSlate</h3>
              <p className="text-gray-400 text-sm">
                Discover and stream the best independent films from around the world.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Browse</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/genres" className="hover:text-white transition-colors">
                    Genres
                  </Link>
                </li>
                <li>
                  <Link href="/festivals" className="hover:text-white transition-colors">
                    Film Festivals
                  </Link>
                </li>
                <li>
                  <Link href="/directors" className="hover:text-white transition-colors">
                    Directors
                  </Link>
                </li>
                <li>
                  <Link href="/new-releases" className="hover:text-white transition-colors">
                    New Releases
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Account</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/profile" className="hover:text-white transition-colors">
                    My Profile
                  </Link>
                </li>
                <li>
                  <Link href="/watchlist" className="hover:text-white transition-colors">
                    Watchlist
                  </Link>
                </li>
                <li>
                  <Link href="/settings" className="hover:text-white transition-colors">
                    Settings
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/press" className="hover:text-white transition-colors">
                    Press
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 FilmSlate. All rights reserved.</p>
          </div>
        </div>
      </footer>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <ReviewModal
        movie={selectedMovie}
        isOpen={isReviewModalOpen}
        onClose={() => {
          setIsReviewModalOpen(false)
          setSelectedMovie(null)
        }}
      />
    </div>
  )
}
