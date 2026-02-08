"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { TransactionList } from "@/components/transaction-list"
import { AddTransactionDialog } from "@/components/add-transaction-dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Download, TrendingUp, TrendingDown, TrendingUpDown, Sparkles, Search, Filter } from "lucide-react"
import { SpendingChart, MonthlyTrend } from "@/components/charts"
import { EmptyTransactionIllustration } from "@/components/dashboard-illustration"

export default function TransactionsPage() {
    interface Transaction {
        id: string
        created_at: string
        amount: number
        type: 'income' | 'expense'
        category: string
        description: string
        source: 'web' | 'whatsapp'
    }

    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser()
                if (user) {
                    const { data } = await supabase
                        .from('transactions')
                        .select('*')
                        .eq('user_id', user.id)
                        .order('created_at', { ascending: false })
                    setTransactions(data || [])
                }
            } catch (error) {
                console.error('Error fetching transactions:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchTransactions()
    }, [])

    const income = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + Number(t.amount), 0) || 0

    const expense = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + Number(t.amount), 0) || 0

    const balance = income - expense
    const hasTransactions = transactions.length > 0

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900">
                <div className="text-center">
                    <div className="relative">
                        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 animate-pulse" />
                        <Sparkles className="absolute inset-0 m-auto h-8 w-8 text-white animate-spin" />
                    </div>
                    <p className="mt-4 text-muted-foreground animate-pulse">Loading transactions...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-purple-950">
            {/* Animated Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-400/10 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 py-8 space-y-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="space-y-2">
                        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-3">
                            <span className="text-3xl">💳</span>
                            Transactions
                        </h1>
                        <p className="text-muted-foreground flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-amber-500" />
                            Track every rupee, grow every day
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" className="hidden sm:flex hover:bg-gray-100 dark:hover:bg-gray-800">
                            <Download className="mr-2 h-4 w-4" />
                            Export
                        </Button>
                        <AddTransactionDialog />
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Income Card */}
                    <Card className="relative overflow-hidden bg-gradient-to-br from-green-500 to-emerald-600 text-white border-0 shadow-xl shadow-green-500/20 hover:shadow-2xl hover:shadow-green-500/25 transition-all duration-300 hover:-translate-y-1">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                    <TrendingUp className="h-6 w-6" />
                                </div>
                                <div className="text-5xl opacity-20">
                                    <TrendingUp className="h-16 w-16" />
                                </div>
                            </div>
                            <div className="text-sm text-white/80 mb-1">Total Income</div>
                            <div className="text-3xl font-bold">+${income.toFixed(2)}</div>
                        </CardContent>
                    </Card>

                    {/* Expense Card */}
                    <Card className="relative overflow-hidden bg-gradient-to-br from-red-500 to-rose-600 text-white border-0 shadow-xl shadow-red-500/20 hover:shadow-2xl hover:shadow-red-500/25 transition-all duration-300 hover:-translate-y-1">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                    <TrendingDown className="h-6 w-6" />
                                </div>
                                <div className="text-5xl opacity-20">
                                    <TrendingDown className="h-16 w-16" />
                                </div>
                            </div>
                            <div className="text-sm text-white/80 mb-1">Total Expenses</div>
                            <div className="text-3xl font-bold">-${expense.toFixed(2)}</div>
                        </CardContent>
                    </Card>

                    {/* Balance Card */}
                    <Card className={`relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 ${balance >= 0 
                        ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-indigo-500/20 hover:shadow-indigo-500/25' 
                        : 'bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-amber-500/20 hover:shadow-amber-500/25'}`}>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                    <TrendingUpDown className="h-6 w-6" />
                                </div>
                                <div className="text-5xl opacity-20">
                                    <Sparkles className="h-16 w-16" />
                                </div>
                            </div>
                            <div className="text-sm text-white/80 mb-1">Net Balance</div>
                            <div className="text-3xl font-bold">{balance >= 0 ? '+' : '-'}${Math.abs(balance).toFixed(2)}</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts */}
                {hasTransactions && (
                    <div className="grid lg:grid-cols-2 gap-6">
                        <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-0 shadow-xl">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                                        <TrendingUp className="h-5 w-5 text-white" />
                                    </div>
                                    Income vs Expenses
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <MonthlyTrend transactions={transactions} />
                            </CardContent>
                        </Card>

                        <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-0 shadow-xl">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
                                        <Sparkles className="h-5 w-5 text-white" />
                                    </div>
                                    Spending Breakdown
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <SpendingChart transactions={transactions} type="expense" />
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Transactions List */}
                <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-0 shadow-xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                                <TrendingUp className="h-5 w-5 text-white" />
                            </div>
                            All Transactions
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
                                    No Transactions Yet
                                </h3>
                                <p className="text-muted-foreground text-center mb-6 max-w-md">
                                    Start tracking your finances by adding your first transaction.
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
                                    <h3 className="text-xl font-bold mb-1">💫 Keep Tracking!</h3>
                                    <p className="text-white/80">
                                        {balance >= 0 
                                            ? "Great job maintaining a positive balance! Keep it up!"
                                            : "Every journey has its challenges. You're on your way to financial freedom!"}
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
