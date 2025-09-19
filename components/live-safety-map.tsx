"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Plus, Minus, Maximize2, Navigation, Shield } from "lucide-react"

interface LiveSafetyMapProps {
  currentLocation: { lat: number; lng: number }
  onLocationChange: (location: { lat: number; lng: number }) => void
  safetyScore: number
}

export function LiveSafetyMap({ currentLocation, onLocationChange, safetyScore }: LiveSafetyMapProps) {
  const [selectedRegion, setSelectedRegion] = useState("all-regions")
  const [activeTourists, setActiveTourists] = useState(291)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [safetyZones] = useState([
    { type: "safe", percentage: "80%+", color: "bg-green-500", count: 15 },
    { type: "caution", percentage: "75-89%", color: "bg-yellow-500", count: 8 },
    { type: "risk", percentage: "<75%", color: "bg-red-500", count: 3 },
  ])

  const mockPlaces = [
    { name: "Red Fort", lat: 28.6562, lng: 77.241, type: "tourist", safety: 85 },
    { name: "India Gate", lat: 28.6129, lng: 77.2295, type: "tourist", safety: 90 },
    { name: "AIIMS Hospital", lat: 28.5672, lng: 77.21, type: "medical", safety: 95 },
    { name: "CP Police Station", lat: 28.6315, lng: 77.2167, type: "police", safety: 90 },
    { name: "Khan Market", lat: 28.6004, lng: 77.2272, type: "shopping", safety: 75 },
    { name: "Humayun's Tomb", lat: 28.5933, lng: 77.2507, type: "tourist", safety: 80 },
  ]

  const getMarkerIcon = (type: string, safety: number) => {
    const safetyColor = safety >= 80 ? "green" : safety >= 75 ? "yellow" : "red"
    const icons = {
      tourist: "🏛️",
      medical: "🏥",
      police: "👮",
      shopping: "🛍️",
    }
    return { icon: icons[type as keyof typeof icons] || "📍", color: safetyColor }
  }

  return (
    <div className={`${isFullscreen ? "fixed inset-0 z-50 bg-white" : ""}`}>
      <Card className="overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-green-600" />
                <h2 className="font-bold text-lg">Live Tourist Safety Map</h2>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-600 font-medium">Live</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-regions">All Regions</SelectItem>
                  <SelectItem value="central-delhi">Central Delhi</SelectItem>
                  <SelectItem value="old-delhi">Old Delhi</SelectItem>
                  <SelectItem value="new-delhi">New Delhi</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4" />
              </Button>

              <Button variant="outline" size="sm">
                <Minus className="w-4 h-4" />
              </Button>

              <Button variant="outline" size="sm" onClick={() => setIsFullscreen(!isFullscreen)}>
                <Maximize2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="relative">
          {/* Map Background - Using the reference image style */}
          <div className="w-full h-[500px] bg-gradient-to-br from-green-100 via-blue-50 to-green-50 relative overflow-hidden">
            {/* Map Grid Lines */}
            <div className="absolute inset-0 opacity-20">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={`v-${i}`} className="absolute h-full w-px bg-gray-300" style={{ left: `${i * 5}%` }} />
              ))}
              {Array.from({ length: 15 }).map((_, i) => (
                <div key={`h-${i}`} className="absolute w-full h-px bg-gray-300" style={{ top: `${i * 6.67}%` }} />
              ))}
            </div>

            {/* Location Info */}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
              <div className="text-sm">
                <p className="font-bold">28°36'50.0"N 77°12'32.4"E</p>
                <p className="text-muted-foreground">J675+HJ6 New Delhi, Delhi</p>
                <Button variant="link" className="p-0 h-auto text-blue-600 text-sm">
                  View larger map
                </Button>
              </div>
            </div>

            {/* Active Tourists Counter */}
            <div className="absolute top-4 right-4 bg-gray-800 text-white rounded-lg p-3 shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{activeTourists}</div>
                <div className="text-xs">Active Tourists</div>
              </div>
            </div>

            {/* Safety Zones Legend */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Safety Zones
              </h3>
              <div className="space-y-2">
                {safetyZones.map((zone, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div className={`w-3 h-3 rounded-full ${zone.color}`}></div>
                    <span className="capitalize">{zone.type}</span>
                    <span className="text-muted-foreground">({zone.percentage})</span>
                    <Badge variant="outline" className="text-xs">
                      {zone.count}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Markers */}
            {mockPlaces.map((place, index) => {
              const marker = getMarkerIcon(place.type, place.safety)
              const x = ((place.lng - 77.15) / 0.15) * 100 // Convert lng to percentage
              const y = ((28.7 - place.lat) / 0.15) * 100 // Convert lat to percentage (inverted)

              return (
                <div
                  key={index}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  style={{ left: `${Math.max(5, Math.min(95, x))}%`, top: `${Math.max(5, Math.min(95, y))}%` }}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-sm shadow-lg border-2 border-white ${
                      marker.color === "green"
                        ? "bg-green-500"
                        : marker.color === "yellow"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }`}
                  >
                    {marker.icon}
                  </div>

                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                      <div className="font-medium">{place.name}</div>
                      <div>Safety: {place.safety}%</div>
                    </div>
                  </div>
                </div>
              )
            })}

            {/* Current Location Marker */}
            <div className="absolute transform -translate-x-1/2 -translate-y-1/2" style={{ left: "50%", top: "60%" }}>
              <div className="relative">
                <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                <div className="absolute inset-0 w-4 h-4 bg-blue-600 rounded-full animate-ping opacity-30"></div>
              </div>
            </div>

            {/* Roads and Landmarks */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Major Roads */}
              <div
                className="absolute bg-gray-400 opacity-60"
                style={{
                  left: "20%",
                  top: "30%",
                  width: "60%",
                  height: "2px",
                  transform: "rotate(15deg)",
                }}
              ></div>
              <div
                className="absolute bg-gray-400 opacity-60"
                style={{
                  left: "10%",
                  top: "70%",
                  width: "80%",
                  height: "2px",
                  transform: "rotate(-10deg)",
                }}
              ></div>

              {/* Landmark Labels */}
              <div className="absolute top-[25%] left-[15%] text-xs font-medium text-gray-700 bg-white/80 px-1 rounded">
                Raj Ghat Memorial
              </div>
              <div className="absolute top-[45%] right-[20%] text-xs font-medium text-gray-700 bg-white/80 px-1 rounded">
                Jantar Mantar
              </div>
            </div>
          </div>

          {/* Map Controls */}
          <div className="absolute bottom-4 right-4 flex flex-col gap-2">
            <Button size="sm" variant="outline" className="bg-white/90 backdrop-blur-sm">
              <Plus className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="outline" className="bg-white/90 backdrop-blur-sm">
              <Minus className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="outline" className="bg-white/90 backdrop-blur-sm">
              <Navigation className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Footer Info */}
        <div className="p-3 bg-gray-50 border-t flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <span>Keyboard shortcuts</span>
            <span>Map data ©2025</span>
            <span>Terms</span>
            <span>Report a map error</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="link" className="p-0 h-auto text-blue-600 text-sm">
              Directions
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
