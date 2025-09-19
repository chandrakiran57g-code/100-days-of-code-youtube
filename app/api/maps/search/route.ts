import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { query, location } = await request.json()

    const apiKey = process.env.GOOGLE_MAPS_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        {
          error: "Google Maps API not configured",
          results: [],
        },
        { status: 200 },
      )
    }

    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&location=${location.lat},${location.lng}&radius=5000&key=${apiKey}`

    const response = await fetch(url)
    const data = await response.json()

    if (data.status === "OK" && data.results.length > 0) {
      return NextResponse.json({ results: data.results })
    } else {
      return NextResponse.json({ results: [] })
    }
  } catch (error) {
    console.error("Search API error:", error)
    return NextResponse.json({ results: [] })
  }
}
