"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Globe, Check } from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"

interface LanguageSelectorProps {
  currentLanguage: string
  onLanguageChange: (language: string) => void
  onClose: () => void
}

export function LanguageSelector({ currentLanguage, onLanguageChange, onClose }: LanguageSelectorProps) {
  const { t } = useTranslation()

  const languages = [
    { code: "english", name: "English", nativeName: "English", flag: "🇺🇸" },
    { code: "hindi", name: "Hindi", nativeName: "हिंदी", flag: "🇮🇳" },
    { code: "odia", name: "Odia", nativeName: "ଓଡ଼ିଆ", flag: "🇮🇳" },
  ]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-sm bg-card/95 backdrop-blur-sm border-border/50">
        <CardContent className="p-6 space-y-4">
          <div className="text-center space-y-2">
            <Globe className="w-8 h-8 mx-auto text-primary" />
            <h3 className="text-lg font-bold">{t("selectLanguage")}</h3>
            <p className="text-sm text-muted-foreground">{t("choosePreferredLanguage")}</p>
          </div>

          <div className="space-y-2">
            {languages.map((language) => (
              <Button
                key={language.code}
                variant={currentLanguage === language.code ? "default" : "outline"}
                className="w-full justify-between h-12"
                onClick={() => {
                  onLanguageChange(language.code)
                  onClose()
                }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{language.flag}</span>
                  <div className="text-left">
                    <div className="font-medium">{language.name}</div>
                    <div className="text-xs opacity-70">{language.nativeName}</div>
                  </div>
                </div>
                {currentLanguage === language.code && <Check className="w-4 h-4" />}
              </Button>
            ))}
          </div>

          <Button variant="outline" onClick={onClose} className="w-full bg-transparent">
            {t("cancel")}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
