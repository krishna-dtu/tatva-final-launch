"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, X } from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"

interface EditProfileModalProps {
  user: any
  onSave: (updatedUser: any) => void
  onClose: () => void
}

export function EditProfileModal({ user, onSave, onClose }: EditProfileModalProps) {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: user?.name || "",
    age: user?.age || "",
    grade: user?.grade || "",
  })

  const handleSave = () => {
    const updatedUser = { ...user, ...formData }
    onSave(updatedUser)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-card/95 backdrop-blur-sm border-border/50">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            {t("editProfile")}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{t("name")}</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder={t("enterYourName")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="age">{t("age")}</Label>
            <Select
              value={formData.age.toString()}
              onValueChange={(value) => setFormData({ ...formData, age: Number.parseInt(value) })}
            >
              <SelectTrigger>
                <SelectValue placeholder={t("selectAge")} />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 13 }, (_, i) => i + 6).map((age) => (
                  <SelectItem key={age} value={age.toString()}>
                    {age} {t("years")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="grade">{t("grade")}</Label>
            <Select
              value={formData.grade.toString()}
              onValueChange={(value) => setFormData({ ...formData, grade: Number.parseInt(value) })}
            >
              <SelectTrigger>
                <SelectValue placeholder={t("selectGrade")} />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 13 }, (_, i) => i + 1).map((grade) => (
                  <SelectItem key={grade} value={grade.toString()}>
                    {t("class")} {grade}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              {t("cancel")}
            </Button>
            <Button onClick={handleSave} className="flex-1">
              {t("saveChanges")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
