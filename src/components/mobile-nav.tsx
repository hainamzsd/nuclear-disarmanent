"use client"

import Link from "next/link"
import { LanguageSelector } from "@/components/language-selector"
import { Button } from "@/components/ui/button"

interface MobileNavProps {
  onClose: () => void
}

export function MobileNav({ onClose }: MobileNavProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white p-6">
      {/* Language Selector */}
      <div className="flex items-center justify-end">
        <LanguageSelector />
      </div>

      {/* Navigation Links */}
      <nav className="mt-8 flex flex-col space-y-6">
        <Link
          href="/history"
          className="text-lg font-medium text-gray-900 transition-colors hover:text-blue-600"
          onClick={onClose}
        >
          History
        </Link>
        <Link
          href="/effects"
          className="text-lg font-medium text-gray-900 transition-colors hover:text-blue-600"
          onClick={onClose}
        >
          Effects
        </Link>
        <Link
          href="/stockpiles"
          className="text-lg font-medium text-gray-900 transition-colors hover:text-blue-600"
          onClick={onClose}
        >
          Stockpiles
        </Link>
        <Link
          href="/efforts"
          className="text-lg font-medium text-gray-900 transition-colors hover:text-blue-600"
          onClick={onClose}
        >
          Disarmament Efforts
        </Link>
        <Link
          href="/action"
          className="text-lg font-medium text-gray-900 transition-colors hover:text-blue-600"
          onClick={onClose}
        >
          Take Action
        </Link>
        <Link
          href="/news"
          className="text-lg font-medium text-gray-900 transition-colors hover:text-blue-600"
          onClick={onClose}
        >
          News
        </Link>
        <Link
          href="/resources"
          className="text-lg font-medium text-gray-900 transition-colors hover:text-blue-600"
          onClick={onClose}
        >
          Resources
        </Link>
        <Link
          href="/contact"
          className="text-lg font-medium text-gray-900 transition-colors hover:text-blue-600"
          onClick={onClose}
        >
          Contact
        </Link>
      </nav>

      {/* Contact Button */}
      <div className="mt-auto">
        <Link href="/contact" className="w-full" onClick={onClose}>
          <Button className="w-full">Contact Us</Button>
        </Link>
      </div>
    </div>
  )
}
