"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, Hash, CheckCircle, Clock, Copy } from "lucide-react"

interface BlockchainVerificationProps {
  documentType: "id" | "fir" | "alert"
  data: any
}

export function BlockchainVerification({ documentType, data }: BlockchainVerificationProps) {
  const [verificationStatus, setVerificationStatus] = useState<"pending" | "verified" | "failed">("pending")
  const [blockchainHash, setBlockchainHash] = useState("")
  const [timestamp, setTimestamp] = useState<Date | null>(null)

  useEffect(() => {
    // Simulate blockchain verification process
    const timer = setTimeout(() => {
      const hash = generateBlockchainHash(data)
      setBlockchainHash(hash)
      setVerificationStatus("verified")
      setTimestamp(new Date())
    }, 2000)

    return () => clearTimeout(timer)
  }, [data])

  const generateBlockchainHash = (data: any) => {
    // Simulate blockchain hash generation
    const dataString = JSON.stringify(data)
    const hash = btoa(dataString).slice(0, 16)
    return `0x${hash.toLowerCase().replace(/[^a-f0-9]/g, "a")}`
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(blockchainHash)
  }

  const getDocumentTitle = () => {
    switch (documentType) {
      case "id":
        return "Digital ID Verification"
      case "fir":
        return "e-FIR Blockchain Record"
      case "alert":
        return "Alert Verification"
      default:
        return "Document Verification"
    }
  }

  return (
    <Card className="p-4 bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200">
      <div className="flex items-center gap-3 mb-3">
        <Shield className="w-5 h-5 text-blue-600" />
        <h3 className="font-medium text-blue-800">{getDocumentTitle()}</h3>
        <Badge
          className={
            verificationStatus === "verified"
              ? "bg-green-100 text-green-800"
              : verificationStatus === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
          }
        >
          {verificationStatus === "verified" && <CheckCircle className="w-3 h-3 mr-1" />}
          {verificationStatus === "pending" && <Clock className="w-3 h-3 mr-1" />}
          {verificationStatus === "verified" ? "Blockchain Verified" : "Verifying..."}
        </Badge>
      </div>

      {verificationStatus === "verified" && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 p-2 bg-white rounded border">
            <Hash className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-mono text-gray-800 flex-1">{blockchainHash}</span>
            <Button size="sm" variant="ghost" onClick={copyToClipboard}>
              <Copy className="w-3 h-3" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Block Height:</span>
              <span className="text-gray-800 ml-2">#2,847,392</span>
            </div>
            <div>
              <span className="text-gray-600">Network:</span>
              <span className="text-gray-800 ml-2">ABHAYA Chain</span>
            </div>
            <div>
              <span className="text-gray-600">Timestamp:</span>
              <span className="text-gray-800 ml-2">{timestamp?.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-gray-600">Gas Used:</span>
              <span className="text-gray-800 ml-2">21,000</span>
            </div>
          </div>

          <div className="text-xs text-gray-600 bg-white p-2 rounded border">
            <p className="font-medium mb-1">Verification Details:</p>
            <p>• Document integrity: Verified ✓</p>
            <p>• Timestamp authenticity: Verified ✓</p>
            <p>• Digital signature: Valid ✓</p>
            <p>• Tamper-proof: Guaranteed ✓</p>
          </div>
        </div>
      )}

      {verificationStatus === "pending" && (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="animate-spin w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full" />
          <span>Submitting to blockchain network...</span>
        </div>
      )}
    </Card>
  )
}
