"use client"

import { useState, useMemo } from "react"
import { Search, Filter, Star, Calendar, Clock } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { ReviewModal } from "./review-modal"

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

const allMovies: Movie[] = [
  {
    id: 1,
    title: "The Farewell",
    year: 2019,
    rating: 8.2,
    duration: "100 min",
    poster: "/placeholder.svg?height=300&width=200",
    genres: ["Drama", "Comedy"],
    director: "Lulu Wang",
    description:
      "A Chinese family discovers their grandmother has only a short while left to live and decide to keep her in the dark, scheduling a wedding to gather before she dies.",
  },
  {
    id: 2,
    title: "Minari",
    year: 2020,
    rating: 8.1,
    duration: "115 min",
    poster: "/placeholder.svg?height=300&width=200",
    genres: ["Drama"],
    director: "Lee Isaac Chung",
    description: "A Korean-American family moves to an Arkansas farm in search of their own American Dream.",
  },
  {
    id: 3,
    title: "Manchester by the Sea",
    year: 2016,
    rating: 8.5,
    duration: "137 min",
    poster: "/placeholder.svg?height=300&width=200",
    genres: ["Drama"],
    director: "Kenneth Lonergan",
    description: "A depressed uncle is asked to take care of his teenage nephew after the boy's father dies.",
  },
  {
    id: 4,
    title: "Lady Bird",
    year: 2017,
    rating: 8.3,
    duration: "94 min",
    poster: "/placeholder.svg?height=300&width=200",
    genres: ["Comedy", "Drama"],
    director: "Greta Gerwig",
    description: "In 2002, an artistically inclined seventeen-year-old girl comes of age in Sacramento, California.",
  },
  {
    id: 5,
    title: "Moonlight",
    year: 2016,
    rating: 8.7,
    duration: "111 min",
    poster: "/placeholder.svg?height=300&width=200",
    genres: ["Drama"],
    director: "Barry Jenkins",
    description:
      "A young African-American man grapples with his identity and sexuality while experiencing the everyday struggles of childhood, adolescence, and burgeoning adulthood.",
  },
  {
    id: 6,
    title: "Nomadland",
    year: 2020,
    rating: 8.0,
    duration: "107 min",
    poster: "/placeholder.svg?height=300&width=200",
    genres: ["Drama"],
    director: "Chloé Zhao",
    description:
      "A woman in her sixties, after losing everything in the Great Recession, embarks on a journey through the American West, living in a van as a present-day nomad.",
  },
  {
    id: 7,
    title: "The Florida Project",
    year: 2017,
    rating: 8.1,
    duration: "111 min",
    poster: "/placeholder.svg?height=300&width=200",
    genres: ["Drama"],
    director: "Sean Baker",
    description:
      "Set over one summer, the film follows precocious six-year-old Moonee as she courts mischief and adventure with her ragtag playmates.",
  },
  {
    id: 8,
    title: "Room",
    year: 2015,
    rating: 8.2,
    duration: "118 min",
    poster: "/placeholder.svg?height=300&width=200",
    genres: ["Drama", "Thriller"],
    director: "Lenny Abrahamson",
    description:
      "A five-year-old boy is raised by his loving mother in a single room where they are held captive by a kidnapper.",
  },
  {
    id: 9,
    title: "Her",
    year: 2013,
    rating: 8.0,
    duration: "126 min",
    poster: "/placeholder.svg?height=300&width=200",
    genres: ["Drama", "Romance", "Sci-Fi"],
    director: "Spike Jonze",
    description:
      "In a near future, a lonely writer develops an unlikely relationship with an operating system designed to meet his every need.",
  },
  {
    id: 10,
    title: "Call Me By Your Name",
    year: 2017,
    rating: 8.4,
    duration: "132 min",
    poster: "/placeholder.svg?height=300&width=200",
    genres: ["Drama", "Romance"],
    director: "Luca Guadagnino",
    description:
      "In 1980s Italy, romance blossoms between a seventeen-year-old student and the older man hired as his father's research assistant.",
  },
  {
    id: 11,
    title: "Parasite",
    year: 2019,
    rating: 8.9,
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
    rating: 8.1,
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
    rating: 7.8,
    duration: "148 min",
    poster: "/placeholder.svg?height=300&width=200",
    genres: ["Horror", "Drama"],
    director: "Ari Aster",
    description: "A couple travels to Northern Europe to visit a rural hometown's fabled Swedish mid-summer festival.",
  },
  {
    id: 14,
    title: "The Witch",
    year: 2015,
    rating: 7.5,
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
    rating: 8.2,
    duration: "135 min",
    poster: "/placeholder.svg?height=300&width=200",
    genres: ["Thriller", "Drama"],
    director: "Josh Safdie, Benny Safdie",
    description:
      "With his debts mounting and angry collectors closing in, a fast-talking New York City jeweler risks everything in hope of staying afloat and alive.",
  },
  {
    id: 16,
    title: "Everything Everywhere All at Once",
    year: 2022,
    rating: 8.9,
    duration: "139 min",
    poster: "/placeholder.svg?height=300&width=200",
    genres: ["Sci-Fi", "Comedy", "Drama"],
    director: "Daniels",
    description:
      "A middle-aged Chinese immigrant is swept up into an insane adventure in which she alone can save existence by exploring other universes and connecting with the lives she could have lived.",
  },
]

