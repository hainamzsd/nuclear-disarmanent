import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface FeaturedSectionProps {
  title: string
  description: string
  imageSrc: string
  link: string
}

export function FeaturedSection({ title, description, imageSrc, link }: FeaturedSectionProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative h-48 w-full">
        <Image src={imageSrc || "/placeholder.svg?height=200&width=400"} alt={title} fill className="object-cover" />
      </div>
      <CardContent className="p-6">
        <h3 className="mb-2 text-xl font-bold text-gray-900">{title}</h3>
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
