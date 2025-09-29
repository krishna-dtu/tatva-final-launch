"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress as ProgressBar } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
<<<<<<< HEAD
import { Button } from "@/components/ui/button"
import { Trophy, Target, Calendar, TrendingUp, Award, DollarSign, Star, Zap, ShoppingCart } from "lucide-react"
// FIX: Mocking useTranslation hook to resolve compilation error
const useTranslation = () => {
    // Basic mock implementation: returns the key if a matching translation isn't found, 
    // or returns the fallback string provided as the second argument.
    // This allows the component to compile and display meaningful text.
    const t = (key: string, fallback?: string) => fallback || key.split(/(?=[A-Z])/).join(" ");
    return { t };
};
=======
import { Trophy, Target, Calendar, TrendingUp, Award } from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"
import { useState,useEffect } from "react"
>>>>>>> 94298f352861454ace6a4584aae35435908b391d

interface ProgressProps {
  user: {
    name: string;
    stars: number;
    coins: number;
    progress?: any;
  }
}

// --- STATIC DATA (Moved outside component for optimization) ---

const MOCK_ACHIEVEMENTS = [
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
];

const MOCK_WEEKLY_STATS = [
  { label: "Lessons Completed", value: 12, change: "+3", trend: "up", icon: Zap },
  { label: "Stars Earned", value: 45, change: "+8", trend: "up", icon: Star },
  { label: "Time Spent", value: "2h 30m", change: "+45m", trend: "up", icon: Calendar },
  { label: "Streak Days", value: 5, change: "+2", trend: "up", icon: Trophy },
];

const MOCK_NEXT_LESSON = {
  title: "Algebraic Expressions",
  subject: "Mathematics",
  chapter: 3,
  time: "25 min",
}

// --- COMPONENT ---

