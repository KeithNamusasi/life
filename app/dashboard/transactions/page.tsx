import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { TransactionList } from "@/components/transaction-list"
import { AddTransactionDialog } from "@/components/add-transaction-dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Plus, Search, Filter } from "lucide-react"

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

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-1">
                    <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <span>Transactions 💳</span>
                    </h2>
                    <p className="text-muted-foreground">
                        Manage and track all your financial transactions
                    </p>
                </div>
                <AddTransactionDialog />
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Income</CardTitle>
                        <span className="text-green-500">↑</span>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">+${income.toFixed(2)}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                        <span className="text-red-500">↓</span>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">-${expense.toFixed(2)}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Net</CardTitle>
                        <span className={income - expense >= 0 ? "text-green-500" : "text-red-500"}>
                            {income - expense >= 0 ? "↑" : "↓"}
                        </span>
                    </CardHeader>
                    <CardContent>
                        <div className={`text-2xl font-bold ${income - expense >= 0 ? "text-green-600" : "text-red-600"}`}>
                            ${(income - expense).toFixed(2)}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Separator />

            {/* Transactions List */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <span>All Transactions</span>
                        <div className="flex items-center gap-2">
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <Search className="h-4 w-4 text-muted-foreground" />
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <Filter className="h-4 w-4 text-muted-foreground" />
                            </button>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <TransactionList />
                </CardContent>
            </Card>
        </div>
    )
}
