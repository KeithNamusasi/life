"use client"

import { useMemo } from "react"

interface Transaction {
    id: string
    created_at: string
    amount: number
    type: 'income' | 'expense'
    category: string
    description: string
    source: string
}

interface SpendingChartProps {
    transactions: Transaction[]
    type?: 'income' | 'expense'
}

export function SpendingChart({ transactions, type = 'expense' }: SpendingChartProps) {
    const data = useMemo(() => {
        const filtered = transactions.filter(t => t.type === type)
        const grouped = filtered.reduce((acc, t) => {
            const cat = t.category || 'Other'
            acc[cat] = (acc[cat] || 0) + Number(t.amount)
            return acc
        }, {} as Record<string, number>)

        return Object.entries(grouped)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 6)
            .map(([name, value]) => ({ name, value }))
    }, [transactions, type])

    const maxValue = Math.max(...data.map(d => d.value), 1)
    const total = data.reduce((sum, d) => sum + d.value, 0)

    if (data.length === 0) {
        return (
            <div className="h-48 flex items-center justify-center text-muted-foreground text-sm">
                No {type} transactions yet
            </div>
        )
    }

    const colors = type === 'expense' 
        ? ['#EF4444', '#F97316', '#EAB308', '#22C55E', '#3B82F6', '#8B5CF6']
        : ['#22C55E', '#10B981', '#14B8A6', '#06B6D4', '#3B82F6', '#8B5CF6']

    return (
        <div className="space-y-3">
            {data.map((item, index) => {
                const percentage = (item.value / total) * 100
                return (
                    <div key={item.name} className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                                <span 
                                    className="w-3 h-3 rounded-full" 
                                    style={{ backgroundColor: colors[index % colors.length] }}
                                />
                                <span className="font-medium">{item.name}</span>
                            </div>
                            <div className="text-right">
                                <span className="font-medium">${item.value.toFixed(2)}</span>
                                <span className="text-muted-foreground ml-2 text-xs">
                                    ({percentage.toFixed(0)}%)
                                </span>
                            </div>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                                className="h-full rounded-full transition-all duration-500"
                                style={{ 
                                    width: `${(item.value / maxValue) * 100}%`,
                                    backgroundColor: colors[index % colors.length]
                                }}
                            />
                        </div>
                    </div>
                )
            })}
            <div className="pt-2 border-t">
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total</span>
                    <span className="font-bold">${total.toFixed(2)}</span>
                </div>
            </div>
        </div>
    )
}

interface MonthlyTrendProps {
    transactions: Transaction[]
}

export function MonthlyTrend({ transactions }: MonthlyTrendProps) {
    const data = useMemo(() => {
        const grouped = transactions.reduce((acc, t) => {
            const date = new Date(t.created_at)
            const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
            if (!acc[monthKey]) {
                acc[monthKey] = { income: 0, expense: 0 }
            }
            if (t.type === 'income') {
                acc[monthKey].income += Number(t.amount)
            } else {
                acc[monthKey].expense += Number(t.amount)
            }
            return acc
        }, {} as Record<string, { income: number; expense: number }>)

        return Object.entries(grouped)
            .sort((a, b) => a[0].localeCompare(b[0]))
            .slice(-6)
            .map(([month, data]) => ({
                month,
                ...data,
                net: data.income - data.expense
            }))
    }, [transactions])

    const maxValue = Math.max(
        ...data.map(d => Math.max(d.income, d.expense)),
        1
    )

    if (data.length === 0) {
        return (
            <div className="h-48 flex items-center justify-center text-muted-foreground text-sm">
                No transactions yet
            </div>
        )
    }

    return (
        <div className="space-y-4">
            <div className="flex items-end justify-between h-40 gap-2">
                {data.map((item) => (
                    <div key={item.month} className="flex-1 flex flex-col items-center gap-1">
                        <div className="w-full flex items-end justify-center gap-1 h-32">
                            <div 
                                className="w-1/2 bg-green-500 rounded-t transition-all duration-500"
                                style={{ height: `${(item.income / maxValue) * 100}%` }}
                                title={`Income: $${item.income.toFixed(2)}`}
                            />
                            <div 
                                className="w-1/2 bg-red-500 rounded-t transition-all duration-500"
                                style={{ height: `${(item.expense / maxValue) * 100}%` }}
                                title={`Expense: $${item.expense.toFixed(2)}`}
                            />
                        </div>
                        <span className="text-xs text-muted-foreground">
                            {item.month.split('-')[1]}
                        </span>
                    </div>
                ))}
            </div>
            <div className="flex items-center justify-center gap-6 text-xs">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-green-500" />
                    <span>Income</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-red-500" />
                    <span>Expense</span>
                </div>
            </div>
        </div>
    )
}

interface CategoryIconProps {
    category: string
}

export function CategoryIcon({ category }: CategoryIconProps) {
    const icons: Record<string, string> = {
        'Salary': '💰',
        'Freelance': '💼',
        'Investment': '📈',
        'Gift': '🎁',
        'Bonus': '🎉',
        'Groceries': '🛒',
        'Food & Dining': '🍽️',
        'Transport': '🚗',
        'Utilities': '💡',
        'Shopping': '🛍️',
        'Entertainment': '🎬',
        'Health': '🏥',
        'Education': '📚',
        'Subscriptions': '📱',
        'Insurance': '🛡️',
        'default': '💳'
    }

    const lowerCategory = category?.toLowerCase() || ''
    
    for (const [key, icon] of Object.entries(icons)) {
        if (lowerCategory.includes(key.toLowerCase())) {
            return <span>{icon}</span>
        }
    }
    
    return <span>{icons.default}</span>
}
