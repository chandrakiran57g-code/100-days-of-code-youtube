"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, Clock, Phone, Navigation, X } from "lucide-react"

interface SearchResult {
  id: string
  name: string
  type: "place" | "service" | "emergency" | "transport"
  description: string
  rating?: number
  distance?: string
  address: string
  phone?: string
  isOpen?: boolean
  safetyScore?: number
  coordinates?: { lat: number; lng: number }
}

interface SearchResultsProps {
  query: string
  isOpen: boolean
  onClose: () => void
  onSelectResult: (result: SearchResult) => void
}

export function SearchResults({ query, isOpen, onClose, onSelectResult }: SearchResultsProps) {
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (query && isOpen) {
      performSearch(query)
    }
  }, [query, isOpen])

  const performSearch = async (searchQuery: string) => {
    setLoading(true)

    // Simulate API call - in real app, this would call your search API
    await new Promise((resolve) => setTimeout(resolve, 500))

    const mockResults: SearchResult[] = [
      {
        id: "1",
        name: "Red Fort (Lal Qila)",
        type: "place",
        description: "Historic Mughal fortress and UNESCO World Heritage Site",
        rating: 4.5,
        distance: "2.3 km",
        address: "Netaji Subhash Marg, Chandni Chowk, New Delhi",
        isOpen: true,
        safetyScore: 85,
        coordinates: { lat: 28.6562, lng: 77.241 },
      },
      {
        id: "2",
        name: "All India Institute of Medical Sciences",
        type: "service",
        description: "Premier medical institution and hospital",
        rating: 4.2,
        distance: "3.1 km",
        address: "Sri Aurobindo Marg, Ansari Nagar, New Delhi",
        phone: "+91-11-26588500",
        isOpen: true,
        safetyScore: 95,
        coordinates: { lat: 28.5672, lng: 77.21 },
      },
      {
        id: "3",
        name: "Connaught Place Police Station",
        type: "emergency",
        description: "Local police station for emergency assistance",
        distance: "0.8 km",
        address: "Connaught Place, New Delhi",
        phone: "100",
        isOpen: true,
        safetyScore: 90,
        coordinates: { lat: 28.6315, lng: 77.2167 },
      },
      {
        id: "4",
        name: "Delhi Metro - Rajiv Chowk",
        type: "transport",
        description: "Major metro interchange station",
        rating: 4.1,
        distance: "0.5 km",
        address: "Connaught Place, New Delhi",
        isOpen: true,
        safetyScore: 80,
        coordinates: { lat: 28.6328, lng: 77.2197 },
      },
    ].filter(
      (result) =>
        result.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.type.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    setResults(mockResults)
    setLoading(false)
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "place":
        return "bg-blue-100 text-blue-800"
      case "service":
        return "bg-green-100 text-green-800"
      case "emergency":
        return "bg-red-100 text-red-800"
      case "transport":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getSafetyColor = (score?: number) => {
    if (!score) return "bg-gray-100 text-gray-800"
    if (score >= 80) return "bg-green-100 text-green-800"
    if (score >= 60) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-start justify-center pt-20">
      <Card className="w-full max-w-2xl mx-4 max-h-[70vh] overflow-hidden">
        <div className="p-4 border-b flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Search Results</h3>
            <p className="text-sm text-muted-foreground">
              {loading ? "Searching..." : `${results.length} results for "${query}"`}
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="overflow-y-auto max-h-[50vh]">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
              <p className="text-sm text-muted-foreground">Searching...</p>
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-muted-foreground">No results found for "{query}"</p>
              <p className="text-sm text-muted-foreground mt-1">
                Try searching for places, services, or emergency contacts
              </p>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {results.map((result) => (
                <Card
                  key={result.id}
                  className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => onSelectResult(result)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium">{result.name}</h4>
                        <Badge className={getTypeColor(result.type)} variant="secondary">
                          {result.type}
                        </Badge>
                        {result.safetyScore && (
                          <Badge className={getSafetyColor(result.safetyScore)} variant="secondary">
                            Safety: {result.safetyScore}
                          </Badge>
                        )}
                      </div>

                      <p className="text-sm text-muted-foreground mb-2">{result.description}</p>

                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {result.distance}
                        </div>

                        {result.rating && (
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            {result.rating}
                          </div>
                        )}

                        {result.isOpen !== undefined && (
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span className={result.isOpen ? "text-green-600" : "text-red-600"}>
                              {result.isOpen ? "Open" : "Closed"}
                            </span>
                          </div>
                        )}

                        {result.phone && (
                          <div className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {result.phone}
                          </div>
                        )}
                      </div>

                      <p className="text-xs text-muted-foreground mt-1">{result.address}</p>
                    </div>

                    <div className="flex flex-col gap-2 ml-4">
                      <Button size="sm" variant="outline">
                        <Navigation className="w-3 h-3 mr-1" />
                        Navigate
                      </Button>
                      {result.phone && (
                        <Button size="sm" variant="outline">
                          <Phone className="w-3 h-3 mr-1" />
                          Call
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
