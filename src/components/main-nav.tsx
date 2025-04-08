import Link from "next/link"

export function MainNav() {
  return (
    <nav className="flex items-center space-x-6">
      <Link href="/history" className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600">
        History
      </Link>
      <Link href="/effects" className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600">
        Effects
      </Link>
      <Link href="/stockpiles" className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600">
        Stockpiles
      </Link>
      <Link href="/efforts" className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600">
        Disarmament
      </Link>
      <Link href="/action" className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600">
        Take Action
      </Link>
      <Link href="/news" className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600">
        News
      </Link>
      <Link href="/resources" className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600">
        Resources
      </Link>
    </nav>
  )
}
