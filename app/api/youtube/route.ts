import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("query")

  if (!query) {
    return NextResponse.json({ error: "Missing query" }, { status: 400 })
  }

  try {
    const youtubeApiKey = process.env.YOUTUBE_API_KEY

    if (!youtubeApiKey) {
      // Return mock data if no API key
      return NextResponse.json([
        {
          id: "demo1",
          title: `${query} Safety Guide for Tourists`,
          description: `Essential safety tips for visiting ${query}`,
          thumbnail: "/delhi-safety-guide.jpg",
          channelTitle: "Travel Safe India",
        },
        {
          id: "demo2",
          title: "Emergency Contacts in India",
          description: "Important phone numbers every tourist should know",
          thumbnail: "/emergency-contacts-india.jpg",
          channelTitle: "Tourist Help India",
        },
      ])
    }

    // Real API call would go here
    // const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${youtubeApiKey}`)

    // For now, return query-specific mock data
    const mockVideos = [
      {
        id: `demo_${Date.now()}`,
        title: `${query} Travel Guide 2024`,
        description: `Complete travel guide for ${query} with safety tips`,
        thumbnail: "/delhi-safety-guide.jpg",
        channelTitle: "Travel Expert",
      },
      {
        id: `demo_${Date.now() + 1}`,
        title: `Best Places to Visit in ${query}`,
        description: `Top attractions and safe areas in ${query}`,
        thumbnail: "/emergency-contacts-india.jpg",
        channelTitle: "Tourism Guide",
      },
    ]

    return NextResponse.json(mockVideos)
  } catch (error) {
    console.error("YouTube API error:", error)
    return NextResponse.json({ error: "Failed to fetch YouTube data" }, { status: 500 })
  }
}
