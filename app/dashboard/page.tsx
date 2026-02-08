"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TransactionList } from "@/components/transaction-list"
import { AddTransactionDialog } from "@/components/add-transaction-dialog"
import { TrendingUp, TrendingDown, Wallet, Sparkles, BarChart3, PieChart, Calendar, Sun, Moon, Star, ArrowUpRight } from "lucide-react"
import { SpendingChart, MonthlyTrend } from "@/components/charts"
import { DashboardIllustration, EmptyTransactionIllustration } from "@/components/dashboard-illustration"

interface Transaction {
    id: string
    created_at: string
    amount: number
    type: 'income' | 'expense'
    category: string
    description: string
    source: 'web' | 'whatsapp'
}

export default function DashboardPage() {
    const [user, setUser] = useState<User | null>(null)
    const [profile, setProfile] = useState<{ full_name: string | null } | null>(null)
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    interface User {
        id: string
        email?: string
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Get user
                const { data: { user: userData } } = await supabase.auth.getUser()
                if (userData) {
                    setUser(userData)

                    // Get profile
                    const { data: profileData } = await supabase
                        .from('users')
                        .select('full_name')
                        .eq('id', userData.id)
                        .single()
                    setProfile(profileData)

                    // Get transactions
                    const { data: txData } = await supabase
                        .from('transactions')
                        .select('*')
                        .eq('user_id', userData.id)
                        .order('created_at', { ascending: false })
                    setTransactions(txData || [])
                }
            } catch (error) {
                console.error('Error fetching data:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    const income = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + Number(t.amount), 0) || 0

    const expense = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + Number(t.amount), 0) || 0

    const balance = income - expense
    const userName = profile?.full_name || user?.email?.split('@')[0] || 'Friend'
    const hasTransactions = transactions.length > 0
    const savingsRate = income > 0 ? ((balance / income) * 100).toFixed(1) : 0

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900">
                <div className="text-center">
                    <div className="relative">
                        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 animate-pulse" />
                        <Sparkles className="absolute inset-0 m-auto h-10 w-10 text-white animate-spin" />
                    </div>
                    <p className="mt-4 text-muted-foreground animate-pulse">Loading your dashboard...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-purple-950">
            {/* Animated Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-400/10 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 py-8 space-y-8">
                {/* Welcome Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="space-y-2">
                        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-3">
                            <span className="text-4xl animate-bounce">👋</span>
                            Hey, {userName}!
                        </h1>
                        <p className="text-muted-foreground flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-amber-500" />
                            Here&apos;s your financial journey
                        </p>
                    </div>
                    <AddTransactionDialog />
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Balance Card */}
                    <Card className="relative overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-0 shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-300 hover:-translate-y-1">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                    <Wallet className="h-6 w-6" />
                                </div>
                                <div className="text-4xl opacity-20">
                                    <Sun className="h-12 w-12" />
                                </div>
                            </div>
                            <div className="text-3xl font-bold mb-1">${balance.toFixed(2)}</div>
                            <div className="text-white/80 text-sm">Total Balance</div>
                        </CardContent>
                        {/* Decorative gradient */}
                        <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
                    </Card>

                    {/* Income Card */}
                    <Card className="relative overflow-hidden bg-gradient-to-br from-green-500 to-emerald-600 text-white border-0 shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30 transition-all duration-300 hover:-translate-y-1">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                    <TrendingUp className="h-6 w-6" />
                                </div>
                                <ArrowUpRight className="h-8 w-8 opacity-30" />
                            </div>
                            <div className="text-3xl font-bold mb-1">+${income.toFixed(2)}</div>
                            <div className="text-white/80 text-sm">Income this month</div>
                        </CardContent>
                        <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
                    </Card>

                    {/* Expenses Card */}
                    <Card className="relative overflow-hidden bg-gradient-to-br from-red-500 to-rose-600 text-white border-0 shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/30 transition-all duration-300 hover:-translate-y-1">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                    <TrendingDown className="h-6 w-6" />
                                </div>
                                <TrendingDown className="h-8 w-8 opacity-30" />
                            </div>
                            <div className="text-3xl font-bold mb-1">-${expense.toFixed(2)}</div>
                            <div className="text-white/80 text-sm">Expenses this month</div>
                        </CardContent>
                        <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
                    </Card>

                    {/* Savings Card */}
                    <Card className="relative overflow-hidden bg-gradient-to-br from-amber-500 to-orange-600 text-white border-0 shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300 hover:-translate-y-1">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                    <Star className="h-6 w-6" />
                                </div>
                                <Sparkles className="h-8 w-8 opacity-30" />
                            </div>
                            <div className="text-3xl font-bold mb-1">{savingsRate}%</div>
                            <div className="text-white/80 text-sm">Savings Rate</div>
                        </CardContent>
                        <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
                    </Card>
                </div>

                {/* Charts Section */}
                {hasTransactions && (
                    <div className="grid lg:grid-cols-2 gap-6">
                        {/* Monthly Trend */}
                        <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-0 shadow-xl">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                                        <BarChart3 className="h-5 w-5 text-white" />
                                    </div>
                                    Monthly Trend
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <MonthlyTrend transactions={transactions} />
                            </CardContent>
                        </Card>

                        {/* Spending by Category */}
                        <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-0 shadow-xl">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
                                        <PieChart className="h-5 w-5 text-white" />
                                    </div>
                                    Spending by Category
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <SpendingChart transactions={transactions} type="expense" />
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Transactions Section */}
                <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-0 shadow-xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                                <Calendar className="h-5 w-5 text-white" />
                            </div>
                            Recent Transactions
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {hasTransactions ? (
                            <TransactionList />
                        ) : (
                            <div className="flex flex-col items-center justify-center py-16">
                                <div className="w-48 h-48 mb-6 animate-float">
                                    <EmptyTransactionIllustration />
                                </div>
                                <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                    Start Your Financial Journey!
                                </h3>
                                <p className="text-muted-foreground text-center mb-6 max-w-md">
                                    Add your first transaction to see beautiful insights about your spending habits.
                                </p>
                                <AddTransactionDialog />
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Motivational Card */}
                {hasTransactions && (
                    <Card className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border-0 shadow-xl">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-xl font-bold mb-1">💫 You&apos;re doing great!</h3>
                                    <p className="text-white/80">
                                        {Number(savingsRate) >= 20 
                                            ? "Amazing savings rate! Keep up the excellent work!"
                                            : "Every rupee counts. Keep tracking to improve your savings!"}
                                    </p>
                                </div>
                                <div className="hidden sm:block text-6xl animate-bounce">
                                    🌟
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}
