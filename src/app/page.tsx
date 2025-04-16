"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Volume2, VolumeX, Pause, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { InteractiveGlobe } from "@/components/earth-visualize/interactive-globe"
import { NewsletterSignup } from "@/components/newsletter-signup"

export default function HomePage() {
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <>
      {/* Hero Section with Video Background */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Video Background */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute left-0 top-0 h-full w-full object-cover"
        >
          <source src="/nuclear.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay */}
        <div className="absolute left-0 top-0 h-full w-full bg-black/60"></div>

        {/* Hero Content */}
        <div className="relative z-10 flex h-full items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-xl md:ml-12 lg:ml-24">
              <h1 className="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                A World Free of Nuclear Weapons
              </h1>
              <p className="mb-8 text-lg text-gray-200 md:text-xl">
                Join the global movement for nuclear disarmament and help build a safer future for all generations.
              </p>
              <Link href="/about">
                <Button size="lg" className="group bg-white text-gray-900 hover:bg-gray-100">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Video Controls */}
        <div className="absolute bottom-8 left-8 z-10 flex space-x-4">
          <Button
            onClick={toggleMute}
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-full border-white/30 bg-black/30 text-white backdrop-blur-sm hover:bg-black/50"
          >
            {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </Button>
          <Button
            onClick={togglePlayPause}
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-full border-white/30 bg-black/30 text-white backdrop-blur-sm hover:bg-black/50"
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>
        </div>
      </section>

      {/* Interactive Globe Section */}
      <section className="bg-gradient-to-b from-gray-900 to-black py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-3xl font-bold text-white">Global Nuclear Arsenal</h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-gray-300">
            Explore the current state of nuclear weapons worldwide. Click on markers to see details about each country's
            arsenal.
          </p>

          <InteractiveGlobe />

          <div className="mt-12 text-center">
            <Link href="/stockpiles">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                View Detailed Stockpile Data
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Key Information Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="group rounded-lg bg-white p-8 shadow-lg transition-all hover:shadow-xl">
              <div className="mb-4 rounded-full bg-blue-100 p-3 text-blue-600 w-fit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M12 2v8"></path>
                  <path d="m4.93 10.93 1.41 1.41"></path>
                  <path d="M2 18h2"></path>
                  <path d="M20 18h2"></path>
                  <path d="m19.07 10.93-1.41 1.41"></path>
                  <path d="M22 22H2"></path>
                  <path d="m8 22 4-10 4 10"></path>
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-900">The Threat</h3>
              <p className="text-gray-600">
                A single nuclear weapon can destroy a city and kill millions. The current global arsenal threatens our
                very existence.
              </p>
              <Link href="/effects" className="mt-4 inline-block text-blue-600 hover:underline">
                Learn about the effects →
              </Link>
            </div>

            <div className="group rounded-lg bg-white p-8 shadow-lg transition-all hover:shadow-xl">
              <div className="mb-4 rounded-full bg-blue-100 p-3 text-blue-600 w-fit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M12 22v-5"></path>
                  <path d="M9 8V2"></path>
                  <path d="M15 8V2"></path>
                  <path d="M12 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path>
                  <path d="M12 8v8"></path>
                  <path d="M9 14h6"></path>
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-900">The Progress</h3>
              <p className="text-gray-600">
                Global nuclear arsenals have decreased from over 70,000 in the 1980s to around 13,000 today. Progress is
                possible.
              </p>
              <Link href="/history" className="mt-4 inline-block text-blue-600 hover:underline">
                Explore the history →
              </Link>
            </div>

            <div className="group rounded-lg bg-white p-8 shadow-lg transition-all hover:shadow-xl">
              <div className="mb-4 rounded-full bg-blue-100 p-3 text-blue-600 w-fit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-900">The Solution</h3>
              <p className="text-gray-600">
                International treaties, public pressure, and diplomatic efforts are key to achieving a world free of
                nuclear weapons.
              </p>
              <Link href="/action" className="mt-4 inline-block text-blue-600 hover:underline">
                Take action →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News - Minimal */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl font-bold text-gray-900">Latest Updates</h2>
            <Link href="/news" className="text-blue-600 hover:text-blue-800">
              View All News
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="overflow-hidden rounded-lg bg-white shadow-md">
              <div className="relative h-48">
                <Image src="/images/news/tpnw-milestone.jpg" alt="TPNW Treaty" fill className="object-cover" />
              </div>
              <div className="p-6">
                <p className="mb-1 text-sm font-medium text-blue-600">June 15, 2023</p>
                <h3 className="mb-2 text-xl font-bold text-gray-900">
                  UN Treaty on the Prohibition of Nuclear Weapons Reaches 60 Ratifications
                </h3>
                <p className="mb-4 text-gray-600 line-clamp-2">
                  The Treaty on the Prohibition of Nuclear Weapons (TPNW) has reached a significant milestone with 60
                  countries now having ratified the agreement.
                </p>
                <Link href="/news/tpnw-ratifications" className="text-blue-600 hover:underline">
                  Read more →
                </Link>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg bg-white shadow-md">
              <div className="relative h-48">
                <Image src="/images/news/new-start.jpg" alt="New START Treaty" fill className="object-cover" />
              </div>
              <div className="p-6">
                <p className="mb-1 text-sm font-medium text-blue-600">May 28, 2023</p>
                <h3 className="mb-2 text-xl font-bold text-gray-900">
                  New START Treaty Extension: What It Means for Global Security
                </h3>
                <p className="mb-4 text-gray-600 line-clamp-2">
                  The United States and Russia have agreed to extend the New START treaty for five years, preserving the
                  last remaining nuclear arms control agreement.
                </p>
                <Link href="/news/new-start-extension" className="text-blue-600 hover:underline">
                  Read more →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-700 to-blue-900 p-12">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500 opacity-20"></div>
            <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-blue-800 opacity-20"></div>

            <div className="relative z-10 mx-auto max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold text-white">Join the Movement</h2>
              <p className="mb-8 text-lg text-blue-100">
                Nuclear disarmament is possible, but it requires global cooperation and public pressure. Learn how you
                can contribute to this vital cause.
              </p>
              <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
                <Link href="/action">
                  <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
                    Take Action
                  </Button>
                </Link>
                <Link href="/resources">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Explore Resources
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup - Minimal Design */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <NewsletterSignup />
        </div>
      </section>
    </>
  )
}
