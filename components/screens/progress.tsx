"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress as ProgressBar } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Trophy, Target, Calendar, TrendingUp, Award } from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"

interface ProgressProps {
  user: any
}

const achievements = [
  {
    id: "first-mission",
    title: "First Mission Complete",
    description: "Completed your first learning mission",
    icon: "🚀",
    earned: true,
    date: "2024-01-15",
  },
  {
    id: "math-explorer",
    title: "Math Explorer",
    description: "Completed 5 math chapters",
    icon: "🔢",
    earned: true,
    date: "2024-01-18",
  },
  {
    id: "reading-master",
    title: "Reading Master",
    description: "Read for 100 minutes total",
    icon: "📚",
    earned: true,
    date: "2024-01-20",
  },
  {
    id: "streak-keeper",
    title: "Streak Keeper",
    description: "Login for 7 consecutive days",
    icon: "🔥",
    earned: false,
    progress: 0,
    total: 7,
  },
  {
    id: "star-collector",
    title: "Star Collector",
    description: "Earn 100 stars",
    icon: "⭐",
    earned: false,
    progress: 0,
    total: 100,
  },
]

const weeklyStats = [
  { label: "LessonsCompleted", value: 12, change: "+3", trend: "up" },
  { label: "StarsEarned", value: 45, change: "+8", trend: "up" },
  { label: "TimeSpent", value: "2h 30m", change: "+45m", trend: "up" },
  { label: "StreakDays", value: 5, change: "+2", trend: "up" },
]

export function Progress({ user }: ProgressProps) {
  const { t } = useTranslation()

  return (
    <div className="p-4 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {t("progressHub")} 📊
        </h1>
        <p className="text-muted-foreground">{t("trackYourJourney")}</p>
      </div>

      <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            {t("overallProgressTitle")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t("level")} 1
            </div>
            <p className="text-sm text-muted-foreground">{t("spaceCadet")}</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{t("progressToLevel2")}</span>
              <span>10/1000 XP</span>
            </div>
            <ProgressBar value={0} className="h-3" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-accent" />
            {t("thisWeek")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {weeklyStats.map((stat, index) => (
              <div key={index} className="space-y-1">
                <p className="text-sm text-muted-foreground">
                  {t(stat.label.toLowerCase().replace(/\s+/g, "") as any) || stat.label}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-foreground">{0}</span>
                  <Badge className="bg-green-500/10 text-green-600 border-green-500/20 text-xs">{stat.change}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            {t("subjectProgress")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-2">
                  <span>🔢</span>
                  <span>{t("mathematics")}</span>
                </span>
                <span>0%</span>
              </div>
              <ProgressBar value={0} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-2">
                  <span>🧪</span>
                  <span>{t("science")}</span>
                </span>
                <span>30%</span>
              </div>
              <ProgressBar value={0} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-2">
                  <span>📚</span>
                  <span>{t("english")}</span>
                </span>
                <span>60%</span>
              </div>
              <ProgressBar value={0} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-accent" />
            {t("achievements")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`flex items-center gap-3 p-3 rounded-lg border ${
                achievement.earned ? "bg-primary/5 border-primary/20" : "bg-muted/20 border-muted/20"
              }`}
            >
              <div className={`text-2xl ${!achievement.earned && "grayscale opacity-50"}`}>{achievement.icon}</div>

              <div className="flex-1 space-y-1">
                <h4 className={`font-medium ${achievement.earned ? "text-foreground" : "text-muted-foreground"}`}>
                  {achievement.title}
                </h4>
                <p className="text-xs text-muted-foreground">{achievement.description}</p>

                {!achievement.earned && achievement.progress && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>{t("progress")}</span>
                      <span>
                        {achievement.progress}/{achievement.total}
                      </span>
                    </div>
                    <ProgressBar value={(achievement.progress / achievement.total) * 100} className="h-1" />
                  </div>
                )}

                {achievement.earned && achievement.date && (
                  <p className="text-xs text-primary">
                    {t("earnedOn")} {achievement.date}
                  </p>
                )}
              </div>

              {achievement.earned && <Trophy className="w-5 h-5 text-accent animate-glow" />}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
