"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { LanguageSelector } from "@/components/language-selector"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Handle the scroll event
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo.svg" alt="Nuclear Disarmament Initiative" width={40} height={40} />
          <span className="hidden text-lg font-medium text-gray-900 md:inline-block">
            Nuclear Disarmament Initiative
          </span>
        </Link>

        <div className="hidden items-center space-x-6 md:flex">
          <MainNav />
          <LanguageSelector />
          <Link href="/contact">
            <Button variant="outline" size="sm">
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
            <X className="h-6 w-6 text-gray-900" />
          ) : (
            <Menu className="h-6 w-6 text-gray-900" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && <MobileNav onClose={() => {setIsMobileMenuOpen(false)}} />}
    </header>
  )
}
