"use client"

import { Calendar, User, ArrowRight } from "lucide-react"
import Image from "next/image"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const blogPosts = [
  {
    id: 1,
    title: "The Renaissance of Independent Cinema",
    excerpt: "Exploring how streaming platforms have revolutionized the way we discover and consume indie films...",
    author: "Alex Chen",
    date: "2024-01-20",
    readTime: "5 min read",
    category: "Industry",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "Supporting Emerging Filmmakers",
    excerpt: "Our commitment to showcasing new voices and providing a platform for underrepresented stories...",
    author: "Alex Chen",
    date: "2024-01-15",
    readTime: "3 min read",
    category: "Mission",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "The Art of Film Curation",
    excerpt: "How we select the films that make it onto FilmSlate and what makes a great independent film...",
    author: "Alex Chen",
    date: "2024-01-10",
    readTime: "4 min read",
    category: "Curation",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export function FounderBlog() {
  return (
    <section className="bg-gray-900/50 px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">From the Founder</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Insights, thoughts, and stories about independent cinema and the future of film discovery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-colors">
              <div className="relative h-48 w-full">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="bg-red-900/30 text-red-300 border-red-800">
                    {post.category}
                  </Badge>
                  <div className="flex items-center space-x-2 text-xs text-gray-400">
                    <Calendar className="w-3 h-3" />
                    <span>{post.date}</span>
                  </div>
                </div>
                <CardTitle className="text-white text-lg line-clamp-2">{post.title}</CardTitle>
                <CardDescription className="text-gray-400 line-clamp-3">{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs text-gray-400">
                    <User className="w-3 h-3" />
                    <span>{post.author}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300 p-0">
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent">
            View All Posts
          </Button>
        </div>
      </div>
    </section>
  )
}
