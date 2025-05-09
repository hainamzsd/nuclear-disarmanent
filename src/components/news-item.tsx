import Link from "next/link"

interface NewsItemProps {
  item: {
    id: string
    title: string
    date: string
    link: string
  }
}

export function NewsItem({ item }: NewsItemProps) {
  return (
    <Link
      href={item.link}
      className="mr-8 inline-block rounded-md border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md hover:border-blue-200"
    >
      <p className="mb-1 text-sm font-medium text-blue-600">{item.date}</p>
      <h3 className="font-medium text-gray-900">{item.title}</h3>
    </Link>
  )
}
