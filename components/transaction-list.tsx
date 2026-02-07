"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { Loader2, TrendingUp, TrendingDown } from "lucide-react"

interface Transaction {
    id: string
    created_at: string
    amount: number
    type: 'income' | 'expense'
    category: string
    description: string
    source: 'web' | 'whatsapp'
}

const categoryIcons: Record<string, string> = {
    salary: '💰',
    freelance: '💼',
    groceries: '🛒',
    entertainment: '🎬',
    transport: '🚗',
    utilities: '💡',
    dining: '🍽️',
    shopping: '🛍️',
    health: '🏥',
    education: '📚',
    default: '💳'
}

function getCategoryIcon(category: string): string {
    const lowerCategory = category.toLowerCase()
    for (const [key, icon] of Object.entries(categoryIcons)) {
        if (lowerCategory.includes(key)) {
            return icon
        }
    }
    return categoryIcons.default
}

export function TransactionList() {
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    // Use stable instance of supabase client to avoid effect re-running
    const [supabase] = useState(() => createClient())

    useEffect(() => {
        const fetchTransactions = async () => {
            setLoading(true)
            setError(null)
            try {
                // Try public schema first (new setup)
                const { data, error } = await supabase
                    .from('transactions')
                    .select('*')
                    .order('created_at', { ascending: false })
                    .limit(10)

                if (error) {
                    console.log('First fetch attempt error:', error.message)
                    
                    // Try life_os schema (old setup)
                    const { data: data2, error: error2 } = await supabase
                        .from('transactions')
                        .select('*')
                        .order('created_at', { ascending: false })
                        .limit(10)
                    
                    if (error2) {
                        // Table might not exist yet - this is expected for new users
                        if (error2.code === '42P01' || error2.message.includes('undefined_table')) {
                            console.log('Transactions table not found - this is expected for new users')
                            setTransactions([])
                        } else {
                            console.warn('Error fetching transactions:', error2.message)
                            setError('Database not set up. Run the SQL schema in Supabase.')
                        }
                    } else {
                        setTransactions(data2 || [])
                    }
                } else {
                    setTransactions(data || [])
                }
            } catch (err) {
                // Supabase might not be configured - silently handle
                console.log('Supabase not configured yet')
                setTransactions([])
            }
            setLoading(false)
        }

        fetchTransactions()

        // Subscribe to realtime changes (if table exists)
        const channel = supabase
            .channel('realtime transactions')
            .on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'transactions'
            }, () => {
                fetchTransactions()
            })
            .subscribe((status) => {
                if (status === 'SUBSCRIBED') {
                    console.log('Realtime subscription active')
                }
            })

        return () => {
            supabase.removeChannel(channel).catch(() => {})
        }
    }, [supabase])

    if (loading) {
        return (
            <div className="flex justify-center p-8">
                <div className="flex flex-col items-center gap-2">
                    <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
                    <p className="text-sm text-muted-foreground">Loading transactions...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="text-center py-8">
                <div className="text-4xl mb-2">⚠️</div>
                <p className="text-muted-foreground mb-2">{error}</p>
                <p className="text-sm text-muted-foreground">
                    Go to Supabase SQL Editor and run the setup.sql script.
                </p>
            </div>
        )
    }

    if (transactions.length === 0) {
        return (
            <div className="text-center py-8">
                <div className="text-4xl mb-2">📊</div>
                <p className="text-muted-foreground">No transactions recorded yet.</p>
                <p className="text-sm text-muted-foreground mt-1">
                    Click &quot;Add Transaction&quot; to get started!
                </p>
            </div>
        )
    }

    return (
        <div className="rounded-lg border bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 hover:bg-indigo-500/20 transition-colors">
                        <TableHead className="font-semibold">Date</TableHead>
                        <TableHead className="font-semibold">Category</TableHead>
                        <TableHead className="font-semibold">Description</TableHead>
                        <TableHead className="text-right font-semibold">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {transactions.map((transaction, index) => (
                        <TableRow 
                            key={transaction.id}
                            className="transition-all duration-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/30"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <TableCell className="font-medium">
                                <div className="flex items-center gap-2">
                                    <span className="text-muted-foreground">
                                        {format(new Date(transaction.created_at), "MMM d")}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                        {format(new Date(transaction.created_at), "yyyy")}
                                    </span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <span className="text-lg">{getCategoryIcon(transaction.category)}</span>
                                    <Badge 
                                        variant={transaction.type === 'income' ? 'default' : 'destructive'} 
                                        className={`
                                            ${transaction.type === 'income' 
                                                ? 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400' 
                                                : 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400'
                                            }
                                            capitalize
                                        `}
                                    >
                                        {transaction.type === 'income' ? (
                                            <TrendingUp className="h-3 w-3 mr-1" />
                                        ) : (
                                            <TrendingDown className="h-3 w-3 mr-1" />
                                        )}
                                        {transaction.category}
                                    </Badge>
                                </div>
                            </TableCell>
                            <TableCell>
                                <span className="text-muted-foreground">
                                    {transaction.description || '-'}
                                </span>
                            </TableCell>
                            <TableCell className={`text-right font-bold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                                <div className="flex items-center justify-end gap-1">
                                    {transaction.type === 'income' ? '+' : '-'}
                                    ${Math.abs(transaction.amount).toFixed(2)}
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
