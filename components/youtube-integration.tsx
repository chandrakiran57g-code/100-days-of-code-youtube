"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SecureAPIClient, type YouTubeVideo } from "@/lib/secure-api-client"
import { Play, Search, ExternalLink } from "lucide-react"

interface YouTubeIntegrationProps {
  currentLocation: string
}

export function YouTubeIntegration({ currentLocation }: YouTubeIntegrationProps) {
  const [videos, setVideos] = useState<YouTubeVideo[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadSafetyVideos()
  }, [currentLocation])

  const loadSafetyVideos = async () => {
    setLoading(true)
    try {
      const safetyVideos = await SecureAPIClient.getYouTubeVideos(`${currentLocation} safety guide tourist tips`)
      setVideos(safetyVideos)
    } catch (error) {
      console.error("Error loading YouTube videos:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    setLoading(true)
    try {
      const searchResults = await SecureAPIClient.getYouTubeVideos(`${searchQuery} ${currentLocation} safety`)
      setVideos(searchResults)
    } catch (error) {
      console.error("Error searching videos:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-3">Safety Guides & Local Information</h3>

      {/* Search Bar */}
      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Search safety guides, local tips..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        />
        <Button onClick={handleSearch} disabled={loading}>
          <Search className="w-4 h-4" />
        </Button>
      </div>

      {/* Video List */}
      <div className="space-y-3">
        {videos.map((video, index) => (
          <div key={index} className="flex gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="relative flex-shrink-0">
              <img
                src={video.thumbnail || "/placeholder.svg"}
                alt={video.title}
                className="w-24 h-16 object-cover rounded"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded">
                <Play className="w-6 h-6 text-white" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm mb-1 line-clamp-2">{video.title}</h4>
              <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{video.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{video.channelTitle}</span>
                <Button size="sm" variant="ghost" className="h-6 px-2">
                  <ExternalLink className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {loading && (
        <div className="text-center py-4">
          <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="text-sm text-muted-foreground mt-2">Loading safety guides...</p>
        </div>
      )}
    </Card>
  )
}
