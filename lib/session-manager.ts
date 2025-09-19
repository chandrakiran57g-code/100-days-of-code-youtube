"use client"

export interface UserSession {
  id: string
  type: "tourist" | "police"
  userData: any
  loginTime: number
  lastActivity: number
}

export class SessionManager {
  private static readonly SESSION_KEY = "abhaya_session"
  private static readonly SESSION_DURATION = 30 * 60 * 1000 // 30 minutes

  static saveSession(session: UserSession): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(this.SESSION_KEY, JSON.stringify(session))
    }
  }

  static getSession(): UserSession | null {
    if (typeof window === "undefined") return null

    try {
      const sessionData = localStorage.getItem(this.SESSION_KEY)
      if (!sessionData) return null

      const session: UserSession = JSON.parse(sessionData)
      const now = Date.now()

      // Check if session is expired
      if (now - session.lastActivity > this.SESSION_DURATION) {
        this.clearSession()
        return null
      }

      // Update last activity
      session.lastActivity = now
      this.saveSession(session)

      return session
    } catch {
      return null
    }
  }

  static updateActivity(): void {
    const session = this.getSession()
    if (session) {
      session.lastActivity = Date.now()
      this.saveSession(session)
    }
  }

  static clearSession(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(this.SESSION_KEY)
    }
  }

  static isSessionValid(): boolean {
    return this.getSession() !== null
  }
}
