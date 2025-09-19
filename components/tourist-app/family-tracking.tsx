"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, MapPin, Plus, ArrowLeft } from "lucide-react"

interface FamilyTrackingProps {
  onBack: () => void
}

export function FamilyTracking({ onBack }: FamilyTrackingProps) {
  const familyMembers = [
    { name: "John Doe", status: "Safe", location: "Red Fort", lastSeen: "2 min ago", score: 92 },
    { name: "Jane Doe", status: "Safe", location: "India Gate", lastSeen: "5 min ago", score: 88 },
    { name: "Mike Doe", status: "At Risk", location: "Chandni Chowk", lastSeen: "15 min ago", score: 65 },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Safe":
        return "bg-green-100 text-green-800"
      case "At Risk":
        return "bg-yellow-100 text-yellow-800"
      case "Offline":
        return "bg-red-100 text-red-800"
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
            <Users className="w-5 h-5 text-primary" />
            <h1 className="text-lg font-bold">Family Tracking</h1>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <Button className="w-full bg-transparent" variant="outline">
          <Plus className="w-4 h-4 mr-2" />
          Add Family Member
        </Button>

        <div className="space-y-3">
          {familyMembers.map((member, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-medium">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">Safety Score: {member.score}</p>
                </div>
                <Badge className={getStatusColor(member.status)}>{member.status}</Badge>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{member.location}</span>
                </div>
                <p className="text-muted-foreground">Last seen: {member.lastSeen}</p>
              </div>

              {member.status === "At Risk" && (
                <div className="mt-3 p-2 bg-yellow-50 rounded-lg">
                  <p className="text-xs text-yellow-800">Member entered high-risk area. Monitoring closely.</p>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
