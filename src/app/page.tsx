"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { Volume2, VolumeX, Pause, Play, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { NewsItem } from "@/components/news-item"
import { FeaturedSection } from "@/components/featured-section"
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

  // Sample news data
  const newsItems = [
    {
      id: "1",
      title: "UN Treaty on the Prohibition of Nuclear Weapons Reaches 60 Ratifications",
      date: "June 15, 2023",
      link: "/news/tpnw-ratifications",
    },
    {
      id: "2",
      title: "New START Treaty Extension: What It Means for Global Security",
      date: "May 28, 2023",
      link: "/news/new-start-extension",
    },
    {
      id: "3",
      title: "ICAN Launches New Campaign to Promote TPNW Universalization",
      date: "May 10, 2023",
      link: "/news/ican-campaign",
    },
    {
      id: "4",
      title: "Scientists Warn of Climate Effects from Limited Nuclear Exchange",
      date: "April 22, 2023",
      link: "/news/climate-effects",
    },
  ]

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
        <div className="video-overlay absolute left-0 top-0 h-full w-full"></div>

        {/* Hero Content */}
        <div className="relative z-10 flex h-full items-center">
          <div className="container mx-auto px-4">
            <div className="ml-auto max-w-xl md:mr-12 lg:mr-24">
              <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-900 md:text-5xl lg:text-6xl">
                A World Free of Nuclear Weapons
              </h1>
              <p className="mb-8 text-lg text-gray-700 md:text-xl">
                Join the global movement for nuclear disarmament and help build a safer future for all generations.
              </p>
              <Link href="/about">
                <Button size="lg" className="group">
                  Read More
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
            className="h-10 w-10 rounded-full border-gray-300 bg-white/80 text-gray-800 backdrop-blur-sm hover:bg-white"
          >
            {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </Button>
          <Button
            onClick={togglePlayPause}
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-full border-gray-300 bg-white/80 text-gray-800 backdrop-blur-sm hover:bg-white"
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>
        </div>
      </section>

      {/* Featured Sections */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">Key Focus Areas</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <FeaturedSection
              title="History of Nuclear Weapons"
              description="Explore the timeline of nuclear weapons development, testing, and the evolution of international treaties."
              imageSrc="/images/history-thumbnail.jpg"
              link="/history"
            />
            <FeaturedSection
              title="Effects of Nuclear Weapons"
              description="Understand the immediate and long-term consequences of nuclear weapons on human life, society, and the environment."
              imageSrc="/images/effects-thumbnail.jpg"
              link="/effects"
            />
            <FeaturedSection
              title="Disarmament Efforts"
              description="Learn about treaties, organizations, and global initiatives working toward a world free of nuclear weapons."
              imageSrc="/images/efforts-thumbnail.jpg"
              link="/efforts"
            />
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl font-bold text-gray-900">Latest News</h2>
            <Link href="/news" className="text-blue-600 hover:text-blue-800">
              View All News
            </Link>
          </div>

          {/* News Ticker for Desktop */}
          <div className="hidden overflow-hidden md:block">
            <div className="relative whitespace-nowrap">
              <div className="news-scroll inline-block">
                {newsItems.map((item) => (
                  <NewsItem key={item.id} item={item} />
                ))}
              </div>
              <div className="news-scroll inline-block">
                {newsItems.map((item) => (
                  <NewsItem key={`duplicate-${item.id}`} item={item} />
                ))}
              </div>
            </div>
          </div>

          {/* News Cards for Mobile */}
          <div className="grid gap-4 md:hidden">
            {newsItems.slice(0, 3).map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <p className="mb-1 text-sm text-gray-500">{item.date}</p>
                  <Link href={item.link} className="font-medium text-gray-900 hover:text-blue-600">
                    {item.title}
                  </Link>
                </CardContent>
              </Card>
            ))}
            <div className="text-center">
              <Link href="/news" className="text-sm text-blue-600 hover:text-blue-800">
                View More News
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="rounded-lg bg-blue-50 p-8 md:p-12">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900">Take Action Today</h2>
              <p className="mb-8 text-lg text-gray-700">
                There are many ways you can contribute to the global movement for nuclear disarmament. Learn about the
                steps you can take to make a difference.
              </p>
              <Link href="/action">
                <Button size="lg">Get Involved</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <NewsletterSignup />
        </div>
      </section>
    </>
  )
}
