import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface NewsItem {
  id: string
  title: string
  excerpt: string
  date: string
  author: string
  category: string
  image: string
}

interface NewsCardProps {
  news: NewsItem
}

export function NewsCard({ news }: NewsCardProps) {
  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <div className="relative h-48 w-full">
        <Image src={news.image || "/placeholder.svg"} alt={news.title} fill className="object-cover" />
      </div>
      <CardHeader className="pb-2">
        <div className="mb-2 flex items-center space-x-2">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-800">
            {news.category}
          </span>
          <span className="text-xs text-slate-500">{news.date}</span>
        </div>
        <h3 className="line-clamp-2 text-xl font-bold text-slate-800">{news.title}</h3>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="line-clamp-3 text-sm text-slate-600">{news.excerpt}</p>
        <p className="mt-2 text-xs text-slate-500">By {news.author}</p>
      </CardContent>
      <CardFooter>
        <Link href={`/news/${news.id}`} className="w-full">
          <Button variant="outline" className="w-full">
            Read More
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
