"use client"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Navigation, Search, Phone, Shield, ExternalLink } from "lucide-react"

declare global {
  interface Window {
    google: any
    initMap: () => void
  }
}

interface RealGoogleMapsProps {
  currentLocation: { lat: number; lng: number }
  onLocationChange: (location: { lat: number; lng: number }) => void
  safetyScore: number
}

export function RealGoogleMaps({ currentLocation, onLocationChange, safetyScore }: RealGoogleMapsProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<any>(null)
  const [userMarker, setUserMarker] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [nearbyPlaces, setNearbyPlaces] = useState<any[]>([])
  const [isTracking, setIsTracking] = useState(false)
  const [routeRenderer, setRouteRenderer] = useState<any>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [directionsService, setDirectionsService] = useState<any>(null)
  const [hasApiAccess, setHasApiAccess] = useState(false)

  useEffect(() => {
    const loadGoogleMapsAPI = () => {
      if (window.google) {
        initializeMap()
        return
      }

      // Load Google Maps without API key for basic functionality
      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?libraries=places&callback=initMap`
      script.async = true
      script.defer = true

      window.initMap = initializeMap

      script.onerror = () => {
        console.log("Google Maps API not available - using fallback interface")
        setIsLoaded(true)
      }

      script.onload = () => {
        setHasApiAccess(true)
      }

      // Don't load the script if we don't have API access
      console.log("Google Maps integration available via server-side API")
      setIsLoaded(true)
      loadServerSidePlaces()
    }

    loadGoogleMapsAPI()
  }, [])

  const loadServerSidePlaces = async () => {
    try {
      const response = await fetch("/api/maps/places", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          location: currentLocation,
          radius: 2000,
          type: "tourist_attraction|hospital|police|restaurant",
        }),
      })

      const data = await response.json()
      if (data.places && data.places.length > 0) {
        setNearbyPlaces(data.places)
      }
    } catch (error) {
      console.log("Using fallback places data")
    }
  }

  const initializeMap = () => {
    if (!mapRef.current || map || !window.google) return

    const googleMap = new window.google.maps.Map(mapRef.current, {
      center: currentLocation,
      zoom: 15,
      mapTypeControl: true,
      streetViewControl: true,
      fullscreenControl: true,
      styles: [
        {
          featureType: "poi.business",
          stylers: [{ visibility: "on" }],
        },
        {
          featureType: "poi.medical",
          stylers: [{ visibility: "on" }],
        },
      ],
    })

    const marker = new window.google.maps.Marker({
      position: currentLocation,
      map: googleMap,
      title: "Your Location",
      animation: window.google.maps.Animation.BOUNCE,
      icon: {
        url:
          "data:image/svg+xml;charset=UTF-8," +
          encodeURIComponent(`
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="8" fill="#2563eb" stroke="white" strokeWidth="2"/>
            <circle cx="12" cy="12" r="3" fill="white"/>
          </svg>
        `),
        scaledSize: new window.google.maps.Size(24, 24),
      },
    })

    const directionsServiceInstance = new window.google.maps.DirectionsService()
    const renderer = new window.google.maps.DirectionsRenderer({
      suppressMarkers: false,
      polylineOptions: {
        strokeColor: safetyScore >= 80 ? "#10b981" : safetyScore >= 60 ? "#f59e0b" : "#ef4444",
        strokeWeight: 4,
      },
    })

    renderer.setMap(googleMap)
    setMap(googleMap)
    setUserMarker(marker)
    setRouteRenderer(renderer)
    setDirectionsService(directionsServiceInstance)
    setHasApiAccess(true)

    // Add markers for nearby places
    nearbyPlaces.forEach((place) => {
      if (place.geometry?.location) {
        const placeMarker = new window.google.maps.Marker({
          position: {
            lat: place.geometry.location.lat,
            lng: place.geometry.location.lng,
          },
          map: googleMap,
          title: place.name,
          icon: {
            url: place.icon || "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
            scaledSize: new window.google.maps.Size(20, 20),
          },
        })

        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div>
              <h3>${place.name}</h3>
              <p>Rating: ${place.rating || "N/A"} ⭐</p>
              <p>${place.vicinity || place.formatted_address}</p>
              <button onclick="window.open('https://maps.google.com/maps?q=${place.geometry.location.lat},${place.geometry.location.lng}', '_blank')" 
                      style="margin-top: 8px; padding: 4px 8px; background: #2563eb; color: white; border: none; border-radius: 4px; cursor: pointer;">
                Open in Google Maps
              </button>
            </div>
          `,
        })

        placeMarker.addListener("click", () => {
          infoWindow.open(googleMap, placeMarker)
        })
      }
    })
  }

  useEffect(() => {
    if (userMarker && map) {
      userMarker.setPosition(currentLocation)
      map.setCenter(currentLocation)
    }
  }, [currentLocation, userMarker, map])

  useEffect(() => {
    let watchId: number

    if (isTracking && navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          onLocationChange(newLocation)
        },
        (error) => console.error("Geolocation error:", error),
        { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 },
      )
    }

    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId)
    }
  }, [isTracking, onLocationChange])

  const searchPlaces = async () => {
    if (!searchQuery) return

    try {
      const response = await fetch("/api/maps/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: searchQuery,
          location: currentLocation,
        }),
      })

      const data = await response.json()
      if (data.results && data.results.length > 0) {
        const place = data.results[0]
        if (place.geometry?.location) {
          const newLocation = {
            lat: place.geometry.location.lat,
            lng: place.geometry.location.lng,
          }
          onLocationChange(newLocation)
          if (map) {
            map.setCenter(newLocation)
          }
        }
      }
    } catch (error) {
      console.log("Search not available - using fallback")
    }
  }

  const calculateRoute = (destination: any) => {
    if (!directionsService || !routeRenderer || !destination.geometry?.location) return

    const destLocation = destination.geometry.location.lat
      ? destination.geometry.location
      : { lat: destination.geometry.location.lat, lng: destination.geometry.location.lng }

    directionsService.route(
      {
        origin: currentLocation,
        destination: destLocation,
        travelMode: window.google.maps.TravelMode.WALKING,
      },
      (result: any, status: any) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          routeRenderer.setDirections(result)
        }
      },
    )
  }

  const openInGoogleMaps = (place?: any) => {
    const lat = place?.geometry?.location?.lat || place?.geometry?.location?.lat() || currentLocation.lat
    const lng = place?.geometry?.location?.lng || place?.geometry?.location?.lng() || currentLocation.lng
    const url = `https://maps.google.com/maps?q=${lat},${lng}`
    window.open(url, "_blank")
  }

  const getSafetyColor = () => {
    if (safetyScore >= 80) return "text-green-600 bg-green-50 border-green-200"
    if (safetyScore >= 60) return "text-yellow-600 bg-yellow-50 border-yellow-200"
    return "text-red-600 bg-red-50 border-red-200"
  }

  const mockNearbyPlaces = [
    {
      name: "Red Fort (Lal Qila)",
      vicinity: "Netaji Subhash Marg, Chandni Chowk",
      rating: 4.5,
      user_ratings_total: 45000,
      geometry: { location: { lat: 28.6562, lng: 77.241 } },
    },
    {
      name: "India Gate",
      vicinity: "Rajpath, India Gate",
      rating: 4.6,
      user_ratings_total: 38000,
      geometry: { location: { lat: 28.6129, lng: 77.2295 } },
    },
    {
      name: "All India Institute of Medical Sciences",
      vicinity: "Sri Aurobindo Marg, Ansari Nagar",
      rating: 4.2,
      user_ratings_total: 12000,
      geometry: { location: { lat: 28.5672, lng: 77.21 } },
    },
    {
      name: "Connaught Place Police Station",
      vicinity: "Connaught Place, New Delhi",
      rating: 3.8,
      user_ratings_total: 850,
      geometry: { location: { lat: 28.6315, lng: 77.2167 } },
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Search places, hospitals, police stations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && searchPlaces()}
        />
        <Button onClick={searchPlaces} size="icon">
          <Search className="w-4 h-4" />
        </Button>
        <Button onClick={() => openInGoogleMaps()} size="icon" variant="outline" title="Open in Google Maps">
          <ExternalLink className="w-4 h-4" />
        </Button>
      </div>

      <Card className="overflow-hidden relative">
        {!isLoaded && (
          <div className="w-full h-[400px] bg-gray-100 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
              <p className="text-sm text-gray-600">Loading Maps...</p>
            </div>
          </div>
        )}

        {isLoaded && !hasApiAccess && (
          <div className="w-full h-[400px] bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center relative">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-2" />
              <p className="text-sm font-medium">Interactive Map</p>
              <p className="text-xs text-gray-600">Current Location: Delhi, India</p>
              <p className="text-xs text-gray-500 mt-2">
                Lat: {currentLocation.lat.toFixed(4)}, Lng: {currentLocation.lng.toFixed(4)}
              </p>
              <Button onClick={() => openInGoogleMaps()} size="sm" className="mt-3" variant="outline">
                <ExternalLink className="w-4 h-4 mr-2" />
                Open in Google Maps
              </Button>
            </div>
            <div className="absolute top-4 left-4 bg-white p-2 rounded-lg shadow">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
                <span className="text-xs">You are here</span>
              </div>
            </div>
            <div className="absolute bottom-4 right-4 bg-white p-2 rounded-lg shadow text-xs">
              <p className="text-gray-600">Secure Mode - Server-side API</p>
            </div>
          </div>
        )}

        <div ref={mapRef} className={`w-full h-[400px] ${!hasApiAccess ? "hidden" : ""}`} />

        <div className="absolute top-2 right-2 space-y-2">
          <Button
            size="sm"
            onClick={() => setIsTracking(!isTracking)}
            className={isTracking ? "bg-green-600 hover:bg-green-700" : ""}
          >
            <Navigation className="w-4 h-4 mr-1" />
            {isTracking ? "Tracking" : "Track Me"}
          </Button>
          <div className={`px-2 py-1 rounded text-xs border ${getSafetyColor()}`}>
            <Shield className="w-3 h-3 inline mr-1" />
            Safety: {safetyScore}
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          Nearby Places
        </h3>
        <div className="space-y-2">
          {(nearbyPlaces.length > 0 ? nearbyPlaces : mockNearbyPlaces).map((place, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
              onClick={() => calculateRoute(place)}
            >
              <div className="flex-1">
                <h4 className="font-medium text-sm">{place.name}</h4>
                <p className="text-xs text-muted-foreground">{place.vicinity || place.formatted_address}</p>
                {place.rating && (
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-xs">⭐ {place.rating}</span>
                    {place.user_ratings_total && (
                      <span className="text-xs text-muted-foreground">({place.user_ratings_total})</span>
                    )}
                  </div>
                )}
              </div>
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation()
                    calculateRoute(place)
                  }}
                >
                  Route
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation()
                    openInGoogleMaps(place)
                  }}
                >
                  <ExternalLink className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-4 bg-red-50 border-red-200">
        <h3 className="font-semibold mb-2 text-red-800 flex items-center gap-2">
          <Phone className="w-4 h-4" />
          Emergency Contacts
        </h3>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span>Police:</span>
            <a href="tel:100" className="text-red-600 font-medium">
              100
            </a>
          </div>
          <div className="flex justify-between">
            <span>Tourist Helpline:</span>
            <a href="tel:1363" className="text-red-600 font-medium">
              1363
            </a>
          </div>
          <div className="flex justify-between">
            <span>Medical Emergency:</span>
            <a href="tel:108" className="text-red-600 font-medium">
              108
            </a>
          </div>
        </div>
      </Card>
    </div>
  )
}
