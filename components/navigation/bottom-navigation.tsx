"use client"

import { Home, BookOpen, Target, Trophy, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTranslation } from "@/hooks/use-translation"

interface BottomNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const tabs = [
  { id: "dashboard", labelKey: "home" as const, icon: Home },
  { id: "subjects", labelKey: "subjects" as const, icon: BookOpen },
  { id: "missions", labelKey: "missions" as const, icon: Target },
  { id: "progress", labelKey: "progress" as const, icon: Trophy },
  { id: "profile", labelKey: "profile" as const, icon: User },
]

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const { t } = useTranslation()

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-border z-50">
      <div className="flex items-center justify-around py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200",
                isActive
                  ? "text-primary-foreground bg-primary scale-110"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
              )}
            >
              <Icon className={cn("w-5 h-5 mb-1", isActive && "animate-glow")} />
              <span
                className={cn("text-xs font-medium", isActive ? "text-primary-foreground" : "text-muted-foreground")}
              >
                {t(tab.labelKey)}
              </span>
              {isActive && <div className="absolute -top-1 w-1 h-1 bg-accent rounded-full animate-glow"></div>}
            </button>
          )
        })}
      </div>
    </div>
  )
}
