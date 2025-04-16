"use client"

import { useState } from "react"
import { Globe } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface LanguageSelectorProps {
  isLight?: boolean
}

export function LanguageSelector({ isLight = false }: LanguageSelectorProps) {
  const [currentLanguage, setCurrentLanguage] = useState("EN")

  const languages = [
    { code: "EN", name: "English" },
    { code: "ES", name: "Español" },
    { code: "FR", name: "Français" },
    { code: "RU", name: "Русский" },
    { code: "AR", name: "العربية" },
  ]

  const handleLanguageChange = (code: string) => {
    setCurrentLanguage(code)
    // Here you would implement the actual language change logic
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger 
        className={`flex items-center space-x-1 rounded-md px-2 py-1 text-sm font-medium 
        ${isLight ? "text-white hover:bg-white/20" : "text-gray-700 hover:bg-gray-100"}`}
      >
        <Globe className="h-4 w-4" />
        <span>{currentLanguage}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className="cursor-pointer"
          >
            {language.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
