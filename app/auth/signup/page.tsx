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
        <div className="min-h-screen flex">
            {/* Left side - Form */}
            <div className="flex-1 flex items-center justify-center p-4 sm:p-8 bg-gray-50 dark:bg-gray-900 order-2 lg:order-1">
                <Card className="w-full max-w-md shadow-xl border-t-4 border-green-500 animate-slide-up">
                    <CardHeader className="space-y-1 text-center">
                        <div className="lg:hidden mb-4">
                            <div className="h-20 w-20 mx-auto">
                                <SignupIllustration />
                            </div>
                        </div>
                        <CardTitle className="text-3xl font-bold tracking-tight flex items-center justify-center gap-2">
                            <span>Create Account</span>
                            <span className="text-2xl">🚀</span>
                        </CardTitle>
                        <CardDescription className="text-base">
                            Join Life-OS and transform your life today
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                                                    className="pl-4 h-11 transition-all duration-200 focus:ring-2 focus:ring-green-500"
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
                                                    className="pl-4 h-11 transition-all duration-200 focus:ring-2 focus:ring-green-500"
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
                                                    className="pl-4 h-11 transition-all duration-200 focus:ring-2 focus:ring-green-500"
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
                                                    className="pl-4 h-11 transition-all duration-200 focus:ring-2 focus:ring-green-500"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button 
                                    className="w-full h-11 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-200" 
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
                    <CardFooter className="flex flex-col space-y-3">
                        <div className="text-sm text-center text-gray-500 dark:text-gray-400">
                            Already have an account?{" "}
                            <Link href="/auth/login" className="text-green-600 hover:text-green-500 font-medium transition-colors">
                                Sign in <ArrowRight className="inline h-3 w-3 ml-1" />
                            </Link>
                        </div>
                    </CardFooter>
                </Card>
            </div>

            {/* Right side - Illustration */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 items-center justify-center p-12 order-1 lg:order-2">
                <div className="max-w-md w-full space-y-8 text-center">
                    <div className="relative h-64 w-64 mx-auto animate-float">
                        <SignupIllustration />
                    </div>
                    <h2 className="text-3xl font-bold text-white">Start Your Journey!</h2>
                    <p className="text-white/80 text-lg">
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
                    <div className="flex items-center justify-center gap-4 text-white/60 text-sm">
                        <span className="flex items-center gap-1">
                            <Sparkles className="h-4 w-4" /> Free
                        </span>
                        <span className="flex items-center gap-1">
                            <Sparkles className="h-4 w-4" /> Secure
                        </span>
                        <span className="flex items-center gap-1">
                            <Sparkles className="h-4 w-4" /> Easy
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
