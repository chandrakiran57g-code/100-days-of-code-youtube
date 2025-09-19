"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, Send, X, MapPin, Utensils, Hospital, Home, Maximize2, Minimize2 } from "lucide-react"

interface SmartChatbotProps {
  isOpen: boolean
  onToggle: () => void
}

export function SmartChatbot({ isOpen, onToggle }: SmartChatbotProps) {
  const [messages, setMessages] = useState([
    {
      type: "bot",
      content:
        "Hello! I'm your ABHAYA AI assistant. I can help you with directions, food recommendations, medical facilities, and safety guidance. How can I assist you today?",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState("English")
  const [isExpanded, setIsExpanded] = useState(false)

  const quickActions = [
    { icon: MapPin, label: "Directions", query: "I need directions to the nearest metro station" },
    { icon: Utensils, label: "Food", query: "Where can I find good vegetarian food nearby?" },
    { icon: Hospital, label: "Medical", query: "Where is the nearest hospital?" },
    { icon: Home, label: "Hotels", query: "Show me nearby hotels" },
  ]

  const languages = ["English", "Hindi", "Bengali", "Tamil", "Telugu", "Marathi"]

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])

    // Simulate AI response
    setTimeout(() => {
      const botResponse = {
        type: "bot",
        content: generateBotResponse(inputMessage),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
    }, 1000)

    setInputMessage("")
  }

  const generateBotResponse = (query: string) => {
    const lowerQuery = query.toLowerCase()

    if (lowerQuery.includes("direction") || lowerQuery.includes("metro")) {
      return "🚇 The nearest metro station is Rajiv Chowk, about 800m from your current location. Head north on Janpath Road, then turn right at Connaught Place. It's a 10-minute walk. Would you like me to guide you step by step?"
    }

    if (lowerQuery.includes("food") || lowerQuery.includes("restaurant")) {
      return "🍽️ I found several great vegetarian restaurants nearby:\n\n1. Saravana Bhavan (South Indian) - 5 min walk ⭐⭐⭐⭐⭐\n2. Haldiram's (North Indian) - 3 min walk ⭐⭐⭐⭐\n3. Cafe Coffee Day (Snacks) - 2 min walk ⭐⭐⭐⭐\n\nAll are highly rated and tourist-friendly. Would you like directions to any of these?"
    }

    if (lowerQuery.includes("hospital") || lowerQuery.includes("medical")) {
      return "🏥 The nearest medical facilities are:\n\n1. All India Institute of Medical Sciences (AIIMS) - 15 min by auto\n2. Ram Manohar Lohia Hospital - 10 min by metro\n3. Apollo Pharmacy - 3 min walk\n\n🚨 For emergencies, call 102 for ambulance. Do you need immediate medical assistance?"
    }

    if (lowerQuery.includes("hotel") || lowerQuery.includes("stay")) {
      return "🏨 Here are some nearby accommodation options:\n\n1. The Imperial Hotel (Luxury) - 1.2 km ⭐⭐⭐⭐⭐\n2. Hotel Palace Heights (Mid-range) - 800m ⭐⭐⭐⭐\n3. Zostel Delhi (Budget) - 600m ⭐⭐⭐\n\nAll have good safety ratings. Would you like me to check availability or provide contact details?"
    }

    return "I understand you're looking for assistance. Could you please be more specific about what you need help with? I can provide information about:\n\n• 🗺️ Directions and transportation\n• 🍽️ Food and restaurants\n• 🏥 Medical facilities\n• 🏨 Hotels and accommodation\n• 🎯 Local attractions\n• 🛡️ Safety tips"
  }

  const handleQuickAction = (query: string) => {
    setInputMessage(query)
    handleSendMessage()
  }

  if (!isOpen) {
    return null
  }

  return (
    <Card
      className={`${isExpanded ? "w-96 h-[600px]" : "w-80 h-96"} bg-white border shadow-2xl flex flex-col transition-all duration-300 animate-bounce-in`}
    >
      <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-primary to-green-600 text-white rounded-t-lg">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          <div>
            <h3 className="font-bold">ABHAYA Assistant</h3>
            <p className="text-xs opacity-90">AI-powered travel guide</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="text-xs bg-white/20 border border-white/30 rounded px-2 py-1 text-white"
          >
            {languages.map((lang) => (
              <option key={lang} value={lang} className="text-black">
                {lang}
              </option>
            ))}
          </select>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-white hover:bg-white/20 p-1"
          >
            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </Button>
          <Button variant="ghost" size="sm" onClick={onToggle} className="text-white hover:bg-white/20 p-1">
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar bg-gradient-to-b from-green-50 to-white">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.type === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
          >
            <div
              className={`max-w-[85%] p-3 rounded-lg text-sm shadow-sm ${
                message.type === "user"
                  ? "bg-primary text-white rounded-br-none"
                  : "bg-white text-gray-800 border border-green-100 rounded-bl-none"
              }`}
            >
              <div className="whitespace-pre-line leading-relaxed">{message.content}</div>
              <div className="text-xs opacity-70 mt-2 font-medium">{message.timestamp.toLocaleTimeString()}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 border-t bg-gray-50">
        <div className="grid grid-cols-4 gap-1 mb-3">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              className="flex-col h-auto py-2 text-xs hover:bg-green-100 hover:text-green-700 transition-all"
              onClick={() => handleQuickAction(action.query)}
            >
              <action.icon className="w-4 h-4 mb-1" />
              {action.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="p-3 border-t bg-white">
        <div className="flex gap-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 text-sm border-green-200 focus:border-primary focus:ring-primary/20"
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <Button
            size="sm"
            onClick={handleSendMessage}
            disabled={!inputMessage.trim()}
            className="bg-primary hover:bg-primary/90 shadow-sm"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}
