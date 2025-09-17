"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Target, Clock, Star, Trophy, Zap, Gift } from "lucide-react"

interface MissionsProps {
  user: any
}

const dailyMissions = [
  {
    id: "daily-math",
    title: "Math Master",
    description: "Complete 3 math problems",
    progress: 2,
    total: 3,
    reward: 50,
    type: "coins",
    difficulty: "Easy",
  },
  {
    id: "daily-reading",
    title: "Reading Rocket",
    description: "Read for 15 minutes",
    progress: 8,
    total: 15,
    reward: 30,
    type: "coins",
    difficulty: "Medium",
  },
  {
    id: "daily-streak",
    title: "Learning Streak",
    description: "Login for 3 consecutive days",
    progress: 2,
    total: 3,
    reward: 100,
    type: "coins",
    difficulty: "Easy",
  },
]

const weeklyMissions = [
  {
    id: "weekly-explorer",
    title: "Planet Explorer",
    description: "Complete 5 chapters across any subjects",
    progress: 3,
    total: 5,
    reward: "Space Explorer Badge",
    type: "badge",
    difficulty: "Hard",
  },
  {
    id: "weekly-star",
    title: "Star Collector",
    description: "Earn 50 stars this week",
    progress: 32,
    total: 50,
    reward: 200,
    type: "coins",
    difficulty: "Medium",
  },
]

const specialEvents = [
  {
    id: "diwali-special",
    title: "Diwali Festival Challenge",
    description: "Complete special Diwali-themed lessons",
    progress: 1,
    total: 5,
    reward: "Festival Crown",
    type: "crown",
    difficulty: "Special",
    timeLeft: "2 days left",
  },
]

export function Missions({ user }: MissionsProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-500/10 text-green-600 border-green-500/20"
      case "Medium":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
      case "Hard":
        return "bg-red-500/10 text-red-600 border-red-500/20"
      case "Special":
        return "bg-purple-500/10 text-purple-600 border-purple-500/20"
      default:
        return "bg-muted/10 text-muted-foreground border-muted/20"
    }
  }

  const getRewardIcon = (type: string) => {
    switch (type) {
      case "coins":
        return <span className="text-yellow-500">🪙</span>
      case "badge":
        return <Trophy className="w-4 h-4 text-purple-500" />
      case "crown":
        return <span className="text-yellow-500">👑</span>
      default:
        return <Gift className="w-4 h-4 text-primary" />
    }
  }

  const MissionCard = ({ mission, isSpecial = false }: { mission: any; isSpecial?: boolean }) => (
    <Card className={`border-2 ${isSpecial ? "border-purple-500/30 bg-purple-500/5" : "border-primary/20"}`}>
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold text-foreground">{mission.title}</h4>
              <Badge className={getDifficultyColor(mission.difficulty)}>{mission.difficulty}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">{mission.description}</p>
            {mission.timeLeft && (
              <p className="text-xs text-purple-600 mt-1 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {mission.timeLeft}
              </p>
            )}
          </div>
          <Target className="w-5 h-5 text-primary animate-glow" />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>
              {mission.progress}/{mission.total}
            </span>
          </div>
          <Progress value={(mission.progress / mission.total) * 100} className="h-2" />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            {getRewardIcon(mission.type)}
            <span className="text-muted-foreground">
              {typeof mission.reward === "number" ? `${mission.reward} coins` : mission.reward}
            </span>
          </div>

          <Button
            size="sm"
            disabled={mission.progress >= mission.total}
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white"
          >
            {mission.progress >= mission.total ? "Completed" : "Continue"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="p-4 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Mission Control 🎯
        </h1>
        <p className="text-muted-foreground">Complete missions to earn rewards</p>
      </div>

      {specialEvents.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-purple-500" />
            <h2 className="text-lg font-bold text-foreground">Special Events</h2>
          </div>
          {specialEvents.map((mission) => (
            <MissionCard key={mission.id} mission={mission} isSpecial />
          ))}
        </div>
      )}

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-bold text-foreground">Daily Missions</h2>
        </div>
        {dailyMissions.map((mission) => (
          <MissionCard key={mission.id} mission={mission} />
        ))}
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-accent" />
          <h2 className="text-lg font-bold text-foreground">Weekly Challenges</h2>
        </div>
        {weeklyMissions.map((mission) => (
          <MissionCard key={mission.id} mission={mission} />
        ))}
      </div>

      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-accent" />
            Mission Stats
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-primary">12</p>
              <p className="text-xs text-muted-foreground">Completed</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-accent">5</p>
              <p className="text-xs text-muted-foreground">In Progress</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-secondary">850</p>
              <p className="text-xs text-muted-foreground">Total Coins</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
