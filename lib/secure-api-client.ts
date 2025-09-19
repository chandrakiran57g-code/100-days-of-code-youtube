export interface WeatherData {
  temperature: number
  condition: string
  humidity: number
  windSpeed: number
  alerts: string[]
}

export interface NewsItem {
  title: string
  description: string
  url: string
  publishedAt: string
  source: string
}

export interface YouTubeVideo {
  id: string
  title: string
  description: string
  thumbnail: string
  channelTitle: string
}

export class SecureAPIClient {
  static async getWeatherData(lat: number, lng: number): Promise<WeatherData> {
    try {
      const response = await fetch(`/api/weather?lat=${lat}&lng=${lng}`)
      if (!response.ok) throw new Error("Weather API failed")
      return await response.json()
    } catch (error) {
      console.error("Weather API error:", error)
      return {
        temperature: 25,
        condition: "Unknown",
        humidity: 50,
        windSpeed: 10,
        alerts: [],
      }
    }
  }

  static async getLocalNews(location: string): Promise<NewsItem[]> {
    try {
      const response = await fetch(`/api/news?location=${encodeURIComponent(location)}`)
      if (!response.ok) throw new Error("News API failed")
      return await response.json()
    } catch (error) {
      console.error("News API error:", error)
      return []
    }
  }

  static async getYouTubeVideos(query: string): Promise<YouTubeVideo[]> {
    try {
      const response = await fetch(`/api/youtube?query=${encodeURIComponent(query)}`)
      if (!response.ok) throw new Error("YouTube API failed")
      return await response.json()
    } catch (error) {
      console.error("YouTube API error:", error)
      return []
    }
  }

  static async translateText(text: string, targetLanguage: string): Promise<string> {
    try {
      // Mock translation for demo - in production, this would call a translation API
      const translations: { [key: string]: { [key: string]: string } } = {
        "Emergency! Need help!": {
          hi: "आपातकाल! मदद चाहिए!",
          es: "¡Emergencia! ¡Necesito ayuda!",
          fr: "Urgence! Besoin d'aide!",
          de: "Notfall! Brauche Hilfe!",
        },
        "Where is the nearest hospital?": {
          hi: "निकटतम अस्पताल कहाँ है?",
          es: "¿Dónde está el hospital más cercano?",
          fr: "Où est l'hôpital le plus proche?",
          de: "Wo ist das nächste Krankenhaus?",
        },
        "I need police help": {
          hi: "मुझे पुलिस की मदद चाहिए",
          es: "Necesito ayuda de la policía",
          fr: "J'ai besoin de l'aide de la police",
          de: "Ich brauche Polizeihilfe",
        },
      }
      return translations[text]?.[targetLanguage] || text
    } catch (error) {
      console.error("Translation error:", error)
      return text
    }
  }
}
