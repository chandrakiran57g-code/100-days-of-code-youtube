"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SecureAPIClient } from "@/lib/secure-api-client"
import { Languages, Copy, Volume2 } from "lucide-react"

const EMERGENCY_PHRASES = [
  "Emergency! Need help!",
  "Where is the nearest hospital?",
  "I need police help",
  "Call ambulance!",
  "I am lost",
  "Can you help me?",
]

const LANGUAGES = [
  { code: "hi", name: "Hindi" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
]

export function TranslationIntegration() {
  const [inputText, setInputText] = useState("")
  const [translatedText, setTranslatedText] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState("hi")
  const [loading, setLoading] = useState(false)

  const handleTranslate = async (text?: string) => {
    const textToTranslate = text || inputText
    if (!textToTranslate.trim()) return

    setLoading(true)
    try {
      const translated = await SecureAPIClient.translateText(textToTranslate, selectedLanguage)
      setTranslatedText(translated)
    } catch (error) {
      console.error("Translation error:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(translatedText)
  }

  const handleSpeak = () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(translatedText)
      utterance.lang = selectedLanguage
      speechSynthesis.speak(utterance)
    }
  }

  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-3 flex items-center gap-2">
        <Languages className="w-5 h-5" />
        Emergency Translation
      </h3>

      {/* Language Selection */}
      <div className="mb-4">
        <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
          <SelectTrigger>
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            {LANGUAGES.map((lang) => (
              <SelectItem key={lang.code} value={lang.code}>
                {lang.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Quick Emergency Phrases */}
      <div className="mb-4">
        <h4 className="text-sm font-medium mb-2">Quick Emergency Phrases</h4>
        <div className="grid grid-cols-1 gap-2">
          {EMERGENCY_PHRASES.map((phrase, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="justify-start text-left h-auto py-2 bg-transparent"
              onClick={() => handleTranslate(phrase)}
            >
              {phrase}
            </Button>
          ))}
        </div>
      </div>

      {/* Custom Translation */}
      <div className="space-y-3">
        <div className="flex gap-2">
          <Input
            placeholder="Type text to translate..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleTranslate()}
          />
          <Button onClick={() => handleTranslate()} disabled={loading}>
            Translate
          </Button>
        </div>

        {/* Translation Result */}
        {translatedText && (
          <div className="p-3 bg-primary/5 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Translation:</span>
              <div className="flex gap-1">
                <Button size="sm" variant="ghost" onClick={handleCopy}>
                  <Copy className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost" onClick={handleSpeak}>
                  <Volume2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <p className="text-lg font-medium">{translatedText}</p>
          </div>
        )}
      </div>
    </Card>
  )
}
