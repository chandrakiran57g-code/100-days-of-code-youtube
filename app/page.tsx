"use client"

import { useState, useEffect } from "react"
import { AbhayaLogo } from "@/components/abhaya-logo"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { SessionManager } from "@/lib/session-manager"
import { ArrowLeft, Shield, Users } from "lucide-react"

// Tourist App Components
import { Onboarding } from "@/components/tourist-app/onboarding"
import { DigitalId } from "@/components/tourist-app/digital-id"
import { MainDashboard } from "@/components/tourist-app/main-dashboard"
import { SosModal } from "@/components/tourist-app/sos-modal"
import { FamilyTracking } from "@/components/tourist-app/family-tracking"
import { Itinerary } from "@/components/tourist-app/itinerary"
import { Profile } from "@/components/tourist-app/profile"

// Police Dashboard Components
import { Login } from "@/components/police-dashboard/login"
import { MainDashboard as PoliceMainDashboard } from "@/components/police-dashboard/main-dashboard"
import { TouristDetail } from "@/components/police-dashboard/tourist-detail"
import { PredictiveAnalytics } from "@/components/police-dashboard/predictive-analytics"

export default function HomePage() {
  const [activeView, setActiveView] = useState<"home" | "tourist" | "police">("home")
  const [touristScreen, setTouristScreen] = useState<string>("onboarding")
  const [policeScreen, setPoliceScreen] = useState<string>("login")
  const [userData, setUserData] = useState<any>(null)
  const [selectedTourist, setSelectedTourist] = useState<any>(null)
  const [showSosModal, setShowSosModal] = useState(false)
  const [isPoliceLoggedIn, setIsPoliceLoggedIn] = useState(false)

  useEffect(() => {
    const session = SessionManager.getSession()
    if (session) {
      if (session.type === "tourist") {
        setActiveView("tourist")
        setUserData(session.userData)
        setTouristScreen("dashboard")
      } else if (session.type === "police") {
        setActiveView("police")
        setIsPoliceLoggedIn(true)
        setPoliceScreen("dashboard")
      }
    }

    const activityInterval = setInterval(() => {
      SessionManager.updateActivity()
    }, 30000)

    return () => clearInterval(activityInterval)
  }, [])

  const handleOnboardingComplete = (data: any) => {
    setUserData(data)
    SessionManager.saveSession({
      id: Date.now().toString(),
      type: "tourist",
      userData: data,
      loginTime: Date.now(),
      lastActivity: Date.now(),
    })
    setTouristScreen("digital-id")
    setTimeout(() => {
      setTouristScreen("dashboard")
    }, 3000)
  }

  const handleTouristNavigation = (screen: string) => {
    if (screen === "sos") {
      setShowSosModal(true)
    } else {
      setTouristScreen(screen)
    }
  }

  const handlePoliceLogin = (credentials: any) => {
    setIsPoliceLoggedIn(true)
    SessionManager.saveSession({
      id: Date.now().toString(),
      type: "police",
      userData: credentials,
      loginTime: Date.now(),
      lastActivity: Date.now(),
    })
    setPoliceScreen("dashboard")
  }

  const handlePoliceLogout = () => {
    SessionManager.clearSession()
    setIsPoliceLoggedIn(false)
    setPoliceScreen("login")
  }

  const handleTouristLogout = () => {
    SessionManager.clearSession()
    setActiveView("home")
    setTouristScreen("onboarding")
    setUserData(null)
  }

  const handleTouristSelect = (tourist: any) => {
    setSelectedTourist(tourist)
    setPoliceScreen("tourist-detail")
  }

  const handleBackToHome = () => {
    setActiveView("home")
    setTouristScreen("onboarding")
    setPoliceScreen("login")
    setUserData(null)
    setIsPoliceLoggedIn(false)
  }

  const handleLogoClickToHome = () => {
    handleBackToHome()
  }

  if (activeView === "tourist") {
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
        {touristScreen === "onboarding" && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBackToHome}
            className="absolute top-4 left-4 z-50 bg-white/80 backdrop-blur-sm hover:bg-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        )}

        {touristScreen === "onboarding" && <Onboarding onComplete={handleOnboardingComplete} />}
        {touristScreen === "digital-id" && <DigitalId userData={userData} />}
        {touristScreen === "dashboard" && (
          <MainDashboard userData={userData} onNavigate={handleTouristNavigation} onLogout={handleTouristLogout} />
        )}
        {touristScreen === "family" && <FamilyTracking onBack={() => setTouristScreen("dashboard")} />}
        {touristScreen === "itinerary" && <Itinerary onBack={() => setTouristScreen("dashboard")} />}
        {touristScreen === "profile" && (
          <Profile userData={userData} onBack={() => setTouristScreen("dashboard")} onLogout={handleTouristLogout} />
        )}

        {showSosModal && <SosModal onClose={() => setShowSosModal(false)} />}
      </div>
    )
  }

  if (activeView === "police") {
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-slate-900 to-blue-900">
        {policeScreen === "login" && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBackToHome}
            className="absolute top-4 left-4 z-50 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        )}

        {policeScreen === "login" && <Login onLogin={handlePoliceLogin} />}
        {policeScreen === "dashboard" && (
          <PoliceMainDashboard onTouristSelect={handleTouristSelect} onLogout={handlePoliceLogout} />
        )}
        {policeScreen === "tourist-detail" && (
          <TouristDetail tourist={selectedTourist} onBack={() => setPoliceScreen("dashboard")} />
        )}
        {policeScreen === "analytics" && <PredictiveAnalytics onBack={() => setPoliceScreen("dashboard")} />}

        {/* Navigation buttons for police dashboard */}
        {isPoliceLoggedIn && policeScreen === "dashboard" && (
          <Button
            onClick={() => setPoliceScreen("analytics")}
            className="fixed bottom-4 right-4 bg-primary hover:bg-primary/90 shadow-lg"
          >
            Analytics
          </Button>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4 animate-gradient">
      <Card className="w-full max-w-md p-8 text-center space-y-8 shadow-2xl border-0 bg-white/90 backdrop-blur-sm hover-lift">
        <div className="flex justify-center animate-bounce-in">
          <AbhayaLogo size="xl" onClick={handleLogoClickToHome} />
        </div>

        <div className="space-y-3 animate-fade-in">
          <h1 className="text-4xl font-bold text-primary font-sans tracking-tight">ABHAYA</h1>
          <p className="text-xl text-muted-foreground font-medium">Smart Tourist Guardian</p>
          <p className="text-sm text-muted-foreground italic bg-green-50 px-4 py-2 rounded-full">
            "Fearless Journeys, Powered by AI"
          </p>
        </div>

        <div className="space-y-4 animate-slide-up">
          <Button
            onClick={() => setActiveView("tourist")}
            className="w-full bg-primary hover:bg-primary/90 text-white shadow-lg hover-lift transition-all"
            size="lg"
          >
            <Users className="w-5 h-5 mr-2" />
            Tourist Mobile App
          </Button>

          <Button
            onClick={() => setActiveView("police")}
            variant="outline"
            className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-white shadow-lg hover-lift transition-all"
            size="lg"
          >
            <Shield className="w-5 h-5 mr-2" />
            Police Command Center
          </Button>
        </div>

        <div className="text-xs text-muted-foreground pt-6 space-y-1">
          <div className="bg-green-100 text-green-700 px-3 py-2 rounded-full">
            <span className="font-medium">✓ Session Persistence Enabled</span>
          </div>
          <p className="text-gray-500">Prototype System - Demo Version</p>
        </div>
      </Card>
    </div>
  )
}
