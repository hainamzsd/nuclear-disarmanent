import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface FeaturedSectionProps {
  title: string
  description: string
  imageSrc: string
  link: string
  size?: "small" | "large"
}

export function FeaturedSection({ title, description, imageSrc, link, size = "small" }: FeaturedSectionProps) {
  return (
    <Card className="group h-full overflow-hidden transition-all hover:shadow-md">
      <div className={`relative w-full ${size === "large" ? "h-72" : "h-56"}`}>
        <Image
          src={imageSrc || "/placeholder.svg?height=300&width=600"}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6">
          <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
        </div>
      </div>
      <CardContent className="p-6">
        <p className="mb-4 text-gray-600">{description}</p>
        <Link
          href={link}
          className="group inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          Learn More
          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </CardContent>
    </Card>
  )
}
