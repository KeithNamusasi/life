export function AuthIllustration() {
  return (
    <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Animated background glow */}
      <defs>
        <linearGradient id="loginGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366F1" stopOpacity="0.2"/>
          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.1"/>
        </linearGradient>
        <linearGradient id="loginGrad2" x1="200" y1="40" x2="200" y2="200">
          <stop offset="0%" stopColor="#4F46E5"/>
          <stop offset="100%" stopColor="#7C3AED"/>
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Background circles */}
      <circle cx="200" cy="150" r="130" fill="url(#loginGrad1)"/>
      
      {/* Floating shapes */}
      <rect x="50" y="80" width="20" height="20" rx="4" fill="#6366F1" opacity="0.3" transform="rotate(15 60 90)"/>
      <rect x="330" y="200" width="15" height="15" rx="3" fill="#8B5CF6" opacity="0.4" transform="rotate(-20 337 207)"/>
      <circle cx="350" cy="80" r="8" fill="#A78BFA" opacity="0.3"/>

      {/* Main lock body */}
      <g filter="url(#glow)">
        <rect x="140" y="110" width="120" height="100" rx="16" fill="url(#loginGrad2)"/>
        
        {/* Lock shackle */}
        <path d="M160 110V70C160 52 175 40 200 40C225 40 240 52 240 70V110" 
              stroke="url(#loginGrad2)" strokeWidth="14" strokeLinecap="round" fill="none"/>
      </g>
      
      {/* Keyhole */}
      <g>
        <circle cx="200" cy="145" r="18" fill="white"/>
        <path d="M200 145V175" stroke="white" strokeWidth="8" strokeLinecap="round"/>
        <circle cx="185" cy="165" r="6" fill="white"/>
        <circle cx="215" cy="165" r="6" fill="white"/>
      </g>
      
      {/* Sparkle effects */}
      <g className="animate-pulse">
        <path d="M95 70L97 75L102 77L97 79L95 84L93 79L88 77L93 75Z" fill="#FBBF24"/>
        <path d="M310 250L312 255L317 257L312 259L310 264L308 259L303 257L308 255Z" fill="#FBBF24"/>
      </g>
      
      {/* Stars */}
      <circle cx="70" cy="150" r="3" fill="#FBBF24" opacity="0.5"/>
      <circle cx="340" cy="120" r="2" fill="#FBBF24" opacity="0.4"/>
      <circle cx="60" cy="230" r="3" fill="#FBBF24" opacity="0.6"/>
    </svg>
  )
}

export function SignupIllustration() {
  return (
    <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Animated background glow */}
      <defs>
        <linearGradient id="signupGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.15"/>
          <stop offset="100%" stopColor="#059669" stopOpacity="0.1"/>
        </linearGradient>
        <linearGradient id="signupGrad2" x1="160" y1="60" x2="240" y2="140">
          <stop offset="0%" stopColor="#10B981"/>
          <stop offset="100%" stopColor="#059669"/>
        </linearGradient>
        <linearGradient id="successGrad" x1="260" y1="230" x2="300" y2="270">
          <stop offset="0%" stopColor="#34D399"/>
          <stop offset="100%" stopColor="#10B981"/>
        </linearGradient>
        <filter id="glow2">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Background circles */}
      <circle cx="200" cy="150" r="130" fill="url(#signupGrad1)"/>
      
      {/* Floating celebration elements */}
      <circle cx="60" cy="100" r="8" fill="#10B981" opacity="0.2"/>
      <circle cx="340" cy="180" r="6" fill="#059669" opacity="0.3"/>
      <rect x="45" y="200" width="12" height="12" rx="2" fill="#10B981" opacity="0.2" transform="rotate(20 51 206)"/>
      <rect x="345" y="80" width="10" height="10" rx="2" fill="#34D399" opacity="0.3" transform="rotate(-15 350 85)"/>

      {/* Person celebrating */}
      <g filter="url(#glow2)">
        {/* Body */}
        <circle cx="180" cy="140" r="45" fill="url(#signupGrad2)"/>
        
        {/* Face */}
        <circle cx="180" cy="130" r="22" fill="white"/>
        
        {/* Eyes */}
        <circle cx="172" cy="125" r="3" fill="#1F2937"/>
        <circle cx="188" cy="125" r="3" fill="#1F2937"/>
        
        {/* Smile */}
        <path d="M168 138 Q180 150 192 138" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" fill="none"/>
        
        {/* Raised hands */}
        <circle cx="125" cy="110" r="15" fill="url(#signupGrad2)"/>
        <circle cx="235" cy="110" r="15" fill="url(#signupGrad2)"/>
        
        {/* Stars around hands */}
        <path d="M100 80L103 88L111 90L103 92L100 100L97 92L89 90L97 88Z" fill="#FBBF24" opacity="0.8"/>
        <path d="M290 70L292 76L298 78L292 80L290 86L288 80L282 78L288 76Z" fill="#FBBF24" opacity="0.6"/>
      </g>
      
      {/* Success badge */}
      <g filter="url(#glow2)">
        <circle cx="280" cy="250" r="35" fill="url(#successGrad)"/>
        <circle cx="280" cy="250" r="30" fill="white"/>
        <path d="M265 250 L275 260 L295 240" stroke="#10B981" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      
      {/* Decorative dots */}
      <circle cx="320" cy="80" r="4" fill="#10B981" opacity="0.4"/>
      <circle cx="70" cy="250" r="3" fill="#059669" opacity="0.5"/>
      <circle cx="340" cy="220" r="5" fill="#34D399" opacity="0.3"/>
    </svg>
  )
}
