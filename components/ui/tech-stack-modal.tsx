"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Code, Smartphone, Palette, Database, Globe, Zap } from "lucide-react"

interface TechStackModalProps {
  onClose: () => void
}

export function TechStackModal({ onClose }: TechStackModalProps) {
  const techStack = [
    {
      category: "Frontend Framework",
      icon: <Code className="w-5 h-5" />,
      technologies: [
        { name: "Next.js 15", description: "React framework with App Router" },
        { name: "React 18", description: "UI library with hooks and components" },
        { name: "TypeScript", description: "Type-safe JavaScript development" },
      ],
    },
    {
      category: "Styling & UI",
      icon: <Palette className="w-5 h-5" />,
      technologies: [
        { name: "Tailwind CSS v4", description: "Utility-first CSS framework" },
        { name: "shadcn/ui", description: "Reusable component library" },
        { name: "Lucide React", description: "Beautiful SVG icons" },
        { name: "Custom Animations", description: "Space-themed CSS animations" },
      ],
    },
    {
      category: "Mobile Experience",
      icon: <Smartphone className="w-5 h-5" />,
      technologies: [
        { name: "Responsive Design", description: "Mobile-first approach" },
        { name: "Touch Interactions", description: "Optimized for mobile devices" },
        { name: "PWA Ready", description: "Progressive Web App capabilities" },
      ],
    },
    {
      category: "State Management",
      icon: <Database className="w-5 h-5" />,
      technologies: [
        { name: "React Hooks", description: "useState, useEffect for local state" },
        { name: "Local Storage", description: "Persistent user data storage" },
        { name: "Custom Hooks", description: "Reusable logic (useTheme, useTranslation)" },
      ],
    },
    {
      category: "Internationalization",
      icon: <Globe className="w-5 h-5" />,
      technologies: [
        { name: "Multi-language Support", description: "English, Hindi, Odia" },
        { name: "Custom Translation System", description: "Type-safe translations" },
        { name: "Dynamic Language Switching", description: "Real-time language updates" },
      ],
    },
    {
      category: "Performance & Features",
      icon: <Zap className="w-5 h-5" />,
      technologies: [
        { name: "Dark/Light Mode", description: "Theme switching with persistence" },
        { name: "Gamification", description: "Progress tracking, badges, rewards" },
        { name: "Interactive Mascot", description: "AI-powered learning companion" },
        { name: "Offline Support", description: "Local data persistence" },
      ],
    },
  ]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-card border-border/50">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Code className="w-6 h-6 text-primary" />
            Tatva App - Tech Stack
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold text-primary">
              <span className="text-primary" style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.3)" }}>
                🚀
              </span>{" "}
              Space Adventure Learning Platform
            </h3>
            <p className="text-sm text-muted-foreground">
              Built with modern web technologies for an engaging educational experience
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {techStack.map((category, index) => (
              <Card key={index} className="bg-muted/20 border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    {category.icon}
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {category.technologies.map((tech, techIndex) => (
                    <div key={techIndex} className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {tech.name}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground pl-2">{tech.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <CardContent className="p-4">
              <h4 className="font-semibold text-primary mb-2">Key Features Implemented:</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-accent rounded-full"></span>
                  Phone/OTP Authentication
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-accent rounded-full"></span>
                  Profile Management
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-accent rounded-full"></span>
                  Subject Exploration
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-accent rounded-full"></span>
                  Interactive Questions
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-accent rounded-full"></span>
                  Progress Tracking
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-accent rounded-full"></span>
                  Gamification System
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-accent rounded-full"></span>
                  Language Switching
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-accent rounded-full"></span>
                  Dark/Light Themes
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-accent rounded-full"></span>
                  Floating Mascot
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button onClick={onClose} className="bg-gradient-to-r from-primary to-secondary text-primary-foreground">
              Close Tech Stack
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
