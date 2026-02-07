import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { TransactionList } from "@/components/transaction-list"
import { AddTransactionDialog } from "@/components/add-transaction-dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Plus, Search, Filter, Download, Upload, BarChart3 } from "lucide-react"
import { SpendingChart, MonthlyTrend } from "@/components/charts"

export default async function TransactionsPage() {
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

    const userName = profile?.full_name || user.email?.split('@')[0] || 'User'
    const hasTransactions = transactions && transactions.length > 0

    return (
        <div className="space-y-6 pb-20 lg:pb-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-1">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight flex items-center gap-2">
                        <span>Transactions 💳</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                        Manage and track all your financial transactions
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="hidden sm:flex">
                        <Upload className="h-4 w-4 mr-2" />
                        Import
                    </Button>
                    <Button variant="outline" size="sm" className="hidden sm:flex">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                    </Button>
                    <AddTransactionDialog />
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid gap-3 sm:gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4">
                        <CardTitle className="text-xs font-medium text-muted-foreground">Total Income</CardTitle>
                        <span className="text-green-500">↑</span>
                    </CardHeader>
                    <CardContent className="px-4">
                        <div className="text-xl sm:text-2xl font-bold text-green-600">+${income.toFixed(2)}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4">
                        <CardTitle className="text-xs font-medium text-muted-foreground">Total Expenses</CardTitle>
                        <span className="text-red-500">↓</span>
                    </CardHeader>
                    <CardContent className="px-4">
                        <div className="text-xl sm:text-2xl font-bold text-red-600">-${expense.toFixed(2)}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4">
                        <CardTitle className="text-xs font-medium text-muted-foreground">Net</CardTitle>
                        <span className={income - expense >= 0 ? "text-green-500" : "text-red-500"}>
                            {income - expense >= 0 ? "↑" : "↓"}
                        </span>
                    </CardHeader>
                    <CardContent className="px-4">
                        <div className={`text-xl sm:text-2xl font-bold ${income - expense >= 0 ? "text-green-600" : "text-red-600"}`}>
                            ${(income - expense).toFixed(2)}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Separator />

            {/* Charts Section */}
            {hasTransactions && (
                <div className="grid gap-4 lg:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-base">
                                <BarChart3 className="h-4 w-4 text-indigo-500" />
                                Income vs Expenses
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <MonthlyTrend transactions={transactions || []} />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-base">
                                Spending Breakdown
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <SpendingChart transactions={transactions || []} type="expense" />
                        </CardContent>
                    </Card>
                </div>
            )}

            <Separator />

            {/* Filters - Mobile */}
            <div className="sm:hidden flex gap-2 overflow-x-auto pb-2">
                <Button variant="outline" size="sm" className="flex-shrink-0">
                    <Filter className="h-3 w-3 mr-1" />
                    Filter
                </Button>
                <Button variant="outline" size="sm" className="flex-shrink-0">
                    All
                </Button>
                <Button variant="outline" size="sm" className="flex-shrink-0">
                    Income
                </Button>
                <Button variant="outline" size="sm" className="flex-shrink-0">
                    Expense
                </Button>
            </div>

            {/* Transactions List */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <span>All Transactions</span>
                        <div className="hidden sm:flex items-center gap-2">
                            <Button variant="ghost" size="icon">
                                <Search className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                                <Filter className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {hasTransactions ? (
                        <TransactionList />
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-5xl mb-4">📊</div>
                            <h3 className="text-lg font-semibold mb-2">No Transactions Yet</h3>
                            <p className="text-muted-foreground mb-4">Start tracking your finances by adding your first transaction.</p>
                            <AddTransactionDialog />
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
