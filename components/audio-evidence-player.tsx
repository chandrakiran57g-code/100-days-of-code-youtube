"use client"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, Volume2, Download, FileText } from "lucide-react"

interface AudioEvidencePlayerProps {
  alertId: string
  timestamp: Date
  duration: number
  transcript?: string
}

export function AudioEvidencePlayer({ alertId, timestamp, duration, transcript }: AudioEvidencePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [showTranscript, setShowTranscript] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const mockTranscript =
    transcript ||
    "Help! I'm at Chandni Chowk market and someone is following me. I'm near the spice shops, close to the main entrance. Please send help immediately. I'm wearing a blue shirt and carrying a red bag."

  const togglePlayback = () => {
    if (isPlaying) {
      setIsPlaying(false)
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    } else {
      setIsPlaying(true)
      intervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false)
            if (intervalRef.current) {
              clearInterval(intervalRef.current)
            }
            return duration
          }
          return prev + 1
        })
      }, 1000)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const downloadAudio = () => {
    // Simulate audio download
    const link = document.createElement("a")
    link.href = "#"
    link.download = `abhaya-audio-${alertId}.wav`
    link.click()
  }

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  return (
    <Card className="p-4 bg-slate-50 border border-slate-200">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Volume2 className="w-5 h-5 text-blue-600" />
          <div>
            <h4 className="font-medium text-slate-800">Audio Evidence</h4>
            <p className="text-xs text-slate-600">Alert ID: {alertId}</p>
          </div>
        </div>
        <Badge className="bg-red-100 text-red-800">SOS Recording</Badge>
      </div>

      {/* Audio Player Controls */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <Button size="sm" onClick={togglePlayback} className="bg-blue-600 hover:bg-blue-700">
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>

          <div className="flex-1">
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-slate-600 mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <Button size="sm" variant="outline" onClick={downloadAudio} className="bg-transparent">
            <Download className="w-4 h-4" />
          </Button>
        </div>

        {/* Metadata */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-slate-600">Recorded:</span>
            <span className="text-slate-800 ml-2">{timestamp.toLocaleString()}</span>
          </div>
          <div>
            <span className="text-slate-600">Quality:</span>
            <span className="text-slate-800 ml-2">High (44.1kHz)</span>
          </div>
          <div>
            <span className="text-slate-600">Location:</span>
            <span className="text-slate-800 ml-2">Chandni Chowk</span>
          </div>
          <div>
            <span className="text-slate-600">File Size:</span>
            <span className="text-slate-800 ml-2">2.4 MB</span>
          </div>
        </div>

        {/* Transcript Toggle */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowTranscript(!showTranscript)}
          className="w-full bg-transparent"
        >
          <FileText className="w-4 h-4 mr-2" />
          {showTranscript ? "Hide" : "Show"} AI Transcript
        </Button>

        {/* Transcript */}
        {showTranscript && (
          <Card className="p-3 bg-white border border-slate-200">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-slate-600" />
              <span className="text-sm font-medium text-slate-700">AI-Generated Transcript</span>
              <Badge className="bg-green-100 text-green-800 text-xs">95% Confidence</Badge>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">{mockTranscript}</p>
            <div className="mt-2 text-xs text-slate-500">
              <p>• Language detected: English</p>
              <p>• Speaker identification: Single speaker</p>
              <p>• Emotional analysis: High stress, urgency detected</p>
            </div>
          </Card>
        )}
      </div>
    </Card>
  )
}
