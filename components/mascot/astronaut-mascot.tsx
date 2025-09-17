"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTranslation } from "@/hooks/use-translation"

interface User {
  name?: string
  [key: string]: any
}

interface AstronautMascotProps {
  user: User
}

// RULE-BASED BOT RESPONSES
const botResponses: { [key: string]: string[] } = {
  hello: [
    "Hello, Space Explorer! 🚀 Ready for a galaxy adventure?",
    "Hey {name}! The stars are waiting for you! 🌌"
  ],
  hi: [
    "Hi there! Let's explore some planets today! 🪐",
    "Hey hey! Ready to discover new galaxies? ✨"
  ],
  how: [
    "I'm Astro, your guide through the Tatva galaxy! 🛰️",
    "I can answer questions about space, your subjects, and Tatva missions! 🏆"
  ],
  bye: [
    "Goodbye, Captain! See you on another mission! 🌠",
    "Mission over for now, but the stars will wait for you! 🌌"
  ],
  help: [
    "You can ask me about space, your subjects, or Tatva's missions and rewards! 🌟",
    "Ask me about planets, stars, badges, or just say hi! 🚀"
  ],
  tatva: [
    "Tatva is your space-adventure learning platform! Complete missions, earn rewards, and explore the galaxy! 🪐",
    "In Tatva, every planet has challenges. Completing them earns you badges and fun surprises! 🌌"
  ],
  mission: [
    "Your mission is to complete learning quests and collect badges! 🏆",
    "Every planet has a challenge waiting for you, Captain! 🌟"
  ],
  reward: [
    "Collect rewards to upgrade your space gear! 🚀",
    "Earn badges and celebrate your galactic achievements! 🌌"
  ],
  space: [
    "Space is vast and full of mysteries! Did you know Saturn could float in water? 🪐",
    "Stars are massive balls of gas. Some are older than our planet! ✨",
    "A day on Venus is longer than a year there! 🌞"
  ],
  math: [
    "Math is your rocket fuel for problem-solving! 🚀 Need help with addition, subtraction, or algebra?",
    "Ask me a math question and I'll guide you, Explorer!"
  ],
  science: [
    "Science helps us understand the universe! 🔬 What topic do you want to learn about?",
    "Physics, chemistry, biology… I can give you fun facts about each!"
  ],
  features: [
    "Tatva has missions, rewards, badges, and fun space adventures! 🏆",
    "You can track your progress, earn stars, and explore planets in Tatva! 🌌"
  ],
  joke: [
    "Why did the astronaut break up with the moon? He needed space! 😄",
    "What do you call a lazy spaceman? An astro-nap! 😂"
  ],
  thanks: [
    "You're welcome, Captain! Keep exploring! ✨",
    "Anytime! The galaxy is ours to explore! 🌌"
  ],
  motivation: [
    "Every step forward is a step closer to the stars! 🚀",
    "Keep learning, Captain! The universe awaits! 🌌",
    "You are the hero of your own space adventure! 🌠"
  ],
  default: [
    "Hmm, I didn't understand that. Ask me about Tatva, your subjects, or space! 🌌",
    "Captain, I am here to guide you! Ask me about planets, missions, or rewards! 🚀"
  ]
}

// FUNCTION TO GET BOT REPLY BASED ON KEYWORDS
function getBotReply(userMessage: string, userName: string) {
  const msg = userMessage.toLowerCase()

  for (const key in botResponses) {
    if (msg.includes(key)) {
      const replies = botResponses[key]
      const randomReply = replies[Math.floor(Math.random() * replies.length)]
      return randomReply.replace("{name}", userName || "Explorer")
    }
  }

  const defaultReplies = botResponses.default
  return defaultReplies[Math.floor(Math.random() * defaultReplies.length)].replace("{name}", userName || "Explorer")
}