const genres = ["Drama", "Comedy", "Thriller", "Horror", "Romance", "Sci-Fi"]
const decades = ["2020s", "2010s", "2000s", "1990s", "1980s"]

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGenre, setSelectedGenre] = useState<string>("all")
  const [selectedDecade, setSelectedDecade] = useState<string>("all")
  const [ratingRange, setRatingRange] = useState([0, 10])
  const [showFilters, setShowFilters] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)

  const filteredMovies = useMemo(() => {
    return allMovies.filter((movie) => {
      const matchesSearch =
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.director.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.genres.some((genre) => genre.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesGenre = selectedGenre === "all" || movie.genres.includes(selectedGenre)

      const matchesDecade =
        selectedDecade === "all" ||
        (selectedDecade === "2020s" && movie.year >= 2020) ||
        (selectedDecade === "2010s" && movie.year >= 2010 && movie.year < 2020) ||
        (selectedDecade === "2000s" && movie.year >= 2000 && movie.year < 2010) ||
        (selectedDecade === "1990s" && movie.year >= 1990 && movie.year < 2000) ||
        (selectedDecade === "1980s" && movie.year >= 1980 && movie.year < 1990)

      const matchesRating = movie.rating >= ratingRange[0] && movie.rating <= ratingRange[1]

      return matchesSearch && matchesGenre && matchesDecade && matchesRating
    })
  }, [searchQuery, selectedGenre, selectedDecade, ratingRange])

  const clearFilters = () => {
    setSelectedGenre("all")
    setSelectedDecade("all")
    setRatingRange([0, 10])
  }

  const hasActiveFilters =
    selectedGenre !== "all" || selectedDecade !== "all" || ratingRange[0] > 0 || ratingRange[1] < 10

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] bg-black text-white border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Search Indie Films</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search by title, director, genre, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 bg-gray-900 border-gray-700 text-white placeholder-gray-400 text-lg py-3"
              autoFocus
            />
          </div>

          {/* Filter Toggle */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="border-gray-600 text-white hover:bg-gray-800"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
              {hasActiveFilters && (
                <Badge className="ml-2 bg-red-600 text-white">
                  {
                    [
                      selectedGenre !== "all",
                      selectedDecade !== "all",
                      ratingRange[0] > 0 || ratingRange[1] < 10 ? "Rating" : "",
                    ].filter(Boolean).length
                  }
                </Badge>
              )}
            </Button>
            {hasActiveFilters && (
              <Button variant="ghost" onClick={clearFilters} className="text-gray-400 hover:text-white">
                Clear Filters
              </Button>
            )}
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-900 rounded-lg">
              <div>
                <label className="block text-sm font-medium mb-2">Genre</label>
                <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                  <SelectTrigger className="bg-black border-gray-700">
                    <SelectValue placeholder="All genres" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-gray-700">
                    <SelectItem value="all">All genres</SelectItem>
                    {genres.map((genre) => (
                      <SelectItem key={genre} value={genre}>
                        {genre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Decade</label>
                <Select value={selectedDecade} onValueChange={setSelectedDecade}>
                  <SelectTrigger className="bg-black border-gray-700">
                    <SelectValue placeholder="All decades" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-gray-700">
                    <SelectItem value="all">All decades</SelectItem>
                    {decades.map((decade) => (
                      <SelectItem key={decade} value={decade}>
                        {decade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Rating: {ratingRange[0]} - {ratingRange[1]}
                </label>
                <Slider
                  value={ratingRange}
                  onValueChange={setRatingRange}
                  max={10}
                  min={0}
                  step={0.1}
                  className="mt-2"
                />
              </div>
            </div>
          )}

          {/* Search Results */}
          <div className="max-h-96 overflow-y-auto">
            {searchQuery || hasActiveFilters ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-gray-400">
                    {filteredMovies.length} result{filteredMovies.length !== 1 ? "s" : ""} found
                  </p>
                </div>

                {filteredMovies.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-400 text-lg">No movies found matching your criteria</p>
                    <p className="text-gray-500 text-sm mt-2">Try adjusting your search or filters</p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {filteredMovies.map((movie) => (
                      <div
                        key={movie.id}
                        className="flex items-start space-x-4 p-4 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
                        onClick={() => {
                          setSelectedMovie(movie)
                          setIsReviewModalOpen(true)
                          onClose()
                        }}
                      >
                        <div className="flex-shrink-0">
                          <Image
                            src={movie.poster || "/placeholder.svg"}
                            alt={movie.title}
                            width={80}
                            height={120}
                            className="rounded-md object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-lg mb-1">{movie.title}</h3>
                          <p className="text-gray-400 text-sm mb-2">Directed by {movie.director}</p>
                          <div className="flex items-center space-x-4 mb-2">
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm">{movie.rating}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-300">{movie.year}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-300">{movie.duration}</span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1 mb-2">
                            {movie.genres.map((genre) => (
                              <Badge key={genre} variant="secondary" className="bg-gray-700 text-gray-300 text-xs">
                                {genre}
                              </Badge>
                            ))}
                          </div>
                          <p className="text-gray-400 text-sm line-clamp-2">{movie.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">Start typing to search for indie films</p>
                <p className="text-gray-500 text-sm mt-2">Search by title, director, genre, or description</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
      <ReviewModal
        movie={selectedMovie}
        isOpen={isReviewModalOpen}
        onClose={() => {
          setIsReviewModalOpen(false)
          setSelectedMovie(null)
        }}
      />
    </Dialog>
  )
}
