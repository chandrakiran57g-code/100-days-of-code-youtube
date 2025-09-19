"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AbhayaLogo } from "@/components/abhaya-logo"
import { Camera, Upload, User, MapPin, Phone } from "lucide-react"

interface OnboardingProps {
  onComplete: (userData: any) => void
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(1)
  const [userData, setUserData] = useState({
    language: "",
    name: "",
    document: "",
    itinerary: "",
    emergencyContact: "",
  })

  const languages = [
    "English",
    "Hindi",
    "Bengali",
    "Telugu",
    "Marathi",
    "Tamil",
    "Gujarati",
    "Urdu",
    "Kannada",
    "Malayalam",
    "Punjabi",
  ]

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1)
    } else {
      onComplete(userData)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4 flex items-center justify-center">
      <Card className="w-full max-w-md p-6 space-y-6">
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>

        {step === 1 && (
          <div className="text-center space-y-6">
            <AbhayaLogo size="lg" className="mx-auto" />
            <div>
              <h2 className="text-2xl font-bold text-primary font-[family-name:var(--font-rubik)]">
                Welcome to ABHAYA
              </h2>
              <p className="text-muted-foreground mt-2">Your Smart Tourist Guardian</p>
            </div>
            <div className="space-y-4">
              <Label htmlFor="language">Select Your Language</Label>
              <Select
                value={userData.language}
                onValueChange={(value) => setUserData({ ...userData, language: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang} value={lang}>
                      {lang}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center">
              <User className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-xl font-bold">Personal Information</h2>
              <p className="text-sm text-muted-foreground">Enter your basic details</p>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  placeholder="Enter your full name"
                />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center">
              <Upload className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-xl font-bold">Document Verification</h2>
              <p className="text-sm text-muted-foreground">Upload Aadhaar or Passport for KYC</p>
            </div>
            <div className="space-y-4">
              <Button variant="outline" className="w-full h-20 border-dashed bg-transparent">
                <div className="text-center">
                  <Camera className="w-6 h-6 mx-auto mb-2" />
                  <span>Capture Document</span>
                </div>
              </Button>
              <Button variant="outline" className="w-full h-20 border-dashed bg-transparent">
                <div className="text-center">
                  <Upload className="w-6 h-6 mx-auto mb-2" />
                  <span>Upload from Gallery</span>
                </div>
              </Button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-xl font-bold">Trip Itinerary</h2>
              <p className="text-sm text-muted-foreground">Share your planned destinations</p>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="itinerary">Planned Destinations</Label>
                <Input
                  id="itinerary"
                  value={userData.itinerary}
                  onChange={(e) => setUserData({ ...userData, itinerary: e.target.value })}
                  placeholder="e.g., Delhi, Agra, Jaipur"
                />
              </div>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-6">
            <div className="text-center">
              <Phone className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-xl font-bold">Emergency Contacts</h2>
              <p className="text-sm text-muted-foreground">Add trusted contacts for emergencies</p>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="emergency">Emergency Contact</Label>
                <Input
                  id="emergency"
                  value={userData.emergencyContact}
                  onChange={(e) => setUserData({ ...userData, emergencyContact: e.target.value })}
                  placeholder="Enter phone number"
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-3">
          {step > 1 && (
            <Button variant="outline" onClick={handleBack} className="flex-1 bg-transparent">
              Back
            </Button>
          )}
          <Button
            onClick={handleNext}
            className="flex-1"
            disabled={
              (step === 1 && !userData.language) ||
              (step === 2 && !userData.name) ||
              (step === 4 && !userData.itinerary) ||
              (step === 5 && !userData.emergencyContact)
            }
          >
            {step === 5 ? "Complete Setup" : "Next"}
          </Button>
        </div>
      </Card>
    </div>
  )
}
