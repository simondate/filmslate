import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="fixed top-0 left-0 w-full h-20 bg-gradient-to-b from-black/90 to-transparent backdrop-blur-md border-b border-gray-800/50 z-50 flex items-center px-6">
        <Skeleton className="h-8 w-32 rounded-md bg-gray-800" />
        <div className="flex-grow" />
        <Skeleton className="h-10 w-48 rounded-lg bg-gray-800 hidden md:block" />
        <Skeleton className="h-8 w-8 rounded-full bg-gray-800 ml-4" />
      </div>

      <div className="relative h-screen flex items-center">
        <Skeleton className="absolute inset-0 bg-gray-900" />
        <div className="relative z-10 px-6 max-w-2xl space-y-4">
          <Skeleton className="h-16 w-3/4 bg-gray-800" />
          <Skeleton className="h-6 w-1/2 bg-gray-800" />
          <Skeleton className="h-4 w-full bg-gray-800" />
          <Skeleton className="h-4 w-5/6 bg-gray-800" />
          <Skeleton className="h-12 w-48 bg-gray-800" />
        </div>
      </div>

      <div className="relative z-10 -mt-32 pb-20">
        {[1, 2, 3].map((i) => (
          <section key={i} className="mb-12 px-6">
            <Skeleton className="h-8 w-64 mb-6 bg-gray-800" />
            <div className="flex space-x-4 overflow-x-auto pb-4">
              {[1, 2, 3, 4, 5].map((j) => (
                <Skeleton key={j} className="flex-shrink-0 w-48 h-72 rounded-lg bg-gray-800" />
              ))}
            </div>
          </section>
        ))}
      </div>

      <footer className="bg-gray-900 px-6 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-6 w-24 bg-gray-800" />
              <Skeleton className="h-4 w-full bg-gray-800" />
              <Skeleton className="h-4 w-5/6 bg-gray-800" />
              <Skeleton className="h-4 w-3/4 bg-gray-800" />
            </div>
          ))}
        </div>
        <Skeleton className="h-4 w-1/2 mx-auto mt-8 bg-gray-800" />
      </footer>
    </div>
  )
}
