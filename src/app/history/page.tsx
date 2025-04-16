"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { X, Info, ChevronDown } from "lucide-react"

interface TimeLineEventProps{
  year:string,
  title:string,
  description:string,
  image?:string,
  backgroundType?:string,
  backgroundSrc?:string,
  quote?:string,
  quoteAuthor?:string,
  facts?:string[],
  additionalContent?:string,
  link?:string,
  casualties?:string[],

}
export default function HistoryPage() {
  const [activeModal, setActiveModal] = useState(null)

  const timelineEvents = [
    {
      year: "1945",
      title: "First Nuclear Test & Hiroshima and Nagasaki",
      description:
        "The United States conducted the world's first nuclear test, code-named 'Trinity', on July 16, 1945. Less than a month later, atomic bombs were dropped on Hiroshima and Nagasaki, Japan, killing an estimated 210,000 people.",
      image: "/images/history/trinity-test.jpg",
      backgroundType: "image",
      backgroundSrc: "https://upload.wikimedia.org/wikipedia/commons/5/54/Atomic_bombing_of_Japan.jpg",
      quote: "Now I am become Death, the destroyer of worlds.",
      quoteAuthor: "J. Robert Oppenheimer",
      facts: [
        "The Trinity test released energy equivalent to 21 kilotons of TNT",
        "The Hiroshima bomb ('Little Boy') was uranium-based and had never been tested before",
        "The Nagasaki bomb ('Fat Man') was plutonium-based, similar to the Trinity test device",
        "Over 90% of Hiroshima's doctors and nurses were killed or injured in the blast",
        "Radiation effects continued to claim lives for years after the bombings",
      ],
      casualties: {
        hiroshima: 140000,
        nagasaki: 70000,
        total: 210000,
      },
      additionalContent:
        "The bombings of Hiroshima and Nagasaki remain the only use of nuclear weapons in armed conflict. The immediate effects included massive destruction, intense heat, and radiation poisoning. Long-term effects included increased cancer rates and birth defects. The ethical debate around these bombings continues to this day.",
    },
    {
      year: "1949",
      title: "Soviet Union Tests First Nuclear Weapon",
      description:
        "The Soviet Union tested its first nuclear device, code-named 'First Lightning' (RDS-1), ending the American monopoly on nuclear weapons and beginning the nuclear arms race.",
      backgroundType: "image",
      backgroundSrc: "/placeholder.svg?height=1080&width=1920",
      quote: "The balance of power has shifted.",
      quoteAuthor: "Soviet newspaper Pravda",
      facts: [
        "The Soviet bomb was nicknamed 'Joe-1' by the Americans, after Joseph Stalin",
        "Soviet espionage accelerated their nuclear program by obtaining American designs",
        "The test occurred years earlier than American intelligence had predicted",
        "President Truman announced the Soviet test to the American public on September 23, 1949",
        "This event marked the beginning of the nuclear arms race",
      ],
      additionalContent:
        "The Soviet nuclear test shocked the United States and dramatically changed global politics. It effectively ended America's nuclear monopoly and initiated a decades-long nuclear arms race. The test accelerated the development of the hydrogen bomb and led to massive nuclear buildups on both sides.",
    },
    {
      year: "1952-1953",
      title: "First Hydrogen Bombs",
      description:
        "The United States tested the first hydrogen bomb ('Ivy Mike') in 1952, followed by the Soviet Union in 1953. These thermonuclear weapons were hundreds of times more powerful than the bombs used in World War II.",
      image: "/images/history/hydrogen-bomb.jpg",
      backgroundType: "image",
      backgroundSrc: "/placeholder.svg?height=1080&width=1920",
      quote: "The development of the H-bomb is not a matter of choice; it is a matter of national survival.",
      quoteAuthor: "Edward Teller",
      facts: [
        "Ivy Mike yielded 10.4 megatons, about 700 times more powerful than the Hiroshima bomb",
        "The explosion vaporized the entire island of Elugelab in the Pacific Ocean",
        "The Soviet RDS-6 test in 1953 was the first deployable hydrogen bomb",
        "Hydrogen bombs use nuclear fusion rather than fission, allowing for much greater yields",
        "Physicist J. Robert Oppenheimer opposed the H-bomb development on moral grounds",
      ],
      additionalContent:
        "Hydrogen bombs represented a quantum leap in destructive power. While atomic bombs release energy through nuclear fission (splitting atoms), hydrogen bombs use nuclear fusion (combining atoms) to create explosions thousands of times more powerful. The development of these weapons made it possible for a single bomb to destroy an entire large city and contaminate a much wider area with radioactive fallout.",
    },
    {
      year: "1962",
      title: "Cuban Missile Crisis",
      description:
        "For 13 days in October 1962, the world stood on the brink of nuclear war as the United States confronted the Soviet Union over the placement of nuclear missiles in Cuba.",
      backgroundType: "image",
      backgroundSrc: "/placeholder.svg?height=1080&width=1920",
      quote: "We're eyeball to eyeball, and I think the other fellow just blinked.",
      quoteAuthor: "Dean Rusk, U.S. Secretary of State",
      facts: [
        "U.S. spy planes discovered Soviet missile installations in Cuba on October 14, 1962",
        "President Kennedy imposed a naval blockade of Cuba, calling it a 'quarantine'",
        "The crisis was resolved when the USSR agreed to remove the missiles in exchange for U.S. promises not to invade Cuba",
        "The U.S. secretly agreed to remove missiles from Turkey as part of the deal",
        "Communications between Kennedy and Khrushchev were crucial to peaceful resolution",
      ],
      additionalContent:
        "The Cuban Missile Crisis is widely considered the closest the world has come to nuclear war. The confrontation led to the establishment of the Moscow-Washington hotline to allow direct communication between U.S. and Soviet leaders. It also contributed to later arms control agreements as both sides recognized the dangers of nuclear brinkmanship.",
    },
    {
      year: "1968",
      title: "Nuclear Non-Proliferation Treaty (NPT)",
      description:
        "The NPT was opened for signature, aiming to prevent the spread of nuclear weapons and weapons technology, promote cooperation in the peaceful uses of nuclear energy, and achieve nuclear disarmament.",
      backgroundType: "image",
      backgroundSrc: "/placeholder.svg?height=1080&width=1920",
      quote:
        "Each of the Parties to the Treaty undertakes to pursue negotiations in good faith on effective measures relating to cessation of the nuclear arms race at an early date and to nuclear disarmament.",
      quoteAuthor: "Article VI of the NPT",
      facts: [
        "The NPT recognizes five states as nuclear-weapon states: US, Russia, UK, France, and China",
        "190 countries have joined the treaty, making it the most widely adhered-to arms control agreement",
        "India, Pakistan, Israel, and North Korea remain outside the treaty",
        "The treaty is built on three pillars: non-proliferation, disarmament, and peaceful use of nuclear energy",
        "The NPT is reviewed every five years at Review Conferences",
      ],
      additionalContent:
        "The NPT has been largely successful in limiting the spread of nuclear weapons, though it has been criticized for creating a system of 'nuclear haves and have-nots.' The treaty's disarmament provisions have seen limited progress, with nuclear states maintaining large arsenals decades after committing to work toward disarmament.",
    },
    {
      year: "1986",
      title: "Reykjavik Summit",
      description:
        "U.S. President Ronald Reagan and Soviet General Secretary Mikhail Gorbachev met in Reykjavik, Iceland, coming close to an agreement to eliminate all nuclear weapons.",
      image: "/images/history/reykjavik-summit.jpg",
      backgroundType: "image",
      backgroundSrc: "/placeholder.svg?height=1080&width=1920",
      quote: "A nuclear war cannot be won and must never be fought.",
      quoteAuthor: "Ronald Reagan",
      facts: [
        "The leaders nearly agreed to eliminate all nuclear weapons within 10 years",
        "Disagreements over the Strategic Defense Initiative (SDI) prevented a final agreement",
        "Despite not reaching a comprehensive agreement, the summit laid groundwork for future arms control",
        "The Intermediate-Range Nuclear Forces (INF) Treaty was signed the following year",
        "The summit marked a significant thaw in Cold War tensions",
      ],
      additionalContent:
        "Though often viewed as a failure at the time, the Reykjavik Summit is now considered a turning point in the Cold War. The ambitious proposals discussed there—including the elimination of all ballistic missiles and dramatic reductions in nuclear arsenals—changed the nature of superpower negotiations and helped pave the way for the end of the Cold War.",
    },
    {
      year: "1996",
      title: "Comprehensive Nuclear-Test-Ban Treaty (CTBT)",
      description:
        "The CTBT was adopted, banning all nuclear explosions for both civilian and military purposes. However, it has not yet entered into force as some key states have not ratified it.",
      backgroundType: "image",
      backgroundSrc: "/placeholder.svg?height=1080&width=1920",
      quote: "The only absolute guarantee against the spread of nuclear weapons is to eliminate them entirely.",
      quoteAuthor: "Mohamed ElBaradei",
      facts: [
        "The CTBT has been signed by 186 countries and ratified by 170",
        "Eight specific countries must still ratify for the treaty to enter into force",
        "The treaty established a global monitoring system to detect nuclear explosions",
        "Over 2,000 nuclear tests were conducted worldwide before the CTBT",
        "The United States has signed but not ratified the treaty",
      ],
      additionalContent:
        "The CTBT represents a major step toward nuclear disarmament by prohibiting all nuclear explosions. Its verification regime includes seismic, hydroacoustic, infrasound, and radionuclide monitoring stations around the world. Despite not being in legal force, the treaty has established a strong international norm against nuclear testing, with only North Korea conducting tests in the 21st century.",
    },
    {
      year: "2017",
      title: "Treaty on the Prohibition of Nuclear Weapons (TPNW)",
      description:
        "The United Nations adopted the TPNW, the first legally binding international agreement to comprehensively prohibit nuclear weapons. It entered into force in January 2021.",
      image: "/images/history/tpnw-signing.jpg",
      backgroundType: "image",
      backgroundSrc: "/placeholder.svg?height=1080&width=1920",
      quote: "Nuclear weapons are the most inhumane weapon ever invented.",
      quoteAuthor: "Setsuko Thurlow, Hiroshima survivor",
      facts: [
        "The TPNW prohibits the development, testing, production, and possession of nuclear weapons",
        "It was adopted by 122 countries at the UN, but no nuclear-armed states have joined",
        "The International Campaign to Abolish Nuclear Weapons (ICAN) won the Nobel Peace Prize for its work on the treaty",
        "The treaty entered into force on January 22, 2021",
        "Nuclear-armed states and their allies have opposed the treaty",
      ],
      additionalContent:
        "The TPNW represents a fundamental shift in nuclear disarmament efforts by focusing on the humanitarian impacts of nuclear weapons rather than traditional security concerns. Supporters see it as a crucial step toward stigmatizing nuclear weapons and creating pressure for disarmament, while critics argue it is ineffective without the participation of nuclear-armed states.",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Cinematic Intro */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-black z-0">
          <div className="absolute inset-0 bg-scanlines opacity-20"></div>
          <video className="absolute inset-0 w-full h-full object-cover opacity-40" autoPlay muted loop playsInline>
            <source src="/placeholder.mp4" type="video/mp4" />
          </video>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="relative z-10 text-center max-w-4xl px-4"
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 3, delay: 1 }}
            className="text-5xl md:text-7xl font-light tracking-tight mb-8"
          >
            The Nuclear Age
          </motion.h1>
          <TypewriterText
            text="A history of humanity's most destructive invention and the shadow it casts over our world."
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            delay={4}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 10 }}
            className="mt-16"
          >
            <p className="text-sm text-gray-400 mb-4">Scroll to begin the journey</p>
            <div className="animate-bounce">
              <ChevronDown className="mx-auto text-gray-400" />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Timeline Events */}
      <div className="relative">
        {timelineEvents.map((event, index) => (
          <TimelineEvent key={index} event={event} index={index} setActiveModal={setActiveModal} />
        ))}
      </div>

      {/* Closing Section */}
      <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-black z-0">
          <div className="absolute inset-0 bg-scanlines opacity-20"></div>
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Nuclear disarmament"
            fill
            className="object-cover opacity-30"
          />
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2 }}
          viewport={{ once: true }}
          className="relative z-10 text-center max-w-4xl px-4"
        >
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-8">The Future Remains Unwritten</h2>
          <TypewriterText
            text="As long as nuclear weapons exist, the possibility of their use remains. The choice of what happens next belongs to all of us."
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            delay={0.5}
          />
          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 6 }}
            viewport={{ once: true }}
            className="mt-12 px-8 py-3 border border-white/30 hover:bg-white/10 transition-colors duration-500"
          >
            Learn How You Can Help
          </motion.button>
        </motion.div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {activeModal !== null && <Modal event={timelineEvents[activeModal]} onClose={() => setActiveModal(null)} />}
      </AnimatePresence>
    </div>
  )
}

