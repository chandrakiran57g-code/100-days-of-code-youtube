import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { location, radius, type } = await request.json()

    // Use server-side environment variable (not exposed to client)
    const apiKey = process.env.GOOGLE_MAPS_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        {
          error: "Google Maps API not configured",
          places: [],
        },
        { status: 200 },
      )
    }

    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.lat},${location.lng}&radius=${radius}&type=${type}&key=${apiKey}`

    const response = await fetch(url)
    const data = await response.json()

    if (data.status === "OK") {
      return NextResponse.json({ places: data.results.slice(0, 5) })
    } else {
      return NextResponse.json({ places: [] })
    }
  } catch (error) {
    console.error("Places API error:", error)
    return NextResponse.json({ places: [] })
  }
}
