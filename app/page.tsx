"use client"

import { useState, useEffect } from "react"
import { AuthScreen } from "@/components/auth/auth-screen"
import { MainApp } from "@/components/main-app"
import { SplashScreen } from "@/components/ui/splash-screen"

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [showSplash, setShowSplash] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem("tatva_user")
    // console.log("Saved User",savedUser)
    if (savedUser) {
      setUser(JSON.parse(savedUser))
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  const handleLogin = (userData: any) => {
    setUser(userData)
    setIsAuthenticated(true)
    localStorage.setItem("tatva_user", JSON.stringify(userData))
  }

  const handleLogout = () => {  
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("tatva_user")
    // localStorage.removeItem("user_1")
  }

  const handleUserUpdate = (updatedUser: any) => {
    setUser(updatedUser)
    localStorage.setItem("tatva_user", JSON.stringify(updatedUser))
  }

  const handleLanguageChange = (language: string) => {
    const updatedUser = { ...user, language }
    setUser(updatedUser)
    localStorage.setItem("tatva_user", JSON.stringify(updatedUser))
  }

  if (showSplash && isAuthenticated && !isLoading) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />
  }

  if (!isAuthenticated) {
    return <AuthScreen onLogin={handleLogin} />
  }

  return (
    <MainApp
      user={user}
      onLogout={handleLogout}
      onUserUpdate={handleUserUpdate}
      onLanguageChange={handleLanguageChange}
    />
  )
}
