"use client"

import { useState } from "react"
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
  CheckCircle,
  Edit,
} from "lucide-react"

// ============================
// MOCK HOOKS & MODALS
// ============================

const useTheme = () => {
  const [theme, setTheme] = useState("dark")
  const toggleTheme = () => setTheme(prev => (prev === "light" ? "dark" : "light"))
  return { theme, toggleTheme }
}

const useTranslation = () => {
  const t = (key: string, fallback?: string) => fallback || key.split(/(?=[A-Z])/).join(" ")
  return { t }
}

const LanguageSelector = ({ currentLanguage, onLanguageChange, onClose }: { currentLanguage: string, onLanguageChange: (lang: string) => void, onClose: () => void }) => {
  const { t } = useTranslation()
  const [selectedLang, setSelectedLang] = useState(currentLanguage)
  const languages = [
    { key: "english", name: "English" },
    { key: "hindi", name: "हिंदी (Hindi)" },
    { key: "odia", name: "ଓଡ଼ିଆ (Odia)" },
  ]
  const handleSave = () => {
    if (selectedLang !== currentLanguage) onLanguageChange(selectedLang)
    onClose()
  }
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <Card className="w-full max-w-sm">
        <CardHeader><CardTitle>{t("changeLanguage", "Change Language")}</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {languages.map(lang => (
            <Button
              key={lang.key}
              variant={selectedLang === lang.key ? "default" : "outline"}
              onClick={() => setSelectedLang(lang.key)}
              className="w-full justify-start"
            >
              <Globe className="w-4 h-4 mr-2" />
              {lang.name}
            </Button>
          ))}
          <div className="flex gap-2 pt-2">
            <Button variant="outline" onClick={onClose} className="flex-1">{t("cancel", "Cancel")}</Button>
            <Button onClick={handleSave} className="flex-1 bg-accent hover:bg-accent/90">{t("save", "Save")}</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const EditProfileModal = ({ user, onSave, onClose }: { user: any, onSave: (user: any) => void, onClose: () => void }) => {
  const { t } = useTranslation()
  const handleSave = () => {
    const newName = prompt(t("enterNewName", "Enter new name:"), user.name)
    if (newName) onSave({ ...user, name: newName })
    onClose()
  }
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <Card className="w-full max-w-md">
        <CardHeader><CardTitle>{t("editProfile", "Edit Profile")}</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">{t("simulatedEdit", "Simulated: Click save to change name via prompt.")}</p>
          <div className="flex gap-2 pt-2">
            <Button variant="outline" onClick={onClose} className="flex-1">{t("cancel", "Cancel")}</Button>
            <Button onClick={handleSave} className="flex-1 bg-accent hover:bg-accent/90">{t("save", "Save Changes")}</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const TechStackModal = ({ onClose }: { onClose: () => void }) => {
  const { t } = useTranslation()
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <Card className="w-full max-w-md">
        <CardHeader><CardTitle>{t("techStack", "Tech Stack")}</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <p className="font-semibold text-primary">Frontend Spacecraft:</p>
          <ul className="list-disc list-inside text-sm text-muted-foreground ml-4 space-y-1">
            <li>React (Next.js) - The Engine</li>
            <li>TypeScript - Galactic Typing System</li>
            <li>Tailwind CSS / shadcn/ui - Asteroid Field Styling</li>
          </ul>
          <Button variant="outline" onClick={onClose} className="w-full mt-4">{t("close", "Close")}</Button>
        </CardContent>
      </Card>
    </div>
  )
}

// ============================
// MAIN PROFILE COMPONENT
// ============================

interface CustomizationItem {
  id: string
  name: string
  type: string
  cost: number
  owned: boolean
  equipped?: boolean
}

interface ProfileProps {
  user: any
  onLogout: () => void
  onUserUpdate?: (user: any) => void
  onLanguageChange?: (language: string) => void
}

export function Profile({ user, onLogout, onUserUpdate, onLanguageChange }: ProfileProps) {
  const { t } = useTranslation()
  const { theme, toggleTheme } = useTheme()
  const [showLanguageSelector, setShowLanguageSelector] = useState(false)
  const [showEditProfile, setShowEditProfile] = useState(false)
  const [showTechStack, setShowTechStack] = useState(false)
  const [customItems, setCustomItems] = useState<CustomizationItem[]>([
    { id: "helmet-1", name: "Space Helmet", type: "helmet", cost: 100, owned: true, equipped: true },
    { id: "helmet-2", name: "Galaxy Helmet", type: "helmet", cost: 200, owned: false },
    { id: "outfit-1", name: "Astronaut Suit", type: "outfit", cost: 150, owned: true, equipped: false },
    { id: "outfit-2", name: "Cosmic Explorer", type: "outfit", cost: 300, owned: false },
    { id: "badge-1", name: "Star Badge", type: "badge", cost: 50, owned: true, equipped: true },
    { id: "badge-2", name: "Rocket Badge", type: "badge", cost: 75, owned: false },
  ])

  const languageMap: Record<string, string> = {
    english: "English",
    hindi: "हिंदी (Hindi)",
    odia: "ଓଡ଼ିଆ (Odia)",
  }
  const getLanguageDisplay = (lang: string) => languageMap[lang] || "English"

  const getUserLevel = () => {
    const totalStars = user?.stars || 0
    if (totalStars < 50) return { level: 1, title: t("SpaceRookie", "Space Rookie") }
    if (totalStars < 100) return { level: 2, title: t("CosmicExplorer", "Cosmic Explorer") }
    if (totalStars < 200) return { level: 3, title: t("SpaceCadet", "Space Cadet") }
    if (totalStars < 500) return { level: 4, title: t("GalaxyGuardian", "Galaxy Guardian") }
    return { level: 5, title: t("UniverseMaster", "Universe Master") }
  }

  const { level, title } = getUserLevel()

  const handleUserUpdate = (updatedUser: any) => {
    if (onUserUpdate) onUserUpdate(updatedUser)
    setShowEditProfile(false)
  }

  const handleLanguageChange = (language: string) => {
    if (onLanguageChange) onLanguageChange(language)
    setShowLanguageSelector(false)
  }

  const handleItemAction = (itemId: string) => {
    setCustomItems(prevItems => prevItems.map(item => {
      if (item.id === itemId) {
        if (item.owned) return { ...item, equipped: !item.equipped }
        if ((user?.coins || 0) >= item.cost) {
          if (onUserUpdate) onUserUpdate({ ...user, coins: (user?.coins || 0) - item.cost })
          return { ...item, owned: true, equipped: true }
        } else {
          alert(`Error: Insufficient coins to buy ${item.name}.`)
          return item
        }
      }
      if (item.type === prevItems.find(i => i.id === itemId)?.type && item.id !== itemId) return { ...item, equipped: false }
      return item
    }))
  }

  const CustomizationItemDisplay = ({ item }: { item: CustomizationItem }) => {
    const isEquipped = item.owned && item.equipped
    return (
      <div key={item.id} className={`p-3 rounded-lg border text-center space-y-2 relative ${item.owned ? "bg-primary/5 border-primary/30" : "bg-muted/20 border-muted/20"}`}>
        {isEquipped && <CheckCircle className="absolute top-1 right-1 w-4 h-4 text-green-500 fill-green-500/10" />}
        <div className="text-2xl">{item.type === "helmet" ? "⛑️" : item.type === "outfit" ? "👕" : "🏅"}</div>
        <p className="text-xs font-semibold">{item.name}</p>
        <Button size="sm" className={`w-full text-xs font-bold h-7 ${item.owned ? (isEquipped ? "bg-green-600 hover:bg-green-700" : "bg-accent/80 hover:bg-accent") : "bg-yellow-500 hover:bg-yellow-600"}`} onClick={() => handleItemAction(item.id)}>
          {item.owned ? (isEquipped ? t("equipped", "EQUIPPED") : t("equip", "EQUIP")) : <><Coins className="w-3 h-3 mr-1" />{t("buy", "BUY")} {item.cost}</>}
        </Button>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto space-y-8">
      {/* Profile Header */}
      <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20 shadow-xl">
        <CardContent className="p-6 flex flex-col sm:flex-row items-center gap-6">
          <div className="relative shrink-0">
            <Avatar className="w-24 h-24 border-4 border-primary/50 shadow-md">
              <AvatarFallback className="w-full h-full bg-gradient-to-br from-primary to-secondary text-white text-3xl font-extrabold">{user?.name?.charAt(0)?.toUpperCase() || "U"}</AvatarFallback>
            </Avatar>
            <Button variant="secondary" size="icon" className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-accent hover:bg-accent/90 shadow-md" onClick={() => setShowEditProfile(true)}>
              <Edit className="w-4 h-4 text-white" />
            </Button>
          </div>
          <div className="flex-1 space-y-1 text-center sm:text-left">
            <h2 className="text-2xl font-extrabold text-foreground">{user?.name || t("SpaceExplorer", "Space Explorer")}</h2>
            <p className="text-sm text-muted-foreground font-semibold">Level {level} • {title}</p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-2 text-sm pt-2">
              <div className="flex items-center gap-1 font-medium text-foreground"><Star className="w-4 h-4 text-accent fill-accent/30" />{user?.stars || 0} {t("Stars")}</div>
              <div className="flex items-center gap-1 font-medium text-foreground"><Coins className="w-4 h-4 text-yellow-500 fill-yellow-500/30" />{user?.coins || 100} {t("Coins")}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customization Grid */}
      <Card className="bg-card/70 backdrop-blur-sm border-border/50 shadow-md">
        <CardHeader className="flex items-center gap-2 text-lg"><Palette className="w-5 h-5 text-accent" />{t("customizeAvatar", "Customize Avatar")}</CardHeader>
        <CardContent className="space-y-4 grid grid-cols-2 gap-3">{customItems.map(item => <CustomizationItemDisplay key={item.id} item={item} />)}</CardContent>
      </Card>

      {/* Settings */}
      <Card className="bg-card/70 backdrop-blur-sm border-border/50 shadow-md">
        <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Settings className="w-5 h-5 text-primary" />{t("settings")}</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start border-border/50 hover:bg-muted/50 bg-transparent"><Volume2 className="w-4 h-4 mr-2" />{t("soundVoiceSettings", "Sound & Voice Settings")}</Button>
          <Button variant="outline" className="w-full justify-start border-border/50 hover:bg-muted/50 bg-transparent" onClick={() => setShowLanguageSelector(true)}><Globe className="w-4 h-4 mr-2" />{t("changeLanguage", "Change Language")}</Button>
          <Button variant="outline" className="w-full justify-start border-border/50 hover:bg-muted/50 bg-transparent" onClick={toggleTheme}>{theme === "light" ? <Moon className="w-4 h-4 mr-2" /> : <Sun className="w-4 h-4 mr-2" />}{theme === "light" ? t("darkMode", "Dark Mode") : t("lightMode", "Light Mode")}</Button>
          <Button variant="outline" className="w-full justify-start border-border/50 hover:bg-muted/50 bg-transparent" onClick={() => setShowTechStack(true)}><Code className="w-4 h-4 mr-2" />{t("techStack", "Tech Stack")}</Button>
        </CardContent>
      </Card>

      <Button onClick={onLogout} variant="destructive" className="w-full h-10 font-bold shadow-md hover:shadow-lg"><LogOut className="w-4 h-4 mr-2" />{t("logout", "Log Out of Space Station")}</Button>

      {showLanguageSelector && <LanguageSelector currentLanguage={user?.language || "english"} onLanguageChange={handleLanguageChange} onClose={() => setShowLanguageSelector(false)} />}
      {showEditProfile && <EditProfileModal user={user} onSave={handleUserUpdate} onClose={() => setShowEditProfile(false)} />}
      {showTechStack && <TechStackModal onClose={() => setShowTechStack(false)} />}
    </div>
  )
}
