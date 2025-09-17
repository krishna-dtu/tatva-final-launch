"use client"

import { useState, useEffect } from "react"
import { getTranslation, type Language, type TranslationKey } from "@/lib/translations"

export function useTranslation() {
  const [language, setLanguage] = useState<Language>("english")

  useEffect(() => {
    // Get language from user data in localStorage
    const savedUser = localStorage.getItem("tatva_user")
    if (savedUser) {
      const user = JSON.parse(savedUser)
      setLanguage(user.language || "english")
    }
  }, [])

  const t = (key: TranslationKey): string => {
    return getTranslation(language, key)
  }

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage)
    // Update user data in localStorage
    const savedUser = localStorage.getItem("tatva_user")
    if (savedUser) {
      const user = JSON.parse(savedUser)
      user.language = newLanguage
      localStorage.setItem("tatva_user", JSON.stringify(user))
    }
  }

  return { t, language, changeLanguage }
}
