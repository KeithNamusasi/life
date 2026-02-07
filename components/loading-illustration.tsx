"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Loader2, TreeDeciduous, CheckCircle2 } from "lucide-react"

export function LoadingIllustration() {
    const router = useRouter()
    const supabase = createClient()
    const [progress, setProgress] = useState(0)
    const [status, setStatus] = useState("Preparing your dashboard...")
    const [isComplete, setIsComplete] = useState(false)

    useEffect(() => {
        const checkAuthAndRedirect = async () => {
            // Simulate progress steps - faster
            const steps = [
                { progress: 30, status: "Loading your profile..." },
                { progress: 60, status: "Fetching transactions..." },
                { progress: 100, status: "Welcome to Life-OS!" },
            ]

            for (let i = 0; i < steps.length; i++) {
                await new Promise(resolve => setTimeout(resolve, 200))
                setProgress(steps[i].progress)
                setStatus(steps[i].status)
            }

            // Small delay then redirect
            await new Promise(resolve => setTimeout(resolve, 300))
            setIsComplete(true)

            await new Promise(resolve => setTimeout(resolve, 500))
            router.push("/dashboard")
            router.refresh()
        }

        checkAuthAndRedirect()
    }, [router])

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-emerald-100 dark:from-green-950 dark:to-emerald-900 px-4">
            {/* Animated Tree Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Main Tree - Responsive size */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 animate-float">
                    <svg width="300" height="400" viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-64 h-auto md:w-96 md:h-auto">
                        {/* Trunk */}
                        <path d="M180 500L190 350L210 350L220 500" fill="#8B5A2B" />
                        <path d="M185 500L192 380L208 380L215 500" fill="#A0522D" />
                        
                        {/* Foliage Layers */}
                        <ellipse cx="200" cy="280" rx="120" ry="80" fill="#22C55E" opacity="0.9" className="animate-pulse" />
                        <ellipse cx="160" cy="320" rx="80" ry="60" fill="#16A34A" opacity="0.8" />
                        <ellipse cx="240" cy="320" rx="80" ry="60" fill="#16A34A" opacity="0.8" />
                        <ellipse cx="200" cy="250" rx="100" ry="70" fill="#22C55E" opacity="0.85" />
                        <ellipse cx="200" cy="200" rx="80" ry="55" fill="#4ADE80" opacity="0.8" />
                        <ellipse cx="200" cy="160" rx="60" ry="45" fill="#22C55E" opacity="0.9" />
                        <ellipse cx="200" cy="130" rx="45" ry="35" fill="#4ADE80" opacity="0.9" />
                        <ellipse cx="200" cy="100" rx="30" ry="25" fill="#86EFAC" opacity="0.8" />
                        
                        {/* Birds */}
                        <path d="M120 150C120 150 125 145 130 150C130 150 135 145 140 150" stroke="#64748B" strokeWidth="2" fill="none" className="animate-bounce" />
                        <path d="M280 130C280 130 285 125 290 130C290 130 295 125 300 130" stroke="#64748B" strokeWidth="2" fill="none" className="animate-bounce" style={{ animationDelay: "0.3s" }} />
                    </svg>
                </div>

                {/* Floating Elements - Hide on very small screens */}
                <div className="absolute top-16 left-4 animate-float hidden sm:block" style={{ animationDelay: "0.5s" }}>
                    <span className="text-3xl sm:text-4xl">🍃</span>
                </div>
                <div className="absolute top-24 right-4 animate-float hidden sm:block" style={{ animationDelay: "1s" }}>
                    <span className="text-2xl sm:text-3xl">🌿</span>
                </div>
            </div>

            {/* Loading Card - Responsive */}
            <div className="relative z-10 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 max-w-sm sm:max-w-md w-full mx-4 text-center">
                {isComplete ? (
                    <div className="animate-scale-in py-4">
                        <div className="h-20 w-20 sm:h-24 sm:w-24 mx-auto mb-4 text-green-500 animate-bounce">
                            <CheckCircle2 className="h-full w-full" />
                        </div>
                        <h2 className="text-xl sm:text-2xl font-bold text-green-600 mb-2">Welcome!</h2>
                        <p className="text-sm sm:text-base text-muted-foreground">Redirecting to your dashboard...</p>
                    </div>
                ) : (
                    <>
                        {/* Tree Icon - Smaller on mobile */}
                        <div className="h-16 w-16 sm:h-20 sm:w-20 mx-auto mb-4 sm:mb-6 text-green-500 animate-pulse">
                            <TreeDeciduous className="h-full w-full" />
                        </div>

                        <h2 className="text-xl sm:text-2xl font-bold mb-2 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                            Growing Your Dashboard
                        </h2>
                        
                        <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">{status}</p>

                        {/* Progress Bar */}
                        <div className="relative h-2.5 sm:h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-3 sm:mb-4">
                            <div 
                                className="absolute left-0 top-0 h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-300 ease-out rounded-full"
                                style={{ width: `${progress}%` }}
                            />
                        </div>

                        {/* Progress percentage */}
                        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-muted-foreground">
                            <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 animate-spin text-green-500" />
                            <span>{progress}%</span>
                        </div>

                        {/* Motivational message - Smaller on mobile */}
                        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                            <p className="text-xs sm:text-sm text-green-700 dark:text-green-400 font-medium">
                                🌳 &quot;Like a tree, your finances grow stronger with care.&quot;
                            </p>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
