export function DashboardIllustration() {
  return (
    <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Background circle */}
      <circle cx="200" cy="150" r="130" fill="url(#gradient1)" opacity="0.08"/>
      
      {/* Main dashboard/card */}
      <rect x="60" y="50" width="280" height="180" rx="16" fill="white" stroke="url(#gradient1)" strokeWidth="2" className="shadow-lg"/>
      
      {/* Header bar */}
      <rect x="60" y="50" width="280" height="40" rx="16" fill="url(#gradient1)" opacity="0.1"/>
      <circle cx="85" cy="70" r="8" fill="url(#gradient1)" opacity="0.6"/>
      <rect x="100" y="65" width="80" height="10" rx="5" fill="#E5E7EB"/>
      <rect x="280" y="65" width="40" height="10" rx="5" fill="#E5E7EB"/>
      
      {/* Stats cards */}
      <rect x="80" y="105" width="70" height="50" rx="8" fill="#F0FDF4" stroke="#10B981" strokeWidth="1"/>
      <rect x="165" y="105" width="70" height="50" rx="8" fill="#FEF2F2" stroke="#EF4444" strokeWidth="1"/>
      <rect x="250" y="105" width="70" height="50" rx="8" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="1"/>
      
      {/* Mini icons in cards */}
      <circle cx="115" cy="125" r="8" fill="#10B981"/>
      <circle cx="200" cy="125" r="8" fill="#EF4444"/>
      <circle cx="285" cy="125" r="8" fill="#3B82F6"/>
      
      {/* Chart area */}
      <rect x="80" y="170" width="240" height="45" rx="8" fill="#F9FAFB"/>
      {/* Bar chart */}
      <rect x="90" y="185" width="20" height="30" rx="4" fill="#6366F1" opacity="0.8"/>
      <rect x="118" y="192" width="20" height="23" rx="4" fill="#8B5CF6" opacity="0.8"/>
      <rect x="146" y="180" width="20" height="35" rx="4" fill="#A855F7" opacity="0.8"/>
      <rect x="174" y="188" width="20" height="27" rx="4" fill="#6366F1" opacity="0.8"/>
      <rect x="202" y="195" width="20" height="20" rx="4" fill="#8B5CF6" opacity="0.8"/>
      <rect x="230" y="182" width="20" height="33" rx="4" fill="#A855F7" opacity="0.8"/>
      <rect x="258" y="190" width="20" height="25" rx="4" fill="#6366F1" opacity="0.8"/>
      
      {/* Decorative floating elements */}
      <circle cx="30" cy="80" r="6" fill="#6366F1" opacity="0.3"/>
      <circle cx="370" cy="150" r="8" fill="#10B981" opacity="0.3"/>
      <circle cx="350" cy="50" r="4" fill="#FBBF24" opacity="0.5"/>
      
      <defs>
        <linearGradient id="gradient1" x1="60" y1="50" x2="340" y2="250" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366F1"/>
          <stop offset="1" stopColor="#8B5CF6"/>
        </linearGradient>
      </defs>
    </svg>
  )
}

export function EmptyTransactionIllustration() {
  return (
    <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Background circle */}
      <circle cx="200" cy="150" r="120" fill="url(#gradient2)" opacity="0.08"/>
      
      {/* Empty wallet/purse */}
      <ellipse cx="200" cy="160" rx="100" ry="70" fill="white" stroke="url(#gradient2)" strokeWidth="2"/>
      <path d="M100 160C100 110 150 90 200 90C250 90 300 110 300 160" stroke="url(#gradient2)" strokeWidth="3" fill="none"/>
      
      {/* Dollar sign */}
      <text x="200" y="175" textAnchor="middle" fontSize="48" fill="url(#gradient2)" fontWeight="bold">$</text>
      
      {/* Plus button */}
      <circle cx="200" cy="220" r="30" fill="#10B981"/>
      <path d="M188 220H212M200 208V232" stroke="white" strokeWidth="4" strokeLinecap="round"/>
      
      {/* Sparkles */}
      <path d="M140 100L145 110L155 110L147 117L150 127L140 120L130 127L133 117L125 110L135 110L140 100Z" fill="#FBBF24"/>
      <path d="M260 100L265 110L275 110L267 117L270 127L260 120L250 127L253 117L245 110L255 110L260 100Z" fill="#FBBF24"/>
      
      <text x="200" y="270" textAnchor="middle" fontSize="16" fill="#6B7280">Add your first transaction</text>
      
      <defs>
        <linearGradient id="gradient2" x1="100" y1="90" x2="300" y2="230" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366F1"/>
          <stop offset="1" stopColor="#8B5CF6"/>
        </linearGradient>
      </defs>
    </svg>
  )
}

export function SuccessIllustration() {
  return (
    <svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Checkmark circle */}
      <circle cx="100" cy="75" r="50" fill="#10B981" opacity="0.2"/>
      <circle cx="100" cy="75" r="35" fill="#10B981"/>
      
      {/* Checkmark */}
      <path d="M82 75L93 86L118 61" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
      
      {/* Sparkles */}
      <circle cx="50" cy="40" r="4" fill="#FBBF24" opacity="0.6"/>
      <circle cx="150" cy="50" r="3" fill="#FBBF24" opacity="0.5"/>
      <circle cx="160" cy="100" r="4" fill="#FBBF24" opacity="0.6"/>
    </svg>
  )
}
