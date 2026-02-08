"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Shield, Zap, Heart, Check, Star, ArrowDown } from "lucide-react"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [activeFeature, setActiveFeature] = useState(0)

  useEffect(() => {
    // Small delay to trigger animation on mount
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const features = [
    {
      icon: "💰",
      title: "Smart Finance",
      description: "Track income & expenses with AI-powered insights",
      gradient: "from-green-400 to-emerald-500",
    },
    {
      icon: "🎯",
      title: "Goal Tracking",
      description: "Visualize progress and achieve your dreams",
      gradient: "from-amber-400 to-orange-500",
    },
    {
      icon: "🌱",
      title: "Life Balance",
      description: "Organize every aspect of your life beautifully",
      gradient: "from-purple-400 to-pink-500",
    },
    {
      icon: "📊",
      title: "Beautiful Analytics",
      description: "Stunning charts that make data beautiful",
      gradient: "from-indigo-400 to-purple-500",
    },
  ]

  const stats = [
    { value: "10K+", label: "Happy Users" },
    { value: "$2M+", label: "Tracked" },
    { value: "99.9%", label: "Uptime" },
    { value: "4.9★", label: "Rating" },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-background overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-purple-950" />
        
        {/* Floating Orbs */}
        <div 
          className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-indigo-400/20 to-purple-400/20 blur-3xl transition-transform duration-1000 ease-out"
          style={{ 
            transform: `translate(${mousePosition.x * 0.02 - 250}px, ${mousePosition.y * 0.02 - 250}px)`,
          }}
        />
        <div 
          className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-r from-pink-400/20 to-rose-400/20 blur-3xl transition-transform duration-1000 ease-out"
          style={{ 
            transform: `translate(${-mousePosition.x * 0.01 + 200}px, ${-mousePosition.y * 0.01 + 200}px)`,
          }}
        />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#6366f120_1px,transparent_1px),linear-gradient(to_bottom,#6366f120_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        <div className={`mx-auto max-w-7xl px-6 py-4 ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
          <nav className="flex items-center justify-between rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl px-6 py-3 shadow-lg shadow-indigo-500/5">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <span className="text-xl">🌟</span>
                </div>
                <div className="absolute inset-0 rounded-xl bg-indigo-500 blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Life-OS
              </span>
            </Link>
            
            <div className="hidden md:flex items-center gap-1">
              <Link href="/auth/login">
                <Button variant="ghost" className="hover:bg-indigo-50 hover:text-indigo-600 transition-all">
                  Login
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <main className="flex-1 pt-28">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center px-6">
          <div className={`mx-auto max-w-6xl text-center transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 text-indigo-600 dark:text-indigo-300 text-sm font-medium mb-8 animate-bounce">
              <Sparkles className="h-4 w-4" />
              <span>The future of personal organization</span>
            </div>

            {/* Main Heading */}
            <h1 className="font-bold text-5xl sm:text-6xl lg:text-8xl mb-6 leading-tight">
              <span className="bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 dark:from-white dark:via-indigo-200 dark:to-purple-200 bg-clip-text text-transparent">
                Your Life,
              </span>
              <br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                Beautifully Organized
              </span>
            </h1>

            {/* Subtitle */}
            <p className="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
              Experience the harmony of finance, growth, and organization in one stunning platform. 
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold"> ✨ Track • Grow • Thrive</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link href="/auth/signup">
                <Button 
                  size="lg" 
                  className="h-14 px-10 text-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-2xl shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300 hover:scale-105"
                >
                  Start Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="h-14 px-10 text-lg border-2 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 dark:border-gray-700 dark:hover:border-indigo-500 transition-all duration-300"
                >
                  Sign In
                </Button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Free forever</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Cancel anytime</span>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
              <ArrowDown className="h-6 w-6 text-gray-400" />
            </div>
          </div>

          {/* Hero Illustration */}
          <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl px-6 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <div className="relative">
              {/* Floating Cards */}
              <div className="relative z-10 rounded-3xl bg-white dark:bg-gray-800 shadow-2xl shadow-indigo-500/10 overflow-hidden">
                {/* Dashboard Preview */}
                <div className="p-6 space-y-4">
                  {/* Stats Row */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-24 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 p-4 text-white">
                      <div className="text-sm opacity-80">Balance</div>
                      <div className="text-2xl font-bold">$12,450</div>
                    </div>
                    <div className="h-24 rounded-2xl bg-gradient-to-br from-indigo-400 to-purple-500 p-4 text-white">
                      <div className="text-sm opacity-80">Income</div>
                      <div className="text-2xl font-bold">$8,200</div>
                    </div>
                    <div className="h-24 rounded-2xl bg-gradient-to-br from-pink-400 to-rose-500 p-4 text-white">
                      <div className="text-sm opacity-80">Savings</div>
                      <div className="text-2xl font-bold">$4,250</div>
                    </div>
                  </div>
                  {/* Chart Preview */}
                  <div className="h-32 rounded-2xl bg-gray-50 dark:bg-gray-700/50 p-4 flex items-end gap-2">
                    {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 95, 88].map((h, i) => (
                      <div 
                        key={i}
                        className="flex-1 rounded-t-lg bg-gradient-to-t from-indigo-500 to-purple-500 transition-all duration-500"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-xl flex items-center justify-center animate-float">
                <span className="text-4xl">🎯</span>
              </div>
              <div className="absolute -bottom-4 -left-6 w-20 h-20 rounded-2xl bg-gradient-to-br from-pink-400 to-rose-500 shadow-xl flex items-center justify-center animate-float" style={{ animationDelay: '0.5s' }}>
                <span className="text-3xl">🌸</span>
              </div>
              <div className="absolute top-1/2 -left-8 w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 shadow-xl flex items-center justify-center animate-float" style={{ animationDelay: '1s' }}>
                <span className="text-2xl">💰</span>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-6">
          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <div 
                  key={i}
                  className={`text-center p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg shadow-indigo-500/5 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-1 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 px-6">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="font-bold text-4xl sm:text-5xl mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Everything You Need
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Beautifully designed features to help you organize every aspect of your life
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, i) => (
                <div 
                  key={i}
                  className={`group relative p-6 rounded-3xl bg-white dark:bg-gray-800 shadow-lg shadow-indigo-500/5 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-2 cursor-pointer ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                  onMouseEnter={() => setActiveFeature(i)}
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="font-bold text-xl mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                  
                  {/* Hover Arrow */}
                  <div className={`absolute bottom-6 right-6 w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 ${activeFeature === i ? 'translate-x-0' : 'translate-x-2'}`}>
                    <ArrowRight className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 px-6 bg-gradient-to-b from-transparent to-indigo-50/50 dark:to-indigo-950/20">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="font-bold text-4xl sm:text-5xl mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Simple as 1-2-3
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: "01", title: "Sign Up Free", desc: "Create your account in seconds, no credit card needed", icon: "🚀" },
                { step: "02", title: "Add Your Data", desc: "Start tracking finances, goals, and habits effortlessly", icon: "📝" },
                { step: "03", title: "Watch Grow", desc: "See beautiful insights and reach your goals faster", icon: "🌟" },
              ].map((item, i) => (
                <div 
                  key={i}
                  className={`relative text-center p-8 rounded-3xl bg-white dark:bg-gray-800 shadow-lg shadow-indigo-500/5 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-1 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <div className="text-6xl mb-4">{item.icon}</div>
                  <div className="text-6xl font-bold text-indigo-200 dark:text-indigo-800 mb-2">{item.step}</div>
                  <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6">
          <div className="mx-auto max-w-4xl">
            <div className="relative rounded-3xl overflow-hidden">
              {/* Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500" />
              <div className="absolute inset-0 bg-[url('/assets/pattern.svg')] opacity-10" />
              
              {/* Content */}
              <div className="relative p-12 md:p-16 text-center text-white">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
                  <Star className="h-4 w-4 text-yellow-300" />
                  <span className="text-sm font-medium">Join 10,000+ happy users</span>
                </div>
                
                <h2 className="font-bold text-4xl md:text-5xl mb-4">
                  Ready to Transform Your Life?
                </h2>
                <p className="text-xl text-white/80 mb-8 max-w-xl mx-auto">
                  Start your journey to financial freedom and personal growth today. 
                  It&apos;s free, beautiful, and designed for you.
                </p>
                
                <Link href="/auth/signup">
                  <Button 
                    size="lg" 
                    className="h-14 px-10 text-lg bg-white text-indigo-600 hover:bg-gray-100 shadow-2xl transition-all duration-300 hover:scale-105"
                  >
                    Get Started Free
                    <Sparkles className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-12 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <span className="text-sm">🌟</span>
              </div>
              <span className="font-bold">Life-OS</span>
            </div>
            
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © 2024 Life-OS. Made with ❤️ for your financial freedom.
            </p>
            
            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <Link href="/dashboard" className="hover:text-indigo-600 transition-colors">
                Dashboard
              </Link>
              <Link href="/auth/login" className="hover:text-indigo-600 transition-colors">
                Login
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
