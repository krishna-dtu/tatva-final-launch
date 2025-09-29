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
    // On mount, check if user is logged in by scanning localStorage for "tatva_user_phone" key
    // or if you want to keep it consistent, store last logged in phone in a separate key, e.g. "tatva_user_phone"
    const savedPhone = localStorage.getItem("tatva_user_phone")
    if (savedPhone) {
      const savedUser = localStorage.getItem(`user_${savedPhone}`)
      if (savedUser) {
        setUser(JSON.parse(savedUser))
        setIsAuthenticated(true)
      }
      const f = async()=>{
        const response = await fetch("http://localhost:5000/getUser",
          {
            method : "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body:JSON.stringify({
              phone_no : savedPhone
            })
          }
        )
        const ans = await response.json()
        setUser(ans);
        console.log(ans)
      }
      f()
    }
    setIsLoading(false)
  }, [])

  const handleLogin = (userData: any) => {
    setUser(userData)
    setIsAuthenticated(true)
    localStorage.setItem(`user_${userData.phoneNumber}`, JSON.stringify(userData))
    localStorage.setItem("tatva_user_phone", userData.phoneNumber) // Save last logged in phone
  }

  const handleLogout = () => {
    if (!user?.phoneNumber) return
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem(`user_${user.phoneNumber}`)
    localStorage.removeItem("tatva_user_phone")
  }

  const handleUserUpdate = (updatedUser: any) => {
    setUser(updatedUser)
    if (updatedUser.phoneNumber) {
      localStorage.setItem(`user_${updatedUser.phoneNumber}`, JSON.stringify(updatedUser))
    }
  }

  const handleLanguageChange = (language: string) => {
    if (!user) return
    const updatedUser = { ...user, language }
    setUser(updatedUser)
    if (user.phoneNumber) {
      localStorage.setItem(`user_${user.phoneNumber}`, JSON.stringify(updatedUser))
    }
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
