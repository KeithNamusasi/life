"use client"

import React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Receipt, Settings, TrendingUp, Wallet, type LucideIcon } from "lucide-react"

interface DashboardNavProps {
    className?: string
}

interface NavItem {
    title: string
    href: string
    icon: LucideIcon
    description: string
}

export function DashboardNav({ className }: DashboardNavProps) {
    const pathname = usePathname()

    const items: NavItem[] = [
        {
            title: "Dashboard",
            href: "/dashboard",
            icon: LayoutDashboard,
            description: "Overview of your finances",
        },
        {
            title: "Transactions",
            href: "/dashboard/transactions",
            icon: Receipt,
            description: "Manage your transactions",
        },
        {
            title: "Settings",
            href: "/dashboard/settings",
            icon: Settings,
            description: "Account preferences",
        },
    ]

    return (
        <nav className={cn("space-y-2", className)}>
            {items.map((item, index) => {
                const Icon = item.icon
                const isActive = pathname === item.href || 
                    (item.href !== "/dashboard" && pathname.startsWith(item.href))
                
                return (
                    <Link key={index} href={item.href}>
                        <span
                            className={cn(
                                "group flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                                isActive 
                                    ? "bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800" 
                                    : "hover:bg-gray-100 dark:hover:bg-gray-800 text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <Icon 
                                className={cn(
                                    "mr-3 h-5 w-5 transition-colors",
                                    isActive ? "text-indigo-500" : "text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300"
                                )} 
                            />
                            <div className="flex flex-col">
                                <span>{item.title}</span>
                                <span className="text-xs text-muted-foreground/70 group-hover:text-muted-foreground/50">
                                    {item.description}
                                </span>
                            </div>
                        </span>
                    </Link>
                )
            })}
        </nav>
    )
}