// TypewriterText component for animated text
function TypewriterText({ text, className, delay = 0 }: {text:string, className:string, delay?:number}) {
  const characters = Array.from(text)

  return (
    <p className={className}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1, delay: delay + index * 0.05 }}
        >
          {char}
        </motion.span>
      ))}
    </p>
  )
}

// Individual Timeline Event component
function TimelineEvent({ event, index, setActiveModal }:{event: TimeLineEventProps, index:number, setActiveModal:Function}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" })

  return (
    <section
      ref={ref}
      className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden"
    >
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={isInView ? { scale: 1 } : { scale: 1.1 }}
          transition={{ duration: 10 }}
          className="h-full w-full"
        >
          {event.backgroundType === "video" ? (
            <video className="absolute inset-0 w-full h-full object-cover opacity-40" autoPlay muted loop playsInline>
              <source src={event.backgroundSrc} type="video/mp4" />
            </video>
          ) : (
            <Image
              src={event.backgroundSrc || "/placeholder.svg"}
              alt={event.title}
              fill
              className="object-cover opacity-40"
              priority={index === 0}
            />
          )}
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="absolute inset-0 bg-scanlines opacity-10"></div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Column - Main Info */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <span className="text-6xl md:text-8xl font-light text-white/80">{event.year}</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-3xl md:text-4xl font-light"
            >
              {event.title}
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 2, delay: 1.5 }}
            >
              <TypewriterText
                text={event.description}
                className="text-lg md:text-xl text-gray-300 leading-relaxed"
                delay={1.5}
              />
            </motion.div>

            {event.quote && (
              <motion.blockquote
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 1, delay: 4 }}
                className="border-l-2 border-white/30 pl-4 md:pl-6 text-left"
              >
                <p className="text-xl md:text-2xl italic text-white/90 mb-2">"{event.quote}"</p>
                <footer className="text-white/60">— {event.quoteAuthor}</footer>
              </motion.blockquote>
            )}

            <motion.button
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1, delay: 5 }}
              onClick={() => setActiveModal(index)}
              className="mt-6 flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors duration-300 rounded-sm"
            >
              <Info size={18} />
              <span>Learn More</span>
            </motion.button>
          </div>

          {/* Right Column - Facts */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 1, delay: 2 }}
            className="bg-white/5 backdrop-blur-sm p-6 rounded-sm border border-white/10"
          >
            <h3 className="text-xl font-light mb-4 pb-2 border-b border-white/10">Key Facts</h3>
            <ul className="space-y-3">
              {event.facts &&
                event.facts.map((fact:any, i:number) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5, delay: 2.5 + i * 0.3 }}
                    className="flex items-start"
                  >
                    <span className="text-red-400 mr-2">•</span>
                    <span className="text-gray-300">{fact}</span>
                  </motion.li>
                ))}
            </ul>

            {event.image && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 1, delay: 4 }}
                className="mt-6 relative h-48 w-full overflow-hidden rounded-sm"
              >
                <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-2 left-2 right-2 text-sm text-white/80">
                  Historical photograph related to {event.title}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Modal component for detailed information
