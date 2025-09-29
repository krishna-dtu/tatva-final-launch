"use client"

import { useState, useEffect } from "react"
import { BottomNavigation } from "@/components/navigation/bottom-navigation"
import { Dashboard } from "@/components/screens/dashboard"
import { Subjects } from "@/components/screens/subjects"
import { Missions } from "@/components/screens/missions"
import { Progress } from "@/components/screens/progress"
import { Profile } from "@/components/screens/profile"
import { AstronautMascot } from "@/components/mascot/astronaut-mascot"
import { Quiz } from "@/components/screens/quiz"

interface MainAppProps {
  user: any
  onLogout: () => void
  onUserUpdate?: (user: any) => void
  onLanguageChange?: (language: string) => void
}

export function MainApp({ user, onLogout, onUserUpdate, onLanguageChange }: MainAppProps) {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [subjectID, setSubjectID] = useState<string | null>(null)  // set to null initially
  const [questions, setQuestions] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Navigate between screens
  const handleNavigate = (screen: string) => {
    setActiveTab(screen)
    console.log("Screen", screen)
  }

  // When a subject is selected, update the subjectID only
  const handleQuizId = (Sid: string) => {
    setSubjectID(Sid)
  }

  // When subjectID updates, switch to quiz tab

  // Fetch questions whenever we enter the quiz tab and have a subjectID

  // Render the correct screen based on activeTab
  const renderScreen = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard user={user} onNavigate={handleNavigate} />
      case "subjects":
        return <Subjects user={user} onNavigate={handleNavigate} quizID={handleQuizId} />
      case "missions":
        return <Missions user={user} />
      case "progress":
        return <Progress user={user} />
      case "profile":
        return (
          <Profile
            user={user}
            onLogout={onLogout}
            onUserUpdate={onUserUpdate}
            onLanguageChange={onLanguageChange}
          />
        )
      case "quiz":
        return <Quiz S_id={subjectID || ""}  user={user} />
      default:
        return <Dashboard user={user} onNavigate={handleNavigate} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-5 w-2 h-2 bg-accent rounded-full animate-float opacity-40"></div>
        <div
          className="absolute top-32 right-8 w-3 h-3 bg-primary rounded-full animate-float opacity-30"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-40 left-12 w-2 h-2 bg-secondary rounded-full animate-float opacity-50"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 right-4 w-4 h-4 bg-accent rounded-full animate-float opacity-20"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>

      <main className="pb-20 relative z-10">{renderScreen()}</main>

      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      <AstronautMascot user={user} />
    </div>
  )
}
