"use client"

import { useState, useMemo } from "react"
import { Search, Filter, Star, Calendar, Clock, ArrowUpDown } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
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
    rating: 4.2,
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
    rating: 4.1,
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
    rating: 4.5,
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
    rating: 4.3,
    duration: "94 min",
    poster: "/lady-bird-poster.png",
    genres: ["Comedy", "Drama"],
    director: "Greta Gerwig",
    description: "In 2002, an artistically inclined seventeen-year-old girl comes of age in Sacramento, California.",
  },
  {
    id: 5,
    title: "Moonlight",
    year: 2016,
    rating: 4.7,
    duration: "111 min",
    poster: "/moonlight-poster.png",
    genres: ["Drama"],
    director: "Barry Jenkins",
    description:
      "A young African-American man grapples with his identity and sexuality while experiencing the everyday struggles of childhood, adolescence, and burgeoning adulthood.",
  },
  {
    id: 6,
    title: "Nomadland",
    year: 2020,
    rating: 4.0,
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
    rating: 4.1,
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
    rating: 4.2,
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
    rating: 4.0,
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
    rating: 4.4,
    duration: "132 min",
    poster: "/call-me-by-your-name-poster.png",
    genres: ["Drama", "Romance"],
    director: "Luca Guadagnino",
    description:
      "In 1980s Italy, romance blossoms between a seventeen-year-old student and the older man hired as his father's research assistant.",
  },
  {
    id: 11,
    title: "Parasite",
    year: 2019,
    rating: 4.9,
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
    rating: 4.1,
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
    rating: 4.2,
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
    rating: 4.9,
    duration: "139 min",
    poster: "/placeholder.svg?height=300&width=200",
    genres: ["Sci-Fi", "Comedy", "Drama"],
    director: "Daniels",
    description:
      "A middle-aged Chinese immigrant is swept up into an insane adventure in which she alone can save existence by exploring other universes and connecting with the lives she could have lived.",
  },
  {
    id: 17,
    title: "Won't You Be My Neighbor?",
    year: 2018,
    rating: 4.5,
    duration: "94 min",
    poster: "/placeholder.svg?height=300&width=200",
    genres: ["Documentary"],
    director: "Morgan Neville",
    description: "An intimate look at America's favorite neighbor: Mister Fred Rogers.",
  },
  {
    id: 18,
    title: "Free Solo",
    year: 2018,
    rating: 4.2,
    duration: "100 min",
    poster: "/placeholder.svg?height=300&width=200",
    genres: ["Documentary"],
    director: "Elizabeth Chai Vasarhelyi, Jimmy Chin",
    description:
      "Follow Alex Honnold as he attempts to become the first person to ever free solo climb Yosemite's 3,000-foot high El Capitan wall.",
  },
  {
    id: 19,
    title: "Three Identical Strangers",
    year: 2018,
    rating: 4.1,
    duration: "96 min",
    poster: "/placeholder.svg?height=300&width=200",
    genres: ["Documentary"],
    director: "Tim Wardle",
    description:
      "In 1980 New York, three young men who were all adopted meet each other and find out they're triplets who were separated at birth.",
  },
  {
    id: 20,
    title: "The Act of Killing",
    year: 2012,
    rating: 4.2,
    duration: "117 min",
    poster: "/placeholder.svg?height=300&width=200",
    genres: ["Documentary"],
    director: "Joshua Oppenheimer",
    description:
      "A documentary which challenges former Indonesian death-squad leaders to reenact their mass-killings in whichever cinematic genres they wish.",
  },
  {
    id: 21,
    title: "Honeyland",
    year: 2019,
    rating: 4.0,
    duration: "85 min",
    poster: "/placeholder.svg?height=300&width=200",
    genres: ["Documentary"],
    director: "Tamara Kotevska, Ljubomir Stefanov",
    description:
      "The last female bee-hunter in Europe must save the bees and return the natural balance in Honeyland, when a family of nomadic beekeepers invade her land.",
  },
]

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

