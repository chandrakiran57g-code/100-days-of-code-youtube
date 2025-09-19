"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SecureAPIClient, type WeatherData, type NewsItem } from "@/lib/secure-api-client"
import { Cloud, Thermometer, Wind, Droplets, AlertTriangle, ExternalLink, RefreshCw } from "lucide-react"

interface WeatherNewsIntegrationProps {
  currentLocation: { lat: number; lng: number }
  locationName: string
}

export function WeatherNewsIntegration({ currentLocation, locationName }: WeatherNewsIntegrationProps) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadWeatherAndNews()
  }, [currentLocation])

  const loadWeatherAndNews = async () => {
    setLoading(true)
    try {
      const [weather, news] = await Promise.all([
        SecureAPIClient.getWeatherData(currentLocation.lat, currentLocation.lng),
        SecureAPIClient.getLocalNews(locationName),
      ])
      setWeatherData(weather)
      setNewsItems(news)
    } catch (error) {
      console.error("Error loading weather and news:", error)
    } finally {
      setLoading(false)
    }
  }

  const getWeatherAlertColor = (alert: string) => {
    if (alert.includes("High UV") || alert.includes("Air Quality")) return "bg-yellow-100 text-yellow-800"
    if (alert.includes("Storm") || alert.includes("Heavy")) return "bg-red-100 text-red-800"
    return "bg-blue-100 text-blue-800"
  }

  return (
    <div className="space-y-4">
      {/* Weather Card */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold flex items-center gap-2">
            <Cloud className="w-5 h-5" />
            Weather Conditions
          </h3>
          <Button size="sm" variant="ghost" onClick={loadWeatherAndNews} disabled={loading}>
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
        </div>

        {weatherData && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-red-500" />
                <span className="text-sm">
                  <span className="font-medium">{weatherData.temperature}°C</span>
                  <span className="text-muted-foreground ml-1">{weatherData.condition}</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-blue-500" />
                <span className="text-sm">
                  <span className="font-medium">{weatherData.humidity}%</span>
                  <span className="text-muted-foreground ml-1">Humidity</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Wind className="w-4 h-4 text-gray-500" />
                <span className="text-sm">
                  <span className="font-medium">{weatherData.windSpeed} km/h</span>
                  <span className="text-muted-foreground ml-1">Wind</span>
                </span>
              </div>
            </div>

            {/* Weather Alerts */}
            {weatherData.alerts.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium flex items-center gap-1">
                  <AlertTriangle className="w-4 h-4 text-yellow-600" />
                  Weather Alerts
                </h4>
                <div className="space-y-1">
                  {weatherData.alerts.map((alert, index) => (
                    <Badge key={index} className={getWeatherAlertColor(alert)} variant="secondary">
                      {alert}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Card>

      {/* Local News & Safety Updates */}
      <Card className="p-4">
        <h3 className="font-semibold mb-3">Local Safety News</h3>
        <div className="space-y-3">
          {newsItems.map((item, index) => (
            <div key={index} className="border-l-4 border-primary pl-3 py-2">
              <h4 className="font-medium text-sm mb-1">{item.title}</h4>
              <p className="text-xs text-muted-foreground mb-2">{item.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {item.source} • {new Date(item.publishedAt).toLocaleDateString()}
                </span>
                <Button size="sm" variant="ghost" className="h-6 px-2">
                  <ExternalLink className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