export function AstronautMascot({ user }: AstronautMascotProps) {
  const translation = useTranslation()
  const t = translation?.t ?? ((key: string) => key)
  const language = translation?.language ?? "en"

  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ from: "user" | "bot"; text: string }[]>([])
  const [inputText, setInputText] = useState("")

  // INITIAL GREETING - run only once
  useEffect(() => {
    // Initial greeting - only if messages are empty
    if (messages.length === 0) {
      const greetings = t("mascotGreetings" as any) as any
      const greetingList = Array.isArray(greetings)
        ? greetings
        : [
          "Hey {name}! Ready for a galaxy adventure? 🚀",
          "Welcome back, Space Explorer {name}! 🌌",
          "Let's conquer some planets today, {name}! 🪐",
          "Time for an adventure, Captain {name}! ✨"
        ]
      const randomGreeting = greetingList[Math.floor(Math.random() * greetingList.length)]
      const finalGreeting = randomGreeting.replace("{name}", user?.name || "Explorer")
      setMessages([{ from: "bot", text: finalGreeting }])
    }

    // Listen for "openMascot" event when Accept Challenge is clicked
    const handleOpen = () => {
      setIsOpen(true)
      const stored = localStorage.getItem("currentChallenge")
      if (stored) {
        const { question } = JSON.parse(stored)
        setMessages([{ from: "bot", text: question }])
        localStorage.removeItem("currentChallenge")
      }
    }

    window.addEventListener("openMascot", handleOpen)
    return () => window.removeEventListener("openMascot", handleOpen)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.name])


  // HANDLE SEND
  const handleSend = () => {
  if (!inputText.trim()) return

  const newMessage = { from: "user" as const, text: inputText }
  setMessages((prev) => [...prev, newMessage])

  const lastBotMessage = messages[messages.length - 1]?.text

  // Map of challenge questions with answers and explanations
  const challengeAnswers: Record<string, { answer: string; explanation: string }> = {
    "Hey kiddo! Can you tell me what 2+2 equals or I'll make all calculators disappear from this galaxy? 🤖": {
      answer: "4",
      explanation: "2 + 2 equals 4 because addition combines two quantities."
    },
    "Little space explorer, what's the square root of 16? Answer correctly or I'll hide all the numbers in the universe! 🚀": {
      answer: "4",
      explanation: "The square root of 16 is 4 because 4 * 4 = 16."
    },
    "Young mathematician, if you have 5 apples and eat 2, how many are left? Get it wrong and I'll turn all fruits into vegetables! 🍎": {
      answer: "3",
      explanation: "If you have 5 apples and eat 2, 5 - 2 = 3 apples remain."
    },
    "Heyy kiddo, tell me what is photosynthesis or I will rule this galaxy! 🌱": {
      answer: "process by which plants make food",
      explanation: "Photosynthesis is the process by which plants make food using sunlight, water, and CO₂."
    },
    "Little scientist, what gas do plants breathe in? Answer wrong and I'll make all plants glow purple! 🧪": {
      answer: "carbon dioxide",
      explanation: "Plants absorb carbon dioxide (CO₂) for photosynthesis."
    },
    "Young explorer, how many bones are in the human body? Get it right or I'll make everyone's bones sparkle! ✨": {
      answer: "206",
      explanation: "An adult human has 206 bones in the body."
    },
    "Hey there wordsmith! What's the opposite of 'happy'? Answer wrong and I'll make all books speak in riddles! 📖": {
      answer: "sad",
      explanation: "The opposite of 'happy' is 'sad'."
    },
    "Little poet, can you give me a word that rhymes with 'cat'? Fail and I'll make all cats meow in Shakespearean! 🐱": {
      answer: "bat",
      explanation: "'Bat' rhymes with 'cat'."
    },
    "Young writer, what's a noun? Get it wrong and I'll turn all words into emojis! 😄": {
      answer: "person, place, or thing",
      explanation: "A noun is a person, place, or thing."
    }
  }

  // Check if the last bot message was a challenge question
  if (lastBotMessage && challengeAnswers[lastBotMessage]) {
    const correct = challengeAnswers[lastBotMessage]
    const userAnswer = inputText.toLowerCase().trim()
    const isCorrect = userAnswer === correct.answer.toLowerCase()

    const reply = isCorrect
      ? `🎉 Correct! ${correct.explanation}`
      : `❌ Oops! The right answer is "${correct.answer}". ${correct.explanation}`

    setMessages((prev) => [...prev, { from: "bot", text: reply }])
  } else {
    // Rule-based bot fallback for keywords like "hi", "tatva", "space", etc.
    const reply = getBotReply(inputText, user?.name || "")
    setMessages((prev) => [...prev, { from: "bot", text: reply }])
  }

  // Clear input after sending
  setInputText("")
}


  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-24 right-4 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary",
          "hover:from-primary/90 hover:to-secondary/90 shadow-lg animate-float z-40",
          "border-2 border-white/20"
        )}
      >
        <div className="text-2xl text-primary-foreground" style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}>
          🚀
        </div>
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-sm bg-card border-2 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center animate-glow">
                    <span className="text-2xl">👨‍🚀</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-primary">{t("astronautKing")}</h3>
                    <p className="text-xs text-muted-foreground">{t("yourSpaceGuide")}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4 max-h-64 overflow-y-auto mb-4">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "p-3 rounded-lg",
                      msg.from === "bot" ? "bg-primary/10" : "bg-secondary/10"
                    )}
                  >
                    <p className="text-sm text-foreground">{msg.text}</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={t("Say 'Hi' to Astraunaut King" as any)}
                  className="flex-1 border border-primary/20 rounded px-3 py-2 text-sm"
                  onKeyDown={(e) => { if (e.key === "Enter") handleSend() }}
                />
                <Button
                  size="sm"
                  onClick={handleSend}
                  className="bg-gradient-to-r from-primary to-secondary text-primary-foreground"
                >
                  <MessageCircle className="w-4 h-4 mr-1" />
                  {t("send" as any)}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
