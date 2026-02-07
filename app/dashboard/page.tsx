import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { TransactionList } from "@/components/transaction-list"
import { AddTransactionDialog } from "@/components/add-transaction-dialog"
import { redirect } from "next/navigation"
import { DashboardIllustration, EmptyTransactionIllustration } from "@/components/dashboard-illustration"
import { TrendingUp, TrendingDown, Wallet, Sparkles } from "lucide-react"

export default async function DashboardPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect("/auth/login")
    }

    const { data: profile } = await supabase
        .from('users')
        .select('full_name')
        .eq('id', user.id)
        .single()

    const { data: transactions } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

    const income = transactions
        ?.filter(t => t.type === 'income')
        .reduce((sum, t) => sum + Number(t.amount), 0) || 0

    const expense = transactions
        ?.filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + Number(t.amount), 0) || 0

    const balance = income - expense

    const userName = profile?.full_name || user.email?.split('@')[0] || 'User'
    const hasTransactions = transactions && transactions.length > 0

    // Calculate percentage changes (mock for now)
    const incomeChange = income > 0 ? 12.5 : 0
    const expenseChange = expense > 0 ? -8.2 : 0

    return (
        <div className="space-y-6 pb-20 lg:pb-6">
            {/* Welcome Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-1">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight flex items-center gap-2">
                        <span>Welcome back, {userName}! 👋</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-2">
                        <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
                        Here's what's happening with your finances today.
                    </p>
                </div>
                <div className="sm:hidden">
                    <AddTransactionDialog />
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Total Balance */}
                <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 sm:px-6">
                        <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
                            Balance
                        </CardTitle>
                        <Wallet className="h-3 w-3 sm:h-4 sm:w-4 text-indigo-500" />
                    </CardHeader>
                    <CardContent className="px-3 sm:px-6">
                        <div className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            ${balance.toFixed(2)}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 hidden sm:block">
                            {hasTransactions ? 'Your current net worth' : 'Start tracking to see your balance'}
                        </p>
                    </CardContent>
                </Card>

                {/* Income */}
                <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 sm:px-6">
                        <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
                            Income
                        </CardTitle>
                        <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                    </CardHeader>
                    <CardContent className="px-3 sm:px-6">
                        <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600">
                            +${income.toFixed(2)}
                        </div>
                        <div className="flex items-center gap-1 mt-1 hidden sm:flex">
                            <TrendingUp className="h-3 w-3 text-green-500" />
                            <span className="text-xs text-green-600">+{incomeChange}%</span>
                            <span className="text-xs text-muted-foreground">from last month</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Expenses */}
                <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 sm:px-6">
                        <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
                            Expenses
                        </CardTitle>
                        <TrendingDown className="h-3 w-3 sm:h-4 sm:w-4 text-red-500" />
                    </CardHeader>
                    <CardContent className="px-3 sm:px-6">
                        <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-red-600">
                            -${expense.toFixed(2)}
                        </div>
                        <div className="flex items-center gap-1 mt-1 hidden sm:flex">
                            <TrendingDown className="h-3 w-3 text-red-500" />
                            <span className="text-xs text-red-600">{expenseChange}%</span>
                            <span className="text-xs text-muted-foreground">from last month</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Savings Goal */}
                <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-md bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 border-amber-200 hidden sm:block">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-6">
                        <CardTitle className="text-xs sm:text-sm font-medium text-amber-700 dark:text-amber-300">
                            Savings Rate
                        </CardTitle>
                        <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-amber-500" />
                    </CardHeader>
                    <CardContent className="px-6">
                        <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-amber-600">
                            {income > 0 ? ((balance / income) * 100).toFixed(1) : 0}%
                        </div>
                        <p className="text-xs text-amber-600/80 mt-1">
                            {balance >= 0 ? 'Great job saving!' : 'Keep tracking to improve'}
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Mobile Stats Row - Only visible on mobile */}
            <div className="sm:hidden grid grid-cols-2 gap-3">
                <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 border-amber-200">
                    <CardContent className="p-4">
                        <div className="text-sm font-medium text-amber-700 dark:text-amber-300">Savings</div>
                        <div className="text-lg font-bold text-amber-600">
                            {income > 0 ? ((balance / income) * 100).toFixed(0) : 0}%
                        </div>
                    </CardContent>
                </Card>
                <Card className="flex items-center justify-center">
                    <AddTransactionDialog />
                </Card>
            </div>

            <Separator className="my-4" />
            
            {/* Add Transaction Button - Desktop */}
            <div className="hidden sm:block">
                <AddTransactionDialog />
            </div>

            {hasTransactions ? (
                <div className="grid gap-6">
                    {/* Chart Card - Hide on very small screens */}
                    <Card className="hidden md:block lg:col-span-1">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-500" />
                                Spending Overview
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-40 sm:h-48 flex items-center justify-center">
                                <DashboardIllustration />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Transactions List */}
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between text-base sm:text-lg">
                                <span className="flex items-center gap-2">
                                    Recent Transactions
                                </span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <TransactionList />
                        </CardContent>
                    </Card>
                </div>
            ) : (
                /* Empty State */
                <Card className="border-dashed border-2">
                    <CardContent className="flex flex-col items-center justify-center py-8 sm:py-12 px-4">
                        <div className="h-40 w-40 sm:h-48 sm:w-48 mb-4 sm:mb-6">
                            <EmptyTransactionIllustration />
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold mb-2">No Transactions Yet</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground text-center mb-4 max-w-sm">
                            Start tracking your income and expenses to see your financial journey come alive!
                        </p>
                        <AddTransactionDialog />
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