function Modal({ event, onClose }:{event:TimeLineEventProps, onClose:() => void}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25 }}
        className="relative bg-slate-900 border border-white/10 rounded-sm max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors">
          <X size={24} />
        </button>

        <div className="p-6 md:p-8">
          <h2 className="text-3xl font-light mb-2">{event.title}</h2>
          <p className="text-xl text-white/60 mb-6">{event.year}</p>

          {event.image && (
            <div className="relative h-64 md:h-80 w-full mb-6 overflow-hidden rounded-sm">
              <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
            </div>
          )}

          <div className="prose prose-invert max-w-none">
            <h3 className="text-xl font-light mb-4">Background</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">{event.description}</p>

            <h3 className="text-xl font-light mb-4">Details</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">{event.additionalContent}</p>

            {event.casualties && (
              <div className="my-8">
                <h3 className="text-xl font-light mb-4">Casualties</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(event.casualties).map(([location, count]) => (
                    <div key={location} className="bg-white/5 p-4 rounded-sm text-center">
                      <p className="text-3xl font-light text-red-400">{count.toLocaleString()}</p>
                      <p className="text-sm text-white/60 capitalize">{location}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <blockquote className="border-l-2 border-white/30 pl-4 md:pl-6 my-6">
              <p className="text-xl italic text-white/90 mb-2">"{event.quote}"</p>
              <footer className="text-white/60">— {event.quoteAuthor}</footer>
            </blockquote>

            <h3 className="text-xl font-light mb-4">Key Facts</h3>
            <ul className="space-y-3 mb-6">
              {event.facts &&
                event.facts.map((fact, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-red-400 mr-2">•</span>
                    <span className="text-gray-300">{fact}</span>
                  </li>
                ))}
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors duration-300 rounded-sm"
            >
              Close
            </button>
            <a href="#" className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors">
              <span>Further reading</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 7h10v10M7 17L17 7" />
              </svg>
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
