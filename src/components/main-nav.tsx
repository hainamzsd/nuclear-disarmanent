"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

interface MainNavProps {
  isHomePage?: boolean
  isScrolled?: boolean
}

export function MainNav({ isHomePage = false, isScrolled = true }: MainNavProps) {
  const pathname = usePathname()

  const navItems = [
    { href: "/history", label: "History" },
    { href: "/effects", label: "Effects" },
    { href: "/stockpiles", label: "Stockpiles" },
    { href: "/efforts", label: "Disarmament" },
    { href: "/action", label: "Take Action" },
    { href: "/news", label: "News" },
    { href: "/resources", label: "Resources" },
  ]

  return (
    <nav className="flex items-center space-x-6">
      {navItems.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`text-sm font-medium transition-colors relative
              ${
                isHomePage && !isScrolled
                  ? "text-white hover:text-white/80"
                  : isActive
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
              }
              ${isActive ? "after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full after:bg-current" : ""}
            `}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
