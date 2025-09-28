"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Star, Coins, Trophy, Rocket, BookOpen, Target, Zap, Award } from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"

interface DashboardProps {
  user: any
  onNavigate: (screen: string) => void
}

export function Dashboard({ user, onNavigate }: DashboardProps) {
  const { t } = useTranslation()

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return t("goodMorning")
    if (hour < 17) return t("goodAfternoon")
    return t("goodEvening")
  }

  const handleContinueLearning = () => {
    onNavigate("subjects")
  }

  const handleDailyMission = () => {
    onNavigate("missions")
  }

  return (
    <div className="p-4 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {getGreeting()}, {user?.name}! 🚀
        </h1>
        <p className="text-muted-foreground">{t("readyToExplore")}</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-4 text-center">
            <Star className="w-6 h-6 mx-auto mb-2 text-primary animate-glow" />
            <p className="text-2xl font-bold text-primary">{user?.stars || 0}</p> {/*  Stars*/}
            <p className="text-xs text-muted-foreground">{t("stars")}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
          <CardContent className="p-4 text-center">
            <Coins className="w-6 h-6 mx-auto mb-2 text-accent animate-glow" />
            <p className="text-2xl font-bold text-accent">{user?.coins || 100}</p>
            <p className="text-xs text-muted-foreground">{t("coins")}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
          <CardContent className="p-4 text-center">
            <Trophy className="w-6 h-6 mx-auto mb-2 text-secondary animate-glow" />
            <p className="text-2xl font-bold text-secondary">{user?.badges?.length || 0}</p>
            <p className="text-xs text-muted-foreground">{t("badges")}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Rocket className="w-5 h-5 text-primary" />
            {t("yourJourneyProgress")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{t("overallProgress")}</span>
              <span>25%</span>
            </div>
            <Progress value={25} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" />
              <span>3 {t("subjectsUnlocked")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-accent" />
              <span>12 {t("missionsCompleted")}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary animate-glow" />
          {t("quickActions")}
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {/* Continue Learning Card */}
          <Card className="relative overflow-hidden border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent" />
            <CardContent className="relative p-6">
              <Button
                onClick={handleContinueLearning}
                className="w-full h-auto p-0 bg-transparent hover:bg-transparent text-left"
              >
                <div className="flex items-center gap-4 w-full">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-semibold text-foreground text-base">{t("continueLearning")}</h4>
                    <p className="text-sm text-muted-foreground">Pick up where you left off in your space journey</p>
                  </div>
                  <div className="text-primary">
                    <Rocket className="w-5 h-5" />
                  </div>
                </div>
              </Button>
            </CardContent>
          </Card>

          {/* Daily Mission Card */}
          <Card className="relative overflow-hidden border-2 border-secondary/20 hover:border-secondary/40 transition-all duration-300 hover:shadow-lg hover:shadow-secondary/20">
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 via-secondary/5 to-transparent" />
            <CardContent className="relative p-6">
              <Button
                onClick={handleDailyMission}
                className="w-full h-auto p-0 bg-transparent hover:bg-transparent text-left"
              >
                <div className="flex items-center gap-4 w-full">
                  <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
                    <Target className="w-6 h-6 text-secondary" />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-semibold text-foreground text-base">{t("dailyMission")}</h4>
                    <p className="text-sm text-muted-foreground">Complete today's challenge and earn bonus rewards</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-full font-medium">+50 ⭐</div>
                    <Award className="w-5 h-5 text-secondary" />
                  </div>
                </div>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-accent" />
            {t("recentAchievements")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-2 bg-primary/5 rounded-lg border border-primary/10">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                <Star className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{t("firstMissionComplete")}</p>
                <p className="text-xs text-muted-foreground">{t("earned50Coins")}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2 bg-secondary/5 rounded-lg border border-secondary/10">
              <div className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center">
                <Trophy className="w-4 h-4 text-secondary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{t("mathExplorerBadge")}</p>
                <p className="text-xs text-muted-foreground">{t("completed5MathLessons")}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
