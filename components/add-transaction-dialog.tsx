"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Loader2, Plus, CheckCircle2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { createClient } from "@/lib/supabase/client"
import { SuccessIllustration } from "@/components/dashboard-illustration"

const formSchema = z.object({
    amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: "Amount must be a positive number.",
    }),
    type: z.enum(["income", "expense"]),
    category: z.string().min(1, "Category is required."),
    description: z.string().optional(),
    date: z.string().optional(),
})

// Default categories if none from database
const defaultIncomeCategories = [
    "Salary", "Freelance", "Investment", "Gift", "Bonus", "Other Income"
]

const defaultExpenseCategories = [
    "Groceries", "Food & Dining", "Transport", "Utilities", "Shopping", 
    "Entertainment", "Health", "Education", "Subscriptions", "Insurance", "Other"
]

interface Category {
    id: string
    name: string
    icon?: string
    color?: string
    type: string
}

export function AddTransactionDialog() {
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [categories, setCategories] = useState<Category[]>([])
    const router = useRouter()
    const supabase = createClient()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            amount: "",
            type: "expense",
            category: "",
            description: "",
            date: new Date().toISOString().split('T')[0],
        },
    })

    const transactionType = form.watch("type")

    // Fetch categories from database
    useEffect(() => {
        const fetchCategories = async () => {
            const { data, error } = await supabase
                .from('categories')
                .select('id, name, icon, color, type')
                .order('name')
            
            if (data && !error) {
                setCategories(data)
            }
        }
        
        if (open) {
            fetchCategories()
        }
    }, [open, supabase])

    // Get categories based on type
    const getCategories = () => {
        const filtered = categories.filter(c => 
            c.type === transactionType || c.type === 'both'
        )
        
        if (filtered.length > 0) {
            return filtered.map(c => c.name)
        }
        
        return transactionType === "income" 
            ? defaultIncomeCategories 
            : defaultExpenseCategories
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        try {
            const { data: { user } } = await supabase.auth.getUser()

            if (!user) {
                toast.error("You must be logged in to add a transaction.")
                return
            }

            // Get category ID if exists
            const categoryData = categories.find(c => c.name === values.category)
            
            const { error } = await supabase.from("transactions").insert({
                user_id: user.id,
                amount: parseFloat(values.amount),
                type: values.type,
                category_id: categoryData?.id || null,
                category: values.category,
                description: values.description,
                source: "web",
                date: values.date || new Date().toISOString().split('T')[0],
            })

            if (error) {
                throw error
            }

            setSuccess(true)
            toast.success("Transaction added successfully! 🎉")
            
            // Reset after showing success
            setTimeout(() => {
                form.reset()
                setSuccess(false)
                setOpen(false)
                router.refresh()
            }, 1500)
        } catch (error) {
            console.error(error)
            toast.error("Failed to add transaction.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={(open) => {
            if (!open) {
                setSuccess(false)
                form.reset()
            }
            setOpen(open)
        }}>
            <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                    <Plus className="mr-2 h-4 w-4" /> Add Transaction
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                {success ? (
                    <div className="flex flex-col items-center justify-center py-8">
                        <div className="h-32 w-32 mb-4 animate-bounce">
                            <SuccessIllustration />
                        </div>
                        <h3 className="text-2xl font-bold text-green-600 mb-2">Success!</h3>
                        <p className="text-muted-foreground">Your transaction has been recorded.</p>
                    </div>
                ) : (
                    <>
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                                <Plus className="h-5 w-5 text-indigo-500" />
                                Add Transaction
                            </DialogTitle>
                            <DialogDescription>
                                Record a new {transactionType} to track your finances.
                            </DialogDescription>
                        </DialogHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                                {/* Type and Date */}
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="type"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Type</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="h-11">
                                                            <SelectValue placeholder="Select type" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="income">
                                                            <span className="flex items-center gap-2">
                                                                <span className="text-green-500">↑</span> Income
                                                            </span>
                                                        </SelectItem>
                                                        <SelectItem value="expense">
                                                            <span className="flex items-center gap-2">
                                                                <span className="text-red-500">↓</span> Expense
                                                            </span>
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="date"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Date</FormLabel>
                                                <FormControl>
                                                    <Input 
                                                        type="date" 
                                                        {...field} 
                                                        className="h-11"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* Amount */}
                                <FormField
                                    control={form.control}
                                    name="amount"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Amount</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                                                    <Input 
                                                        placeholder="0.00" 
                                                        {...field} 
                                                        className="pl-7 h-11"
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Category */}
                                <FormField
                                    control={form.control}
                                    name="category"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Category</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="h-11">
                                                        <SelectValue placeholder="Select category" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {getCategories().map((cat) => (
                                                        <SelectItem key={cat} value={cat}>
                                                            {cat}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Description */}
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description (Optional)</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    placeholder="Add details about this transaction..." 
                                                    {...field} 
                                                    className="h-11"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <DialogFooter>
                                    <Button 
                                        type="submit" 
                                        disabled={isLoading}
                                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                                    >
                                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        {isLoading ? "Saving..." : "Save Transaction"}
                                        {!isLoading && <CheckCircle2 className="ml-2 h-4 w-4" />}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </Form>
                    </>
                )}
            </DialogContent>
        </Dialog>
    )
}
