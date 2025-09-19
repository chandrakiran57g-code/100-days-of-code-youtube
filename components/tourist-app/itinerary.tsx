"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Clock, ArrowLeft, AlertTriangle } from "lucide-react"

interface ItineraryProps {
  onBack: () => void
}

export function Itinerary({ onBack }: ItineraryProps) {
  const itineraryItems = [
    {
      time: "09:00 AM",
      location: "Red Fort",
      status: "completed",
      deviation: false,
    },
    {
      time: "11:30 AM",
      location: "Jama Masjid",
      status: "current",
      deviation: false,
    },
    {
      time: "02:00 PM",
      location: "Chandni Chowk",
      status: "upcoming",
      deviation: true,
    },
    {
      time: "04:30 PM",
      location: "India Gate",
      status: "upcoming",
      deviation: false,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "current":
        return "bg-blue-100 text-blue-800"
      case "upcoming":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white shadow-sm p-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            <h1 className="text-lg font-bold">Trip Itinerary</h1>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-blue-600" />
            <div>
              <p className="font-medium text-blue-800">Current Location</p>
              <p className="text-sm text-blue-600">Jama Masjid - On Schedule</p>
            </div>
          </div>
        </Card>

        <div className="space-y-3">
          {itineraryItems.map((item, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="text-sm font-medium text-muted-foreground">{item.time}</div>
                  <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                </div>
                {item.deviation && <AlertTriangle className="w-4 h-4 text-yellow-600" />}
              </div>

              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium">{item.location}</span>
              </div>

              {item.deviation && (
                <div className="mt-3 p-2 bg-yellow-50 rounded-lg">
                  <p className="text-xs text-yellow-800">
                    Deviation detected: You're currently 2km away from planned route
                  </p>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
