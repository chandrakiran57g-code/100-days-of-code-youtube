"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AlertTriangle, Mic, Phone, X } from "lucide-react"

interface SosModalProps {
  onClose: () => void
}

export function SosModal({ onClose }: SosModalProps) {
  const [countdown, setCountdown] = useState(5)
  const [isRecording, setIsRecording] = useState(false)
  const [alertSent, setAlertSent] = useState(false)

  useEffect(() => {
    if (countdown > 0 && !alertSent) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else if (countdown === 0 && !alertSent) {
      setAlertSent(true)
    }
  }, [countdown, alertSent])

  const handleSilentAlert = () => {
    setAlertSent(true)
    setCountdown(0)
  }

  const handleCancel = () => {
    if (!alertSent) {
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md p-6 space-y-6">
        {!alertSent ? (
          <>
            <div className="text-center">
              <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4 pulse-sos">
                <AlertTriangle className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-red-600 mb-2">EMERGENCY SOS</h2>
              <p className="text-muted-foreground">Alert will be sent in {countdown} seconds</p>
            </div>

            <div className="space-y-3">
              <Button
                className={`w-full h-16 ${isRecording ? "bg-red-600 hover:bg-red-700" : "bg-primary hover:bg-primary/90"}`}
                onMouseDown={() => setIsRecording(true)}
                onMouseUp={() => setIsRecording(false)}
                onTouchStart={() => setIsRecording(true)}
                onTouchEnd={() => setIsRecording(false)}
              >
                <div className="text-center">
                  <Mic className="w-6 h-6 mx-auto mb-1" />
                  <span className="text-sm">{isRecording ? "Recording..." : "Hold to Speak"}</span>
                </div>
              </Button>

              <Button variant="outline" className="w-full bg-transparent" onClick={handleSilentAlert}>
                <Phone className="w-4 h-4 mr-2" />
                Silent Alert to Trusted Contacts
              </Button>
            </div>

            <Button variant="ghost" className="w-full" onClick={handleCancel}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </>
        ) : (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-green-600 mb-2">Alert Sent Successfully</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Emergency services and your trusted contacts have been notified. Help is on the way.
              </p>
              <div className="text-xs text-muted-foreground">
                <p>Location: Connaught Place, New Delhi</p>
                <p>Time: {new Date().toLocaleTimeString()}</p>
                <p>Alert ID: SOS{Math.random().toString(36).substr(2, 6).toUpperCase()}</p>
              </div>
            </div>
            <Button onClick={onClose} className="w-full">
              Close
            </Button>
          </div>
        )}
      </Card>
    </div>
  )
}
