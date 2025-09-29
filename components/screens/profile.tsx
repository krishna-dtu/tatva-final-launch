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
  CheckCircle,
  Edit,
} from "lucide-react"
<<<<<<< HEAD
import { useState } from "react" 

// =========================================================================
// FIX/MOCK: External Dependencies (Ensures runnability in the environment)
// =========================================================================

// Mock Theme Hook
const useTheme = () => {
    const [theme, setTheme] = useState("dark");
    const toggleTheme = () => {
        setTheme((prev) => {
            const newTheme = prev === "light" ? "dark" : "light";
            console.log(`ACTION: Theme toggled to: ${newTheme}`);
            return newTheme;
        });
    };
    return { theme, toggleTheme };
};

// Mock Translation Hook
const useTranslation = () => {
    // Basic mock implementation for t(key, fallback)
    const t = (key: string, fallback?: string) => fallback || key.split(/(?=[A-Z])/).join(" ");
    return { t };
};

// Mock Language Selector Modal
const LanguageSelector = ({ currentLanguage, onLanguageChange, onClose }: { currentLanguage: string, onLanguageChange: (lang: string) => void, onClose: () => void }) => {
    const { t } = useTranslation();
    const [selectedLang, setSelectedLang] = useState(currentLanguage);

    const languages = [
        { key: "english", name: "English" },
        { key: "hindi", name: "हिंदी (Hindi)" },
        { key: "odia", name: "ଓଡ଼ିଆ (Odia)" },
    ];

    const handleSave = () => {
        if (selectedLang !== currentLanguage) {
            onLanguageChange(selectedLang);
        }
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <Card className="w-full max-w-sm">
                <CardHeader><CardTitle>{t("changeLanguage", "Change Language")}</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    {languages.map((lang) => (
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
    );
};

// Mock Edit Profile Modal
const EditProfileModal = ({ user, onSave, onClose }: { user: any, onSave: (user: any) => void, onClose: () => void }) => {
    const { t } = useTranslation();
    // Simplified mock
    const handleSave = () => {
        const newName = prompt(t("enterNewName", "Enter new name:"), user.name);
        if (newName) {
            onSave({ ...user, name: newName });
            console.log(`ACTION: Profile name updated to ${newName}`);
        }
        onClose();
    };
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
    );
};

// Mock Tech Stack Modal
const TechStackModal = ({ onClose }: { onClose: () => void }) => {
    const { t } = useTranslation();
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
    );
};

// =========================================================================
// PROFILE COMPONENT LOGIC
// =========================================================================

interface CustomizationItem {
    id: string;
    name: string;
    type: string;
    cost: number;
    owned: boolean;
    equipped?: boolean; 
}
=======
import { useTheme } from "@/hooks/use-theme"
import { LanguageSelector } from "@/components/ui/language-selector"
import { EditProfileModal } from "@/components/ui/edit-profile-modal"
import { TechStackModal } from "@/components/ui/tech-stack-modal"
import { useEffect, useState } from "react"
import { useTranslation } from "@/hooks/use-translation"
>>>>>>> 94298f352861454ace6a4584aae35435908b391d

interface ProfileProps {
  user: any
  onLogout: () => void
  onUserUpdate?: (user: any) => void
  onLanguageChange?: (language: string) => void
}

const customizationItemsMock: CustomizationItem[] = [
  { id: "helmet-1", name: "Space Helmet", type: "helmet", cost: 100, owned: true, equipped: true },
  { id: "helmet-2", name: "Galaxy Helmet", type: "helmet", cost: 200, owned: false },
  { id: "outfit-1", name: "Astronaut Suit", type: "outfit", cost: 150, owned: true, equipped: false },
  { id: "outfit-2", name: "Cosmic Explorer", type: "outfit", cost: 300, owned: false },
  { id: "badge-1", name: "Star Badge", type: "badge", cost: 50, owned: true, equipped: true },
  { id: "badge-2", name: "Rocket Badge", type: "badge", cost: 75, owned: false },
]

export function Profile({ user, onLogout, onUserUpdate, onLanguageChange }: ProfileProps) {
  const { t } = useTranslation()
  const { theme, toggleTheme } = useTheme()
  const [showLanguageSelector, setShowLanguageSelector] = useState(false)
  const [showEditProfile, setShowEditProfile] = useState(false)
  const [showTechStack, setShowTechStack] = useState(false)
  const [customItems, setCustomItems] = useState<CustomizationItem[]>(customizationItemsMock);

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
    if (totalStars < 50) return { level: 1, title: t("SpaceRookie", "Space Rookie") }
    if (totalStars < 100) return { level: 2, title: t("CosmicExplorer", "Cosmic Explorer") }
    if (totalStars < 200) return { level: 3, title: t("SpaceCadet", "Space Cadet") }
    if (totalStars < 500) return { level: 4, title: t("GalaxyGuardian", "Galaxy Guardian") }
    return { level: 5, title: t("UniverseMaster", "Universe Master") }
  }

  const { level, title } = getUserLevel()
  

  const handleUserUpdate = (updatedUser: any) => {
    if (onUserUpdate) {
      onUserUpdate(updatedUser)
    }
    // Note: Do not rely on local state update here. Assumed parent re-renders profile after update.
    setShowEditProfile(false);
  }

  const handleLanguageChange = (language: string) => {
    if (onLanguageChange) {
      onLanguageChange(language)
    }
    setShowLanguageSelector(false);
  }
  
  const handleItemAction = (itemId: string) => {
      setCustomItems(prevItems => prevItems.map(item => {
          if (item.id === itemId) {
              if (item.owned) {
                  // Equip/Unequip logic
                  console.log(`ACTION: Item ${item.name} toggled equipped status.`);
                  return { ...item, equipped: !item.equipped };
              } else {
                  // Buy logic (Simulated)
                  if ((user?.coins || 0) >= item.cost) {
                      console.log(`ACTION: Successfully bought item ${item.name} for ${item.cost} coins.`);
                      // In a real app, update user coins and call API
                      // We simulate updating the user object passed down via props
                      if (onUserUpdate) {
                          onUserUpdate({ ...user, coins: (user?.coins || 0) - item.cost });
                      }
                      return { ...item, owned: true, equipped: true };
                  } else {
                      // Simulating failure notification
                      alert(`Error: Insufficient coins. You need ${item.cost} coins to buy ${item.name}.`); 
                      console.error(`ACTION: Insufficient coins to buy ${item.name}.`);
                      return item; 
                  }
              }
          }
          // Ensure only one item of a type is equipped at a time (simplified)
          if (item.type === prevItems.find(i => i.id === itemId)?.type && item.id !== itemId) {
              return { ...item, equipped: false };
          }
          return item;
      }));
  };
  
  const CustomizationItemDisplay = ({ item }: { item: CustomizationItem }) => {
      const isEquipped = item.owned && item.equipped;

      return (
          <div
              key={item.id}
              className={`p-3 rounded-lg border text-center space-y-2 relative transition-all duration-200 hover:shadow-lg ${
                  item.owned ? "bg-primary/5 border-primary/30" : "bg-muted/20 border-muted/20"
              }`}
          >
              {isEquipped && (
                  <CheckCircle className="absolute top-1 right-1 w-4 h-4 text-green-500 fill-green-500/10" />
              )}
              <div className="text-2xl">
                  {item.type === "helmet" && "⛑️"}
                  {item.type === "outfit" && "👕"}
                  {item.type === "badge" && "🏅"}
              </div>
              <p className="text-xs font-semibold">{item.name}</p>
              
        <Button
          size="sm"
          className={`w-full text-xs font-bold h-7 ${item.owned 
            ? (isEquipped ? "bg-green-600 hover:bg-green-700" : "bg-accent/80 hover:bg-accent")
            : "bg-yellow-500 hover:bg-yellow-600"
          }`}
          onClick={() => handleItemAction(item.id)}
        >
                  {item.owned ? (isEquipped ? t("equipped", "EQUIPPED") : t("equip", "EQUIP")) : (
                      <>
                          <Coins className="w-3 h-3 mr-1" />
                          <span>{t("buy", "BUY")} {item.cost}</span>
                      </>
                  )}
              </Button>
          </div>
      );
  };

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto space-y-8">
      
      {/* HEADER & OVERVIEW */}
      <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20 shadow-xl">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative shrink-0">
                <Avatar className="w-24 h-24 border-4 border-primary/50 shadow-md">
                    <AvatarFallback className="w-full h-full bg-gradient-to-br from-primary to-secondary text-white text-3xl font-extrabold">
                        {user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </AvatarFallback>
                </Avatar>
                {/* Edit Button overlay */}
                <Button 
                    variant="secondary" 
                    size="icon" 
                    className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-accent hover:bg-accent/90 shadow-md"
                    onClick={() => setShowEditProfile(true)}
                >
                    <Edit className="w-4 h-4 text-white" />
                </Button>
            </div>

<<<<<<< HEAD
            <div className="flex-1 space-y-1 text-center sm:text-left">
              <h2 className="text-2xl font-extrabold text-foreground">{user?.name || t("SpaceExplorer", "Space Explorer")}</h2>
              <p className="text-sm text-muted-foreground font-semibold">
                {t("level")} {level} • {title}
=======
            <div className="flex-1 space-y-1">
              <h2 className="text-xl font-bold text-foreground">{user?.name || "Space Explorer"}</h2>
              <p className="text-sm text-muted-foreground">
                Level {1} • {title}
>>>>>>> 94298f352861454ace6a4584aae35435908b391d
              </p>
              
              {/* Rewards Summary */}
              <div className="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-2 text-sm pt-2">
                <div className="flex items-center gap-1 font-medium text-foreground">
                  <Star className="w-4 h-4 text-accent fill-accent/30" />
                  <span>{user?.stars || 0} {t("Stars")}</span>
                </div>
                <div className="flex items-center gap-1 font-medium text-foreground">
                  <Coins className="w-4 h-4 text-yellow-500 fill-yellow-500/30" />
                  <span>{user?.coins || 100} {t("Coins")}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* STATS & QUICK INFO */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-card/70 backdrop-blur-sm border-border/50 shadow-sm">
          <CardContent className="p-4 text-center">
            <Trophy className="w-6 h-6 mx-auto mb-2 text-accent" />
<<<<<<< HEAD
            <p className="text-xl font-bold text-foreground">{user?.badges?.length || 3}</p>
            <p className="text-xs text-muted-foreground">{t("badges")}</p>
=======
            <p className="text-lg font-bold text-foreground">{user?.badges?.length || 0}</p>
            <p className="text-xs text-muted-foreground">Badges</p>
>>>>>>> 94298f352861454ace6a4584aae35435908b391d
          </CardContent>
        </Card>

        <Card className="bg-card/70 backdrop-blur-sm border-border/50 shadow-sm">
          <CardContent className="p-4 text-center">
            <Crown className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
<<<<<<< HEAD
            <p className="text-xl font-bold text-foreground">5</p>
            <p className="text-xs text-muted-foreground">{t("dayStreak", "Day Streak")}</p>
=======
            <p className="text-lg font-bold text-foreground">1</p>
            <p className="text-xs text-muted-foreground">Day Streak</p>
>>>>>>> 94298f352861454ace6a4584aae35435908b391d
          </CardContent>
        </Card>

        <Card className="bg-card/70 backdrop-blur-sm border-border/50 shadow-sm">
          <CardContent className="p-4 text-center">
            <User className="w-6 h-6 mx-auto mb-2 text-primary" />
<<<<<<< HEAD
            <p className="text-xl font-bold text-foreground">{level}</p>
            <p className="text-xs text-muted-foreground">{t("level")}</p>
=======
            <p className="text-lg font-bold text-foreground">{1}</p>
            <p className="text-xs text-muted-foreground">Level</p>
>>>>>>> 94298f352861454ace6a4584aae35435908b391d
          </CardContent>
        </Card>
      </div>

<<<<<<< HEAD
      {/* ACCOUNT & CUSTOMIZATION GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* ACCOUNT INFORMATION */}
          <Card className="bg-card/70 backdrop-blur-sm border-border/50 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Settings className="w-5 h-5 text-primary" />
                {t("accountInformation", "Account Information")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: t("phoneNumber", "Phone Number"), value: user?.phoneNumber || "+91 98765 43210" },
                { label: t("age", "Age"), value: `${user?.age || 12} ${t("years")}` },
                { label: t("grade", "Grade"), value: `${t("class")} ${user?.grade || 7}` },
                { label: t("language", "Language"), value: getLanguageDisplay(user?.language || 'english'), icon: Globe },
              ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center pb-1 border-b border-border/30 last:border-b-0">
                    <span className="text-sm text-muted-foreground flex items-center gap-2">
                        {item.icon && <item.icon className="w-4 h-4" />}
                        {item.label}
                    </span>
                    <span className="text-sm font-medium text-foreground">{item.value}</span>
=======
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
            <span className="text-sm font-medium">{user?.phoneNumber || user?.phone_no}</span>
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
>>>>>>> 94298f352861454ace6a4584aae35435908b391d
                  </div>
              ))}
            </CardContent>
          </Card>

          {/* CUSTOMIZATION ITEMS */}
          <Card className="bg-card/70 backdrop-blur-sm border-border/50 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Palette className="w-5 h-5 text-accent" />
                {t("customizeAvatar", "Customize Avatar")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {customItems.slice(0, 4).map((item) => (
                  <CustomizationItemDisplay key={item.id} item={item} />
                ))}
              </div>

              <Button variant="outline" className="w-full border-primary/20 hover:bg-primary/10 bg-transparent shadow-sm">
                <Palette className="w-4 h-4 mr-2" />
                {t("viewAllItems", "View All Items (Shop)")}
              </Button>
            </CardContent>
          </Card>
      </div>


      {/* SETTINGS MENU */}
      <Card className="bg-card/70 backdrop-blur-sm border-border/50 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Settings className="w-5 h-5 text-primary" />
            {t("settings")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          
          <Button variant="outline" className="w-full justify-start border-border/50 hover:bg-muted/50 bg-transparent">
            <Volume2 className="w-4 h-4 mr-2" />
            {t("soundVoiceSettings", "Sound & Voice Settings")}
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start border-border/50 hover:bg-muted/50 bg-transparent"
            onClick={() => setShowLanguageSelector(true)}
          >
            <Globe className="w-4 h-4 mr-2" />
            {t("changeLanguage", "Change Language")}
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start border-border/50 hover:bg-muted/50 bg-transparent"
            onClick={toggleTheme}
          >
            {theme === "light" ? <Moon className="w-4 h-4 mr-2" /> : <Sun className="w-4 h-4 mr-2" />}
            {theme === "light" ? t("darkMode", "Dark Mode") : t("lightMode", "Light Mode")}
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start border-border/50 hover:bg-muted/50 bg-transparent"
            onClick={() => setShowTechStack(true)}
          >
            <Code className="w-4 h-4 mr-2" />
            {t("techStack", "Tech Stack")}
          </Button>
        </CardContent>
      </Card>

      {/* LOGOUT */}
      <Button onClick={onLogout} variant="destructive" className="w-full h-10 font-bold shadow-md hover:shadow-lg">
        <LogOut className="w-4 h-4 mr-2" />
        {t("logout", "Log Out of Space Station")}
      </Button>

      {/* MODALS (Rendered conditionally) */}
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
