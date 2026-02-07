import { DashboardNav } from "@/components/dashboard-nav"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { LayoutDashboard, Receipt, Settings, LogOut } from "lucide-react"
import Link from "next/link"

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect("/auth/login")
    }

    const navItems = [
        { href: "/dashboard", icon: LayoutDashboard, label: "Home" },
        { href: "/dashboard/transactions", icon: Receipt, label: "Transactions" },
        { href: "/dashboard/settings", icon: Settings, label: "Settings" },
    ]

    return (
        <div className="flex min-h-screen flex-col">
            {/* Mobile Header */}
            <header className="sticky top-0 z-40 border-b bg-background lg:hidden">
                <div className="container flex h-14 items-center justify-between px-4">
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <span className="font-bold">Life-OS</span>
                    </Link>
                    {/* User avatar placeholder */}
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500" />
                </div>
            </header>

            {/* Desktop Layout */}
            <div className="hidden lg:flex min-h-screen">
                {/* Desktop Sidebar */}
                <aside className="w-64 border-r bg-card">
                    <div className="flex h-16 items-center px-6 border-b">
                        <Link href="/dashboard" className="flex items-center gap-2">
                            <span className="font-bold text-xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                Life-OS
                            </span>
                        </Link>
                    </div>
                    <nav className="p-4 space-y-2">
                        {navItems.map((item) => {
                            const Icon = item.icon
                            return (
                                <Link key={item.href} href={item.href}>
                                    <span className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-accent transition-colors">
                                        <Icon className="h-5 w-5" />
                                        {item.label}
                                    </span>
                                </Link>
                            )
                        })}
                    </nav>
                </aside>
                <main className="flex-1 p-6 overflow-auto">
                    {children}
                </main>
            </div>

            {/* Mobile Layout */}
            <main className="flex-1 lg:hidden pb-20">
                <div className="p-4">
                    {children}
                </div>
            </main>

            {/* Mobile Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background lg:hidden safe-area-pb">
                <div className="flex items-center justify-around h-16">
                    {navItems.map((item) => {
                        const Icon = item.icon
                        return (
                            <Link key={item.href} href={item.href} className="flex flex-col items-center justify-center flex-1 h-full">
                                <Icon className="h-5 w-5 mb-1" />
                                <span className="text-xs">{item.label}</span>
                            </Link>
                        )
                    })}
                </div>
            </nav>
        </div>
    )
}
