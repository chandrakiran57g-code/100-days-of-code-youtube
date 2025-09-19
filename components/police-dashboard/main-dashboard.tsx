"use client"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AbhayaLogo } from "@/components/abhaya-logo"
import { RealGoogleMaps } from "@/components/real-google-maps"
import { SmartChatbot } from "@/components/smart-chatbot"
import { SearchResults } from "@/components/search-results"
import { SettingsPanel } from "@/components/settings-panel"
import { TrackingModal } from "@/components/tracking-modal"
import {
  Users,
  AlertTriangle,
  Shield,
  Search,
  Filter,
  MapPin,
  Clock,
  Eye,
  TrendingUp,
  Activity,
  Settings,
  MessageCircle,
} from "lucide-react"

interface MainDashboardProps {
  onTouristSelect: (tourist: any) => void
  onLogout: () => void
}

export function MainDashboard({ onTouristSelect, onLogout }: MainDashboardProps) {
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [currentLocation, setCurrentLocation] = useState({ lat: 28.6139, lng: 77.209 })
  const [showChatbot, setShowChatbot] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [showTrackingModal, setShowTrackingModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const dashboardRef = useRef<HTMLDivElement>(null)

  const tourists = [
    {
      id: "ABH001",
      name: "John Smith",
      location: "Red Fort",
      safetyScore: 92,
      status: "safe",
      lastUpdate: "2 min ago",
      soloFemale: false,
      coordinates: { lat: 28.6562, lng: 77.241 },
    },
    {
      id: "ABH002",
      name: "Sarah Johnson",
      location: "Chandni Chowk",
      safetyScore: 65,
      status: "caution",
      lastUpdate: "5 min ago",
      soloFemale: true,
      coordinates: { lat: 28.6506, lng: 77.2334 },
    },
    {
      id: "ABH003",
      name: "Mike Wilson",
      location: "Karol Bagh",
      safetyScore: 45,
      status: "high-risk",
      lastUpdate: "1 min ago",
      soloFemale: false,
      coordinates: { lat: 28.6519, lng: 77.1909 },
    },
    {
      id: "ABH004",
      name: "Emma Davis",
      location: "India Gate",
      safetyScore: 88,
      status: "safe",
      lastUpdate: "3 min ago",
      soloFemale: true,
      coordinates: { lat: 28.6129, lng: 77.2295 },
    },
  ]

  const alerts = [
    "SOS Alert: Tourist ABH003 - Karol Bagh - 2 min ago",
    "Geo-fence: Tourist ABH002 entered high-risk area - 5 min ago",
    "Family Alert: Tourist ABH005 reported missing family member - 8 min ago",
    "Anomaly: Tourist ABH001 deviated from planned route - 12 min ago",
  ]

  const handleModalToggle = (modalType: string) => {
    setShowChatbot(false)
    setShowSettings(false)
    setShowSearchResults(false)
    setShowTrackingModal(false)

    switch (modalType) {
      case "chatbot":
        setShowChatbot(true)
        break
      case "settings":
        setShowSettings(true)
        break
      case "search":
        setShowSearchResults(true)
        break
      case "tracking":
        setShowTrackingModal(true)
        break
    }
  }

  const handleSearch = (query: string) => {
    console.log("[v0] Police search initiated:", query)
    setSearchQuery(query)
    setShowSearchResults(true)
  }

  const handleSearchResultSelect = (result: any) => {
    console.log("[v0] Police search result selected:", result)
    if (result.coordinates) {
      setCurrentLocation(result.coordinates)
    }
    setShowSearchResults(false)
  }

  const handleLogoClick = () => {
    setShowChatbot(false)
    setShowSettings(false)
    setShowSearchResults(false)
    setShowTrackingModal(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dashboardRef.current && !dashboardRef.current.contains(event.target as Node)) {
        setShowChatbot(false)
        setShowSettings(false)
        setShowSearchResults(false)
        setShowTrackingModal(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "safe":
        return "bg-green-100 text-green-800"
      case "caution":
        return "bg-yellow-100 text-yellow-800"
      case "high-risk":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredTourists = tourists.filter((tourist) => {
    const matchesSearch =
      tourist.name.toLowerCase().includes(searchTerm.toLowerCase()) || tourist.id.includes(searchTerm)
    const matchesFilter =
      activeFilter === "all" ||
      (activeFilter === "high-risk" && tourist.status === "high-risk") ||
      (activeFilter === "solo-female" && tourist.soloFemale) ||
      (activeFilter === "low-score" && tourist.safetyScore < 70) ||
      (activeFilter === "alerts" && tourist.status !== "safe")

    return matchesSearch && matchesFilter
  })

  return (
    <div ref={dashboardRef} className="min-h-screen bg-slate-900 text-white">
      <div className="bg-slate-800 border-b border-slate-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <AbhayaLogo size="sm" onClick={handleLogoClick} />
            <div>
              <h1 className="text-xl font-bold font-[family-name:var(--font-rubik)]">ABHAYA Command Center</h1>
              <p className="text-sm text-slate-400">Real-time Tourist Monitoring</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search locations, services..."
                className="pl-10 w-64 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSearch(e.currentTarget.value)
                  }
                }}
              />
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleModalToggle("chatbot")}
              className="text-slate-400 hover:text-white"
            >
              <MessageCircle className="w-4 h-4" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleModalToggle("settings")}
              className="text-slate-400 hover:text-white"
            >
              <Settings className="w-4 h-4" />
            </Button>

            <div className="text-sm text-slate-400">Officer: Badge #12345 | Shift: Day</div>
            <Button variant="ghost" onClick={onLogout} className="text-slate-400 hover:text-white">
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="flex">
        <div className="w-80 bg-slate-800 border-r border-slate-700 p-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search tourists..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-3">
              <Filter className="w-4 h-4 text-slate-400" />
              <span className="text-sm font-medium text-slate-300">Filters</span>
            </div>
            {[
              { key: "all", label: "All Tourists", count: tourists.length },
              { key: "high-risk", label: "High Risk", count: tourists.filter((t) => t.status === "high-risk").length },
              { key: "solo-female", label: "Solo Female", count: tourists.filter((t) => t.soloFemale).length },
              { key: "low-score", label: "Low Safety Score", count: tourists.filter((t) => t.safetyScore < 70).length },
              { key: "alerts", label: "Active Alerts", count: tourists.filter((t) => t.status !== "safe").length },
            ].map((filter) => (
              <Button
                key={filter.key}
                variant={activeFilter === filter.key ? "default" : "ghost"}
                className="w-full justify-between text-left"
                onClick={() => setActiveFilter(filter.key)}
              >
                <span>{filter.label}</span>
                <Badge variant="outline" className="text-xs">
                  {filter.count}
                </Badge>
              </Button>
            ))}
          </div>

          <Card className="p-3 bg-slate-700 border-slate-600">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-red-400" />
              <span className="text-sm font-medium text-slate-300">Live Alerts</span>
            </div>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {alerts.map((alert, index) => (
                <div key={index} className="text-xs text-slate-400 p-2 bg-slate-800 rounded">
                  {alert}
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="flex-1 p-6 space-y-6">
          <div className="grid grid-cols-4 gap-4">
            <Card className="p-4 bg-slate-800 border-slate-700">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-blue-400" />
                <div>
                  <p className="text-2xl font-bold text-white">{tourists.length}</p>
                  <p className="text-sm text-slate-400">Active Tourists</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-slate-800 border-slate-700">
              <div className="flex items-center gap-3">
                <Shield className="w-8 h-8 text-green-400" />
                <div>
                  <p className="text-2xl font-bold text-white">{tourists.filter((t) => t.status === "safe").length}</p>
                  <p className="text-sm text-slate-400">Safe</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-slate-800 border-slate-700">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-8 h-8 text-yellow-400" />
                <div>
                  <p className="text-2xl font-bold text-white">
                    {tourists.filter((t) => t.status === "caution").length}
                  </p>
                  <p className="text-sm text-slate-400">Caution</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-slate-800 border-slate-700">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-red-400" />
                <div>
                  <p className="text-2xl font-bold text-white">
                    {tourists.filter((t) => t.status === "high-risk").length}
                  </p>
                  <p className="text-sm text-slate-400">High Risk</p>
                </div>
              </div>
            </Card>
          </div>

          <Tabs defaultValue="map" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-slate-800 border-slate-700">
              <TabsTrigger
                value="map"
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                <MapPin className="w-4 h-4" />
                <span className="hidden sm:inline">Live Map</span>
              </TabsTrigger>
              <TabsTrigger
                value="monitoring"
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                <Activity className="w-4 h-4" />
                <span className="hidden sm:inline">Monitoring</span>
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                <TrendingUp className="w-4 h-4" />
                <span className="hidden sm:inline">Analytics</span>
              </TabsTrigger>
              <TabsTrigger
                value="tracking"
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                <Eye className="w-4 h-4" />
                <span className="hidden sm:inline">Tracking</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="map" className="mt-4">
              <Card className="p-6 bg-slate-800 border-slate-700">
                <RealGoogleMaps
                  currentLocation={currentLocation}
                  onLocationChange={setCurrentLocation}
                  safetyScore={85}
                />
              </Card>
            </TabsContent>

            <TabsContent value="monitoring" className="mt-4">
              <Card className="p-6 bg-slate-800 border-slate-700">
                <h3 className="text-lg font-bold text-white mb-4">Tourist Monitoring</h3>
                <div className="space-y-3">
                  {filteredTourists.map((tourist) => (
                    <div
                      key={tourist.id}
                      className="flex items-center justify-between p-4 bg-slate-700 rounded-lg hover:bg-slate-600 cursor-pointer transition-colors"
                      onClick={() => onTouristSelect(tourist)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-slate-300" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-white">{tourist.name}</h4>
                            <span className="text-xs text-slate-400">({tourist.id})</span>
                            {tourist.soloFemale && (
                              <Badge className="bg-pink-100 text-pink-800 text-xs">Solo Female</Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-slate-400">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {tourist.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {tourist.lastUpdate}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="text-sm font-medium text-white">Score: {tourist.safetyScore}</div>
                          <Badge className={getStatusColor(tourist.status)}>{tourist.status}</Badge>
                        </div>
                        <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="mt-4">
              <Card className="p-6 bg-slate-800 border-slate-700">
                <h3 className="text-lg font-bold text-white mb-4">Predictive Analytics</h3>
                <div className="h-64 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                    <p className="text-slate-400">Advanced Analytics Dashboard</p>
                    <p className="text-xs text-slate-500">Risk prediction and pattern analysis</p>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="tracking" className="mt-4">
              <Card className="p-6 bg-slate-800 border-slate-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white">Live Tracking</h3>
                  <Button onClick={() => handleModalToggle("tracking")} className="bg-primary hover:bg-primary/90">
                    Open Tracking Modal
                  </Button>
                </div>
                <div className="h-64 bg-gradient-to-br from-green-900/20 to-red-900/20 rounded-lg relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                      <p className="text-slate-400">Real-time Tracking Interface</p>
                      <p className="text-xs text-slate-500">Monitor tourist movements and safety status</p>
                    </div>
                  </div>

                  <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
                  <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-red-400 rounded-full animate-pulse" />
                  <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {showChatbot && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-end justify-end p-4">
          <SmartChatbot isOpen={showChatbot} onToggle={() => setShowChatbot(false)} />
        </div>
      )}

      {showSettings && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <SettingsPanel isOpen={showSettings} onClose={() => setShowSettings(false)} />
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
          trackingData={{
            type: "emergency",
            provider: {
              name: "Emergency Response Unit",
              avatar: "/police-officer.jpg",
              rating: 5.0,
              phone: "+91-100",
              vehicle: "Police Patrol Car",
              license: "POLICE-001",
            },
            status: "active",
            eta: 3,
            currentLocation: "Police Station Connaught Place",
            destination: "Tourist Location - Karol Bagh",
            route: {
              distance: "2.1 km",
              duration: "5 min",
              safetyScore: 95,
            },
            liveLocation: {
              lat: 28.6328,
              lng: 77.2197,
            },
          }}
        />
      )}
    </div>
  )
}
