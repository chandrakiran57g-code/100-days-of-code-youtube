"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { SettingsPanel } from "@/components/settings-panel"
import { User, Shield, Award, Settings, ArrowLeft, Star } from "lucide-react"

interface ProfileProps {
  userData: any
  onBack: () => void
}

export function Profile({ userData, onBack }: ProfileProps) {
  const [showSettings, setShowSettings] = useState(false)
  const [userSettings, setUserSettings] = useState({
    soloFemaleMode: false,
    locationSharing: true,
    emergencyNotifications: true,
    familyAlerts: true,
  })

  const handleSaveSettings = (newSettings: any) => {
    setUserSettings(newSettings)
    console.log("Settings saved:", newSettings)
    // Here you would typically save to backend/localStorage
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white shadow-sm p-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            <h1 className="text-lg font-bold">Profile</h1>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* User Info Card */}
        <Card className="p-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold">{userData.name || "Tourist Name"}</h2>
              <p className="text-sm text-muted-foreground">ABHAYA Member since {new Date().getFullYear()}</p>
            </div>
          </div>
          <Badge className="bg-green-100 text-green-800">
            <Shield className="w-3 h-3 mr-1" />
            Verified Tourist
          </Badge>
        </Card>

        {/* Quick Settings */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-pink-600" />
              <div>
                <h3 className="font-medium">Solo Female Mode</h3>
                <p className="text-sm text-muted-foreground">Enhanced safety features</p>
              </div>
            </div>
            <Switch
              checked={userSettings.soloFemaleMode}
              onCheckedChange={(checked) => setUserSettings((prev) => ({ ...prev, soloFemaleMode: checked }))}
            />
          </div>

          <Button variant="outline" className="w-full bg-transparent" onClick={() => setShowSettings(true)}>
            <Settings className="w-4 h-4 mr-2" />
            Advanced Settings
          </Button>
        </Card>

        {/* Safety Rewards */}
        <Card className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <Award className="w-5 h-5 text-yellow-600" />
            <h3 className="font-medium">Safety Rewards</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Safety Tokens</span>
              <Badge variant="outline">1,250 tokens</Badge>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center p-2 bg-yellow-50 rounded-lg">
                <Star className="w-4 h-4 text-yellow-600 mx-auto mb-1" />
                <p className="text-xs">Safe Traveler</p>
              </div>
              <div className="text-center p-2 bg-blue-50 rounded-lg">
                <Shield className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                <p className="text-xs">Alert Reporter</p>
              </div>
              <div className="text-center p-2 bg-green-50 rounded-lg">
                <Award className="w-4 h-4 text-green-600 mx-auto mb-1" />
                <p className="text-xs">Helper</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Basic Settings Preview */}
        <Card className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <Settings className="w-5 h-5 text-gray-600" />
            <h3 className="font-medium">Quick Settings</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Location Sharing</span>
              <Switch
                checked={userSettings.locationSharing}
                onCheckedChange={(checked) => setUserSettings((prev) => ({ ...prev, locationSharing: checked }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Emergency Notifications</span>
              <Switch
                checked={userSettings.emergencyNotifications}
                onCheckedChange={(checked) => setUserSettings((prev) => ({ ...prev, emergencyNotifications: checked }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Family Alerts</span>
              <Switch
                checked={userSettings.familyAlerts}
                onCheckedChange={(checked) => setUserSettings((prev) => ({ ...prev, familyAlerts: checked }))}
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Settings Panel */}
      <SettingsPanel isOpen={showSettings} onClose={() => setShowSettings(false)} onSave={handleSaveSettings} />
    </div>
  )
}
