"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress as ProgressBar } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Target, Calendar, TrendingUp, Award, DollarSign, Star, Zap } from "lucide-react"

// Mock useTranslation to avoid compilation errors
const useTranslation = () => {
  const t = (key: string, fallback?: string) => fallback || key.split(/(?=[A-Z])/).join(" ")
  return { t }
}

interface ProgressProps {
  user: {
    name: string;
    stars: number;
    coins: number;
    phone_no?: string;
    phoneNumber?: string;
    progress?: any;
  }
}

// --- Static Data ---
const MOCK_ACHIEVEMENTS = [
  { id: "first-mission", title: "First Mission Complete", description: "Completed your first learning mission", icon: "🚀", earned: true, date: "2024-01-15" },
  { id: "math-explorer", title: "Math Explorer", description: "Completed 5 math chapters", icon: "🔢", earned: true, date: "2024-01-18" },
  { id: "reading-master", title: "Reading Master", description: "Read for 100 minutes total", icon: "📚", earned: true, date: "2024-01-20" },
  { id: "streak-keeper", title: "Streak Keeper", description: "Login for 7 consecutive days", icon: "🔥", earned: false, progress: 0, total: 7 },
  { id: "star-collector", title: "Star Collector", description: "Earn 100 stars", icon: "⭐", earned: false, progress: 0, total: 100 },
]

const MOCK_WEEKLY_STATS = [
  { label: "Lessons Completed", value: 12, change: "+3", trend: "up", icon: Zap },
  { label: "Stars Earned", value: 45, change: "+8", trend: "up", icon: Star },
  { label: "Time Spent", value: "2h 30m", change: "+45m", trend: "up", icon: Calendar },
  { label: "Streak Days", value: 5, change: "+2", trend: "up", icon: Trophy },
]

const MOCK_NEXT_LESSON = { title: "Algebraic Expressions", subject: "Mathematics", chapter: 3, time: "25 min" }

