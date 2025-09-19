"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AbhayaLogo } from "@/components/abhaya-logo"
import { Shield, Lock, User } from "lucide-react"

interface LoginProps {
  onLogin: (credentials: any) => void
}

export function Login({ onLogin }: LoginProps) {
  const [credentials, setCredentials] = useState({
    badgeId: "",
    password: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onLogin(credentials)
  }

  const handleLogoClick = () => {
    // Navigate back to home - this will be handled by parent component
    window.location.href = "/"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 bg-slate-800/90 backdrop-blur-sm border-slate-700 shadow-2xl">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <AbhayaLogo size="lg" onClick={handleLogoClick} />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-white font-[family-name:var(--font-rubik)]">
              ABHAYA Command Center
            </h1>
            <p className="text-slate-400">Secure Law Enforcement Portal</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="badgeId" className="text-slate-300">
                Badge ID
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <Input
                  id="badgeId"
                  type="text"
                  placeholder="Enter your badge ID"
                  value={credentials.badgeId}
                  onChange={(e) => setCredentials({ ...credentials, badgeId: e.target.value })}
                  className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-primary focus:ring-primary"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-300">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-primary focus:ring-primary"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 shadow-lg transition-all"
              disabled={!credentials.badgeId || !credentials.password}
            >
              <Shield className="w-4 h-4 mr-2" />
              Secure Login
            </Button>
          </form>

          <div className="text-xs text-slate-500 pt-4 space-y-1">
            <div className="bg-slate-700/50 px-3 py-2 rounded-lg">
              <p className="text-slate-400">🔒 Authorized Personnel Only</p>
              <p className="text-slate-500">All activities are monitored and logged</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
