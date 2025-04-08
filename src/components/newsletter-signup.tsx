"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would implement the actual newsletter signup logic
    console.log("Newsletter signup:", email)
    setIsSubmitted(true)
    setEmail("")
  }

  return (
    <div className="mx-auto max-w-3xl text-center">
      <h2 className="mb-4 text-3xl font-bold text-gray-900">Stay Informed</h2>
      <p className="mb-8 text-lg text-gray-700">
        Subscribe to our newsletter to receive updates on nuclear disarmament efforts, news, and ways to get involved.
      </p>

      {isSubmitted ? (
        <div className="rounded-lg bg-green-50 p-4 text-green-800">
          <p>Thank you for subscribing! We'll keep you updated on our latest news and initiatives.</p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex max-w-md flex-col space-y-4 sm:flex-row sm:space-x-2 sm:space-y-0"
        >
          <Input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-grow"
          />
          <Button type="submit">Subscribe</Button>
        </form>
      )}
    </div>
  )
}
