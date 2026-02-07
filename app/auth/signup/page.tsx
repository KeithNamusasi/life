"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Loader2, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react"

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
    "Track your finances effortlessly",
    "Set and achieve life goals",
    "Beautiful and intuitive interface",
]

export default function SignupPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

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
        <div className="min-h-screen flex flex-col lg:flex-row-reverse">
            {/* Top Section - Illustration (Mobile) / Right Side (Desktop) */}
            <div className="lg:hidden relative h-48 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 flex items-center justify-center">
                <div className="absolute inset-0 bg-black/10" />
                <div className="relative z-10 h-32 w-32">
                    <SignupIllustration />
                </div>
                {/* Welcome text for mobile */}
                <div className="absolute bottom-4 left-0 right-0 text-center">
                    <h2 className="text-xl font-bold text-white">Start Your Journey!</h2>
                </div>
            </div>

            {/* Right side - Illustration (Desktop) */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 items-center justify-center p-8 lg:p-12 order-2">
                <div className="max-w-md w-full space-y-8 text-center">
                    <div className="relative h-56 w-56 mx-auto animate-float">
                        <SignupIllustration />
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-white">Start Your Journey!</h2>
                    <p className="text-white/80 text-base lg:text-lg">
                        Join thousands of users who have transformed their financial life with Life-OS.
                    </p>
                    <div className="space-y-3 text-left max-w-xs mx-auto">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="flex items-center gap-3 text-white/90">
                                <CheckCircle2 className="h-5 w-5 text-white" />
                                <span>{benefit}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-3 lg:gap-4 text-white/60 text-xs lg:text-sm">
                        <span className="flex items-center gap-1">
                            <Sparkles className="h-3 w-3 lg:h-4 lg:w-4" /> Free
                        </span>
                        <span className="flex items-center gap-1">
                            <Sparkles className="h-3 w-3 lg:h-4 lg:w-4" /> Secure
                        </span>
                        <span className="flex items-center gap-1">
                            <Sparkles className="h-3 w-3 lg:h-4 lg:w-4" /> Easy
                        </span>
                    </div>
                </div>
            </div>

            {/* Left side - Form */}
            <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 order-1">
                <Card className="w-full max-w-sm sm:max-w-md shadow-xl border-t-4 border-green-500 animate-slide-up">
                    <CardHeader className="space-y-1 text-center pb-4">
                        {/* Mobile illustration placeholder */}
                        <div className="lg:hidden mb-2">
                            <div className="h-16 w-16 mx-auto">
                                <SignupIllustration />
                            </div>
                        </div>
                        <CardTitle className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center justify-center gap-2">
                            <span>Create Account</span>
                            <span className="text-xl sm:text-2xl">🚀</span>
                        </CardTitle>
                        <CardDescription className="text-sm sm:text-base">
                            Join Life-OS and transform your life today
                        </CardDescription>
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
                                                    className="pl-4 h-11 sm:h-12 transition-all duration-200 focus:ring-2 focus:ring-green-500 text-base"
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
                                                    className="pl-4 h-11 sm:h-12 transition-all duration-200 focus:ring-2 focus:ring-green-500 text-base"
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
                                                    className="pl-4 h-11 sm:h-12 transition-all duration-200 focus:ring-2 focus:ring-green-500 text-base"
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
                                                    className="pl-4 h-11 sm:h-12 transition-all duration-200 focus:ring-2 focus:ring-green-500 text-base"
                                                    autoComplete="new-password"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button 
                                    className="w-full h-11 sm:h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-200 text-base" 
                                    type="submit" 
                                    disabled={isLoading}
                                >
                                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    {isLoading ? "Creating..." : "Create Account"}
                                    {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                                </Button>
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
