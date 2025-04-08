import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="mb-4 flex items-center space-x-2">
              <Image src="/logo.svg" alt="Nuclear Disarmament Initiative" width={40} height={40} />
              <span className="text-lg font-medium text-gray-900">Nuclear Disarmament Initiative</span>
            </Link>
            <p className="mt-4 text-gray-600">
              Working towards a world free of nuclear weapons through education, advocacy, and action.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/history" className="text-gray-600 hover:text-blue-600">
                  History
                </Link>
              </li>
              <li>
                <Link href="/effects" className="text-gray-600 hover:text-blue-600">
                  Effects
                </Link>
              </li>
              <li>
                <Link href="/stockpiles" className="text-gray-600 hover:text-blue-600">
                  Stockpiles
                </Link>
              </li>
              <li>
                <Link href="/efforts" className="text-gray-600 hover:text-blue-600">
                  Disarmament Efforts
                </Link>
              </li>
              <li>
                <Link href="/action" className="text-gray-600 hover:text-blue-600">
                  Take Action
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Mail className="mr-2 mt-1 h-4 w-4 text-gray-600" />
                <span className="text-gray-600">info@nucleardisarmament.org</span>
              </li>
              <li className="flex items-start">
                <Phone className="mr-2 mt-1 h-4 w-4 text-gray-600" />
                <span className="text-gray-600">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start">
                <MapPin className="mr-2 mt-1 h-4 w-4 text-gray-600" />
                <span className="text-gray-600">123 Peace Avenue, New York, NY 10001</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-gray-200 p-2 text-gray-700 transition-colors hover:bg-blue-100 hover:text-blue-600"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-gray-200 p-2 text-gray-700 transition-colors hover:bg-blue-100 hover:text-blue-600"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-gray-200 p-2 text-gray-700 transition-colors hover:bg-blue-100 hover:text-blue-600"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-gray-200 p-2 text-gray-700 transition-colors hover:bg-blue-100 hover:text-blue-600"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8 text-center">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} Nuclear Disarmament Initiative. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
