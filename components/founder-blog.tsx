import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function FounderBlog() {
  const blogPosts = [
    {
      id: 1,
      title: "The Future of Indie Film Streaming",
      date: "July 15, 2024",
      author: "Sebastian",
      authorAvatar: "/male-film-curator.png",
      excerpt:
        "Exploring the evolving landscape of independent cinema distribution and how streaming platforms are adapting.",
      link: "#",
    },
    {
      id: 2,
      title: "Behind the Scenes: Curating FilmSlate's Collection",
      date: "July 10, 2024",
      author: "Sebastian",
      authorAvatar: "/male-film-curator.png",
      excerpt: "A deep dive into our rigorous selection process to bring you the best indie films.",
      link: "#",
    },
    {
      id: 3,
      title: "Why Independent Film Matters More Than Ever",
      date: "July 5, 2024",
      author: "Robyn",
      authorAvatar: "/female-founder.png",
      excerpt: "An opinion piece on the cultural significance and enduring power of independent storytelling.",
      link: "#",
    },
  ]

  return (
    <section className="px-6 py-12 bg-gray-950">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8">From the FilmSlate Blog</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="bg-gray-900 border-gray-800 text-white">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">{post.title}</CardTitle>
                <div className="flex items-center space-x-2 text-sm text-gray-400 mt-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={post.authorAvatar || "/placeholder.svg"} />
                    <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span>{post.author}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4 line-clamp-3">{post.excerpt}</p>
                <Link href={post.link} passHref>
                  <Button variant="link" className="p-0 h-auto text-purple-400 hover:text-purple-300">
                    Read More <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
