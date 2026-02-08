export function DashboardIllustration() {
  return (
    <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Background */}
      <defs>
        <linearGradient id="dashGrad" x1="60" y1="50" x2="340" y2="250" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366F1"/>
          <stop offset="1" stopColor="#8B5CF6"/>
        </linearGradient>
        <filter id="dashGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      <circle cx="200" cy="150" r="130" fill="url(#dashGrad)" opacity="0.05"/>
      
      {/* Main dashboard/card */}
      <rect x="50" y="40" width="300" height="200" rx="20" fill="white" stroke="url(#dashGrad)" strokeWidth="1" filter="url(#dashGlow)"/>
      
      {/* Header bar */}
      <rect x="50" y="40" width="300" height="50" rx="20" fill="url(#dashGrad)" opacity="0.1"/>
      <circle cx="80" cy="65" r="10" fill="url(#dashGrad)" opacity="0.6"/>
      <rect x="100" y="60" width="100" height="10" rx="5" fill="#E5E7EB"/>
      <rect x="280" y="60" width="50" height="10" rx="5" fill="#E5E7EB"/>
      
      {/* Stats cards */}
      <rect x="70" y="105" width="85" height="55" rx="12" fill="#F0FDF4" stroke="#10B981" strokeWidth="1"/>
      <circle cx="95" cy="125" r="12" fill="#10B981" opacity="0.2"/>
      <rect x="115" y="118" width="30" height="6" rx="3" fill="#10B981"/>
      <rect x="115" y="128" width="25" height="5" rx="2" fill="#D1FAE5"/>
      
      <rect x="165" y="105" width="85" height="55" rx="12" fill="#FEF2F2" stroke="#EF4444" strokeWidth="1"/>
      <circle cx="190" cy="125" r="12" fill="#EF4444" opacity="0.2"/>
      <rect x="210" y="118" width="30" height="6" rx="3" fill="#EF4444"/>
      <rect x="210" y="128" width="25" height="5" rx="2" fill="#FEE2E2"/>
      
      <rect x="260" y="105" width="80" height="55" rx="12" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="1"/>
      <circle cx="283" cy="125" r="12" fill="#3B82F6" opacity="0.2"/>
      <rect x="300" y="118" width="30" height="6" rx="3" fill="#3B82F6"/>
      <rect x="300" y="128" width="25" height="5" rx="2" fill="#DBEAFE"/>
      
      {/* Chart area */}
      <rect x="70" y="175" width="270" height="50" rx="12" fill="#F9FAFB"/>
      
      {/* Animated bar chart */}
      <rect x="85" y="190" width="22" height="35" rx="6" fill="#6366F1" opacity="0.8" className="animate-pulse"/>
      <rect x="115" y="198" width="22" height="27" rx="6" fill="#8B5CF6" opacity="0.8"/>
      <rect x="145" y="185" width="22" height="40" rx="6" fill="#A855F7" opacity="0.8"/>
      <rect x="175" y="195" width="22" height="30" rx="6" fill="#6366F1" opacity="0.8"/>
      <rect x="205" y="200" width="22" height="25" rx="6" fill="#8B5CF6" opacity="0.8"/>
      <rect x="235" y="188" width="22" height="37" rx="6" fill="#A855F7" opacity="0.8"/>
      <rect x="265" y="193" width="22" height="32" rx="6" fill="#6366F1" opacity="0.8"/>
      
      {/* Floating elements */}
      <circle cx="25" cy="70" r="8" fill="#6366F1" opacity="0.3"/>
      <circle cx="380" cy="130" r="10" fill="#10B981" opacity="0.3"/>
      <circle cx="365" cy="45" r="5" fill="#FBBF24" opacity="0.5"/>
      <rect x="340" cy="250" width="15" height="15" rx="3" fill="#8B5CF6" opacity="0.3" transform="rotate(20 347 257)"/>
    </svg>
  )
}

