"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, MapPin, Camera, Send, X, CheckCircle } from "lucide-react"

interface HazardReportingProps {
  isOpen: boolean
  onToggle: () => void
  currentLocation: string
}

export function HazardReporting({ isOpen, onToggle, currentLocation }: HazardReportingProps) {
  const [reportData, setReportData] = useState({
    type: "",
    severity: "",
    description: "",
    location: currentLocation,
    anonymous: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const hazardTypes = [
    "Safety Incident",
    "Traffic Issue",
    "Infrastructure Problem",
    "Suspicious Activity",
    "Medical Emergency",
    "Environmental Hazard",
    "Crowd Control Issue",
    "Other",
  ]

  const severityLevels = ["Low", "Medium", "High", "Critical"]

  const handleSubmit = () => {
    if (!reportData.type || !reportData.severity || !reportData.description) return

    setIsSubmitting(true)

    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setTimeout(() => {
        setIsSubmitted(false)
        onToggle()
        setReportData({
          type: "",
          severity: "",
          description: "",
          location: currentLocation,
          anonymous: false,
        })
      }, 2000)
    }, 1500)
  }

  if (!isOpen) {
    return (
      <Button
        onClick={onToggle}
        className="fixed bottom-68 right-4 w-14 h-14 rounded-full bg-orange-600 hover:bg-orange-700 shadow-lg z-50"
      >
        <AlertTriangle className="w-6 h-6" />
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-68 right-4 w-80 bg-white border shadow-xl z-50 max-h-96 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-orange-600 text-white rounded-t-lg sticky top-0">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          <div>
            <h3 className="font-medium">Report Hazard</h3>
            <p className="text-xs opacity-90">Community Safety Alert</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={onToggle} className="text-white hover:bg-white/20">
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="p-4 space-y-4">
        {isSubmitted ? (
          <div className="text-center py-6">
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
            <h3 className="font-bold text-green-800 mb-2">Report Submitted</h3>
            <p className="text-sm text-green-700 mb-3">
              Thank you for helping keep our community safe. Your report has been forwarded to authorities.
            </p>
            <Badge className="bg-green-100 text-green-800">
              Report ID: HR{Math.random().toString(36).substr(2, 6).toUpperCase()}
            </Badge>
          </div>
        ) : (
          <>
            {/* Hazard Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Hazard Type</label>
              <Select value={reportData.type} onValueChange={(value) => setReportData({ ...reportData, type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select hazard type" />
                </SelectTrigger>
                <SelectContent>
                  {hazardTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Severity */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Severity Level</label>
              <Select
                value={reportData.severity}
                onValueChange={(value) => setReportData({ ...reportData, severity: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select severity" />
                </SelectTrigger>
                <SelectContent>
                  {severityLevels.map((level) => (
                    <SelectItem key={level} value={level}>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            level === "Critical"
                              ? "bg-red-500"
                              : level === "High"
                                ? "bg-orange-500"
                                : level === "Medium"
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                          }`}
                        />
                        {level}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Location</label>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-500" />
                <Input
                  value={reportData.location}
                  onChange={(e) => setReportData({ ...reportData, location: e.target.value })}
                  placeholder="Current location"
                  className="flex-1"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Description</label>
              <Textarea
                value={reportData.description}
                onChange={(e) => setReportData({ ...reportData, description: e.target.value })}
                placeholder="Describe the hazard or incident in detail..."
                rows={3}
                className="resize-none"
              />
            </div>

            {/* Photo Upload */}
            <Button variant="outline" className="w-full bg-transparent">
              <Camera className="w-4 h-4 mr-2" />
              Add Photo (Optional)
            </Button>

            {/* Anonymous Option */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="anonymous"
                checked={reportData.anonymous}
                onChange={(e) => setReportData({ ...reportData, anonymous: e.target.checked })}
                className="rounded"
              />
              <label htmlFor="anonymous" className="text-sm text-slate-700">
                Submit anonymously
              </label>
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              disabled={!reportData.type || !reportData.severity || !reportData.description || isSubmitting}
              className="w-full bg-orange-600 hover:bg-orange-700"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                  Submitting...
                </div>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Submit Report
                </>
              )}
            </Button>

            <div className="text-xs text-slate-500">
              <p>• Reports are reviewed by authorities within 15 minutes</p>
              <p>• Critical reports trigger immediate response</p>
              <p>• Your safety contribution helps protect all tourists</p>
            </div>
          </>
        )}
      </div>
    </Card>
  )
}
