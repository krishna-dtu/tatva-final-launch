"use client"

import { useEffect, useState } from "react"
import { Rocket } from "lucide-react"

interface SplashScreenProps {
  onComplete: () => void
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [stage, setStage] = useState(0) // 0: loading, 1: countdown, 2: launch

  useEffect(() => {
    const timer1 = setTimeout(() => setStage(1), 1000)
    const timer2 = setTimeout(() => setStage(2), 2500)
    const timer3 = setTimeout(() => onComplete(), 4000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [onComplete])

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center overflow-hidden">
      {/* Stars background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center space-y-8">
        {/* Rocket Animation */}
        <div className="relative">
          <div
            className={`transition-all duration-1000 ${
              stage === 2 ? "transform -translate-y-96 scale-150 opacity-0" : ""
            }`}
          >
            <Rocket
              className={`w-24 h-24 mx-auto text-white transition-all duration-500 ${
                stage >= 1 ? "animate-bounce" : "animate-pulse"
              }`}
            />
          </div>

          {/* Rocket Trail */}
          {stage === 2 && (
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
              <div className="w-2 h-32 bg-gradient-to-t from-orange-400 via-yellow-300 to-transparent animate-pulse" />
            </div>
          )}
        </div>

        {/* Team Name */}
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-white tracking-wider animate-glow">TATVA</h1>
          <p className="text-xl text-white/80 animate-fade-in">
            {stage === 0 && "Preparing for launch..."}
            {stage === 1 && "3... 2... 1..."}
            {stage === 2 && "🚀 Launching into space!"}
          </p>
        </div>

        {/* Loading Animation */}
        {stage === 0 && (
          <div className="flex justify-center space-x-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 bg-white rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
