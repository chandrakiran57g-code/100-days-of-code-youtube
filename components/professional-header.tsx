"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { AbhayaLogo } from "@/components/abhaya-logo"
import { SessionManager } from "@/lib/session-manager"
import { Search, Bell, Menu, LogOut, Shield, Phone, User } from "lucide-react"

interface ProfessionalHeaderProps {
  userType: "tourist" | "police"
  userData?: any
  safetyScore?: number
  onLogout: () => void
  onMenuToggle?: () => void
  onSearch?: (query: string) => void
  onLogoClick?: () => void
}

export function ProfessionalHeader({
  userType,
  userData,
  safetyScore,
  onLogout,
  onMenuToggle,
  onSearch,
  onLogoClick,
}: ProfessionalHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [showNotifications, setShowNotifications] = useState(false)

  const handleLogout = () => {
    SessionManager.clearSession()
    onLogout()
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim())
    }
  }

  const getSafetyColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-50 border-green-200"
    if (score >= 60) return "text-yellow-600 bg-yellow-50 border-yellow-200"
    return "text-red-600 bg-red-50 border-red-200"
  }

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left Section - Logo and Menu */}
          <div className="flex items-center gap-3">
            {onMenuToggle && (
              <Button variant="ghost" size="sm" onClick={onMenuToggle}>
                <Menu className="w-4 h-4" />
              </Button>
            )}

            <div className="flex items-center gap-2">
              <AbhayaLogo size="sm" onClick={onLogoClick} />
              <div>
                <h1 className="font-bold text-primary text-sm font-[family-name:var(--font-rubik)]">ABHAYA</h1>
                <p className="text-xs text-muted-foreground">
                  {userType === "tourist" ? "Smart Guardian" : "Command Center"}
                </p>
              </div>
            </div>
          </div>

          {/* Center Section - Search (for larger screens) */}
          {onSearch && (
            <div className="hidden md:flex flex-1 max-w-md mx-4">
              <form onSubmit={handleSearch} className="flex w-full gap-2">
                <Input
                  placeholder={userType === "tourist" ? "Search places, services..." : "Search tourists, incidents..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" size="sm" variant="outline">
                  <Search className="w-4 h-4" />
                </Button>
              </form>
            </div>
          )}

          {/* Right Section - Status and Actions */}
          <div className="flex items-center gap-2">
            {/* Safety Score (Tourist only) */}
            {userType === "tourist" && safetyScore && (
              <Badge className={`${getSafetyColor(safetyScore)} border text-xs`}>
                <Shield className="w-3 h-3 mr-1" />
                {safetyScore >= 80 ? "Safe" : safetyScore >= 60 ? "Caution" : "Risk"} ({safetyScore})
              </Badge>
            )}

            {/* Emergency Contact Button */}
            <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent">
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline ml-1">Emergency</span>
            </Button>

            {/* Notifications */}
            <div className="relative">
              <Button size="sm" variant="ghost" onClick={() => setShowNotifications(!showNotifications)}>
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>

              {showNotifications && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white border rounded-lg shadow-lg p-4 z-50">
                  <h3 className="font-semibold mb-2">Notifications</h3>
                  <div className="space-y-2 text-sm">
                    <div className="p-2 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                      <p className="font-medium">Safety Alert</p>
                      <p className="text-muted-foreground">Avoid Chandni Chowk area due to heavy crowds</p>
                    </div>
                    <div className="p-2 bg-blue-50 border-l-4 border-blue-400 rounded">
                      <p className="font-medium">Weather Update</p>
                      <p className="text-muted-foreground">Light rain expected in 2 hours</p>
                    </div>
                    <div className="p-2 bg-green-50 border-l-4 border-green-400 rounded">
                      <p className="font-medium">System Update</p>
                      <p className="text-muted-foreground">Your safety score improved to {safetyScore}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-2">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium">
                  {userData?.name || (userType === "tourist" ? "Tourist" : "Officer")}
                </p>
                <p className="text-xs text-muted-foreground">
                  {userType === "tourist" ? userData?.country : "Police Department"}
                </p>
              </div>

              <Button size="sm" variant="ghost">
                <User className="w-4 h-4" />
              </Button>

              <Button size="sm" variant="ghost" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline ml-1">Logout</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        {onSearch && (
          <div className="md:hidden mt-3">
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                placeholder={userType === "tourist" ? "Search places..." : "Search tourists..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="sm" variant="outline">
                <Search className="w-4 h-4" />
              </Button>
            </form>
          </div>
        )}
      </div>
    </header>
  )
}