export function Progress({ user }: ProgressProps) {
  // FIX: Using the locally defined useTranslation mock
  const { t } = useTranslation()
<<<<<<< HEAD

  // Handler for the next lesson button
  const handleNextLesson = () => {
    console.log("Navigating to next lesson:", MOCK_NEXT_LESSON.title);
  };

  // Handler for the coins/shop button
  const handleShopNavigation = () => {
    console.log("Navigating to Rewards Shop. Coins:", user.coins);
  };
  
  // Helper to determine the color for trend badges
  const getTrendColor = (trend: 'up' | 'down') => 
    trend === 'up' 
      ? 'bg-green-500/10 text-green-600 border-green-500/20' 
      : 'bg-red-500/10 text-red-600 border-red-600/20'; // Corrected red-600 border class


=======
  const [SubjectProgress,setSubjectProgress] = useState({"M_Q" : 0,"S_Q" :  0,"E_Q" : 0});
  
    // -------------------------------
    useEffect(()=>{
      console.log("Use effect")
      fetch('https://tatvab.onrender.com/progress', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      phone_no: user?.phone_no || user?.phoneNumber,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      let pg = {"M_Q" : data.M_Q|| 0,"S_Q" :  data.S_Q|| 0,"E_Q" : data.E_G || 0}
      setSubjectProgress(pg)
      console.log(SubjectProgress)
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  
    },[])
>>>>>>> 94298f352861454ace6a4584aae35435908b391d
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-8">
      
      {/* HEADER & WELCOME */}
      <div className="text-center space-y-1">
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {t("welcomeBack", "Welcome back,")} {user.name || "Cadet"}!
        </h1>
        <p className="text-lg text-muted-foreground">{t("progressHub", "Your Progress Hub")} ✨</p>
      </div>

      {/* REWARD AND QUICK ACTION GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Current Rewards (Stars & Coins) */}
        <Card className="col-span-1 lg:col-span-1 bg-card/70 backdrop-blur-md border-primary/20 shadow-lg">
          <CardHeader className="p-4 flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-primary">
              {t("currentRewards", "Rewards")}
            </CardTitle>
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
            <Button 
                onClick={handleShopNavigation}
                className="w-full bg-accent hover:bg-accent/90 text-white font-semibold transition-transform duration-200 hover:scale-[1.02]"
            >
                <DollarSign className="w-4 h-4 mr-2" />
                {user.coins} {t("coins", "Coins")} - {t("visitShop", "Shop")}
            </Button>
          </CardContent>
        </Card>

        {/* Next Mission CTA (Highly Actionable) */}
        <Card className="col-span-1 lg:col-span-2 bg-gradient-to-r from-secondary/20 to-accent/20 border-accent/40 shadow-xl p-0 overflow-hidden">
            <div className="flex flex-col md:flex-row h-full">
                <div className="p-6 flex-1 space-y-2">
                    <p className="text-sm font-semibold text-accent uppercase">{t("nextUp", "Next Mission")}</p>
                    <CardTitle className="text-2xl font-bold">{MOCK_NEXT_LESSON.title}</CardTitle>
                    <CardDescription className="text-base">
                        {t("continueYourJourney", "Continue your journey in")} 
                        <Badge variant="secondary" className="ml-2 bg-primary/10 text-primary border-primary/20">
                            {MOCK_NEXT_LESSON.subject}
                        </Badge>
                    </CardDescription>
                </div>
                <div className="p-6 md:w-48 flex items-center justify-center bg-accent/10">
                    <Button 
                        onClick={handleNextLesson}
                        className="w-full bg-accent hover:bg-accent/90 text-white font-bold h-12 text-lg shadow-lg shadow-accent/30 transition-all duration-300 hover:translate-y-[-2px]"
                    >
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
        <CardContent className="space-y-4">
          <div className="text-center">
<<<<<<< HEAD
            <div className="text-5xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t("level")} 3
=======
            <div className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t("level")} 1
>>>>>>> 94298f352861454ace6a4584aae35435908b391d
            </div>
            <p className="text-sm text-muted-foreground font-semibold">{t("spaceCadet", "Space Cadet")}</p>
          </div>

          <div className="space-y-2">
<<<<<<< HEAD
            <div className="flex justify-between text-sm font-medium">
              <span>{t("progressToLevel4", "Progress to Level 4")}</span>
              <span className="text-primary font-bold">750/1000 XP</span>
            </div>
            <ProgressBar value={75} className="h-3 bg-primary/20" />
=======
            <div className="flex justify-between text-sm">
              <span>{t("progressToLevel2")}</span>
              <span>10/1000 XP</span>
            </div>
            <ProgressBar value={0} className="h-3" />
>>>>>>> 94298f352861454ace6a4584aae35435908b391d
          </div>
        </CardContent>
      </Card>

<<<<<<< HEAD
      {/* WEEKLY STATS & SUBJECT PROGRESS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* WEEKLY STATS (Enhanced Icons) */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-accent" />
              {t("thisWeek", "This Week")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {MOCK_WEEKLY_STATS.map((stat, index) => {
                const StatIcon = stat.icon;
                return (
                  <div key={index} className="space-y-1 p-2 rounded-lg hover:bg-muted/30 transition-colors">
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                       <StatIcon className="w-4 h-4 text-primary/80" />
                       {/* Adjusted translation key generation for consistency */}
                       {t(stat.label.replace(/\s/g, ''), stat.label)}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-foreground">{stat.value}</span>
                      <Badge className={`text-xs ${getTrendColor(stat.trend as 'up' | 'down')}`}>{stat.change}</Badge>
                    </div>
                  </div>
                );
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
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {/* Mathematics */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-2 font-semibold">
                    <span>🔢</span>
                    <span>{t("mathematics", "Mathematics")}</span>
                  </span>
                  <span className="text-primary font-bold">45%</span>
=======
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
>>>>>>> 94298f352861454ace6a4584aae35435908b391d
                </div>
                <ProgressBar value={45} className="h-2 bg-blue-500" />
              </div>

              {/* Science */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-2 font-semibold">
                    <span>🧪</span>
                    <span>{t("science", "Science")}</span>
                  </span>
                  <span className="text-primary font-bold">30%</span>
                </div>
                <ProgressBar value={30} className="h-2 bg-green-500" />
              </div>

              {/* English */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-2 font-semibold">
                    <span>📚</span>
                    <span>{t("english", "English")}</span>
                  </span>
                  <span className="text-primary font-bold">60%</span>
                </div>
                <ProgressBar value={60} className="h-2 bg-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* ACHIEVEMENTS */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-md">
        <CardHeader>
<<<<<<< HEAD
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-accent" />
                {t("achievements", "Achievements")}
            </div>
            <Button variant="ghost" size="sm" className="text-xs text-primary hover:bg-primary/10"
                onClick={() => console.log("Navigating to all achievements page")}
            >
                {t("viewAll", "View All")}
            </Button>
=======
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
                <span>{SubjectProgress.M_Q*10}%</span>
              </div>
              <ProgressBar value={SubjectProgress.M_Q*10} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-2">
                  <span>🧪</span>
                  <span>{t("science")}</span>
                </span>
                <span>{SubjectProgress.S_Q*10}%</span>
              </div>
              <ProgressBar value={SubjectProgress.E_Q*10} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-2">
                  <span>📚</span>
                  <span>{t("english")}</span>
                </span>
                <span>{SubjectProgress.E_Q*10}%</span>
              </div>
              <ProgressBar value={SubjectProgress.E_Q*10} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-accent" />
            {t("achievements")}
>>>>>>> 94298f352861454ace6a4584aae35435908b391d
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {MOCK_ACHIEVEMENTS.map((achievement) => {
            // Calculate progress value safely
            const progressValue = (achievement.progress && achievement.total) 
                                ? (achievement.progress / achievement.total) * 100 
                                : 0;
            return (
              <div
                key={achievement.id}
                className={`flex items-center gap-3 p-3 rounded-xl transition-shadow duration-300 ${
                  achievement.earned 
                    ? "bg-primary/5 border border-primary/20 shadow-inner" 
                    : "bg-muted/20 border border-muted/20 hover:shadow-md"
                }`}
              >
                <div className={`text-3xl ${!achievement.earned && "grayscale opacity-50"}`}>{achievement.icon}</div>

                <div className="flex-1 space-y-1">
                  <h4 className={`font-semibold ${achievement.earned ? "text-foreground" : "text-muted-foreground"}`}>
                    {t(achievement.title.replace(/\s/g, ''), achievement.title)}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {t(achievement.description.replace(/\s/g, ''), achievement.description)}
                  </p>

                  {!achievement.earned && achievement.progress && achievement.total && (
                    <div className="space-y-1 pt-1">
                      <div className="flex justify-between text-xs">
                        <span>{t("progress", "Progress")}</span>
                        <span>
                          {achievement.progress}/{achievement.total}
                        </span>
                      </div>
                      <ProgressBar value={progressValue} className="h-1 bg-muted-foreground/20 bg-accent" />
                    </div>
                  )}

                  {achievement.earned && achievement.date && (
                    <p className="text-xs text-primary/90 font-medium pt-1">
                      {t("earnedOn", "Earned on")} {achievement.date}
                    </p>
                  )}
                </div>

                {achievement.earned && <Trophy className="w-6 h-6 text-yellow-500 animate-pulse-slow shrink-0" />}
              </div>
            );
          })}
        </CardContent>
      </Card>
      
    </div>
  )
}
