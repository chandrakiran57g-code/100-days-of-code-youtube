import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const lat = searchParams.get("lat")
  const lng = searchParams.get("lng")

  if (!lat || !lng) {
    return NextResponse.json({ error: "Missing coordinates" }, { status: 400 })
  }

  try {
    const weatherApiKey = process.env.WEATHER_API_KEY

    if (!weatherApiKey) {
      // Return mock data if no API key
      return NextResponse.json({
        temperature: 28,
        condition: "Partly Cloudy",
        humidity: 65,
        windSpeed: 12,
        alerts: ["High UV Index", "Air Quality Moderate"],
      })
    }

    // Real API call would go here
    // const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${weatherApiKey}`)

    // For now, return enhanced mock data
    return NextResponse.json({
      temperature: Math.floor(Math.random() * 15) + 20, // 20-35°C
      condition: ["Sunny", "Partly Cloudy", "Cloudy", "Light Rain"][Math.floor(Math.random() * 4)],
      humidity: Math.floor(Math.random() * 40) + 40, // 40-80%
      windSpeed: Math.floor(Math.random() * 20) + 5, // 5-25 km/h
      alerts: Math.random() > 0.5 ? ["High UV Index"] : [],
    })
  } catch (error) {
    console.error("Weather API error:", error)
    return NextResponse.json({ error: "Failed to fetch weather data" }, { status: 500 })
  }
}
