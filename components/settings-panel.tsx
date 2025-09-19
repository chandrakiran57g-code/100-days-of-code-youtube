"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Settings, Shield, Bell, Smartphone, X, Save, RotateCcw } from "lucide-react"

interface SettingsPanelProps {
  isOpen: boolean
  onClose: () => void
  onSave: (settings: any) => void
}

export function SettingsPanel({ isOpen, onClose, onSave }: SettingsPanelProps) {
  const [settings, setSettings] = useState({
    // Safety Settings
    soloFemaleMode: false,
    locationSharing: true,
    emergencyNotifications: true,
    familyAlerts: true,
    safetyRadius: [500], // meters
    autoSOSEnabled: false,

    // Privacy Settings
    shareLocationWithFamily: true,
    shareLocationWithPolice: false,
    anonymousReporting: true,
    dataRetention: "30days",

    // Notification Settings
    pushNotifications: true,
    soundAlerts: true,
    vibrationAlerts: true,
    weatherAlerts: true,
    trafficAlerts: true,
    safetyAlerts: true,

    // Display Settings
    darkMode: false,
    language: "english",
    mapStyle: "standard",
    fontSize: "medium",

    // Emergency Settings
    emergencyContacts: 3,
    autoCallPolice: false,
    shareLocationInEmergency: true,
    recordAudioInEmergency: false,

    // Advanced Settings
    offlineMode: false,
    batteryOptimization: true,
    dataUsageLimit: false,
    backgroundTracking: true,
  })

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleSave = () => {
    onSave(settings)
    onClose()
  }

  const handleReset = () => {
    setSettings({
      soloFemaleMode: false,
      locationSharing: true,
      emergencyNotifications: true,
      familyAlerts: true,
      safetyRadius: [500],
      autoSOSEnabled: false,
      shareLocationWithFamily: true,
      shareLocationWithPolice: false,
      anonymousReporting: true,
      dataRetention: "30days",
      pushNotifications: true,
      soundAlerts: true,
      vibrationAlerts: true,
      weatherAlerts: true,
      trafficAlerts: true,
      safetyAlerts: true,
      darkMode: false,
      language: "english",
      mapStyle: "standard",
      fontSize: "medium",
      emergencyContacts: 3,
      autoCallPolice: false,
      shareLocationInEmergency: true,
      recordAudioInEmergency: false,
      offlineMode: false,
      batteryOptimization: true,
      dataUsageLimit: false,
      backgroundTracking: true,
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between bg-gradient-to-r from-green-50 to-emerald-50">
          <div className="flex items-center gap-3">
            <Settings className="w-5 h-5 text-primary" />
            <div>
              <h2 className="text-lg font-bold">Settings</h2>
              <p className="text-sm text-muted-foreground">Customize your ABHAYA experience</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[70vh] p-4 space-y-6">
          {/* Safety Settings */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-4 h-4 text-green-600" />
              <h3 className="font-semibold">Safety Settings</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Solo Female Mode</p>
                  <p className="text-sm text-muted-foreground">Enhanced safety features for solo female travelers</p>
                </div>
                <Switch
                  checked={settings.soloFemaleMode}
                  onCheckedChange={(checked) => handleSettingChange("soloFemaleMode", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Location Sharing</p>
                  <p className="text-sm text-muted-foreground">Share your location with trusted contacts</p>
                </div>
                <Switch
                  checked={settings.locationSharing}
                  onCheckedChange={(checked) => handleSettingChange("locationSharing", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Auto SOS</p>
                  <p className="text-sm text-muted-foreground">Automatically trigger SOS in dangerous situations</p>
                </div>
                <Switch
                  checked={settings.autoSOSEnabled}
                  onCheckedChange={(checked) => handleSettingChange("autoSOSEnabled", checked)}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium">Safety Radius</p>
                  <Badge variant="outline">{settings.safetyRadius[0]}m</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Alert when moving outside safe zone</p>
                <Slider
                  value={settings.safetyRadius}
                  onValueChange={(value) => handleSettingChange("safetyRadius", value)}
                  max={2000}
                  min={100}
                  step={100}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Privacy Settings */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-4 h-4 text-blue-600" />
              <h3 className="font-semibold">Privacy Settings</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Share with Family</p>
                  <p className="text-sm text-muted-foreground">Allow family members to see your location</p>
                </div>
                <Switch
                  checked={settings.shareLocationWithFamily}
                  onCheckedChange={(checked) => handleSettingChange("shareLocationWithFamily", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Share with Police</p>
                  <p className="text-sm text-muted-foreground">Allow police to access your location in emergencies</p>
                </div>
                <Switch
                  checked={settings.shareLocationWithPolice}
                  onCheckedChange={(checked) => handleSettingChange("shareLocationWithPolice", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Anonymous Reporting</p>
                  <p className="text-sm text-muted-foreground">Report incidents without revealing identity</p>
                </div>
                <Switch
                  checked={settings.anonymousReporting}
                  onCheckedChange={(checked) => handleSettingChange("anonymousReporting", checked)}
                />
              </div>

              <div>
                <p className="font-medium mb-2">Data Retention</p>
                <Select
                  value={settings.dataRetention}
                  onValueChange={(value) => handleSettingChange("dataRetention", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7days">7 Days</SelectItem>
                    <SelectItem value="30days">30 Days</SelectItem>
                    <SelectItem value="90days">90 Days</SelectItem>
                    <SelectItem value="1year">1 Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Separator />

          {/* Notification Settings */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Bell className="w-4 h-4 text-yellow-600" />
              <h3 className="font-semibold">Notifications</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive app notifications</p>
                </div>
                <Switch
                  checked={settings.pushNotifications}
                  onCheckedChange={(checked) => handleSettingChange("pushNotifications", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Sound Alerts</p>
                  <p className="text-sm text-muted-foreground">Play sound for important alerts</p>
                </div>
                <Switch
                  checked={settings.soundAlerts}
                  onCheckedChange={(checked) => handleSettingChange("soundAlerts", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Safety Alerts</p>
                  <p className="text-sm text-muted-foreground">Receive safety and security notifications</p>
                </div>
                <Switch
                  checked={settings.safetyAlerts}
                  onCheckedChange={(checked) => handleSettingChange("safetyAlerts", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Weather Alerts</p>
                  <p className="text-sm text-muted-foreground">Get weather warnings and updates</p>
                </div>
                <Switch
                  checked={settings.weatherAlerts}
                  onCheckedChange={(checked) => handleSettingChange("weatherAlerts", checked)}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Display Settings */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Smartphone className="w-4 h-4 text-purple-600" />
              <h3 className="font-semibold">Display</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Dark Mode</p>
                  <p className="text-sm text-muted-foreground">Use dark theme</p>
                </div>
                <Switch
                  checked={settings.darkMode}
                  onCheckedChange={(checked) => handleSettingChange("darkMode", checked)}
                />
              </div>

              <div>
                <p className="font-medium mb-2">Language</p>
                <Select value={settings.language} onValueChange={(value) => handleSettingChange("language", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="hindi">Hindi</SelectItem>
                    <SelectItem value="spanish">Spanish</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                    <SelectItem value="german">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <p className="font-medium mb-2">Map Style</p>
                <Select value={settings.mapStyle} onValueChange={(value) => handleSettingChange("mapStyle", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="satellite">Satellite</SelectItem>
                    <SelectItem value="terrain">Terrain</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Separator />

          {/* Emergency Settings */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Bell className="w-4 h-4 text-red-600" />
              <h3 className="font-semibold">Emergency</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Auto Call Police</p>
                  <p className="text-sm text-muted-foreground">Automatically call police during SOS</p>
                </div>
                <Switch
                  checked={settings.autoCallPolice}
                  onCheckedChange={(checked) => handleSettingChange("autoCallPolice", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Share Location in Emergency</p>
                  <p className="text-sm text-muted-foreground">Share precise location during emergencies</p>
                </div>
                <Switch
                  checked={settings.shareLocationInEmergency}
                  onCheckedChange={(checked) => handleSettingChange("shareLocationInEmergency", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Record Audio</p>
                  <p className="text-sm text-muted-foreground">Record audio during emergency situations</p>
                </div>
                <Switch
                  checked={settings.recordAudioInEmergency}
                  onCheckedChange={(checked) => handleSettingChange("recordAudioInEmergency", checked)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50 flex items-center justify-between">
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset to Default
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save Settings
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
