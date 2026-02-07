export function AuthIllustration() {
  return (
    <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Background circle */}
      <circle cx="200" cy="150" r="120" fill="url(#gradient1)" opacity="0.1"/>
      
      {/* Main lock body */}
      <rect x="140" y="100" width="120" height="100" rx="12" fill="url(#gradient2)"/>
      
      {/* Lock shackle */}
      <path d="M160 100V65C160 50 175 40 200 40C225 40 240 50 240 65V100" 
            stroke="url(#gradient2)" strokeWidth="12" strokeLinecap="round" fill="none"/>
      
      {/* Keyhole */}
      <circle cx="200" cy="135" r="15" fill="white"/>
      <rect x="195" y="135" width="10" height="20" rx="2" fill="url(#gradient2)"/>
      
      {/* Decorative stars */}
      <circle cx="80" cy="60" r="4" fill="#FBBF24" opacity="0.6"/>
      <circle cx="320" cy="80" r="3" fill="#FBBF24" opacity="0.4"/>
      <circle cx="340" cy="200" r="5" fill="#FBBF24" opacity="0.5"/>
      <circle cx="60" cy="220" r="3" fill="#FBBF24" opacity="0.6"/>
      
      {/* Floating elements */}
      <rect x="50" y="150" width="30" height="4" rx="2" fill="#6366F1" opacity="0.3"/>
      <rect x="320" y="120" width="25" height="4" rx="2" fill="#8B5CF6" opacity="0.3"/>
      
      <defs>
        <linearGradient id="gradient1" x1="80" y1="30" x2="320" y2="270" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366F1"/>
          <stop offset="1" stopColor="#8B5CF6"/>
        </linearGradient>
        <linearGradient id="gradient2" x1="140" y1="40" x2="260" y2="200" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4F46E5"/>
          <stop offset="1" stopColor="#7C3AED"/>
        </linearGradient>
      </defs>
    </svg>
  )
}

export function SignupIllustration() {
  return (
    <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Background circle */}
      <circle cx="200" cy="150" r="120" fill="url(#gradient3)" opacity="0.1"/>
      
      {/* Person with checkmark */}
      <circle cx="200" cy="120" r="40" fill="url(#gradient3)"/>
      <circle cx="200" cy="110" r="20" fill="white"/>
      <path d="M190 110L198 118L210 106" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      
      {/* Document/signup form */}
      <rect x="120" y="170" width="160" height="80" rx="8" fill="white" stroke="url(#gradient3)" strokeWidth="2"/>
      
      {/* Form lines */}
      <rect x="140" y="185" width="80" height="8" rx="4" fill="#E5E7EB"/>
      <rect x="140" y="200" width="120" height="6" rx="3" fill="#F3F4F6"/>
      <rect x="140" y="212" width="100" height="6" rx="3" fill="#F3F4F6"/>
      
      {/* Checkmark badge */}
      <circle cx="280" cy="250" r="25" fill="#10B981"/>
      <path d="M270 250L277 257L290 244" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      
      {/* Decorative elements */}
      <circle cx="60" cy="100" r="6" fill="#10B981" opacity="0.4"/>
      <circle cx="340" cy="130" r="4" fill="#10B981" opacity="0.3"/>
      <circle cx="320" cy="230" r="5" fill="#6366F1" opacity="0.4"/>
      
      <defs>
        <linearGradient id="gradient3" x1="160" y1="80" x2="240" y2="160" gradientUnits="userSpaceOnUse">
          <stop stopColor="#10B981"/>
          <stop offset="1" stopColor="#059669"/>
        </linearGradient>
      </defs>
    </svg>
  )
}
