"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  User,
  Settings,
  LogOut,
  Star,
  Trophy,
  Coins,
  Crown,
  Palette,
  Globe,
  Volume2,
  Moon,
  Sun,
  Code,
} from "lucide-react"
import { useTheme } from "@/hooks/use-theme"
import { LanguageSelector } from "@/components/ui/language-selector"
import { EditProfileModal } from "@/components/ui/edit-profile-modal"
import { TechStackModal } from "@/components/ui/tech-stack-modal"
import { useState } from "react"
import { useTranslation } from "@/hooks/use-translation"

interface ProfileProps {
  user: any
  onLogout: () => void
  onUserUpdate?: (user: any) => void
  onLanguageChange?: (language: string) => void
}

const customizationItems = [
  { id: "helmet-1", name: "Space Helmet", type: "helmet", cost: 100, owned: true },
  { id: "helmet-2", name: "Galaxy Helmet", type: "helmet", cost: 200, owned: false },
  { id: "outfit-1", name: "Astronaut Suit", type: "outfit", cost: 150, owned: true },
  { id: "outfit-2", name: "Cosmic Explorer", type: "outfit", cost: 300, owned: false },
  { id: "badge-1", name: "Star Badge", type: "badge", cost: 50, owned: true },
  { id: "badge-2", name: "Rocket Badge", type: "badge", cost: 75, owned: false },
]

export function Profile({ user, onLogout, onUserUpdate, onLanguageChange }: ProfileProps) {
  const { t } = useTranslation()
  const { theme, toggleTheme } = useTheme()
  const [showLanguageSelector, setShowLanguageSelector] = useState(false)
  const [showEditProfile, setShowEditProfile] = useState(false)
  const [showTechStack, setShowTechStack] = useState(false)

  const getLanguageDisplay = (lang: string) => {
    const languages = {
      english: "English",
      hindi: "हिंदी (Hindi)",
      odia: "ଓଡ଼ିଆ (Odia)",
    }
    return languages[lang as keyof typeof languages] || "English"
  }

  const getUserLevel = () => {
    const totalStars = user?.stars || 0
    if (totalStars < 50) return { level: 1, title: "Space Rookie" }
    if (totalStars < 100) return { level: 2, title: "Cosmic Explorer" }
    if (totalStars < 200) return { level: 3, title: "Space Cadet" }
    if (totalStars < 500) return { level: 4, title: "Galaxy Guardian" }
    return { level: 5, title: "Universe Master" }
  }

  const { level, title } = getUserLevel()

  const handleUserUpdate = (updatedUser: any) => {
    if (onUserUpdate) {
      onUserUpdate(updatedUser)
    }
  }

  const handleLanguageChange = (language: string) => {
    if (onLanguageChange) {
      onLanguageChange(language)
    }
  }

  return (
    <div className="p-4 space-y-6">
      <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16 border-2 border-primary/20">
              <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-xl font-bold">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-1">
              <h2 className="text-xl font-bold text-foreground">{user?.name || "Space Explorer"}</h2>
              <p className="text-sm text-muted-foreground">
                Level {level} • {title}
              </p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-accent" />
                  <span>{user?.stars || 0} Stars</span>
                </div>
                <div className="flex items-center gap-1">
                  <Coins className="w-4 h-4 text-yellow-500" />
                  <span>{user?.coins || 100} Coins</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-3">
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4 text-center">
            <Trophy className="w-6 h-6 mx-auto mb-2 text-accent" />
            <p className="text-lg font-bold text-foreground">{user?.badges?.length || 3}</p>
            <p className="text-xs text-muted-foreground">Badges</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4 text-center">
            <Crown className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
            <p className="text-lg font-bold text-foreground">5</p>
            <p className="text-xs text-muted-foreground">Day Streak</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4 text-center">
            <User className="w-6 h-6 mx-auto mb-2 text-primary" />
            <p className="text-lg font-bold text-foreground">{level}</p>
            <p className="text-xs text-muted-foreground">Level</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            Account Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Phone Number</span>
            <span className="text-sm font-medium">{user?.phoneNumber || "+91 98765 43210"}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Age</span>
            <span className="text-sm font-medium">{user?.age || 12} years</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Grade</span>
            <span className="text-sm font-medium">Class {user?.grade || 7}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Language
            </span>
            <span className="text-sm font-medium">{getLanguageDisplay(user?.language)}</span>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-accent" />
            Customize Avatar
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {customizationItems.slice(0, 4).map((item) => (
              <div
                key={item.id}
                className={`p-3 rounded-lg border text-center space-y-2 ${
                  item.owned ? "bg-primary/5 border-primary/20" : "bg-muted/20 border-muted/20"
                }`}
              >
                <div className="text-2xl">
                  {item.type === "helmet" && "⛑️"}
                  {item.type === "outfit" && "👕"}
                  {item.type === "badge" && "🏅"}
                </div>
                <p className="text-xs font-medium">{item.name}</p>
                {item.owned ? (
                  <Badge className="bg-green-500/10 text-green-600 border-green-500/20 text-xs">Owned</Badge>
                ) : (
                  <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                    <Coins className="w-3 h-3" />
                    <span>{item.cost}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <Button variant="outline" className="w-full border-primary/20 hover:bg-primary/10 bg-transparent">
            <Palette className="w-4 h-4 mr-2" />
            View All Items
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            {t("settings")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start border-border/50 hover:bg-muted/50 bg-transparent">
            <Volume2 className="w-4 h-4 mr-2" />
            {t("soundVoiceSettings")}
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start border-border/50 hover:bg-muted/50 bg-transparent"
            onClick={() => setShowLanguageSelector(true)}
          >
            <Globe className="w-4 h-4 mr-2" />
            {t("changeLanguage")}
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start border-border/50 hover:bg-muted/50 bg-transparent"
            onClick={toggleTheme}
          >
            {theme === "light" ? <Moon className="w-4 h-4 mr-2" /> : <Sun className="w-4 h-4 mr-2" />}
            {theme === "light" ? t("darkMode") : t("lightMode")}
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start border-border/50 hover:bg-muted/50 bg-transparent"
            onClick={() => setShowEditProfile(true)}
          >
            <User className="w-4 h-4 mr-2" />
            {t("editProfile")}
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start border-border/50 hover:bg-muted/50 bg-transparent"
            onClick={() => setShowTechStack(true)}
          >
            <Code className="w-4 h-4 mr-2" />
            Tech Stack
          </Button>
        </CardContent>
      </Card>

      <Button onClick={onLogout} variant="destructive" className="w-full">
        <LogOut className="w-4 h-4 mr-2" />
        {t("logout")}
      </Button>

      {showLanguageSelector && (
        <LanguageSelector
          currentLanguage={user?.language || "english"}
          onLanguageChange={handleLanguageChange}
          onClose={() => setShowLanguageSelector(false)}
        />
      )}

      {showEditProfile && (
        <EditProfileModal user={user} onSave={handleUserUpdate} onClose={() => setShowEditProfile(false)} />
      )}

      {showTechStack && <TechStackModal onClose={() => setShowTechStack(false)} />}
    </div>
  )
}
