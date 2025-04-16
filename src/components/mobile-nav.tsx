"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { X } from "lucide-react"
import { LanguageSelector } from "@/components/language-selector"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet"

interface MobileNavProps {
  onClose: () => void
  isOpen: boolean
}

export function MobileNav({ onClose, isOpen }: MobileNavProps) {
  // Force sheet to use our isOpen state
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(isOpen)
  }, [isOpen])

  // Handle closing
  const handleClose = () => {
    setOpen(false)
    onClose()
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="w-[80%] border-l border-gray-200 p-0">
        <div className="flex h-full flex-col">
          <SheetHeader className="border-b border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-xl font-bold">Menu</SheetTitle>
              <SheetClose asChild>
                <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button>
              </SheetClose>
            </div>
          </SheetHeader>

          <div className="flex-1 overflow-auto p-6">
            <nav className="flex flex-col space-y-6">
              <Link
                href="/history"
                className="text-lg font-medium text-gray-900 transition-colors hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400"
                onClick={handleClose}
              >
                History
              </Link>
              <Link
                href="/effects"
                className="text-lg font-medium text-gray-900 transition-colors hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400"
                onClick={handleClose}
              >
                Effects
              </Link>
              <Link
                href="/stockpiles"
                className="text-lg font-medium text-gray-900 transition-colors hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400"
                onClick={handleClose}
              >
                Stockpiles
              </Link>
              <Link
                href="/efforts"
                className="text-lg font-medium text-gray-900 transition-colors hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400"
                onClick={handleClose}
              >
                Disarmament Efforts
              </Link>
              <Link
                href="/action"
                className="text-lg font-medium text-gray-900 transition-colors hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400"
                onClick={handleClose}
              >
                Take Action
              </Link>
              <Link
                href="/news"
                className="text-lg font-medium text-gray-900 transition-colors hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400"
                onClick={handleClose}
              >
                News
              </Link>
              <Link
                href="/resources"
                className="text-lg font-medium text-gray-900 transition-colors hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400"
                onClick={handleClose}
              >
                Resources
              </Link>
              <Link
                href="/contact"
                className="text-lg font-medium text-gray-900 transition-colors hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400"
                onClick={handleClose}
              >
                Contact
              </Link>
            </nav>
          </div>

          <div className="border-t border-gray-100 p-6">
            <div className="mb-6 flex items-center justify-between">
              <LanguageSelector />
              <ModeToggle />
            </div>
            <Link href="/contact" className="w-full" onClick={handleClose}>
              <Button className="w-full">Contact Us</Button>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
