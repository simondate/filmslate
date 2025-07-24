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
        rating: 4.1, // Original 8.2 / 2
        duration: "100 min",
        poster: "/the-farewell-inspired-poster.png",
        genres: ["Drama", "Comedy"],
        director: "Lulu Wang",
        description:
          "A Chinese family discovers their grandmother has only a short while left to live and decide to keep her in the dark, scheduling a wedding to gather before she dies.",
      },
      {
        id: 2,
        title: "Minari",
        year: 2020,
        rating: 4.05, // Original 8.1 / 2
        duration: "115 min",
        poster: "/minari-inspired-poster.png",
        genres: ["Drama"],
        director: "Lee Isaac Chung",
        description: "A Korean-American family moves to an Arkansas farm in search of their own American Dream.",
      },
      {
        id: 3,
        title: "Manchester by the Sea",
        year: 2016,
        rating: 4.25, // Original 8.5 / 2
        duration: "137 min",
        poster: "/manchester-by-the-sea-poster.png",
        genres: ["Drama"],
        director: "Kenneth Lonergan",
        description: "A depressed uncle is asked to take care of his teenage nephew after the boy's father dies.",
      },
      {
        id: 4,
        title: "Lady Bird",
        year: 2017,
        rating: 4.15, // Original 8.3 / 2
        duration: "94 min",
        poster: "/lady-bird-poster.png",
        genres: ["Comedy", "Drama"],
        director: "Greta Gerwig",
        description:
          "In 2002, an artistically inclined seventeen-year-old girl comes of age in Sacramento, California.",
      },
      {
        id: 5,
        title: "Moonlight",
        year: 2016,
        rating: 4.35, // Original 8.7 / 2
        duration: "111 min",
        poster: "/moonlight-poster.png",
        genres: ["Drama"],
        director: "Barry Jenkins",
        description:
          "A young African-American man grapples with his identity and sexuality while experiencing the everyday struggles of childhood, adolescence, and burgeoning adulthood.",
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
        rating: 4.0, // Original 8.0 / 2
        duration: "107 min",
        poster: "/nomadland-poster.png",
        genres: ["Drama"],
        director: "Chloé Zhao",
        description:
          "A woman in her sixties, after losing everything in the Great Recession, embarks on a journey through the American West, living in a van as a present-day nomad.",
      },
      {
        id: 7,
        title: "The Florida Project",
        year: 2017,
        rating: 4.05, // Original 8.1 / 2
        duration: "111 min",
        poster: "/florida-project-inspired-poster.png",
        genres: ["Drama"],
        director: "Sean Baker",
        description:
          "Set over one summer, the film follows precocious six-year-old Moonee as she courts mischief and adventure with her ragtag playmates.",
      },
      {
        id: 8,
        title: "Room",
        year: 2015,
        rating: 4.1, // Original 8.2 / 2
        duration: "118 min",
        poster: "/room-movie-poster.png",
        genres: ["Drama", "Thriller"],
        director: "Lenny Abrahamson",
        description:
          "A five-year-old boy is raised by his loving mother in a single room where they are held captive by a kidnapper.",
      },
      {
        id: 9,
        title: "Her",
        year: 2013,
        rating: 4.0, // Original 8.0 / 2
        duration: "126 min",
        poster: "/her-movie-poster.png",
        genres: ["Drama", "Romance", "Sci-Fi"],
        director: "Spike Jonze",
        description:
          "In a near future, a lonely writer develops an unlikely relationship with an operating system designed to meet his every need.",
      },
      {
        id: 10,
        title: "Call Me By Your Name",
        year: 2017,
        rating: 4.2, // Original 8.4 / 2
        duration: "132 min",
        poster: "/call-me-by-your-name-poster.png",
        genres: ["Drama", "Romance"],
        director: "Luca Guadagnino",
        description:
          "In 1980s Italy, romance blossoms between a seventeen-year-old student and the older man hired as his father's research assistant.",
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
        rating: 4.45, // Original 8.9 / 2
        duration: "132 min",
        poster: "/placeholder.svg?height=300&width=200",
        genres: ["Thriller", "Drama", "Comedy"],
        director: "Bong Joon-ho",
        description:
          "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
      },
      {
        id: 12,
        title: "The Lighthouse",
        year: 2019,
        rating: 4.05, // Original 8.1 / 2
        duration: "109 min",
        poster: "/placeholder.svg?height=300&width=200",
        genres: ["Horror", "Drama"],
        director: "Robert Eggers",
        description:
          "Two lighthouse keepers try to maintain their sanity while living on a remote and mysterious New England island in the 1890s.",
      },
      {
        id: 13,
        title: "Midsommar",
        year: 2019,
        rating: 3.9, // Original 7.8 / 2
        duration: "148 min",
        poster: "/placeholder.svg?height=300&width=200",
        genres: ["Horror", "Drama"],
        director: "Ari Aster",
        description:
          "A couple travels to Northern Europe to visit a rural hometown's fabled Swedish mid-summer festival.",
      },
      {
        id: 14,
        title: "The Witch",
        year: 2015,
        rating: 3.75, // Original 7.5 / 2
        duration: "92 min",
        poster: "/placeholder.svg?height=300&width=200",
        genres: ["Horror", "Drama"],
        director: "Robert Eggers",
        description:
          "A family in 1630s New England is torn apart by the forces of witchcraft, black magic, and possession.",
      },
      {
        id: 15,
        title: "Uncut Gems",
        year: 2019,
        rating: 4.1, // Original 8.2 / 2
        duration: "135 min",
        poster: "/placeholder.svg?height=300&width=200",
        genres: ["Thriller", "Drama"],
        director: "Josh Safdie, Benny Safdie",
        description:
          "With his debts mounting and angry collectors closing in, a fast-talking New York City jeweler risks everything in hope of staying afloat and alive.",
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
        rating: 4.25, // Original 8.5 / 2
        duration: "94 min",
        poster: "/placeholder.svg?height=300&width=200",
        genres: ["Documentary"],
        director: "Morgan Neville",
        description: "An intimate look at America's favorite neighbor: Mister Fred Rogers.",
      },
      {
        id: 17,
        title: "Free Solo",
        year: 2018,
        rating: 4.1, // Original 8.2 / 2
        duration: "100 min",
        poster: "/placeholder.svg?height=300&width=200",
        genres: ["Documentary"],
        director: "Elizabeth Chai Vasarhelyi, Jimmy Chin",
        description:
          "Follow Alex Honnold as he attempts to become the first person to ever free solo climb Yosemite's 3,000-foot high El Capitan wall.",
      },
      {
        id: 18,
        title: "Three Identical Strangers",
        year: 2018,
        rating: 4.05, // Original 8.1 / 2
        duration: "96 min",
        poster: "/placeholder.svg?height=300&width=200",
        genres: ["Documentary"],
        director: "Tim Wardle",
        description:
          "In 1980 New York, three young men who were all adopted meet each other and find out they're triplets who were separated at birth.",
      },
      {
        id: 19,
        title: "The Act of Killing",
        year: 2012,
        rating: 4.1, // Original 8.2 / 2
        duration: "117 min",
        poster: "/placeholder.svg?height=300&width=200",
        genres: ["Documentary"],
        director: "Joshua Oppenheimer",
        description:
          "A documentary which challenges former Indonesian death-squad leaders to reenact their mass-killings in whichever cinematic genres they wish.",
      },
      {
        id: 20,
        title: "Honeyland",
        year: 2019,
        rating: 4.0, // Original 8.0 / 2
        duration: "85 min",
        poster: "/placeholder.svg?height=300&width=200",
        genres: ["Documentary"],
        director: "Tamara Kotevska, Ljubomir Stefanov",
        description:
          "The last female bee-hunter in Europe must save the bees and return the natural balance in Honeyland, when a family of nomadic beekeepers invade her land.",
      },
    ],
  },
]

