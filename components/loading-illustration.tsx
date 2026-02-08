"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Loader2, CheckCircle2 } from "lucide-react"

export function LoadingIllustration() {
    const router = useRouter()
    const [progress, setProgress] = useState(0)
    const [status, setStatus] = useState("Preparing your dashboard...")
    const [isComplete, setIsComplete] = useState(false)

    useEffect(() => {
        const checkAuthAndRedirect = async () => {
            // Simulate progress steps
            const steps = [
                { progress: 25, status: "Loading your profile..." },
                { progress: 50, status: "Setting up your account..." },
                { progress: 75, status: "Fetching transactions..." },
                { progress: 100, status: "Welcome to Life-OS!" },
            ]

            for (let i = 0; i < steps.length; i++) {
                await new Promise(resolve => setTimeout(resolve, 300))
                setProgress(steps[i].progress)
                setStatus(steps[i].status)
            }

            await new Promise(resolve => setTimeout(resolve, 400))
            setIsComplete(true)

            await new Promise(resolve => setTimeout(resolve, 500))
            router.push("/dashboard")
            router.refresh()
        }

        checkAuthAndRedirect()
    }, [router])

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-50 via-emerald-50 to-teal-50 dark:from-green-950 dark:via-emerald-950 dark:to-teal-900 px-4 overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-green-100/50 dark:to-green-900/20" />
                
                {/* Floating particles */}
                <div className="absolute top-20 left-10 animate-float">
                    <span className="text-2xl opacity-60">🌸</span>
                </div>
                <div className="absolute top-32 right-16 animate-float" style={{ animationDelay: '0.5s' }}>
                    <span className="text-xl opacity-50">🍃</span>
                </div>
                <div className="absolute bottom-40 left-20 animate-float" style={{ animationDelay: '1s' }}>
                    <span className="text-2xl opacity-40">🌿</span>
                </div>
                <div className="absolute bottom-20 right-10 animate-float" style={{ animationDelay: '1.5s' }}>
                    <span className="text-2xl opacity-50">✨</span>
                </div>
            </div>

            {/* Main Tree Animation */}
            <div className="relative z-10 mb-8">
                <div className="relative animate-float">
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-green-400 blur-3xl opacity-20 animate-pulse" />
                    
                    {/* Tree SVG */}
                    <svg width="280" height="360" viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10">
                        {/* Trunk */}
                        <defs>
                            <linearGradient id="trunkGrad" x1="200" y1="350" x2="200" y2="500">
                                <stop offset="0%" stopColor="#92400E"/>
                                <stop offset="100%" stopColor="#78350F"/>
                            </linearGradient>
                            <linearGradient id="leafGrad1" x1="200" y1="50" x2="200" y2="350">
                                <stop offset="0%" stopColor="#4ADE80"/>
                                <stop offset="50%" stopColor="#22C55E"/>
                                <stop offset="100%" stopColor="#16A34A"/>
                            </linearGradient>
                            <linearGradient id="leafGrad2" x1="150" y1="150" x2="250" y2="350">
                                <stop offset="0%" stopColor="#22C55E"/>
                                <stop offset="100%" stopColor="#15803D"/>
                            </linearGradient>
                        </defs>
                        
                        {/* Trunk */}
                        <path d="M175 500L190 350L210 350L225 500" fill="url(#trunkGrad)" />
                        <path d="M185 500L195 380L205 380L215 500" fill="#A16207" opacity="0.5" />
                        
                        {/* Foliage layers with animation */}
                        <ellipse cx="200" cy="320" rx="130" ry="90" fill="url(#leafGrad2)" opacity="0.4" className="animate-pulse" style={{ animationDuration: '3s' }} />
                        <ellipse cx="200" cy="280" rx="120" ry="80" fill="url(#leafGrad1)" opacity="0.6" />
                        <ellipse cx="150" cy="300" rx="80" ry="60" fill="#22C55E" opacity="0.5" />
                        <ellipse cx="250" cy="300" rx="80" ry="60" fill="#22C55E" opacity="0.5" />
                        <ellipse cx="200" cy="240" rx="100" ry="70" fill="url(#leafGrad1)" opacity="0.8" />
                        <ellipse cx="200" cy="180" rx="80" ry="55" fill="#4ADE80" opacity="0.9" />
                        <ellipse cx="200" cy="130" rx="60" ry="45" fill="url(#leafGrad1)" opacity="0.9" />
                        <ellipse cx="200" cy="85" rx="40" ry="30" fill="#86EFAC" opacity="0.8" />
                        <ellipse cx="200" cy="50" rx="25" ry="18" fill="#BBF7D0" opacity="0.9" />
                        
                        {/* Fruits/flowers */}
                        <circle cx="140" cy="200" r="10" fill="#EF4444" opacity="0.8" className="animate-pulse" />
                        <circle cx="260" cy="180" r="8" fill="#EF4444" opacity="0.7" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
                        <circle cx="170" cy="280" r="7" fill="#EF4444" opacity="0.6" className="animate-pulse" style={{ animationDelay: '1s' }} />
                        <circle cx="230" cy="250" r="9" fill="#EF4444" opacity="0.7" className="animate-pulse" style={{ animationDelay: '0.3s' }} />
                        
                        {/* Sparkles */}
                        <circle cx="100" cy="150" r="3" fill="#FBBF24" opacity="0.6" className="animate-pulse" />
                        <circle cx="300" cy="120" r="4" fill="#FBBF24" opacity="0.5" className="animate-pulse" style={{ animationDelay: '0.7s' }} />
                        
                        {/* Birds */}
                        <g className="animate-bounce" style={{ animationDuration: '2s' }}>
                            <path d="M80 100C80 100 88 93 96 100C96 100 104 93 112 100" stroke="#64748B" strokeWidth="2" fill="none" />
                        </g>
                        <g className="animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '1s' }}>
                            <path d="M290 80C290 80 296 74 302 80C302 80 308 74 314 80" stroke="#64748B" strokeWidth="2" fill="none" />
                        </g>
                    </svg>
                </div>
            </div>

            {/* Loading Card */}
            <div className="relative z-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 max-w-sm w-full mx-4 text-center border border-green-100 dark:border-green-800">
                {isComplete ? (
                    <div className="animate-scale-in py-4">
                        <div className="h-20 w-20 mx-auto mb-4 text-green-500 animate-bounce">
                            <CheckCircle2 className="h-full w-full" />
                        </div>
                        <h2 className="text-2xl font-bold text-green-600 mb-2">Welcome!</h2>
                        <p className="text-muted-foreground">Redirecting to your dashboard...</p>
                    </div>
                ) : (
                    <>
                        {/* Logo */}
                        <div className="mb-4">
                            <span className="text-3xl">🌟</span>
                        </div>

                        <h2 className="text-xl font-bold mb-2 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                            Growing Your Dashboard
                        </h2>
                        
                        <p className="text-muted-foreground mb-6">{status}</p>

                        {/* Progress Bar */}
                        <div className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-3">
                            <div 
                                className="absolute left-0 top-0 h-full bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 transition-all duration-500 ease-out rounded-full"
                                style={{ width: `${progress}%` }}
                            />
                            {/* Animated shine effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine" />
                        </div>

                        {/* Progress percentage */}
                        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-4">
                            <Loader2 className="h-4 w-4 animate-spin text-green-500" />
                            <span>{progress}%</span>
                        </div>

                        {/* Motivational message */}
                        <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl border border-green-100 dark:border-green-800">
                            <p className="text-sm text-green-700 dark:text-green-400 font-medium">
                                🌳 &quot;Like a tree, your finances grow stronger with care.&quot;
                            </p>
                        </div>
                    </>
                )}
            </div>

            {/* Footer */}
            <p className="relative z-10 mt-8 text-sm text-muted-foreground">
                Life-OS
            </p>
        </div>
    )
}
