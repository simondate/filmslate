"use client"

import { Calendar, Clock, ArrowRight } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  date: string
  readTime: string
  category: string
  featuredImage: string
  slug: string
}

const featuredPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Farewell: A Masterclass in Cultural Storytelling",
    excerpt:
      "Lulu Wang's deeply personal film about family, lies, and love transcends cultural boundaries while remaining authentically Chinese-American. What struck me most during my third viewing was how Wang uses silence and subtext...",
    date: "2024-01-20",
    readTime: "4 min read",
    category: "Film Analysis",
    featuredImage: "/placeholder.svg?height=200&width=300",
    slug: "the-farewell-cultural-storytelling",
  },
  {
    id: "2",
    title: "Why Independent Cinema Matters More Than Ever",
    excerpt:
      "In an era of franchise filmmaking and algorithm-driven content, independent cinema stands as a beacon of authentic storytelling. These films don't just entertain—they challenge, provoke, and inspire...",
    date: "2024-01-22",
    readTime: "6 min read",
    category: "Industry Thoughts",
    featuredImage: "/placeholder.svg?height=200&width=300",
    slug: "why-independent-cinema-matters",
  },
  {
    id: "3",
    title: "Parasite: The Staircase as Social Commentary",
    excerpt:
      "Bong Joon-ho's genre-defying thriller is a masterpiece of visual storytelling that uses architecture as character. Every staircase in this film tells us exactly where we are in the social hierarchy...",
    date: "2024-01-12",
    readTime: "7 min read",
    category: "Director Spotlight",
    featuredImage: "/placeholder.svg?height=200&width=300",
    slug: "parasite-staircase-social-commentary",
  },
]

export function FounderBlog() {
  return (
    <section className="py-16 px-6 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">IS</span>
            </div>
            <h2 className="text-3xl font-bold text-white">Founder's Thoughts</h2>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Personal reflections on independent cinema, emerging filmmakers, and the stories that shape our world.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPosts.map((post) => (
            <Card
              key={post.id}
              className="bg-black border-gray-800 hover:border-gray-700 transition-colors group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <Image
                  src={post.featuredImage || "/placeholder.svg"}
                  alt={post.title}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-red-600 text-white border-none">{post.category}</Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-red-400 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300 hover:bg-red-900/20 p-0">
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white bg-transparent"
          >
            View All Posts
          </Button>
        </div>
      </div>
    </section>
  )
}
