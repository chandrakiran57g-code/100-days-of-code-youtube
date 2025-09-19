"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  BottomSheet,
  BottomSheetContent,
  BottomSheetHeader,
  BottomSheetTitle,
  BottomSheetDescription,
} from "@/components/ui/bottom-sheet"
import {
  MapPin,
  Navigation,
  Clock,
  Phone,
  MessageCircle,
  Star,
  Shield,
  AlertTriangle,
  CheckCircle,
  Car,
  Route,
} from "lucide-react"

interface TrackingModalProps {
  isOpen: boolean
  onClose: () => void
  trackingData: {
    type: "guide" | "transport" | "emergency"
    provider: {
      name: string
      avatar: string
      rating: number
      phone: string
      vehicle?: string
      license?: string
    }
    status: "searching" | "assigned" | "arriving" | "active" | "completed"
    eta: number
    currentLocation: string
    destination: string
    route: {
      distance: string
      duration: string
      safetyScore: number
    }
    liveLocation: {
      lat: number
      lng: number
    }
  }
}

export function TrackingModal({ isOpen, onClose, trackingData }: TrackingModalProps) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [animatedETA, setAnimatedETA] = useState(trackingData.eta)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
      // Simulate ETA updates
      if (trackingData.status === "arriving" && animatedETA > 0) {
        setAnimatedETA((prev) => Math.max(0, prev - 1))
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [trackingData.status, animatedETA])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "searching":
        return "bg-yellow-500"
      case "assigned":
        return "bg-blue-500"
      case "arriving":
        return "bg-orange-500"
      case "active":
        return "bg-green-500"
      case "completed":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "searching":
        return "Finding your guide..."
      case "assigned":
        return "Guide assigned"
      case "arriving":
        return `Arriving in ${animatedETA} min`
      case "active":
        return "Trip in progress"
      case "completed":
        return "Trip completed"
      default:
        return "Unknown status"
    }
  }

  const getSafetyColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-50"
    if (score >= 60) return "text-yellow-600 bg-yellow-50"
    return "text-red-600 bg-red-50"
  }

  return (
    <BottomSheet open={isOpen} onOpenChange={onClose}>
      <BottomSheetContent className="max-h-[85vh] overflow-y-auto">
        <BottomSheetHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${getStatusColor(trackingData.status)} animate-pulse`} />
              <BottomSheetTitle className="text-left">
                {trackingData.type === "guide"
                  ? "Tourist Guide"
                  : trackingData.type === "transport"
                    ? "Transport Service"
                    : "Emergency Response"}
              </BottomSheetTitle>
            </div>
            <Badge variant="secondary" className="animate-fade-in">
              {getStatusText(trackingData.status)}
            </Badge>
          </div>
          <BottomSheetDescription className="text-left">Real-time tracking and updates</BottomSheetDescription>
        </BottomSheetHeader>

        <div className="px-4 pb-6 space-y-4">
          {/* Provider Info Card */}
          <Card className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16 border-2 border-white shadow-lg">
                <AvatarImage src={trackingData.provider.avatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-primary text-white text-lg font-bold">
                  {trackingData.provider.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-800">{trackingData.provider.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-sm">{trackingData.provider.rating}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {trackingData.type === "guide"
                      ? "Certified Guide"
                      : trackingData.type === "transport"
                        ? "Licensed Driver"
                        : "Emergency Responder"}
                  </Badge>
                </div>
                {trackingData.provider.vehicle && (
                  <div className="flex items-center gap-2 mt-2">
                    <Car className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-600">{trackingData.provider.vehicle}</span>
                    <span className="text-xs text-gray-500">• {trackingData.provider.license}</span>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Live Tracking Info */}
          <div className="grid grid-cols-2 gap-3">
            <Card className="p-3 text-center bg-white/80 backdrop-blur-sm">
              <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <p className="text-sm font-semibold text-gray-800">ETA</p>
              <p className="text-lg font-bold text-blue-600">{animatedETA} min</p>
            </Card>
            <Card className="p-3 text-center bg-white/80 backdrop-blur-sm">
              <Route className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <p className="text-sm font-semibold text-gray-800">Distance</p>
              <p className="text-lg font-bold text-green-600">{trackingData.route.distance}</p>
            </Card>
          </div>

          {/* Route Safety Score */}
          <Card className={`p-4 ${getSafetyColor(trackingData.route.safetyScore)} border-2`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6" />
                <div>
                  <p className="font-bold">Route Safety Score</p>
                  <p className="text-sm opacity-80">Real-time safety assessment</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">{trackingData.route.safetyScore}%</p>
                <p className="text-xs">
                  {trackingData.route.safetyScore >= 80
                    ? "Safe Route"
                    : trackingData.route.safetyScore >= 60
                      ? "Caution"
                      : "High Risk"}
                </p>
              </div>
            </div>
          </Card>

          {/* Location Details */}
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-3 h-3 rounded-full bg-green-500 mt-2" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-600">Current Location</p>
                <p className="font-medium text-gray-800">{trackingData.currentLocation}</p>
              </div>
              <Navigation className="w-5 h-5 text-gray-400 mt-1" />
            </div>
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-3 h-3 rounded-full bg-red-500 mt-2" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-600">Destination</p>
                <p className="font-medium text-gray-800">{trackingData.destination}</p>
              </div>
              <MapPin className="w-5 h-5 text-gray-400 mt-1" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <Button
              variant="outline"
              className="flex items-center gap-2 h-12 border-green-200 hover:bg-green-50 bg-transparent"
              onClick={() => window.open(`tel:${trackingData.provider.phone}`)}
            >
              <Phone className="w-5 h-5" />
              Call
            </Button>
            <Button
              className="flex items-center gap-2 h-12 bg-primary hover:bg-primary/90"
              onClick={() => window.open(`sms:${trackingData.provider.phone}`)}
            >
              <MessageCircle className="w-5 h-5" />
              Message
            </Button>
          </div>

          {/* Live Updates */}
          <Card className="p-4 bg-blue-50 border-blue-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <p className="font-semibold text-blue-800">Live Updates</p>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-gray-700">Guide verified and en route</span>
                <span className="text-xs text-gray-500 ml-auto">2 min ago</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-gray-700">Safety check completed</span>
                <span className="text-xs text-gray-500 ml-auto">5 min ago</span>
              </div>
              {trackingData.route.safetyScore < 80 && (
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-600" />
                  <span className="text-gray-700">Route caution advised</span>
                  <span className="text-xs text-gray-500 ml-auto">Just now</span>
                </div>
              )}
            </div>
          </Card>

          {/* Emergency Button */}
          <Button
            variant="destructive"
            className="w-full h-12 bg-red-500 hover:bg-red-600 font-bold"
            onClick={() => {
              /* Handle emergency */
            }}
          >
            <AlertTriangle className="w-5 h-5 mr-2" />
            Emergency Alert
          </Button>
        </div>
      </BottomSheetContent>
    </BottomSheet>
  )
}
