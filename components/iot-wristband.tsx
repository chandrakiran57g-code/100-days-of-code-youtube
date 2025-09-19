"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Watch, Heart, Activity, Thermometer, X, AlertTriangle } from "lucide-react"

interface IoTWristbandProps {
  isOpen: boolean
  onToggle: () => void
}

export function IoTWristband({ isOpen, onToggle }: IoTWristbandProps) {
  const [vitals, setVitals] = useState({
    heartRate: 72,
    spO2: 98,
    temperature: 98.6,
    steps: 8420,
    lastUpdate: new Date(),
  })

  const [alerts, setAlerts] = useState<string[]>([])

  // Simulate real-time vital updates
  useEffect(() => {
    const interval = setInterval(() => {
      setVitals((prev) => ({
        heartRate: Math.floor(Math.random() * 20) + 65, // 65-85 bpm
        spO2: Math.floor(Math.random() * 5) + 96, // 96-100%
        temperature: Math.floor(Math.random() * 20) / 10 + 97.5, // 97.5-99.5°F
        steps: prev.steps + Math.floor(Math.random() * 10),
        lastUpdate: new Date(),
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // Monitor for anomalies
  useEffect(() => {
    const newAlerts: string[] = []

    if (vitals.heartRate > 100) {
      newAlerts.push("Elevated heart rate detected")
    }
    if (vitals.spO2 < 95) {
      newAlerts.push("Low oxygen saturation")
    }
    if (vitals.temperature > 100) {
      newAlerts.push("High temperature detected")
    }

    setAlerts(newAlerts)
  }, [vitals])

  const getVitalStatus = (type: string, value: number) => {
    switch (type) {
      case "heartRate":
        if (value < 60 || value > 100) return "warning"
        return "normal"
      case "spO2":
        if (value < 95) return "warning"
        return "normal"
      case "temperature":
        if (value < 97 || value > 100) return "warning"
        return "normal"
      default:
        return "normal"
    }
  }

  if (!isOpen) {
    return (
      <Button
        onClick={onToggle}
        className="fixed bottom-36 right-4 w-14 h-14 rounded-full bg-green-600 hover:bg-green-700 shadow-lg z-50"
      >
        <Watch className="w-6 h-6" />
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-36 right-4 w-80 bg-white border shadow-xl z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-green-600 text-white rounded-t-lg">
        <div className="flex items-center gap-2">
          <Watch className="w-5 h-5" />
          <div>
            <h3 className="font-medium">ABHAYA Wristband</h3>
            <p className="text-xs opacity-90">Health Monitoring</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={onToggle} className="text-white hover:bg-white/20">
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Vitals */}
      <div className="p-4 space-y-4">
        {/* Alerts */}
        {alerts.length > 0 && (
          <div className="space-y-2">
            {alerts.map((alert, index) => (
              <div key={index} className="flex items-center gap-2 p-2 bg-red-50 border border-red-200 rounded-lg">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span className="text-sm text-red-800">{alert}</span>
              </div>
            ))}
          </div>
        )}

        {/* Vital Signs Grid */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-3 bg-gray-50">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-4 h-4 text-red-500" />
              <span className="text-sm font-medium">Heart Rate</span>
            </div>
            <div className="text-2xl font-bold">{vitals.heartRate}</div>
            <div className="text-xs text-gray-600">bpm</div>
            <Badge
              className={`mt-1 text-xs ${
                getVitalStatus("heartRate", vitals.heartRate) === "normal"
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {getVitalStatus("heartRate", vitals.heartRate)}
            </Badge>
          </Card>

          <Card className="p-3 bg-gray-50">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium">SpO₂</span>
            </div>
            <div className="text-2xl font-bold">{vitals.spO2}</div>
            <div className="text-xs text-gray-600">%</div>
            <Badge
              className={`mt-1 text-xs ${
                getVitalStatus("spO2", vitals.spO2) === "normal"
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {getVitalStatus("spO2", vitals.spO2)}
            </Badge>
          </Card>

          <Card className="p-3 bg-gray-50">
            <div className="flex items-center gap-2 mb-2">
              <Thermometer className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-medium">Temperature</span>
            </div>
            <div className="text-2xl font-bold">{vitals.temperature.toFixed(1)}</div>
            <div className="text-xs text-gray-600">°F</div>
            <Badge
              className={`mt-1 text-xs ${
                getVitalStatus("temperature", vitals.temperature) === "normal"
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {getVitalStatus("temperature", vitals.temperature)}
            </Badge>
          </Card>

          <Card className="p-3 bg-gray-50">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium">Steps</span>
            </div>
            <div className="text-2xl font-bold">{vitals.steps.toLocaleString()}</div>
            <div className="text-xs text-gray-600">today</div>
            <Badge className="mt-1 text-xs bg-green-100 text-green-800">Active</Badge>
          </Card>
        </div>

        {/* Last Update */}
        <div className="text-xs text-gray-500 text-center">Last updated: {vitals.lastUpdate.toLocaleTimeString()}</div>

        {/* Emergency Features */}
        <div className="pt-2 border-t">
          <p className="text-xs text-gray-600 mb-2">Emergency Detection:</p>
          <div className="text-xs text-gray-500">
            • Fall detection: Active
            <br />• Unresponsiveness alert: Active
            <br />• Auto-SOS trigger: Enabled
          </div>
        </div>
      </div>
    </Card>
  )
}