export function Progress({ user }: ProgressProps) {
  const { t } = useTranslation()
  const [SubjectProgress, setSubjectProgress] = useState({ "M_Q": 0, "S_Q": 0, "E_Q": 0 })

  useEffect(() => {
    fetch('https://tatvab.onrender.com/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone_no: user?.phone_no || user?.phoneNumber }),
    })
      .then(res => res.ok ? res.json() : Promise.reject("Network error"))
      .then(data => {
        setSubjectProgress({ "M_Q": data.M_Q || 0, "S_Q": data.S_Q || 0, "E_Q": data.E_Q || 0 })
      })
      .catch(console.error)
  }, [user])

  const handleNextLesson = () => console.log("Navigating to next lesson:", MOCK_NEXT_LESSON.title)
  const handleShopNavigation = () => console.log("Navigating to Rewards Shop. Coins:", user.coins)
  const getTrendColor = (trend: 'up' | 'down') =>
    trend === 'up' ? 'bg-green-500/10 text-green-600 border-green-500/20' : 'bg-red-500/10 text-red-600 border-red-600/20'

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-8">

      {/* HEADER */}
      <div className="text-center space-y-1">
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {t("welcomeBack", "Welcome back,")} {user.name || "Cadet"}!
        </h1>
        <p className="text-lg text-muted-foreground">{t("progressHub", "Your Progress Hub")} ✨</p>
      </div>

      {/* REWARDS & NEXT LESSON */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Rewards */}
        <Card className="col-span-1 lg:col-span-1 bg-card/70 backdrop-blur-md border-primary/20 shadow-lg">
          <CardHeader className="p-4 flex justify-between">
            <CardTitle className="text-sm font-medium text-primary">{t("currentRewards", "Rewards")}</CardTitle>
            <Star className="h-5 w-5 text-yellow-500" />
          </CardHeader>
          <CardContent className="p-4 pt-0 space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-400" />
                <span className="text-2xl font-bold">{user.stars}</span>
              </div>
              <p className="text-sm text-muted-foreground">{t("totalStars", "Total Stars")}</p>
            </div>
            <Button onClick={handleShopNavigation} className="w-full bg-accent hover:bg-accent/90 text-white font-semibold transition-transform duration-200 hover:scale-[1.02]">
              <DollarSign className="w-4 h-4 mr-2" />
              {user.coins} {t("coins", "Coins")} - {t("visitShop", "Shop")}
            </Button>
          </CardContent>
        </Card>

        {/* Next Lesson */}
        <Card className="col-span-1 lg:col-span-2 bg-gradient-to-r from-secondary/20 to-accent/20 border-accent/40 shadow-xl p-0 overflow-hidden">
          <div className="flex flex-col md:flex-row h-full">
            <div className="p-6 flex-1 space-y-2">
              <p className="text-sm font-semibold text-accent uppercase">{t("nextUp", "Next Mission")}</p>
              <CardTitle className="text-2xl font-bold">{MOCK_NEXT_LESSON.title}</CardTitle>
              <CardDescription className="text-base">
                {t("continueYourJourney", "Continue your journey in")} 
                <Badge variant="secondary" className="ml-2 bg-primary/10 text-primary border-primary/20">{MOCK_NEXT_LESSON.subject}</Badge>
              </CardDescription>
            </div>
            <div className="p-6 md:w-48 flex items-center justify-center bg-accent/10">
              <Button onClick={handleNextLesson} className="w-full bg-accent hover:bg-accent/90 text-white font-bold h-12 text-lg shadow-lg shadow-accent/30 transition-all duration-300 hover:translate-y-[-2px]">
                {t("startLesson", "Start Lesson")}
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* OVERALL PROGRESS */}
      <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            {t("overallProgressTitle", "Overall Mastery")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <div className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{t("level")} 1</div>
          <p className="text-sm text-muted-foreground font-semibold">{t("spaceCadet", "Space Cadet")}</p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{t("progressToLevel2")}</span>
              <span>10/1000 XP</span>
            </div>
            <ProgressBar value={0} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* WEEKLY STATS */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-accent" />
            {t("thisWeek", "This Week")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {MOCK_WEEKLY_STATS.map((stat, i) => {
              const StatIcon = stat.icon
              return (
                <div key={i} className="space-y-1 p-2 rounded-lg hover:bg-muted/30 transition-colors">
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <StatIcon className="w-4 h-4 text-primary/80" />
                    {t(stat.label.replace(/\s/g, ''), stat.label)}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-foreground">{stat.value}</span>
                    <Badge className={`text-xs ${getTrendColor(stat.trend as 'up' | 'down')}`}>{stat.change}</Badge>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* SUBJECT PROGRESS */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            {t("subjectProgress", "Subject Mastery")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { label: "Mathematics", icon: "🔢", value: SubjectProgress.M_Q },
            { label: "Science", icon: "🧪", value: SubjectProgress.S_Q },
            { label: "English", icon: "📚", value: SubjectProgress.E_Q },
          ].map((subj) => (
            <div key={subj.label} className="space-y-2">
              <div className="flex justify-between text-sm font-semibold">
                <span className="flex items-center gap-2">{subj.icon}{t(subj.label.toLowerCase(), subj.label)}</span>
                <span className="text-primary font-bold">{subj.value * 10}%</span>
              </div>
              <ProgressBar value={subj.value * 10} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* ACHIEVEMENTS */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-accent" />
              {t("achievements", "Achievements")}
            </div>
            <Button variant="ghost" size="sm" className="text-xs text-primary hover:bg-primary/10" onClick={() => console.log("Navigate to all achievements")}>
              {t("viewAll", "View All")}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {MOCK_ACHIEVEMENTS.map((ach) => {
            const progressValue = ach.progress && ach.total ? (ach.progress / ach.total) * 100 : 0
            return (
              <div key={ach.id} className={`flex items-center gap-3 p-3 rounded-xl transition-shadow duration-300 ${ach.earned ? "bg-primary/5 border border-primary/20 shadow-inner" : "bg-muted/20 border border-muted/20 hover:shadow-md"}`}>
                <div className={`text-3xl ${!ach.earned && "grayscale opacity-50"}`}>{ach.icon}</div>
                <div className="flex-1 space-y-1">
                  <h4 className={`font-semibold ${ach.earned ? "text-foreground" : "text-muted-foreground"}`}>{t(ach.title.replace(/\s/g, ''), ach.title)}</h4>
                  <p className="text-xs text-muted-foreground">{t(ach.description.replace(/\s/g, ''), ach.description)}</p>
                  {!ach.earned && ach.progress && ach.total && (
                    <div className="space-y-1 pt-1">
                      <div className="flex justify-between text-xs"><span>{t("progress", "Progress")}</span><span>{ach.progress}/{ach.total}</span></div>
                      <ProgressBar value={progressValue} className="h-1 bg-accent" />
                    </div>
                  )}
                  {ach.earned && ach.date && <p className="text-xs text-primary/90 font-medium pt-1">{t("earnedOn", "Earned on")} {ach.date}</p>}
                </div>
                {ach.earned && <Trophy className="w-6 h-6 text-yellow-500 animate-pulse-slow shrink-0" />}
              </div>
            )
          })}
        </CardContent>
      </Card>
    </div>
  )
}
