"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

const allMovies = [
  {
    id: 1,
    title: "The Farewell",
    year: 2019,
    rating: 4.1,
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
    rating: 4.05,
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
    rating: 4.25,
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
    rating: 4.15,
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
    rating: 4.35,
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
    rating: 4.05,
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
    rating: 4.1,
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
    rating: 4.2,
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
    rating: 4.45,
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
    rating: 4.05,
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
    rating: 3.9,
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
    rating: 3.75,
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
    rating: 4.1,
    duration: "135 min",
    poster: "/placeholder.svg?height=300&width=200",
    genres: ["Thriller", "Drama"],
    director: "Josh Safdie, Benny Safdie",
    description:
      "With his debts mounting and angry collectors closing in, a fast-talking New York City jeweler risks everything in hope of staying afloat and alive.",
  },
  {
    id: 16,
    title: "Won't You Be My Neighbor?",
    year: 2018,
    rating: 4.25,
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
    rating: 4.1,
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
    rating: 4.05,
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
    rating: 4.1,
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
    rating: 4.0,
    duration: "85 min",
    poster: "/placeholder.svg?height=300&width=200",
    genres: ["Documentary"],
    director: "Tamara Kotevska, Ljubomir Stefanov",
    description:
      "The last female bee-hunter in Europe must save the bees and return the natural balance in Honeyland, when a family of nomadic beekeepers invade her land.",
  },
]

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const filteredMovies = allMovies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.director.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.genres.some((genre) => genre.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-gray-900 text-white p-6 border-gray-700">
        <div className="flex items-center space-x-4 mb-4">
          <Search className="w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search for films, directors, genres..."
            className="flex-1 bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:ring-purple-800 focus:border-purple-800"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:bg-gray-800">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="max-h-96 overflow-y-auto custom-scrollbar">
          {searchTerm.length > 0 && filteredMovies.length === 0 && (
            <p className="text-center text-gray-400 py-8">No results found for "{searchTerm}"</p>
          )}
          {filteredMovies.map((movie) => (
            <div key={movie.id} className="flex items-center space-x-4 p-3 hover:bg-gray-800 rounded-lg cursor-pointer">
              <Image
                src={movie.poster || "/placeholder.svg"}
                alt={movie.title}
                width={60}
                height={90}
                className="rounded-md object-cover"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-lg">{movie.title}</h4>
                <p className="text-sm text-gray-400">
                  {movie.year} • {movie.director}
                </p>
                <div className="flex items-center space-x-1 text-sm text-gray-400 mt-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span>{movie.rating.toFixed(1)}</span>
                  <span className="mx-1">•</span>
                  <span>{movie.duration}</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {movie.genres.map((genre) => (
                    <Badge key={genre} variant="secondary" className="bg-gray-700 text-gray-300">
                      {genre}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
