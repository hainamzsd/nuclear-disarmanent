import Image from "next/image"
import Link from "next/link"
import { PageHeader } from "@/components/page-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { NewsCard } from "@/components/news-card"

export default function NewsPage() {
  // Sample news data - in a real application, this would come from a database or API
  const featuredNews = {
    id: "1",
    title: "UN Treaty on the Prohibition of Nuclear Weapons Reaches 60 Ratifications",
    excerpt:
      "The Treaty on the Prohibition of Nuclear Weapons (TPNW) has reached a significant milestone with 60 countries now having ratified the agreement, strengthening the global norm against nuclear weapons.",
    date: "2023-06-15",
    author: "Sarah Johnson",
    category: "Treaty News",
    image: "/images/news/tpnw-milestone.jpg",
  }

  const recentNews = [
    {
      id: "2",
      title: "New START Treaty Extension: What It Means for Global Security",
      excerpt:
        "The United States and Russia have agreed to extend the New START treaty for five years, preserving the last remaining nuclear arms control agreement between the two countries.",
      date: "2023-05-28",
      author: "Michael Chen",
      category: "Policy",
      image: "/images/news/new-start.jpg",
    },
    {
      id: "3",
      title: "ICAN Launches New Campaign to Promote TPNW Universalization",
      excerpt:
        "The International Campaign to Abolish Nuclear Weapons has launched a new initiative to encourage more countries to sign and ratify the Treaty on the Prohibition of Nuclear Weapons.",
      date: "2023-05-10",
      author: "Elena Rodriguez",
      category: "Advocacy",
      image: "/images/news/ican-campaign.jpg",
    },
    {
      id: "4",
      title: "Scientists Warn of Climate Effects from Limited Nuclear Exchange",
      excerpt:
        "A new study published in the journal Science highlights the potential global climate impacts of even a limited regional nuclear conflict, predicting severe disruptions to food production worldwide.",
      date: "2023-04-22",
      author: "Dr. James Wilson",
      category: "Research",
      image: "/images/news/nuclear-climate.jpg",
    },
    {
      id: "5",
      title: "Mayors for Peace Network Expands to 8,000 Cities",
      excerpt:
        "The Mayors for Peace network, founded by the mayors of Hiroshima and Nagasaki, has reached 8,000 member cities across 165 countries, demonstrating growing local government support for nuclear disarmament.",
      date: "2023-04-05",
      author: "Takashi Yamamoto",
      category: "Community",
      image: "/images/news/mayors-peace.jpg",
    },
    {
      id: "6",
      title: "Youth-Led Nuclear Disarmament Movement Gains Momentum",
      excerpt:
        "Young activists around the world are increasingly taking leadership roles in the nuclear disarmament movement, bringing fresh energy and digital organizing strategies to the cause.",
      date: "2023-03-18",
      author: "Sophia Patel",
      category: "Activism",
      image: "/images/news/youth-movement.jpg",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <PageHeader
        title="News & Updates"
        description="Stay informed about the latest developments in nuclear disarmament efforts worldwide."
      />

      <div className="mt-12">
        <h2 className="mb-6 text-2xl font-bold text-slate-800">Featured Story</h2>
        <Card className="overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="relative min-h-[300px]">
              <Image
                src={featuredNews.image || "/placeholder.svg"}
                alt={featuredNews.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col justify-between p-6">
              <div>
                <div className="mb-2 flex items-center space-x-2">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-800">
                    {featuredNews.category}
                  </span>
                  <span className="text-xs text-slate-500">{featuredNews.date}</span>
                </div>
                <h3 className="mb-2 text-2xl font-bold text-slate-800">{featuredNews.title}</h3>
                <p className="mb-4 text-slate-600">{featuredNews.excerpt}</p>
                <p className="text-sm text-slate-500">By {featuredNews.author}</p>
              </div>
              <Link href={`/news/${featuredNews.id}`}>
                <Button>Read Full Story</Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-12">
        <h2 className="mb-6 text-2xl font-bold text-slate-800">Recent News</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recentNews.map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>
      </div>

      <div className="mt-12 text-center">
        <Link href="/news/archive">
          <Button variant="outline" size="lg">
            View News Archive
          </Button>
        </Link>
      </div>
    </div>
  )
}