export function EmptyTransactionIllustration() {
  return (
    <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="emptyGrad" x1="100" y1="90" x2="300" y2="230" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366F1"/>
          <stop offset="1" stopColor="#8B5CF6"/>
        </linearGradient>
        <filter id="emptyGlow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      <circle cx="200" cy="150" r="130" fill="url(#emptyGrad)" opacity="0.05"/>
      
      {/* Wallet/Purse */}
      <g filter="url(#emptyGlow)">
        <ellipse cx="200" cy="165" rx="110" ry="75" fill="white" stroke="url(#emptyGrad)" strokeWidth="2"/>
        <path d="M90 165C90 115 140 95 200 95C260 95 310 115 310 165" stroke="url(#emptyGrad)" strokeWidth="3" fill="none"/>
        
        {/* Dollar sign in wallet */}
        <text x="200" y="180" textAnchor="middle" fontSize="52" fill="url(#emptyGrad)" fontWeight="bold">$</text>
      </g>
      
      {/* Plus button with glow */}
      <g filter="url(#emptyGlow)">
        <circle cx="200" cy="230" r="35" fill="#10B981"/>
        <circle cx="200" cy="230" r="30" fill="white"/>
        <path d="M185 230H215M200 215V245" stroke="#10B981" strokeWidth="5" strokeLinecap="round"/>
      </g>
      
      {/* Sparkles */}
      <g className="animate-pulse">
        <path d="M130 90L138 105L150 105L140 115L145 127L130 118L115 127L120 115L110 105L122 105Z" fill="#FBBF24"/>
        <path d="M270 85L276 96L286 96L278 103L282 113L270 106L258 113L262 103L254 96L264 96Z" fill="#FBBF24"/>
      </g>
      
      <text x="200" y="285" textAnchor="middle" fontSize="18" fill="#6B7280" fontWeight="500">Add your first transaction</text>
      <text x="200" y="305" textAnchor="middle" fontSize="14" fill="#9CA3AF">Start tracking your finances today!</text>
      
      {/* Small decorative elements */}
      <circle cx="60" cy="200" r="6" fill="#10B981" opacity="0.3"/>
      <circle cx="340" cy="180" r="8" fill="#6366F1" opacity="0.3"/>
    </svg>
  )
}

export function SuccessIllustration() {
  return (
    <svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Background glow */}
      <circle cx="100" cy="75" r="55" fill="#10B981" opacity="0.15"/>
      
      {/* Main circle */}
      <circle cx="100" cy="75" r="45" fill="#10B981" opacity="0.2"/>
      <circle cx="100" cy="75" r="35" fill="#10B981"/>
      
      {/* Checkmark */}
      <path d="M78 75L92 89L122 59" stroke="white" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      
      {/* Sparkles */}
      <circle cx="45" cy="35" r="4" fill="#FBBF24" opacity="0.7" className="animate-pulse"/>
      <circle cx="155" cy="45" r="3" fill="#FBBF24" opacity="0.5"/>
      <circle cx="165" cy="105" r="4" fill="#FBBF24" opacity="0.6"/>
      <path d="M35 100L38 108L46 110L38 112L35 120L32 112L24 110L32 108Z" fill="#FBBF24" opacity="0.5"/>
    </svg>
  )
}

export function TreeIllustration() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="treeGrad" x1="100" y1="20" x2="100" y2="180" gradientUnits="userSpaceOnUse">
          <stop stopColor="#22C55E"/>
          <stop offset="1" stopColor="#10B981"/>
        </linearGradient>
      </defs>
      
      {/* Tree trunk */}
      <rect x="90" y="140" width="20" height="40" rx="4" fill="#92400E"/>
      
      {/* Tree foliage */}
      <circle cx="100" cy="80" r="50" fill="url(#treeGrad)" opacity="0.3"/>
      <circle cx="100" cy="70" r="40" fill="url(#treeGrad)" opacity="0.5"/>
      <circle cx="100" cy="60" r="30" fill="url(#treeGrad)"/>
      
      {/* Fruits */}
      <circle cx="80" cy="50" r="8" fill="#EF4444"/>
      <circle cx="120" cy="55" r="7" fill="#EF4444"/>
      <circle cx="100" cy="40" r="6" fill="#EF4444"/>
      
      {/* Ground */}
      <ellipse cx="100" cy="180" rx="60" ry="10" fill="#22C55E" opacity="0.3"/>
    </svg>
  )
}
