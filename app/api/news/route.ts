import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const location = searchParams.get("location")

  if (!location) {
    return NextResponse.json({ error: "Missing location" }, { status: 400 })
  }

  try {
    const newsApiKey = process.env.NEWS_API_KEY

    if (!newsApiKey) {
      // Return mock data if no API key
      return NextResponse.json([
        {
          title: "Tourist Safety Alert: New Security Measures at Red Fort",
          description: "Enhanced security protocols implemented for visitor safety",
          url: "#",
          publishedAt: new Date().toISOString(),
          source: "Delhi Tourism",
        },
        {
          title: "Weather Advisory: Monsoon Season Precautions",
          description: "Travelers advised to carry umbrellas and avoid low-lying areas",
          url: "#",
          publishedAt: new Date().toISOString(),
          source: "India Meteorological Department",
        },
      ])
    }

    // Real API call would go here
    // const response = await fetch(`https://newsapi.org/v2/everything?q=${location}+tourism+safety&apiKey=${newsApiKey}`)

    // For now, return location-specific mock data
    const mockNews = [
      {
        title: `${location} Tourism Update: New Safety Guidelines`,
        description: "Local authorities announce enhanced safety measures for tourists",
        url: "#",
        publishedAt: new Date().toISOString(),
        source: "Local Tourism Board",
      },
      {
        title: `Travel Alert: ${location} Weather Conditions`,
        description: "Current weather conditions and travel recommendations",
        url: "#",
        publishedAt: new Date().toISOString(),
        source: "Weather Department",
      },
    ]

    return NextResponse.json(mockNews)
  } catch (error) {
    console.error("News API error:", error)
    return NextResponse.json({ error: "Failed to fetch news data" }, { status: 500 })
  }
}
