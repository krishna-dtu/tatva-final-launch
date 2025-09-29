"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Lock, Star, BookOpen, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTranslation } from "@/hooks/use-translation"
import { useEffect, useState } from "react"

interface SubjectsProps {
  user: any
  onNavigate: (screen: string) => void
  quizID : (screen :string)=>void
}

export function Subjects({ user , onNavigate ,quizID }: SubjectsProps) {
  const { t } = useTranslation()
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)
  const [SubjectProgress,setSubjectProgress] = useState({"M_Q" : 0,"S_Q" :  0,"E_Q" : 0});

  // -------------------------------
  useEffect(()=>{
    console.log("Use effect")
    fetch('http://localhost:5000/progress', {
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
  const subjects = [
    {
      id: "math",
      nameKey: "mathematics" as const,
      planetKey: "planetNumerus" as const,
      icon: "🔢",
      color: "from-blue-500 to-cyan-500",
      progress: SubjectProgress.M_Q * 10,
      chapters: 10,
      completedChapters: SubjectProgress.M_Q,
      unlocked: true,
      stars: 23,
      questions: [
        "Hey kiddo! Can you tell me what 2+2 equals or I'll make all calculators disappear from this galaxy? 🤖",
        "Little space explorer, what's the square root of 16? Answer correctly or I'll hide all the numbers in the universe! 🚀",
        "Young mathematician, if you have 5 apples and eat 2, how many are left? Get it wrong and I'll turn all fruits into vegetables! 🍎",
      ],
    },
    {
      id: "science",
      nameKey: "science" as const,
      planetKey: "planetScientia" as const,
      icon: "🧪",
      color: "from-green-500 to-emerald-500",
      progress: SubjectProgress.S_Q,
      chapters: 10,
      completedChapters: 0,
      unlocked: true,
      stars: 15,
      questions: [
        "Heyy kiddo, tell me what is photosynthesis or I will rule this galaxy! 🌱",
        "Little scientist, what gas do plants breathe in? Answer wrong and I'll make all plants glow purple! 🧪",
        "Young explorer, how many bones are in the human body? Get it right or I'll make everyone's bones sparkle! ✨",
      ],
    },
    {
      id: "english",
      nameKey: "english" as const,
      planetKey: "planetLingua" as const,
      icon: "📚",
      color: "from-purple-500 to-pink-500",
      progress: SubjectProgress.E_Q,
      chapters: 10,
      completedChapters: 0,
      unlocked: true,
      stars: 28,
      questions: [
        "Hey there wordsmith! What's the opposite of 'happy'? Answer wrong and I'll make all books speak in riddles! 📖",
        "Little poet, can you give me a word that rhymes with 'cat'? Fail and I'll make all cats meow in Shakespearean! 🐱",
        "Young writer, what's a noun? Get it wrong and I'll turn all words into emojis! 😄",
      ],
    },
    {
      id: "history",
      nameKey: "history" as const,
      planetKey: "planetChronos" as const,
      icon: "🏛️",
      color: "from-orange-500 to-red-500",
      progress: 0,
      chapters: 15,
      completedChapters: 0,
      unlocked: false,
      stars: 0,
      questions: [],
    },
    {
      id: "geography",
      nameKey: "geography" as const,
      planetKey: "planetTerra" as const,
      icon: "🌍",
      color: "from-teal-500 to-blue-500",
      progress: 0,
      chapters: 12,
      completedChapters: 0,
      unlocked: false,
      stars: 0,
      questions: [],
    },
  ]

  const getRandomQuestion = (subjectId: string) => {
    const subject = subjects.find((s) => s.id === subjectId)
    if (subject && subject.questions.length > 0) {
      return subject.questions[Math.floor(Math.random() * subject.questions.length)]
    }
    return "Ready to explore this amazing subject? Let's start learning! 🚀"
  }

  return (
    <div className="p-4 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {t("galaxyMap")} 🌌
        </h1>
        <p className="text-muted-foreground">{t("chooseYourPlanet")}</p>
      </div>

      <div className="space-y-4">
        {subjects.map((subject) => (
          <Card
            key={subject.id}
            className={cn(
              "relative overflow-hidden border-2 transition-all duration-300",
              subject.unlocked
                ? "border-primary/20 hover:border-primary/40 hover:shadow-lg cursor-pointer"
                : "border-muted/20 opacity-60",
            )}
          >
            <CardContent className="p-4" >
              <div className="flex items-center gap-4">
                <div
                  className={cn(
                    "w-16 h-16 rounded-full flex items-center justify-center text-2xl relative",
                    subject.unlocked ? "animate-glow" : "grayscale",
                  )}
                >
                  <div
                    className={cn(
                      "w-full h-full rounded-full bg-gradient-to-br flex items-center justify-center",
                      subject.color,
                    )}
                  >
                    {subject.unlocked ? subject.icon : <Lock className="w-6 h-6 text-white" />}
                  </div>
                  {subject.unlocked && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-accent rounded-full flex items-center justify-center animate-orbit">
                      <Star className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-2">
                  <div>
                    <h3 className="font-bold text-foreground">{t(subject.nameKey)}</h3>
                    <p className="text-sm text-muted-foreground">{t(subject.planetKey)}</p>
                  </div>

                  {subject.unlocked ? (
                    <>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <BookOpen className="w-3 h-3" />
                          <span>
                            {subject.completedChapters}/{subject.chapters} {t("chapters")}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-accent" />
                          <span>
                            {subject.stars} {t("stars")}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>{t("progress")}</span>
                          <span>{subject.progress}%</span>
                        </div>
                        <Progress value={subject.progress} className="h-2" />
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Lock className="w-4 h-4" />
                      <span>{t("completMoreMissions")}</span>
                    </div>
                  )}
                </div>

                {subject.unlocked && (
                  <div className="flex flex-col gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-accent/20 hover:bg-accent/10 bg-transparent"
                      // onClick={() => setSelectedSubject(subject.id)}
                      onClick={
                        () => {
                          onNavigate("quiz");
                          quizID(subject.id)
                        }
                      }
                    >
                      <MessageCircle className="w-4 h-4 mr-1" />
                      {t("askMe")}
                    </Button>

                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground"
                    >
                      {t("explore")}
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-primary/5 border-2 border-dashed border-primary/30">
        <CardContent className="p-6 text-center space-y-2">
          <div className="text-4xl text-primary" style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}>
            🚀
          </div>
          <h3 className="font-bold text-foreground">{t("morePlanetsComingSoon")}</h3>
          <p className="text-sm text-muted-foreground">{t("keepExploring")}</p>
        </CardContent>
      </Card>

      {selectedSubject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md bg-card border-border/50 animate-in slide-in-from-bottom-4">
            <CardContent className="p-6 space-y-4">
              <div className="text-center space-y-2">
                <div className="text-4xl">🤖</div>
                <h3 className="text-lg font-bold text-primary">{t("mascotChallenge")}</h3>
              </div>

              <div className="bg-muted/20 rounded-lg p-4 border border-border/50">
                <p className="text-sm leading-relaxed">{getRandomQuestion(selectedSubject)}</p>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setSelectedSubject(null)} className="flex-1">
                  {t("later")}
                </Button>
                <Button
                  onClick={() => {
                    if (selectedSubject) {
                      const question = getRandomQuestion(selectedSubject);
                      localStorage.setItem("currentChallenge", JSON.stringify({ question }));
                    }
                    setSelectedSubject(null); // Close modal
                    window.dispatchEvent(new Event("openMascot")); // Open mascot
                  }}
                  className="flex-1 bg-gradient-to-r from-primary to-secondary text-primary-foreground"
                >
                  {t("acceptChallenge")}
                </Button>


              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
