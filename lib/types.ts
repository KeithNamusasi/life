export type TransactionType = 'income' | 'expense'
export type TransactionSource = 'web' | 'whatsapp'

export interface User {
    id: string
    phone?: string | null
    created_at: string
    updated_at?: string
}

export interface Transaction {
    id: string
    user_id: string
    amount: number
    type: TransactionType
    category: string
    source: TransactionSource
    description?: string | null
    created_at: string
}
