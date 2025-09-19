"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfessionalHeader } from "@/components/professional-header"
import { RealGoogleMaps } from "@/components/real-google-maps"
import { SmartChatbot } from "@/components/smart-chatbot"
import { IoTWristband } from "@/components/iot-wristband"
import { RFIDScanner } from "@/components/rfid-scanner"
import { HazardReporting } from "@/components/hazard-reporting"
import { WeatherNewsIntegration } from "@/components/weather-news-integration"
import { YouTubeIntegration } from "@/components/youtube-integration"
import { TranslationIntegration } from "@/components/translation-integration"
import { SearchResults } from "@/components/search-results"
import { DebugConsole } from "@/components/debug-console"
import { TrackingModal } from "@/components/tracking-modal"
import {
  AlertTriangle,
  Users,
  Calendar,
  User,
  Home,
  MapPin,
  Cloud,
  Youtube,
  Languages,
  MessageCircle,
  Watch,
  Scan,
  AlertOctagon,
  Terminal,
} from "lucide-react"

interface MainDashboardProps {
  userData: any
  onNavigate: (screen: string) => void
  onLogout: () => void
}

export function MainDashboard({ userData, onNavigate, onLogout }: MainDashboardProps) {
  const [safetyScore, setSafetyScore] = useState(85)
  const [currentLocation, setCurrentLocation] = useState({ lat: 28.6139, lng: 77.209 })
  const [locationName] = useState("Connaught Place, New Delhi")
  const [showChatbot, setShowChatbot] = useState(false)
  const [showWristband, setShowWristband] = useState(false)
  const [showRFID, setShowRFID] = useState(false)
  const [showHazardReport, setShowHazardReport] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [showDebugConsole, setShowDebugConsole] = useState(false)
  const [showTrackingModal, setShowTrackingModal] = useState(false)
  const [trackingData, setTrackingData] = useState({
    type: "guide" as "guide" | "transport" | "emergency",
    provider: {
      name: "Rajesh Kumar",
      avatar: "/indian-tour-guide.jpg",
      rating: 4.8,
      phone: "+91-9876543210",
      vehicle: "Maruti Swift Dzire",
      license: "DL-1234-5678",
    },
    status: "arriving" as "searching" | "assigned" | "arriving" | "active" | "completed",
    eta: 8,
    currentLocation: "India Gate Metro Station",
    destination: "Red Fort, Delhi",
    route: {
      distance: "3.2 km",
      duration: "12 min",
      safetyScore: 85,
    },
    liveLocation: {
      lat: 28.6129,
      lng: 77.2295,
    },
  })

  const dashboardRef = useRef<HTMLDivElement>(null)

  const handleSearch = (query: string) => {
    console.log("[v0] Search initiated:", query)
    setSearchQuery(query)
    setShowSearchResults(true)
  }

  const handleSearchResultSelect = (result: any) => {
    console.log("[v0] Search result selected:", result)
    // Navigate to the location on map
    if (result.coordinates) {
      setCurrentLocation(result.coordinates)
    }
    setShowSearchResults(false)
  }

  const handleScoreChange = (newScore: number) => {
    setSafetyScore(newScore)
  }

  const handleLogoClick = () => {
    // Close all modals and return to main dashboard view
    setShowChatbot(false)
    setShowWristband(false)
    setShowRFID(false)
    setShowHazardReport(false)
    setShowSearchResults(false)
    setShowDebugConsole(false)
    setShowTrackingModal(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dashboardRef.current && !dashboardRef.current.contains(event.target as Node)) {
        // Close all modals when clicking outside
        setShowChatbot(false)
        setShowWristband(false)
        setShowRFID(false)
        setShowHazardReport(false)
        setShowSearchResults(false)
        setShowDebugConsole(false)
        setShowTrackingModal(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleModalToggle = (modalType: string) => {
    // Close all modals first
    setShowChatbot(false)
    setShowWristband(false)
    setShowRFID(false)
    setShowHazardReport(false)
    setShowDebugConsole(false)
    setShowTrackingModal(false)

    // Then open the requested modal
    switch (modalType) {
      case "chatbot":
        setShowChatbot(true)
        break
      case "wristband":
        setShowWristband(true)
        break
      case "rfid":
        setShowRFID(true)
        break
      case "hazard":
        setShowHazardReport(true)
        break
      case "debug":
        setShowDebugConsole(true)
        break
      case "tracking":
        setShowTrackingModal(true)
        break
    }
  }

  return (
    <div ref={dashboardRef} className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <ProfessionalHeader
        userType="tourist"
        userData={userData}
        safetyScore={safetyScore}
        onLogout={onLogout}
        onSearch={handleSearch}
        onLogoClick={handleLogoClick}
      />

      <div className="p-4 pb-20">
        <Tabs defaultValue="map" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm border border-green-100">
            <TabsTrigger
              value="map"
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white transition-all"
            >
              <MapPin className="w-4 h-4" />
              <span className="hidden sm:inline">Map</span>
            </TabsTrigger>
            <TabsTrigger
              value="weather"
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white transition-all"
            >
              <Cloud className="w-4 h-4" />
              <span className="hidden sm:inline">Weather</span>
            </TabsTrigger>
            <TabsTrigger
              value="guides"
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white transition-all"
            >
              <Youtube className="w-4 h-4" />
              <span className="hidden sm:inline">Guides</span>
            </TabsTrigger>
            <TabsTrigger
              value="translate"
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white transition-all"
            >
              <Languages className="w-4 h-4" />
              <span className="hidden sm:inline">Translate</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="map" className="mt-4 animate-fade-in">
            <RealGoogleMaps
              currentLocation={currentLocation}
              onLocationChange={setCurrentLocation}
              safetyScore={safetyScore}
            />
          </TabsContent>

          <TabsContent value="weather" className="mt-4 animate-fade-in">
            <WeatherNewsIntegration currentLocation={currentLocation} locationName={locationName} />
          </TabsContent>

          <TabsContent value="guides" className="mt-4 animate-fade-in">
            <YouTubeIntegration currentLocation={locationName} />
          </TabsContent>

          <TabsContent value="translate" className="mt-4 animate-fade-in">
            <TranslationIntegration />
          </TabsContent>
        </Tabs>
      </div>

      <div className="px-4 space-y-4 pb-20">
        <div className="grid grid-cols-2 gap-4">
          <Card
            className="p-4 cursor-pointer hover-lift transition-all bg-white/80 backdrop-blur-sm border-green-100"
            onClick={() => onNavigate("family")}
          >
            <div className="text-center">
              <Users className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-sm font-semibold text-gray-800">Family Tracking</p>
              <p className="text-xs text-green-600 font-medium">3 members safe</p>
            </div>
          </Card>

          <Card
            className="p-4 cursor-pointer hover-lift transition-all bg-white/80 backdrop-blur-sm border-green-100"
            onClick={() => handleModalToggle("tracking")}
          >
            <div className="text-center">
              <Calendar className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-sm font-semibold text-gray-800">Live Tracking</p>
              <p className="text-xs text-blue-600 font-medium">Guide arriving</p>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Card
            className="p-3 cursor-pointer hover-lift transition-all bg-white/80 backdrop-blur-sm border-blue-100"
            onClick={() => handleModalToggle("chatbot")}
          >
            <div className="text-center">
              <MessageCircle className="w-6 h-6 text-blue-600 mx-auto mb-1" />
              <p className="text-xs font-semibold text-gray-800">AI Assistant</p>
            </div>
          </Card>

          <Card
            className="p-3 cursor-pointer hover-lift transition-all bg-white/80 backdrop-blur-sm border-green-100"
            onClick={() => handleModalToggle("wristband")}
          >
            <div className="text-center">
              <Watch className="w-6 h-6 text-green-600 mx-auto mb-1" />
              <p className="text-xs font-semibold text-gray-800">Health Monitor</p>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Card
            className="p-3 cursor-pointer hover-lift transition-all bg-white/80 backdrop-blur-sm border-purple-100"
            onClick={() => handleModalToggle("rfid")}
          >
            <div className="text-center">
              <Scan className="w-6 h-6 text-purple-600 mx-auto mb-1" />
              <p className="text-xs font-semibold text-gray-800">RFID Scanner</p>
            </div>
          </Card>

          <Card
            className="p-3 cursor-pointer hover-lift transition-all bg-white/80 backdrop-blur-sm border-orange-100"
            onClick={() => handleModalToggle("hazard")}
          >
            <div className="text-center">
              <AlertOctagon className="w-6 h-6 text-orange-600 mx-auto mb-1" />
              <p className="text-xs font-semibold text-gray-800">Report Hazard</p>
            </div>
          </Card>
        </div>

        <Card
          className="p-3 cursor-pointer hover-lift transition-all bg-white/80 backdrop-blur-sm border-gray-100"
          onClick={() => handleModalToggle("debug")}
        >
          <div className="text-center">
            <Terminal className="w-6 h-6 text-gray-600 mx-auto mb-1" />
            <p className="text-xs font-semibold text-gray-800">Debug Console</p>
          </div>
        </Card>

        {/* Enhanced Geo-fence Alert */}
        {safetyScore < 80 && (
          <Card className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200 animate-fade-in shadow-lg">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-yellow-600 animate-pulse" />
              <div>
                <p className="text-sm font-bold text-yellow-800">
                  {safetyScore < 60 ? "⚠️ High-Risk Area Detected" : "⚡ Entering Caution Zone"}
                </p>
                <p className="text-xs text-yellow-700 font-medium">
                  {safetyScore < 60
                    ? "Please exercise extreme caution and consider leaving"
                    : "Please be cautious and stay alert"}
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Enhanced SOS Button */}
      <Button
        size="lg"
        className="fixed bottom-20 right-4 w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 pulse-sos shadow-2xl z-40 border-4 border-white"
        onClick={() => onNavigate("sos")}
      >
        <div className="text-center">
          <AlertTriangle className="w-6 h-6 mx-auto" />
          <span className="text-xs font-bold">SOS</span>
        </div>
      </Button>

      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-green-100 px-4 py-2 shadow-lg">
        <div className="flex justify-around">
          <Button variant="ghost" size="sm" className="flex-col h-auto py-2 text-primary hover:bg-green-50">
            <Home className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">Home</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex-col h-auto py-2 hover:bg-green-50"
            onClick={() => onNavigate("itinerary")}
          >
            <Calendar className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">Itinerary</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex-col h-auto py-2 hover:bg-green-50"
            onClick={() => onNavigate("family")}
          >
            <Users className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">Family</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex-col h-auto py-2 hover:bg-green-50"
            onClick={() => onNavigate("profile")}
          >
            <User className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">Profile</span>
          </Button>
        </div>
      </div>

      {showChatbot && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-end justify-end p-4">
          <SmartChatbot isOpen={showChatbot} onToggle={() => setShowChatbot(false)} />
        </div>
      )}

      {showWristband && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <IoTWristband isOpen={showWristband} onToggle={() => setShowWristband(false)} />
        </div>
      )}

      {showRFID && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <RFIDScanner isOpen={showRFID} onToggle={() => setShowRFID(false)} />
        </div>
      )}

      {showHazardReport && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <HazardReporting
            isOpen={showHazardReport}
            onToggle={() => setShowHazardReport(false)}
            currentLocation={locationName}
          />
        </div>
      )}

      {showSearchResults && (
        <SearchResults
          query={searchQuery}
          isOpen={showSearchResults}
          onClose={() => setShowSearchResults(false)}
          onSelectResult={handleSearchResultSelect}
        />
      )}

      {showTrackingModal && (
        <TrackingModal
          isOpen={showTrackingModal}
          onClose={() => setShowTrackingModal(false)}
          trackingData={trackingData}
        />
      )}

      {showDebugConsole && <DebugConsole isOpen={showDebugConsole} onClose={() => setShowDebugConsole(false)} />}
    </div>
  )
}
