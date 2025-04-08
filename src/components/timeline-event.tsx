import Image from "next/image"

interface TimelineEventProps {
  year: string
  title: string
  description: string
  image?: string
}

export function TimelineEvent({ year, title, description, image }: TimelineEventProps) {
  return (
    <div className="relative">
      {/* Timeline dot */}
      <div className="absolute -left-[52px] flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-white">
        <div className="h-3 w-3 rounded-full bg-white"></div>
      </div>

      <div className="flex flex-col space-y-4 md:flex-row md:space-x-6 md:space-y-0">
        <div className="md:w-1/4">
          <span className="text-2xl font-bold text-slate-800">{year}</span>
        </div>

        <div className="md:w-3/4">
          <h3 className="mb-2 text-xl font-semibold text-slate-800">{title}</h3>
          <p className="mb-4 text-slate-600">{description}</p>

          {image && (
            <div className="relative mt-4 h-64 w-full overflow-hidden rounded-lg">
              <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
