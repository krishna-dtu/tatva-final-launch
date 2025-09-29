"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Rocket, Stars, Sparkles, GraduationCap, BookOpen, ChevronLeft } from "lucide-react" 
import { useTranslation } from "@/hooks/use-translation"

// Define the step types explicitly
type Step = "role" | "phone" | "otp" | "profile";

interface AuthScreenProps {
  onLogin: (userData: any) => void
}

export function AuthScreen({ onLogin }: AuthScreenProps) {
  const { t, changeLanguage } = useTranslation()
  const [step, setStep] = useState<Step>("role")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [otp, setOtp] = useState("")
  const [profile, setProfile] = useState({
    name: "",
    age: "",
    grade: "",
    language: "english",
  })
  
  // Memoize header content to avoid unnecessary re-renders and fix translation errors
  const headerContent = useMemo(() => {
  switch(step) {
    case 'role':
      return { title: "Who are you?", description: "Choose your path" };
    case 'phone':
      return { title: "Student Login", description: "Enter your phone number to continue" };
    case 'otp':
      return { title: "Verify Code", description: "Enter the code" };
    case 'profile':
      return { title: "Create Profile", description: "Tell us about yourself" };
    default:
      return { title: t("welcomeToTatva"), description: t("spaceAdventureJourney") };
  }
  }, [step, t]);

  // **********************************************
  // Handlers
  // **********************************************
  
  const handleRoleSelect = (role: 'student' | 'teacher') => {
    if (role === 'teacher') {
      // Professional redirection for teacher login (assuming /teacher/login is a dedicated Next.js page)
      window.location.href = "/teacher/login";
    } else {
      setStep("phone");
    }
  }

  const handlePhoneSubmit = () => setStep("otp")

  const handleOtpSubmit = () => {
    const existingUser = localStorage.getItem(`user_${phoneNumber}`)
    if (existingUser) onLogin(JSON.parse(existingUser))
    else setStep("profile")
  }

  const handleProfileSubmit = () => {
    const userData = {
      phoneNumber,
      ...profile,
      createdAt: new Date().toISOString(),
      progress: {},
      stars: 0,
      badges: [],
      coins: 100,
    }
    localStorage.setItem(`user_${phoneNumber}`, JSON.stringify(userData))
    // Corrected type assertion for changeLanguage
  changeLanguage(profile.language as 'english' | 'hindi' | 'odia') 
    onLogin(userData)
  }

  // **********************************************
  // UI Rendering
  // **********************************************
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center p-4">
      {/* Floating background circles - Retained */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-4 h-4 bg-accent rounded-full animate-float opacity-60"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-primary rounded-full animate-float opacity-40" style={{ animationDelay: "1s" }}></div>
        <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-secondary rounded-full animate-float opacity-50" style={{ animationDelay: "2s" }}></div>
        <div className="absolute bottom-20 right-1/3 w-5 h-5 bg-accent rounded-full animate-float opacity-30" style={{ animationDelay: "0.5s" }}></div>
      </div>

      <Card className="w-full max-w-md relative z-10 bg-card/95 backdrop-blur-sm border-2 border-primary/20 shadow-xl">
        
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center animate-glow">
            <Rocket className="w-8 h-8 text-white" />
          </div>
          <div>
            {/* Dynamic Header Titles (Fixed using useMemo) */}
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {headerContent.title}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {step === 'otp' ? `${t("verifyAndContinue")} +XX ${phoneNumber.slice(-4)}` : headerContent.description}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          
          {/* 1. Role Selection Step */}
          {step === "role" && (
            <div className="space-y-4 pt-4">
                {/* Student Button */}
                <Button 
                    onClick={() => handleRoleSelect('student')}
                    className="w-full h-16 text-lg bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-lg shadow-primary/20 transition-all transform hover:scale-[1.01]"
                >
                    <BookOpen className="w-6 h-6 mr-3" />
                    {"I am a Student"}
                </Button>

                {/* Teacher Button/Link */}
                <Button
                    onClick={() => handleRoleSelect('teacher')}
                    variant="outline"
                    className="w-full h-16 text-lg border-2 border-primary/40 text-primary hover:bg-primary/10 transition-all transform hover:scale-[1.01] shadow-md"
                >
                    <GraduationCap className="w-6 h-6 mr-3" />
                    {"I am a Teacher"}
                </Button>
            </div>
          )}

          {/* 2. Phone Step */}
          {step === "phone" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">{t("phoneNumber")}</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder={"+91 98765 43210"}
                  value={phoneNumber}
                  // Sanitization remains
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/[^0-9+]/g, ''))}
                  className="border-primary/20 focus:border-primary"
                />
              </div>
              <Button
                onClick={handlePhoneSubmit}
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-lg shadow-primary/20"
                disabled={phoneNumber.length < 10} // Simple validation
              >
                <Stars className="w-4 h-4 mr-2" />
                {t("sendOTP")}
              </Button>
              {/* Back Button */}
              <Button variant="ghost" className="w-full text-sm text-muted-foreground mt-2" onClick={() => setStep('role')}>
                <ChevronLeft className="w-4 h-4 mr-1" />
                {"Go Back"}
              </Button>
            </div>
          )}

          {/* 3. OTP Step */}
          {step === "otp" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">{t("enterOTP")}</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="123456"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                  className="border-primary/20 focus:border-primary text-center text-lg tracking-widest"
                  maxLength={6}
                />
                
                <p className="text-sm text-center text-muted-foreground pt-1">
                    {"Didn't receive code?"}
                    {/* Resend button should ideally trigger the resend logic */}
                    <Button variant="link" size="sm" className="p-0 h-auto ml-1 text-secondary hover:text-secondary/80">
                      {"Resend"}
                    </Button>
                </p>
              </div>
              <Button
                onClick={handleOtpSubmit}
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-lg shadow-secondary/20"
                disabled={otp.length !== 6}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                {t("verifyAndContinue")}
              </Button>
              {/* Back Button */}
              <Button variant="ghost" className="w-full text-sm text-muted-foreground mt-2" onClick={() => setStep('phone')}>
                <ChevronLeft className="w-4 h-4 mr-1" />
                {"Edit Phone Number"}
              </Button>
            </div>
          )}

          {/* 4. Profile Step (Registration) */}
          {step === "profile" && (
            <div className="space-y-4">
              {/* Profile fields remain the same for conciseness */}
              <div className="space-y-2">
                <Label htmlFor="name">{t("yourName")}</Label>
                <Input
                  id="name"
                  placeholder={t("enterYourName")}
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="border-primary/20 focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">{t("age")}</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="12"
                    value={profile.age}
                    onChange={(e) => setProfile({ ...profile, age: e.target.value })}
                    className="border-primary/20 focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="grade">{t("gradeClass")}</Label>
                  <Select value={profile.grade} onValueChange={(value) => setProfile({ ...profile, grade: value })}>
                    <SelectTrigger className="border-primary/20 focus:border-primary">
                      <SelectValue placeholder={t("selectGrade")} />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => (
                        <SelectItem key={i + 1} value={`${i + 1}`}>
                          {t("class")} {i + 1}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">{t("preferredLanguage")}</Label>
                <Select value={profile.language} onValueChange={(value) => setProfile({ ...profile, language: value })}>
                  <SelectTrigger className="border-primary/20 focus:border-primary">
                    <SelectValue />
                  </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="hindi">हिंदी (Hindi)</SelectItem>
                        <SelectItem value="odia">ଓଡ଼ିଆ (Odia)</SelectItem>
                    </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleProfileSubmit}
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-lg shadow-primary/20"
                disabled={!profile.name || !profile.age || !profile.grade}
              >
                <Rocket className="w-4 h-4 mr-2" />
                {t("startMyJourney")}
              </Button>
            </div>
          )}
        </CardContent>
        
        {/* Footer for policy link/general information */}
        <div className="px-6 pb-6 text-center pt-2">
             <p className="text-xs text-muted-foreground/70">
                {"By continuing, you agree to our Terms and Privacy Policy."}
             </p>
        </div>
      </Card>
    </div>
  )
}