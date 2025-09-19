"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Scan, Shield, CheckCircle, XCircle, X, AlertTriangle } from "lucide-react"

interface RFIDScannerProps {
  isOpen: boolean
  onToggle: () => void
}

export function RFIDScanner({ isOpen, onToggle }: RFIDScannerProps) {
  const [scanResult, setScanResult] = useState<any>(null)
  const [isScanning, setIsScanning] = useState(false)

  const mockScanResults = [
    {
      id: "ABH001",
      name: "John Smith",
      status: "verified",
      location: "Red Fort Entry",
      timestamp: new Date(),
      alerts: [],
    },
    {
      id: "ABH002",
      name: "Sarah Johnson",
      status: "alert",
      location: "Chandni Chowk",
      timestamp: new Date(),
      alerts: ["Solo female in high-risk area", "Safety score below threshold"],
    },
    {
      id: "INVALID",
      name: "Unknown",
      status: "denied",
      location: "Security Checkpoint",
      timestamp: new Date(),
      alerts: ["Invalid or expired ID", "Contact security immediately"],
    },
  ]

  const handleScan = () => {
    setIsScanning(true)
    setScanResult(null)

    // Simulate scanning delay
    setTimeout(() => {
      const randomResult = mockScanResults[Math.floor(Math.random() * mockScanResults.length)]
      setScanResult(randomResult)
      setIsScanning(false)
    }, 2000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-800"
      case "alert":
        return "bg-yellow-100 text-yellow-800"
      case "denied":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "alert":
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />
      case "denied":
        return <XCircle className="w-5 h-5 text-red-600" />
      default:
        return <Scan className="w-5 h-5 text-gray-600" />
    }
  }

  if (!isOpen) {
    return (
      <Button
        onClick={onToggle}
        className="fixed bottom-52 right-4 w-14 h-14 rounded-full bg-purple-600 hover:bg-purple-700 shadow-lg z-50"
      >
        <Scan className="w-6 h-6" />
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-52 right-4 w-80 bg-white border shadow-xl z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-purple-600 text-white rounded-t-lg">
        <div className="flex items-center gap-2">
          <Scan className="w-5 h-5" />
          <div>
            <h3 className="font-medium">RFID Scanner</h3>
            <p className="text-xs opacity-90">Tourist ID Verification</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={onToggle} className="text-white hover:bg-white/20">
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="p-4 space-y-4">
        {/* Scanner Interface */}
        <div className="text-center">
          <div className="w-32 h-32 mx-auto mb-4 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
            {isScanning ? (
              <div className="animate-spin">
                <Scan className="w-8 h-8 text-purple-600" />
              </div>
            ) : (
              <div className="text-center">
                <Scan className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-xs text-gray-500">Tap to scan RFID</p>
              </div>
            )}
          </div>

          <Button onClick={handleScan} disabled={isScanning} className="w-full bg-purple-600 hover:bg-purple-700">
            {isScanning ? "Scanning..." : "Start RFID Scan"}
          </Button>
        </div>

        {/* Scan Result */}
        {scanResult && (
          <Card className="p-4 bg-gray-50">
            <div className="flex items-center gap-3 mb-3">
              {getStatusIcon(scanResult.status)}
              <div className="flex-1">
                <h4 className="font-medium">{scanResult.name}</h4>
                <p className="text-sm text-gray-600">ID: {scanResult.id}</p>
              </div>
              <Badge className={getStatusColor(scanResult.status)}>
                {scanResult.status === "verified" && "Access Granted"}
                {scanResult.status === "alert" && "Alert Raised"}
                {scanResult.status === "denied" && "Access Denied"}
              </Badge>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Location:</span>
                <span>{scanResult.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Scan Time:</span>
                <span>{scanResult.timestamp.toLocaleTimeString()}</span>
              </div>
            </div>

            {/* Alerts */}
            {scanResult.alerts.length > 0 && (
              <div className="mt-3 pt-3 border-t">
                <p className="text-sm font-medium text-gray-700 mb-2">Alerts:</p>
                <div className="space-y-1">
                  {scanResult.alerts.map((alert: string, index: number) => (
                    <div key={index} className="flex items-center gap-2 text-xs">
                      <AlertTriangle className="w-3 h-3 text-yellow-600" />
                      <span className="text-gray-700">{alert}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-4 flex gap-2">
              {scanResult.status === "verified" && (
                <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                  <Shield className="w-3 h-3 mr-1" />
                  Grant Access
                </Button>
              )}
              {scanResult.status === "alert" && (
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  View Details
                </Button>
              )}
              {scanResult.status === "denied" && (
                <Button size="sm" variant="destructive" className="flex-1">
                  Contact Security
                </Button>
              )}
            </div>
          </Card>
        )}

        {/* Instructions */}
        <div className="text-xs text-gray-500">
          <p className="font-medium mb-1">Instructions:</p>
          <ul className="space-y-1">
            <li>• Hold RFID card near scanner</li>
            <li>• Wait for verification result</li>
            <li>• Follow on-screen instructions</li>
            <li>• Report any issues immediately</li>
          </ul>
        </div>
      </div>
    </Card>
  )
}
