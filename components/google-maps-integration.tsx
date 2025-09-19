"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { APIServices, type PlaceData } from "@/lib/api-services"
import { MapPin, Star, Navigation, AlertTriangle } from "lucide-react"

interface GoogleMapsIntegrationProps {
  currentLocation: { lat: number; lng: number }
  onLocationChange: (location: { lat: number; lng: number }) => void
  safetyScore: number
}

export function GoogleMapsIntegration({ currentLocation, onLocationChange, safetyScore }: GoogleMapsIntegrationProps) {
  const [nearbyPlaces, setNearbyPlaces] = useState<PlaceData[]>([])
  const [selectedPlace, setSelectedPlace] = useState<PlaceData | null>(null)
  const [routeInfo, setRouteInfo] = useState<any>(null)

  useEffect(() => {
    loadNearbyPlaces()
  }, [currentLocation])

  const loadNearbyPlaces = async () => {
    // Mock nearby places data
    const places = [
      await APIServices.getPlaceDetails("red-fort"),
      await APIServices.getPlaceDetails("india-gate"),
      await APIServices.getPlaceDetails("lotus-temple"),
    ].filter(Boolean) as PlaceData[]

    setNearbyPlaces(places)
  }

  const handlePlaceSelect = (place: PlaceData) => {
    setSelectedPlace(place)
    // Mock route calculation
    setRouteInfo({
      distance: "2.5 km",
      duration: "8 mins",
      safetyRating: safetyScore >= 80 ? "Safe Route" : safetyScore >= 60 ? "Caution Advised" : "High Risk Route",
    })
  }

  const getRouteSafetyColor = () => {
    if (safetyScore >= 80) return "text-green-600 bg-green-50"
    if (safetyScore >= 60) return "text-yellow-600 bg-yellow-50"
    return "text-red-600 bg-red-50"
  }

  return (
    <div className="space-y-4">
      {/* Interactive Map Placeholder */}
      <Card className="p-4 bg-gradient-to-br from-blue-50 to-green-50 min-h-[300px] relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Live Map with Real-time Data</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Lat: {currentLocation.lat.toFixed(4)}, Lng: {currentLocation.lng.toFixed(4)}
            </p>

            {/* Geofencing Visualization */}
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${getRouteSafetyColor()}`}>
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm font-medium">
                {safetyScore >= 80 ? "Safe Zone" : safetyScore >= 60 ? "Caution Zone" : "High Risk Zone"}
              </span>
            </div>
          </div>
        </div>

        {/* Mock GPS Controls */}
        <div className="absolute top-4 right-4 space-y-2">
          <Button size="sm" onClick={() => onLocationChange({ lat: 28.6139, lng: 77.209 })}>
            <Navigation className="w-4 h-4 mr-1" />
            India Gate
          </Button>
          <Button size="sm" onClick={() => onLocationChange({ lat: 28.6562, lng: 77.241 })}>
            <MapPin className="w-4 h-4 mr-1" />
            Red Fort
          </Button>
        </div>
      </Card>

      {/* Nearby Places with Reviews */}
      <Card className="p-4">
        <h3 className="font-semibold mb-3">Nearby Places & Reviews</h3>
        <div className="space-y-3">
          {nearbyPlaces.map((place, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
              onClick={() => handlePlaceSelect(place)}
            >
              <div className="flex-1">
                <h4 className="font-medium">{place.name}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm ml-1">{place.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{place.reviews.length} reviews</span>
                </div>
              </div>
              <Button size="sm" variant="outline">
                View Route
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Route Information */}
      {selectedPlace && routeInfo && (
        <Card className="p-4">
          <h3 className="font-semibold mb-3">Route to {selectedPlace.name}</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Distance:</span>
              <span className="font-medium">{routeInfo.distance}</span>
            </div>
            <div className="flex justify-between">
              <span>Duration:</span>
              <span className="font-medium">{routeInfo.duration}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Safety Rating:</span>
              <Badge className={getRouteSafetyColor()}>{routeInfo.safetyRating}</Badge>
            </div>
          </div>

          {/* Recent Reviews */}
          <div className="mt-4">
            <h4 className="font-medium mb-2">Recent Reviews</h4>
            <div className="space-y-2">
              {selectedPlace.reviews.slice(0, 2).map((review, index) => (
                <div key={index} className="text-sm bg-white p-2 rounded border">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{review.author}</span>
                    <div className="flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-yellow-500 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
