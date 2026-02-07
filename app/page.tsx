import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Shield, Zap, Heart } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <Link className="mr-6 flex items-center space-x-2" href="/">
              <span className="hidden font-bold sm:inline-block text-xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Life-OS
              </span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <nav className="flex items-center space-x-4">
              <Link href="/auth/login">
                <Button variant="ghost" size="sm" className="hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                  Login
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button 
                  size="sm" 
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white border-0 transition-all duration-200"
                >
                  Get Started
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32 relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute inset-0 -z-10 bg-grid-pattern opacity-50" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl -z-10" />
          
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center mx-auto">
            <div className="relative h-48 w-48 md:h-64 md:w-64 mb-6 animate-float">
              <Image
                src="/assets/hero-illustration.png"
                alt="Life OS Illustration"
                fill
                className="object-contain drop-shadow-xl"
                priority
              />
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent animate-fade-in">
              Your Life, Organized.
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8 animate-slide-up">
              Experience the harmony of finance, personal growth, and organization in one beautiful operating system.
              <span className="block mt-2 text-indigo-600 dark:text-indigo-400 font-medium">
                ✨ Track • Grow • Thrive
              </span>
            </p>
            <div className="space-x-4 animate-slide-up-delay-1">
              <Link href="/auth/signup">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white border-0 h-12 px-8 shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="h-12 px-8 border-indigo-200 hover:bg-indigo-50 transition-colors"
                >
                  I already have an account
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container space-y-6 bg-slate-50 dark:bg-transparent py-8 md:py-12 lg:py-24">
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            <div className="relative overflow-hidden rounded-2xl border bg-background p-2 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="flex h-[200px] flex-col justify-between rounded-xl p-6">
                <div className="space-y-2">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-4">
                    <span className="text-2xl">💰</span>
                  </div>
                  <h3 className="font-bold text-xl">Finance Tracking</h3>
                  <p className="text-sm text-muted-foreground">
                    Keep track of your income and expenses with beautiful charts and intuitive interfaces.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-2xl border bg-background p-2 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="flex h-[200px] flex-col justify-between rounded-xl p-6">
                <div className="space-y-2">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-4">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h3 className="font-bold text-xl">Goal Setting</h3>
                  <p className="text-sm text-muted-foreground">
                    Visualize your progress and reach your personal milestones with our goal tracking system.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-2xl border bg-background p-2 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="flex h-[200px] flex-col justify-between rounded-xl p-6">
                <div className="space-y-2">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
                    <span className="text-2xl">🌸</span>
                  </div>
                  <h3 className="font-bold text-xl">Life Harmony</h3>
                  <p className="text-sm text-muted-foreground">
                    Bring balance to your hectic schedule with our organized workflow and beautiful design.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="container py-12 md:py-24">
          <div className="mx-auto max-w-[58rem] text-center">
            <h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl mb-8">
              Why Choose <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Life-OS</span>?
            </h2>
            <div className="grid gap-8 sm:grid-cols-3">
              <div className="flex flex-col items-center space-y-3">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center animate-pulse-glow">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold">Secure</h3>
                <p className="text-sm text-muted-foreground">
                  Your data is protected with enterprise-grade security
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center animate-pulse-glow">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold">Fast</h3>
                <p className="text-sm text-muted-foreground">
                  Lightning quick experience that keeps you productive
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center animate-pulse-glow">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold">Beautiful</h3>
                <p className="text-sm text-muted-foreground">
                  Designed with love to make your experience enjoyable
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container py-12 md:py-24">
          <div className="mx-auto max-w-[42rem] rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-600 p-8 md:p-16 text-center text-white shadow-2xl">
            <h2 className="font-heading text-3xl font-bold sm:text-4xl mb-4">
              Ready to Transform Your Life?
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Join thousands of users who have already taken control of their finances and personal growth.
            </p>
            <Link href="/auth/signup">
              <Button 
                size="lg" 
                variant="secondary"
                className="h-12 px-8 bg-white text-indigo-600 hover:bg-gray-100 transition-colors"
              >
                Get Started Free
                <Sparkles className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            © 2024 Life-OS. Made with ❤️ for your financial freedom.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="/dashboard" className="hover:text-indigo-600 transition-colors">
              Dashboard
            </Link>
            <Link href="/auth/login" className="hover:text-indigo-600 transition-colors">
              Login
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
