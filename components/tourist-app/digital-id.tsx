import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AbhayaLogo } from "@/components/abhaya-logo"
import { Shield, QrCode } from "lucide-react"

interface DigitalIdProps {
  userData: any
}

export function DigitalId({ userData }: DigitalIdProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4 flex items-center justify-center">
      <Card className="w-full max-w-md p-6 space-y-6">
        <div className="text-center">
          <AbhayaLogo size="md" className="mx-auto mb-4" />
          <h2 className="text-xl font-bold text-primary font-[family-name:var(--font-rubik)]">ABHAYA Digital ID</h2>
        </div>

        <Card className="p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-bold text-lg">{userData.name || "Tourist Name"}</h3>
              <p className="text-blue-100 text-sm">
                Tourist ID: ABH{Math.random().toString(36).substr(2, 8).toUpperCase()}
              </p>
            </div>
            <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-600 text-xs">Photo</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-blue-100">Valid From:</span>
              <span>{new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-100">Valid Until:</span>
              <span>{new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-blue-500">
            <Badge className="bg-green-500 hover:bg-green-600">
              <Shield className="w-3 h-3 mr-1" />
              Blockchain Verified
            </Badge>
            <QrCode className="w-8 h-8" />
          </div>
        </Card>

        <div className="text-center text-xs text-muted-foreground">
          <p>This digital ID auto-expires for your privacy protection.</p>
          <p className="mt-1">Keep this safe and show when requested by authorities.</p>
        </div>
      </Card>
    </div>
  )
}
