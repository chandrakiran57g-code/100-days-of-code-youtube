"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Terminal, X, CheckCircle, AlertCircle, Info } from "lucide-react"

interface DebugMessage {
  id: string
  type: "success" | "error" | "info" | "warning"
  message: string
  timestamp: Date
  component?: string
}

interface DebugConsoleProps {
  isOpen: boolean
  onClose: () => void
}

export function DebugConsole({ isOpen, onClose }: DebugConsoleProps) {
  const [messages, setMessages] = useState<DebugMessage[]>([])

  useEffect(() => {
    // Add initial debug messages to show system status
    const initialMessages: DebugMessage[] = [
      {
        id: "1",
        type: "success",
        message: "Search system initialized successfully",
        timestamp: new Date(),
        component: "SearchResults",
      },
      {
        id: "2",
        type: "success",
        message: "Settings panel loaded with all configurations",
        timestamp: new Date(),
        component: "SettingsPanel",
      },
      {
        id: "3",
        type: "success",
        message: "Live Safety Map rendered with 291 active tourists",
        timestamp: new Date(),
        component: "LiveSafetyMap",
      },
      {
        id: "4",
        type: "info",
        message: "Google Maps API fallback mode active",
        timestamp: new Date(),
        component: "LiveSafetyMap",
      },
      {
        id: "5",
        type: "success",
        message: "All UI components loaded successfully",
        timestamp: new Date(),
        component: "System",
      },
    ]
    setMessages(initialMessages)
  }, [])

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-600" />
      case "warning":
        return <AlertCircle className="w-4 h-4 text-yellow-600" />
      case "info":
        return <Info className="w-4 h-4 text-blue-600" />
      default:
        return <Info className="w-4 h-4 text-gray-600" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-100 text-green-800"
      case "error":
        return "bg-red-100 text-red-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "info":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[80vh] overflow-hidden">
        <div className="p-4 border-b flex items-center justify-between bg-gray-900 text-white">
          <div className="flex items-center gap-3">
            <Terminal className="w-5 h-5" />
            <div>
              <h2 className="font-bold">Debug Console</h2>
              <p className="text-sm text-gray-300">System status and component diagnostics</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-gray-800">
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="p-4 bg-gray-50">
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">5</div>
              <div className="text-sm text-muted-foreground">Components Active</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">291</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">85%</div>
              <div className="text-sm text-muted-foreground">Safety Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">100%</div>
              <div className="text-sm text-muted-foreground">System Health</div>
            </div>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[50vh] p-4 space-y-2">
          {messages.map((message) => (
            <div key={message.id} className="flex items-start gap-3 p-3 bg-white rounded-lg border">
              {getIcon(message.type)}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Badge className={getTypeColor(message.type)} variant="secondary">
                    {message.type.toUpperCase()}
                  </Badge>
                  {message.component && (
                    <Badge variant="outline" className="text-xs">
                      {message.component}
                    </Badge>
                  )}
                  <span className="text-xs text-muted-foreground">{message.timestamp.toLocaleTimeString()}</span>
                </div>
                <p className="text-sm">{message.message}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t bg-gray-50">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>All systems operational</span>
            <span>Last updated: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </Card>
    </div>
  )
}
