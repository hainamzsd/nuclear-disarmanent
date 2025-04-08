import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Award,
  BookOpen,
  Calendar,
  Clock,
  DollarSign,
  FileSignature,
  FileText,
  Flag,
  Globe,
  GraduationCap,
  Heart,
  Home,
  Mail,
  MessageCircle,
  Palette,
  Share2,
  Users,
} from "lucide-react"

interface ActionCardProps {
  title: string
  description: string
  steps: string[]
  actionText: string
  actionLink: string
  icon: string
}

export function ActionCard({ title, description, steps, actionText, actionLink, icon }: ActionCardProps) {
  const getIcon = () => {
    switch (icon) {
      case "BookOpen":
        return <BookOpen className="h-5 w-5" />
      case "Share2":
        return <Share2 className="h-5 w-5" />
      case "Heart":
        return <Heart className="h-5 w-5" />
      case "DollarSign":
        return <DollarSign className="h-5 w-5" />
      case "FileSignature":
        return <FileSignature className="h-5 w-5" />
      case "MessageCircle":
        return <MessageCircle className="h-5 w-5" />
      case "Calendar":
        return <Calendar className="h-5 w-5" />
      case "GraduationCap":
        return <GraduationCap className="h-5 w-5" />
      case "Users":
        return <Users className="h-5 w-5" />
      case "Clock":
        return <Clock className="h-5 w-5" />
      case "Palette":
        return <Palette className="h-5 w-5" />
      case "Mail":
        return <Mail className="h-5 w-5" />
      case "FileText":
        return <FileText className="h-5 w-5" />
      case "Home":
        return <Home className="h-5 w-5" />
      case "Flag":
        return <Flag className="h-5 w-5" />
      case "Award":
        return <Award className="h-5 w-5" />
      case "Globe":
        return <Globe className="h-5 w-5" />
      default:
        return <BookOpen className="h-5 w-5" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <div className="rounded-full bg-slate-100 p-2">{getIcon()}</div>
          <CardTitle>{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {steps.map((step, index) => (
            <li key={index} className="flex items-start">
              <span className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-xs font-medium">
                {index + 1}
              </span>
              <span className="text-sm text-slate-600">{step}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Link href={actionLink} className="w-full">
          <Button variant="outline" className="w-full">
            {actionText}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
