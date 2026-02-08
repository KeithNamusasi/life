"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Loader2, ArrowRight, Sparkles, CheckCircle2, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { SignupIllustration } from "@/components/auth-illustration"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"

const formSchema = z.object({
    fullName: z.string().min(2, {
        message: "Full name must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
})

const benefits = [
    { icon: "💰", text: "Track income & expenses" },
    { icon: "📊", text: "Beautiful analytics" },
    { icon: "🎯", text: "Goal tracking" },
    { icon: "🔒", text: "Secure & private" },
]

const trustBadges = [
    { icon: "🛡️", text: "Bank-level security" },
    { icon: "⚡", text: "Lightning fast" },
    { icon: "💚", text: "Free forever" },
]

export default function SignupPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        setIsLoaded(true)
    }, [])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        const supabase = createClient()

        try {
            const { error } = await supabase.auth.signUp({
                email: values.email,
                password: values.password,
                options: {
                    emailRedirectTo: `${location.origin}/auth/callback`,
                    data: {
                        full_name: values.fullName,
                    },
                },
            })

            if (error) {
                toast.error("Signup failed. " + error.message)
                console.error(error)
                return
            }

            toast.success("Account created! Check your email to confirm. ✨")
            router.push("/auth/login")
        } catch (error) {
            toast.error("Something went wrong.")
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex flex-col lg:flex-row-reverse overflow-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
                <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-green-400/20 to-emerald-400/20 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-teal-400/20 to-cyan-400/20 blur-3xl" />
            </div>

            {/* Top Section - Illustration (Mobile) / Right Side (Desktop) */}
            <div className="lg:hidden relative h-56 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 flex items-center justify-center">
                <div className="absolute inset-0 bg-black/10" />
                <div className="relative z-10 h-36 w-36 animate-float">
                    <SignupIllustration />
                </div>
                {/* Welcome text for mobile */}
                <div className="absolute bottom-4 left-0 right-0 text-center">
                    <h2 className="text-xl font-bold text-white">Start Your Journey!</h2>
                </div>
            </div>

            {/* Right side - Illustration (Desktop) */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 items-center justify-center p-8 lg:p-12 order-2 relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-white/10 animate-float" />
                    <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-white/10 animate-float" style={{ animationDelay: '0.5s' }} />
                    <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-white/10 animate-float" style={{ animationDelay: '1s' }} />
                </div>
                
                <div className={`relative z-10 max-w-md w-full space-y-8 text-center transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="relative h-64 w-64 mx-auto animate-float">
                        <SignupIllustration />
                    </div>
                    <div>
                        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                            Start Your Journey!
                        </h2>
                        <p className="text-white/80 text-lg">
                            Join thousands of users who have transformed their financial life with Life-OS.
                        </p>
                    </div>
                    
                    {/* Benefits */}
                    <div className="grid grid-cols-2 gap-4 text-left">
                        {benefits.map((benefit, index) => (
                            <div 
                                key={index}
                                className={`flex items-center gap-3 text-white/90 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 transition-all duration-300 hover:scale-105 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                <span className="text-2xl">{benefit.icon}</span>
                                <span className="font-medium">{benefit.text}</span>
                            </div>
                        ))}
                    </div>
                    
                    {/* Trust Badges */}
                    <div className="flex flex-wrap items-center justify-center gap-4 text-white/60 text-sm">
                        {trustBadges.map((badge, index) => (
                            <div 
                                key={index}
                                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2"
                            >
                                <span>{badge.icon}</span>
                                <span>{badge.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Left side - Form */}
            <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-transparent order-1">
                <Card className={`w-full max-w-sm sm:max-w-md shadow-2xl border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <CardHeader className="space-y-1 text-center pb-4">
                        {/* Mobile illustration placeholder */}
                        <div className="lg:hidden mb-2">
                            <div className="h-16 w-16 mx-auto">
                                <SignupIllustration />
                            </div>
                        </div>
                        <CardTitle className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center justify-center gap-2">
                            <span>Create Account</span>
                            <span className="text-2xl">✨</span>
                        </CardTitle>
                        <CardDescription className="text-sm sm:text-base">
                            Join Life-OS and transform your life today
                        </CardDescription>
                        
                        {/* Quick social proof */}
                        <div className="flex items-center justify-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-2">
                            <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                            <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                            <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                            <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                            <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                            <span className="ml-1">10,000+ happy users</span>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
                                <FormField
                                    control={form.control}
                                    name="fullName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm font-medium">Full Name</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    placeholder="John Doe" 
                                                    {...field} 
                                                    className="pl-4 h-11 sm:h-12 transition-all duration-200 focus:ring-2 focus:ring-green-500 text-base bg-gray-50 dark:bg-gray-800"
                                                    autoComplete="name"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm font-medium">Email</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    placeholder="name@example.com" 
                                                    {...field} 
                                                    className="pl-4 h-11 sm:h-12 transition-all duration-200 focus:ring-2 focus:ring-green-500 text-base bg-gray-50 dark:bg-gray-800"
                                                    autoComplete="email"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm font-medium">Password</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    type="password" 
                                                    placeholder="••••••••" 
                                                    {...field} 
                                                    className="pl-4 h-11 sm:h-12 transition-all duration-200 focus:ring-2 focus:ring-green-500 text-base bg-gray-50 dark:bg-gray-800"
                                                    autoComplete="new-password"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm font-medium">Confirm Password</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    type="password" 
                                                    placeholder="••••••••" 
                                                    {...field} 
                                                    className="pl-4 h-11 sm:h-12 transition-all duration-200 focus:ring-2 focus:ring-green-500 text-base bg-gray-50 dark:bg-gray-800"
                                                    autoComplete="new-password"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button 
                                    className="w-full h-11 sm:h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-200 text-base shadow-lg shadow-green-500/25"
                                    type="submit" 
                                    disabled={isLoading}
                                >
                                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    {isLoading ? "Creating..." : "Create Account"}
                                    {!isLoading && <Sparkles className="ml-2 h-4 w-4" />}
                                </Button>
                                
                                {/* Terms */}
                                <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                                    By creating an account, you agree to our{" "}
                                    <Link href="#" className="text-green-600 hover:underline">Terms</Link>
                                    {" "}and{" "}
                                    <Link href="#" className="text-green-600 hover:underline">Privacy Policy</Link>
                                </p>
                            </form>
                        </Form>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-3 pt-2">
                        <div className="text-sm text-center text-gray-500 dark:text-gray-400">
                            Already have an account?{" "}
                            <Link href="/auth/login" className="text-green-600 hover:text-green-500 font-medium transition-colors">
                                Sign in <ArrowRight className="inline h-3 w-3 ml-1" />
                            </Link>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
