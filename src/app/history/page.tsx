import Image from "next/image"
import { PageHeader } from "@/components/page-header"

export default function HistoryPage() {
  const timelineEvents = [
    {
      year: "1945",
      title: "First Nuclear Test & Hiroshima and Nagasaki",
      description:
        "The United States conducted the world's first nuclear test, code-named 'Trinity', on July 16, 1945. Less than a month later, atomic bombs were dropped on Hiroshima and Nagasaki, Japan, killing an estimated 210,000 people.",
      image: "/images/history/trinity-test.jpg",
    },
    {
      year: "1949",
      title: "Soviet Union Tests First Nuclear Weapon",
      description:
        "The Soviet Union tested its first nuclear device, ending the American monopoly on nuclear weapons and beginning the nuclear arms race.",
    },
    {
      year: "1952-1953",
      title: "First Hydrogen Bombs",
      description:
        "The United States tested the first hydrogen bomb in 1952, followed by the Soviet Union in 1953. These thermonuclear weapons were hundreds of times more powerful than the bombs used in World War II.",
      image: "/images/history/hydrogen-bomb.jpg",
    },
    {
      year: "1968",
      title: "Nuclear Non-Proliferation Treaty (NPT)",
      description:
        "The NPT was opened for signature, aiming to prevent the spread of nuclear weapons and weapons technology, promote cooperation in the peaceful uses of nuclear energy, and achieve nuclear disarmament.",
    },
    {
      year: "1986",
      title: "Reykjavik Summit",
      description:
        "U.S. President Ronald Reagan and Soviet General Secretary Mikhail Gorbachev met in Reykjavik, Iceland, coming close to an agreement to eliminate all nuclear weapons.",
      image: "/images/history/reykjavik-summit.jpg",
    },
    {
      year: "1996",
      title: "Comprehensive Nuclear-Test-Ban Treaty (CTBT)",
      description:
        "The CTBT was adopted, banning all nuclear explosions for both civilian and military purposes. However, it has not yet entered into force as some key states have not ratified it.",
    },
    {
      year: "2017",
      title: "Treaty on the Prohibition of Nuclear Weapons (TPNW)",
      description:
        "The United Nations adopted the TPNW, the first legally binding international agreement to comprehensively prohibit nuclear weapons. It entered into force in January 2021.",
      image: "/images/history/tpnw-signing.jpg",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <PageHeader
        title="History of Nuclear Weapons"
        description="Explore the timeline of nuclear weapons development, testing, and the evolution of international treaties."
      />

      <div className="mt-12">
        <h2 className="mb-8 text-2xl font-bold text-gray-900">Timeline of Nuclear History</h2>

        <div className="relative space-y-12 pl-10">
          {timelineEvents.map((event, index) => (
            <div key={index} className="relative timeline-dot timeline-line">
              <div className="flex flex-col space-y-4 md:flex-row md:space-x-6 md:space-y-0">
                <div className="md:w-1/6">
                  <span className="text-2xl font-bold text-gray-900">{event.year}</span>
                </div>

                <div className="md:w-5/6">
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">{event.title}</h3>
                  <p className="mb-4 text-gray-600">{event.description}</p>

                  {event.image && (
                    <div className="relative mt-4 h-64 w-full overflow-hidden rounded-lg shadow-md">
                      <Image
                        src={event.image || "/placeholder.svg?height=300&width=600"}
                        alt={event.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