const genres = ["Drama", "Comedy", "Thriller", "Horror", "Romance", "Sci-Fi", "Documentary"]
const decades = ["2020s", "2010s", "2000s", "1990s", "1980s"]

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

// Mock function to get user's rating for a movie
const getUserRating = (movieId: number): number => {
  if (typeof window === "undefined") return 0
  const savedRating = localStorage.getItem(`rating-${movieId}`)
  return savedRating ? Number.parseInt(savedRating) : 0
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGenre, setSelectedGenre] = useState<string>("all")
  const [selectedDecade, setSelectedDecade] = useState<string>("all")
  const [ratingRange, setRatingRange] = useState([0, 5])
  const [showFilters, setShowFilters] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)

  // Star rating filter states
  const [showOnlyRated, setShowOnlyRated] = useState(false)
  const [minUserRating, setMinUserRating] = useState([1])

  // New sorting state
  const [sortBy, setSortBy] = useState<string>("relevance")

  const filteredAndSortedMovies = useMemo(() => {
    // First filter the movies
    const filtered = allMovies.filter((movie) => {
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

      // Star rating filters
      const userRating = getUserRating(movie.id)
      const matchesRatedFilter = !showOnlyRated || userRating > 0
      const matchesMinRating = !showOnlyRated || userRating >= minUserRating[0]

      return matchesSearch && matchesGenre && matchesDecade && matchesRating && matchesRatedFilter && matchesMinRating
    })

    // Then sort the filtered results
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "alphabetical-asc":
          return a.title.localeCompare(b.title)
        case "alphabetical-desc":
          return b.title.localeCompare(a.title)
        case "rating-high":
          return b.rating - a.rating
        case "rating-low":
          return a.rating - b.rating
        case "year-new":
          return b.year - a.year
        case "year-old":
          return a.year - b.year
        case "user-rating-high":
          const userRatingA = getUserRating(a.id)
          const userRatingB = getUserRating(b.id)
          if (userRatingA === userRatingB) {
            return b.rating - a.rating // Secondary sort by community rating
          }
          return userRatingB - userRatingA
        case "user-rating-low":
          const userRatingA2 = getUserRating(a.id)
          const userRatingB2 = getUserRating(b.id)
          if (userRatingA2 === userRatingB2) {
            return a.rating - b.rating // Secondary sort by community rating
          }
          return userRatingA2 - userRatingB2
        default: // relevance
          return 0
      }
    })

    return sorted
  }, [searchQuery, selectedGenre, selectedDecade, ratingRange, showOnlyRated, minUserRating, sortBy])

  const clearFilters = () => {
    setSelectedGenre("all")
    setSelectedDecade("all")
    setRatingRange([0, 10])
    setShowOnlyRated(false)
    setMinUserRating([1])
    setSortBy("relevance")
  }

  const hasActiveFilters =
    selectedGenre !== "all" ||
    selectedDecade !== "all" ||
    ratingRange[0] > 0 ||
    ratingRange[1] < 10 ||
    ratingRange[1] < 5 ||
    showOnlyRated ||
    sortBy !== "relevance"

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] bg-black text-white border-gray-800 overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Search Indie Films</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col h-full min-h-0">
          <div className="flex-shrink-0 space-y-6 p-6 border-b border-gray-800">
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

            {/* Filter and Sort Controls */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="border-gray-600 text-white hover:bg-gray-800"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
                {hasActiveFilters && (
                  <Badge className="ml-2 bg-purple-600 text-white">
                    {
                      [
                        selectedGenre !== "all",
                        selectedDecade !== "all",
                        ratingRange[0] > 0 || ratingRange[1] < 5,
                        showOnlyRated,
                        sortBy !== "relevance",
                      ].filter(Boolean).length
                    }
                  </Badge>
                )}
              </Button>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <ArrowUpDown className="w-4 h-4 text-gray-400" />
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="bg-black border-gray-700 w-48">
                      <SelectValue placeholder="Sort by..." />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-gray-700">
                      <SelectItem value="relevance">Relevance</SelectItem>
                      <SelectItem value="alphabetical-asc">A to Z</SelectItem>
                      <SelectItem value="alphabetical-desc">Z to A</SelectItem>
                      <SelectItem value="rating-high">Highest Rated</SelectItem>
                      <SelectItem value="rating-low">Lowest Rated</SelectItem>
                      <SelectItem value="year-new">Newest First</SelectItem>
                      <SelectItem value="year-old">Oldest First</SelectItem>
                      <SelectItem value="user-rating-high">My Highest Rated</SelectItem>
                      <SelectItem value="user-rating-low">My Lowest Rated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {hasActiveFilters && (
                  <Button variant="ghost" onClick={clearFilters} className="text-gray-400 hover:text-white">
                    Clear All
                  </Button>
                )}
              </div>
            </div>

            {/* Filters */}
            {showFilters && (
              <div className="space-y-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                      Community Rating: {ratingRange[0]} - {ratingRange[1]}
                    </label>
                    <Slider
                      value={ratingRange}
                      onValueChange={setRatingRange}
                      max={5}
                      min={0}
                      step={0.1}
                      className="mt-2"
                    />
                  </div>
                </div>

                {/* Star Rating Filters */}
                <div className="border-t border-gray-700 pt-4">
                  <h4 className="text-sm font-medium mb-3 flex items-center">
                    <Star className="w-4 h-4 mr-2 text-yellow-400" />
                    Your Ratings
                  </h4>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Switch id="show-only-rated" checked={showOnlyRated} onCheckedChange={setShowOnlyRated} />
                      <Label htmlFor="show-only-rated" className="text-sm">
                        Show only movies I've rated
                      </Label>
                    </div>

                    {showOnlyRated && (
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Minimum rating: {minUserRating[0]} star{minUserRating[0] !== 1 ? "s" : ""}
                        </label>
                        <div className="flex items-center space-x-2">
                          <Slider
                            value={minUserRating}
                            onValueChange={setMinUserRating}
                            max={5}
                            min={1}
                            step={1}
                            className="flex-1"
                          />
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= minUserRating[0] ? "text-yellow-400 fill-current" : "text-gray-600"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Search Results */}
          <div className="flex-1 overflow-y-auto p-6">
            {searchQuery || hasActiveFilters ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-gray-400">
                    {filteredAndSortedMovies.length} result{filteredAndSortedMovies.length !== 1 ? "s" : ""} found
                    {sortBy !== "relevance" && (
                      <span className="ml-2 text-gray-500">
                        • Sorted by {sortBy.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                      </span>
                    )}
                  </p>
                </div>

                {filteredAndSortedMovies.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-400 text-lg">No movies found matching your criteria</p>
                    <p className="text-gray-500 text-sm mt-2">Try adjusting your search or filters</p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {filteredAndSortedMovies.map((movie) => {
                      const userRating = getUserRating(movie.id)
                      return (
                        <div
                          key={movie.id}
                          className="flex items-start space-x-4 p-4 bg-gray-900/80 rounded-lg hover:bg-gray-800 transition-all duration-200 cursor-pointer border border-gray-700/50 hover:border-gray-600"
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
                                <span className="text-xs text-gray-500">community</span>
                              </div>
                              {userRating > 0 && (
                                <div className="flex items-center space-x-1">
                                  <div className="flex">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <Star
                                        key={star}
                                        className={`w-3 h-3 ${
                                          star <= userRating ? "text-blue-400 fill-current" : "text-gray-600"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-xs text-gray-500">your rating</span>
                                </div>
                              )}
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
                                <Badge
                                  key={genre}
                                  variant="secondary"
                                  className="bg-gray-700/80 text-gray-300 text-xs border border-gray-600"
                                >
                                  {genre}
                                </Badge>
                              ))}
                            </div>
                            <p className="text-gray-400 text-sm line-clamp-2">{movie.description}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-16">
                <Search className="w-20 h-20 text-gray-600 mx-auto mb-6" />
                <p className="text-gray-400 text-xl mb-2">Start typing to search for indie films</p>
                <p className="text-gray-500 text-sm">Search by title, director, genre, or description</p>
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
