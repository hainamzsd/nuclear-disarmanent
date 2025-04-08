import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Book, Video, Download, LinkIcon, Globe } from "lucide-react"

interface ResourceCardProps {
  title: string
  description: string
  type: string
  icon: string
  downloadLink?: string
  link?: string
}

export function ResourceCard({ title, description, type, icon, downloadLink, link }: ResourceCardProps) {
  const getIcon = () => {
    switch (icon) {
      case "FileText":
        return <FileText className="h-5 w-5" />
      case "Book":
        return <Book className="h-5 w-5" />
      case "Video":
        return <Video className="h-5 w-5" />
      case "Download":
        return <Download className="h-5 w-5" />
      case "Link":
        return <LinkIcon className="h-5 w-5" />
      case "Globe":
        return <Globe className="h-5 w-5" />
      default:
        return <FileText className="h-5 w-5" />
    }
  }

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <div className="rounded-full bg-slate-100 p-2 text-slate-700">{getIcon()}</div>
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="mb-2 text-slate-600">{description}</p>
        <div className="mt-4 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-800 w-fit">{type}</div>
      </CardContent>
      <CardFooter>
        {downloadLink && (
          <Link href={downloadLink} className="w-full">
            <Button variant="outline" className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </Link>
        )}
        {link && (
          <Link href={link} className="w-full">
            <Button variant="outline" className="w-full">
              <LinkIcon className="mr-2 h-4 w-4" />
              View Resource
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  )
}
