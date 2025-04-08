"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { LanguageSelector } from "@/components/language-selector"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  // Handle the scroll event
  useEffect(() => {
    const handleScroll = () => {
      // When the scroll position is greater than 10px, change the header background
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    // Add event listener for scroll
    window.addEventListener("scroll", handleScroll)

    return () => {
      // Clean up the event listener when component unmounts
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header
      className={` top-0 z-50 w-full transition-all duration-300 ${
         !isScrolled ? "bg-transparent" : "bg-white/95 backdrop-blur-sm shadow-sm"
      } ${isHomePage ? "fixed" : 'sticky'}` }
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo.svg"
            alt="Nuclear Disarmament Initiative"
            width={40}
            height={40}
            className={isHomePage && !isScrolled ? "filter brightness-0 invert" : ""}
          />
          <span
            className={`hidden text-lg font-medium md:inline-block ${
              isHomePage && !isScrolled ? "text-white" : "text-gray-900"
            }`}
          >
            Nuclear Disarmament Initiative
          </span>
        </Link>

        <div className="hidden items-center space-x-6 md:flex">
          <MainNav isHomePage={isHomePage} isScrolled={isScrolled} />
          <LanguageSelector isLight={isHomePage && !isScrolled} />
          <Link href="/contact">
            <Button
              variant={isHomePage && !isScrolled ? "outline" : "default"}
              size="sm"
              className={isHomePage && !isScrolled ? "border-white hover:bg-white/20" : ""}
            >
              Contact Us
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          className="flex items-center md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className={`h-6 w-6 ${isHomePage && !isScrolled ? "text-white" : "text-gray-900"}`} />
          ) : (
            <Menu className={`h-6 w-6 ${isHomePage && !isScrolled ? "text-white" : "text-gray-900"}`} />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && <MobileNav onClose={() => setIsMobileMenuOpen(false)} />}
    </header>
  )
}
