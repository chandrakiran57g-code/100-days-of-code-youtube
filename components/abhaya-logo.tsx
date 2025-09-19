"use client"

interface AbhayaLogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  onClick?: () => void
}

export function AbhayaLogo({ size = "md", className = "", onClick }: AbhayaLogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  }

  return (
    <div
      className={`${sizeClasses[size]} ${className} ${onClick ? "cursor-pointer hover:opacity-80 transition-opacity" : ""}`}
      onClick={onClick}
    >
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Circular Shield Outline */}
        <circle cx="50" cy="50" r="45" stroke="#2563eb" strokeWidth="4" fill="none" className="drop-shadow-sm" />

        {/* Inner Shield Background */}
        <circle cx="50" cy="50" r="35" fill="#2563eb" fillOpacity="0.1" />

        {/* Map Pin Shape */}
        <path
          d="M50 25C42.268 25 36 31.268 36 39C36 50 50 65 50 65S64 50 64 39C64 31.268 57.732 25 50 25Z"
          fill="white"
          stroke="#2563eb"
          strokeWidth="2"
        />

        {/* Abhaya Mudra Hand (Open Palm) inside the pin */}
        <g transform="translate(50, 39) scale(0.8)">
          {/* Palm */}
          <ellipse cx="0" cy="0" rx="6" ry="8" fill="#10b981" />

          {/* Fingers */}
          <rect x="-2" y="-8" width="1.5" height="6" rx="0.75" fill="#10b981" />
          <rect x="-0.5" y="-9" width="1.5" height="7" rx="0.75" fill="#10b981" />
          <rect x="1" y="-8.5" width="1.5" height="6.5" rx="0.75" fill="#10b981" />
          <rect x="2.5" y="-7" width="1.5" height="5" rx="0.75" fill="#10b981" />

          {/* Thumb */}
          <ellipse cx="-5" cy="-2" rx="1" ry="3" fill="#10b981" transform="rotate(-30)" />
        </g>

        {/* Small decorative dots around the shield */}
        <circle cx="20" cy="30" r="2" fill="#10b981" opacity="0.6" />
        <circle cx="80" cy="30" r="2" fill="#10b981" opacity="0.6" />
        <circle cx="20" cy="70" r="2" fill="#10b981" opacity="0.6" />
        <circle cx="80" cy="70" r="2" fill="#10b981" opacity="0.6" />
      </svg>
    </div>
  )
}
