"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Loader2, ArrowRight, Sparkles } from "lucide-react"

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
import { AuthIllustration } from "@/components/auth-illustration"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"

const formSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    password: z.string().min(1, {
        message: "Password is required.",
    }),
})

export default function LoginPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        const supabase = createClient()

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email: values.email,
                password: values.password,
            })

            if (error) {
                toast.error("Login failed. Check your credentials.")
                console.error(error)
                return
            }

            toast.success("Welcome back! 🎉")
            router.push("/auth/loading")
            router.refresh()
        } catch (error) {
            toast.error("Something went wrong.")
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex flex-col lg:flex-row">
            {/* Top Section - Illustration (Mobile) / Left Side (Desktop) */}
            <div className="lg:hidden relative h-48 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
                <div className="absolute inset-0 bg-black/10" />
                <div className="relative z-10 h-32 w-32">
                    <AuthIllustration />
                </div>
                {/* Welcome text for mobile */}
                <div className="absolute bottom-4 left-0 right-0 text-center">
                    <h2 className="text-xl font-bold text-white">Welcome Back!</h2>
                </div>
            </div>

            {/* Left side - Illustration (Desktop) */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 items-center justify-center p-8 lg:p-12">
                <div className="max-w-md w-full space-y-8 text-center">
                    <div className="relative h-56 w-56 mx-auto animate-float">
                        <AuthIllustration />
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-white">Welcome Back!</h2>
                    <p className="text-white/80 text-base lg:text-lg">
                        Continue your journey to financial freedom and life organization.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3 lg:gap-4 text-white/60 text-xs lg:text-sm">
                        <span className="flex items-center gap-1">
                            <Sparkles className="h-3 w-3 lg:h-4 lg:w-4" /> Secure
                        </span>
                        <span className="flex items-center gap-1">
                            <Sparkles className="h-3 w-3 lg:h-4 lg:w-4" /> Fast
                        </span>
                        <span className="flex items-center gap-1">
                            <Sparkles className="h-3 w-3 lg:h-4 lg:w-4" /> Simple
                        </span>
                    </div>
                </div>
            </div>

            {/* Right side - Form */}
            <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
                <Card className="w-full max-w-sm sm:max-w-md shadow-xl border-t-4 border-indigo-500 animate-slide-up">
                    <CardHeader className="space-y-1 text-center pb-4">
                        {/* Mobile illustration placeholder */}
                        <div className="lg:hidden mb-2">
                            <div className="h-16 w-16 mx-auto">
                                <AuthIllustration />
                            </div>
                        </div>
                        <CardTitle className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center justify-center gap-2">
                            <span>Welcome Back</span>
                            <span className="text-xl sm:text-2xl">👋</span>
                        </CardTitle>
                        <CardDescription className="text-sm sm:text-base">
                            Enter your credentials to access your Life-OS dashboard
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
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
                                                    className="pl-4 h-11 sm:h-12 transition-all duration-200 focus:ring-2 focus:ring-indigo-500 text-base"
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
                                                    className="pl-4 h-11 sm:h-12 transition-all duration-200 focus:ring-2 focus:ring-indigo-500 text-base"
                                                    autoComplete="current-password"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button 
                                    className="w-full h-11 sm:h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 text-base" 
                                    type="submit" 
                                    disabled={isLoading}
                                >
                                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    {isLoading ? "Signing in..." : "Sign In"}
                                    {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-3 pt-2">
                        <div className="text-sm text-center text-gray-500 dark:text-gray-400">
                            Don't have an account?{" "}
                            <Link href="/auth/signup" className="text-indigo-600 hover:text-indigo-500 font-medium transition-colors">
                                Create one now <ArrowRight className="inline h-3 w-3 ml-1" />
                            </Link>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
