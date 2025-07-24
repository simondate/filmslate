"use client"

import { Calendar, Clock, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const blogPosts = [
  {
    id: 1,
    title: "The Art of Independent Storytelling",
    excerpt: "Exploring how indie filmmakers craft intimate narratives that resonate with audiences worldwide...",
    category: "Film Analysis",
    readTime: "5 min read",
    publishedAt: "2024-01-15",
    image: "/placeholder.svg?height=200&width=300&text=Independent+Storytelling",
    slug: "art-of-independent-storytelling",
  },
  {
    id: 2,
    title: "Sundance 2024: Hidden Gems Worth Watching",
    excerpt: "My personal picks from this year's Sundance Film Festival that deserve your attention...",
    category: "Festival Coverage",
    readTime: "8 min read",
    publishedAt: "2024-01-28",
    image: "/placeholder.svg?height=200&width=300&text=Sundance+2024",
    slug: "sundance-2024-hidden-gems",
  },
  {
    id: 3,
    title: "Building FilmSlate: A Love Letter to Cinema",
    excerpt: "The story behind creating a platform dedicated to celebrating independent film...",
    category: "Behind the Scenes",
    readTime: "6 min read",
    publishedAt: "2024-02-05",
    image: "/placeholder.svg?height=200&width=300&text=Building+FilmSlate",
    slug: "building-filmslate-love-letter-cinema",
  },
]

export function FounderBlog() {
  return (
    <section className="px-6 py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Founder's Thoughts</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Personal reflections on independent cinema, film festivals, and the art of storytelling
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition-colors group"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-purple-600 text-white">{post.category}</Badge>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-3 group-hover:text-purple-400 transition-colors">{post.title}</h3>

                <p className="text-gray-400 text-sm mb-4 line-clamp-3">{post.excerpt}</p>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors text-sm font-medium"
                >
                  Read More
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center">
          <Button
            variant="outline"
            className="border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white bg-transparent"
            asChild
          >
            <Link href="/blog">
              View All Posts
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
