"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { BlockchainVerification } from "@/components/blockchain-verification"
import { AudioEvidencePlayer } from "@/components/audio-evidence-player"
import { ArrowLeft, Shield, MapPin, Clock, Phone, AlertTriangle, FileText, Calendar, QrCode } from "lucide-react"

interface TouristDetailProps {
  tourist: any
  onBack: () => void
}

export function TouristDetail({ tourist, onBack }: TouristDetailProps) {
  const [firDraft, setFirDraft] = useState("")

  const alertHistory = [
    {
      time: "14:32",
      type: "SOS Alert",
      location: "Karol Bagh Market",
      status: "Active",
      description: "Emergency button pressed, audio recorded",
      hasAudio: true,
      audioId: "SOS001",
      timestamp: new Date("2024-01-15T14:32:00"),
    },
    {
      time: "14:15",
      type: "Geo-fence",
      location: "Karol Bagh",
      status: "Resolved",
      description: "Entered high-risk area, safety score dropped",
      hasAudio: false,
    },
    {
      time: "13:45",
      type: "Route Deviation",
      location: "Paharganj",
      status: "Resolved",
      description: "Deviated 2km from planned itinerary",
      hasAudio: false,
    },
  ]

  const itinerary = [
    { time: "09:00", location: "Red Fort", status: "Completed" },
    { time: "11:30", location: "Jama Masjid", status: "Completed" },
    { time: "14:00", location: "Chandni Chowk", status: "Skipped" },
    { time: "16:30", location: "India Gate", status: "Upcoming" },
  ]

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="bg-slate-800 border-b border-slate-700 p-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack} className="text-slate-400 hover:text-white">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Tourist Detail</h1>
            <p className="text-sm text-slate-400">Comprehensive monitoring and management</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Tourist ID Card */}
        <Card className="p-6 bg-slate-800 border-slate-700">
          <div className="flex items-start gap-6">
            <div className="flex-1">
              <Card className="p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-lg">{tourist.name}</h3>
                    <p className="text-blue-100 text-sm">Tourist ID: {tourist.id}</p>
                  </div>
                  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 text-xs">Photo</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-100">Valid From:</span>
                    <span>{new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-100">Valid Until:</span>
                    <span>{new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-blue-500">
                  <Badge className="bg-green-500 hover:bg-green-600">
                    <Shield className="w-3 h-3 mr-1" />
                    Blockchain Verified
                  </Badge>
                  <QrCode className="w-8 h-8" />
                </div>
              </Card>

              <div className="mt-4">
                <BlockchainVerification documentType="id" data={{ id: tourist.id, name: tourist.name }} />
              </div>
            </div>

            <div className="space-y-4">
              <Card className="p-4 bg-slate-700 border-slate-600">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">{tourist.safetyScore}</div>
                  <div className="text-sm text-slate-400">Safety Score</div>
                  <Badge
                    className={`mt-2 ${tourist.status === "safe" ? "bg-green-100 text-green-800" : tourist.status === "caution" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}
                  >
                    {tourist.status}
                  </Badge>
                </div>
              </Card>

              <Card className="p-4 bg-slate-700 border-slate-600">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-300">{tourist.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-300">Last update: {tourist.lastUpdate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-300">+91 98765 43210</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Card>

        {/* Mini Map and Track */}
        <Card className="p-6 bg-slate-800 border-slate-700">
          <h3 className="text-lg font-bold text-white mb-4">Location Tracking</h3>
          <div className="h-48 bg-gradient-to-br from-green-900/20 to-blue-900/20 rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-slate-400">Live Location: {tourist.location}</p>
                <p className="text-xs text-slate-500">Last known track and movement history</p>
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-red-400 rounded-full animate-pulse transform -translate-x-1/2 -translate-y-1/2" />
          </div>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="itinerary" className="space-y-4">
          <TabsList className="bg-slate-800 border-slate-700">
            <TabsTrigger value="itinerary" className="data-[state=active]:bg-slate-700">
              <Calendar className="w-4 h-4 mr-2" />
              Itinerary
            </TabsTrigger>
            <TabsTrigger value="alerts" className="data-[state=active]:bg-slate-700">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Alert History
            </TabsTrigger>
            <TabsTrigger value="efir" className="data-[state=active]:bg-slate-700">
              <FileText className="w-4 h-4 mr-2" />
              e-FIR Draft
            </TabsTrigger>
          </TabsList>

          <TabsContent value="itinerary">
            <Card className="p-6 bg-slate-800 border-slate-700">
              <h4 className="font-bold text-white mb-4">Planned Itinerary</h4>
              <div className="space-y-3">
                {itinerary.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="text-sm font-medium text-slate-300">{item.time}</div>
                      <div className="text-white">{item.location}</div>
                    </div>
                    <Badge
                      className={
                        item.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : item.status === "Skipped"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                      }
                    >
                      {item.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="alerts">
            <Card className="p-6 bg-slate-800 border-slate-700">
              <h4 className="font-bold text-white mb-4">Alert History</h4>
              <div className="space-y-4">
                {alertHistory.map((alert, index) => (
                  <div key={index} className="space-y-3">
                    <div className="p-4 bg-slate-700 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-yellow-400" />
                          <span className="font-medium text-white">{alert.type}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-slate-400">{alert.time}</span>
                          <Badge
                            className={
                              alert.status === "Active" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
                            }
                          >
                            {alert.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-sm text-slate-300 mb-1">{alert.location}</div>
                      <div className="text-sm text-slate-400">{alert.description}</div>
                    </div>

                    {alert.hasAudio && (
                      <AudioEvidencePlayer alertId={alert.audioId} timestamp={alert.timestamp} duration={45} />
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="efir">
            <Card className="p-6 bg-slate-800 border-slate-700">
              <h4 className="font-bold text-white mb-4">e-FIR Pre-Draft</h4>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-400">Tourist ID:</span>
                    <span className="text-white ml-2">{tourist.id}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Time:</span>
                    <span className="text-white ml-2">{new Date().toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Location:</span>
                    <span className="text-white ml-2">{tourist.location}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Officer:</span>
                    <span className="text-white ml-2">Badge #12345</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-slate-400 mb-2 block">Incident Description</label>
                  <Textarea
                    placeholder="Enter incident details..."
                    value={firDraft}
                    onChange={(e) => setFirDraft(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                    rows={6}
                  />
                </div>

                <BlockchainVerification
                  documentType="fir"
                  data={{
                    touristId: tourist.id,
                    officerId: "12345",
                    incident: firDraft,
                    timestamp: new Date(),
                  }}
                />

                <Button className="w-full">
                  <FileText className="w-4 h-4 mr-2" />
                  Append to Official FIR
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