const featuredMovie = {
  title: "Everything Everywhere All at Once",
  year: 2022,
  rating: 4.45, // Original 8.9 / 2
  duration: "139 min",
  description:
    "A mind-bending multiverse adventure that follows a Chinese-American laundromat owner who discovers she must connect with parallel universe versions of herself to prevent a powerful being from destroying everything.",
  genres: ["Sci-Fi", "Comedy", "Drama"],
  backdrop: "/everything-everywhere-all-at-once-backdrop.png", // Updated backdrop
}

export default function IndieFilmApp() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState<any>(null)
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-gradient-to-b from-black/90 to-transparent backdrop-blur-md border-b border-gray-800/50">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold text-purple-800 flex items-center gap-2">
              <Image src="/film-reel-icon.png" alt="FilmSlate Logo" width={32} height={32} className="rounded-md" />
              FilmSlate
            </Link>
            <nav className="hidden md:flex space-x-6">{/* Removed Home Link */}</nav>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-gray-400 hover:text-white hover:border-gray-500 hover:bg-black/80 transition-all duration-200 w-64 backdrop-blur-sm"
              >
                <Search className="w-4 h-4" />
                <span>Search indie films...</span>
              </button>
            </div>
            <button
              onClick={() => setIsSearchOpen(true)}
              className="md:hidden p-2 hover:bg-gray-800/80 rounded-lg transition-all duration-200 backdrop-blur-sm"
            >
              <Search className="w-5 h-5" />
            </button>
            <Link href="/account">
              <Avatar className="w-8 h-8 cursor-pointer hover:ring-2 hover:ring-purple-800 transition-all">
                <AvatarImage src="/user-profile-illustration.png" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </Link>
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
              <span className="font-semibold">{featuredMovie.rating.toFixed(1)}</span> {/* Display with 1 decimal */}
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
                    setSelectedMovie(movie)
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
                          <span>{movie.rating.toFixed(1)}</span> {/* Display with 1 decimal */}
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
              <h3 className="text-xl font-bold text-purple-800 mb-4">FilmSlate</h3>
              <p className="text-gray-400 text-sm">
                Discover and stream the best independent films from around the world.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Discover</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/genres" className="hover:text-white transition-colors">
                    Genres
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
                <li>
                  <Link href="/search" className="hover:text-white transition-colors">
                    Search Films
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Account</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/account" className="hover:text-white transition-colors">
                    My Profile
                  </Link>
                </li>
                <li>
                  <Link href="/account" className="hover:text-white transition-colors">
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
