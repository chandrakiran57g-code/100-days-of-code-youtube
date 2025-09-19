"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, TrendingUp, Cloud, Users, Activity } from "lucide-react"

interface PredictiveAnalyticsProps {
  onBack: () => void
}

export function PredictiveAnalytics({ onBack }: PredictiveAnalyticsProps) {
  const riskForecasts = [
    {
      area: "Chandni Chowk",
      riskLevel: "High",
      factors: ["Heavy Crowding", "Traffic Congestion", "Pickpocket Reports"],
      timeframe: "Next 6 hours",
      confidence: 87,
    },
    {
      area: "Karol Bagh",
      riskLevel: "Medium",
      factors: ["Weather Alert", "Construction Work"],
      timeframe: "Next 12 hours",
      confidence: 72,
    },
    {
      area: "India Gate",
      riskLevel: "Low",
      factors: ["Good Weather", "Regular Patrol"],
      timeframe: "Next 24 hours",
      confidence: 94,
    },
  ]

  const weatherAlerts = [
    { time: "16:00", condition: "Heavy Rain", impact: "High", areas: ["Central Delhi", "Old Delhi"] },
    { time: "18:00", condition: "Thunderstorm", impact: "Medium", areas: ["South Delhi"] },
  ]

  const crowdingPredictions = [
    { location: "Red Fort", current: 450, predicted: 680, peak: "17:30" },
    { location: "India Gate", current: 320, predicted: 520, peak: "18:00" },
    { location: "Lotus Temple", current: 180, predicted: 240, peak: "16:45" },
  ]

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="bg-slate-800 border-b border-slate-700 p-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack} className="text-slate-400 hover:text-white">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Predictive Analytics</h1>
            <p className="text-sm text-slate-400">48-hour risk forecasting and trend analysis</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Risk Forecast Cards */}
        <div className="grid grid-cols-3 gap-4">
          {riskForecasts.map((forecast, index) => (
            <Card key={index} className="p-4 bg-slate-800 border-slate-700">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-white">{forecast.area}</h3>
                <Badge
                  className={
                    forecast.riskLevel === "High"
                      ? "bg-red-100 text-red-800"
                      : forecast.riskLevel === "Medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                  }
                >
                  {forecast.riskLevel} Risk
                </Badge>
              </div>
              <div className="space-y-2 text-sm">
                <div className="text-slate-400">Risk Factors:</div>
                {forecast.factors.map((factor, idx) => (
                  <div key={idx} className="text-slate-300">
                    • {factor}
                  </div>
                ))}
                <div className="flex justify-between pt-2 border-t border-slate-700">
                  <span className="text-slate-400">Confidence:</span>
                  <span className="text-white">{forecast.confidence}%</span>
                </div>
                <div className="text-xs text-slate-500">{forecast.timeframe}</div>
              </div>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-2 gap-6">
          {/* Traffic & Weather Forecast */}
          <Card className="p-6 bg-slate-800 border-slate-700">
            <div className="flex items-center gap-2 mb-4">
              <Cloud className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-bold text-white">Weather Impact Forecast</h3>
            </div>
            <div className="h-48 bg-slate-700 rounded-lg p-4">
              <div className="space-y-3">
                {weatherAlerts.map((alert, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-600 rounded">
                    <div>
                      <div className="font-medium text-white">{alert.condition}</div>
                      <div className="text-sm text-slate-400">{alert.time}</div>
                    </div>
                    <div className="text-right">
                      <Badge
                        className={
                          alert.impact === "High" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {alert.impact} Impact
                      </Badge>
                      <div className="text-xs text-slate-400 mt-1">{alert.areas.join(", ")}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Crowding Predictions */}
          <Card className="p-6 bg-slate-800 border-slate-700">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-green-400" />
              <h3 className="text-lg font-bold text-white">Crowding Predictions</h3>
            </div>
            <div className="h-48 bg-slate-700 rounded-lg p-4">
              <div className="space-y-3">
                {crowdingPredictions.map((prediction, index) => (
                  <div key={index} className="p-3 bg-slate-600 rounded">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium text-white">{prediction.location}</div>
                      <div className="text-sm text-slate-400">Peak: {prediction.peak}</div>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div>
                        <span className="text-slate-400">Current:</span>
                        <span className="text-white ml-1">{prediction.current}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Predicted:</span>
                        <span className="text-yellow-400 ml-1">{prediction.predicted}</span>
                      </div>
                      <div className="flex-1 bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-yellow-400 h-2 rounded-full"
                          style={{ width: `${(prediction.predicted / 800) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Community Hazard Reports */}
        <Card className="p-6 bg-slate-800 border-slate-700">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-orange-400" />
            <h3 className="text-lg font-bold text-white">Community Hazard Reports</h3>
          </div>
          <div className="h-64 bg-slate-700 rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                <p className="text-slate-400">Interactive Hazard Map</p>
                <p className="text-xs text-slate-500">Real-time reports from tourists and locals</p>
              </div>
            </div>

            {/* Mock hazard pins */}
            <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-red-400 rounded-full animate-pulse" />
            <div className="absolute top-1/2 right-1/3 w-4 h-4 bg-yellow-400 rounded-full animate-pulse" />
            <div className="absolute bottom-1/3 left-1/2 w-4 h-4 bg-orange-400 rounded-full animate-pulse" />

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-slate-800/80 p-3 rounded-lg">
              <div className="text-xs text-slate-300 space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full" />
                  <span>Safety Incident</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                  <span>Traffic Issue</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full" />
                  <span>Infrastructure</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
