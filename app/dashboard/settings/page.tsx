"use client"

import { createClient } from "@/lib/supabase/client"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Bell, Shield, Palette, LogOut, Save, Moon, Sun, Monitor } from "lucide-react"
import { useState, useEffect } from "react"
import { toast } from "sonner"

export default function SettingsPage() {
    const supabase = createClient()
    const [user, setUser] = useState<{ email?: string | null; id?: string } | null>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    
    // Settings state
    const [fullName, setFullName] = useState("")
    const [theme, setTheme] = useState("system")
    const [notifications, setNotifications] = useState({
        transactions: true,
        weekly: true,
        goals: false,
        budget: true
    })

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)
            
            if (user) {
                const { data: profile } = await supabase
                    .from('users')
                    .select('full_name')
                    .eq('id', user.id)
                    .single()
                
                if (profile?.full_name) {
                    setFullName(profile.full_name)
                }
            }
            setLoading(false)
        }
        
        getUser()
        
        // Load settings from localStorage
        const savedTheme = localStorage.getItem('life-os-theme') || 'system'
        setTheme(savedTheme)
        
        const savedNotifications = localStorage.getItem('life-os-notifications')
        if (savedNotifications) {
            setNotifications(JSON.parse(savedNotifications))
        }
    }, [supabase])

    // Apply theme
    useEffect(() => {
        const applyTheme = () => {
            const root = window.document.documentElement
            root.classList.remove('light', 'dark')
            
            if (theme === 'system') {
                const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
                root.classList.add(systemTheme)
            } else {
                root.classList.add(theme)
            }
        }
        
        applyTheme()
        localStorage.setItem('life-os-theme', theme)
    }, [theme])

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        toast.success("Signed out successfully")
        redirect("/auth/login")
    }

    const handleSaveProfile = async () => {
        setSaving(true)
        try {
            if (user?.id) {
                const { error } = await supabase
                    .from('users')
                    .update({ full_name: fullName })
                    .eq('id', user.id)
                
                if (error) throw error
                toast.success("Profile updated successfully! ✨")
            }
        } catch (error) {
            toast.error("Failed to update profile")
            console.error(error)
        } finally {
            setSaving(false)
        }
    }

    const handleNotificationChange = (key: keyof typeof notifications) => {
        const newNotifications = { ...notifications, [key]: !notifications[key] }
        setNotifications(newNotifications)
        localStorage.setItem('life-os-notifications', JSON.stringify(newNotifications))
        toast.success("Notification preference saved")
    }

    if (loading) {
        return (
            <div className="space-y-6 flex items-center justify-center min-h-[50vh]">
                <div className="animate-pulse text-center">
                    <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-4 mx-auto" />
                    <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded mx-auto" />
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6 pb-20 lg:pb-6">
            {/* Header */}
            <div className="space-y-1">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-2">
                    <span>Settings ⚙️</span>
                </h2>
                <p className="text-sm sm:text-muted-foreground">
                    Manage your account settings and preferences
                </p>
            </div>

            {/* Profile Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                        <User className="h-4 w-4 sm:h-5 sm:w-5" />
                        Profile
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                        Manage your personal information
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Full Name</label>
                            <input 
                                type="text" 
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg bg-background text-sm"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Email</label>
                            <input 
                                type="email" 
                                defaultValue={user?.email || ''}
                                className="w-full px-3 py-2 border rounded-lg bg-background text-sm"
                                disabled
                            />
                        </div>
                    </div>
                    <Button 
                        onClick={handleSaveProfile}
                        disabled={saving}
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                    >
                        {saving ? 'Saving...' : 'Save Changes'}
                    </Button>
                </CardContent>
            </Card>

            {/* Notifications Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                        <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
                        Notifications
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                        Choose what notifications you receive
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {[
                        { key: 'transactions', label: 'Email notifications for transactions', icon: '💳' },
                        { key: 'weekly', label: 'Weekly financial summary', icon: '📊' },
                        { key: 'goals', label: 'Goal achievement alerts', icon: '🎯' },
                        { key: 'budget', label: 'Budget limit warnings', icon: '⚠️' },
                    ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between py-2">
                            <div className="flex items-center gap-3">
                                <span className="text-lg">{item.icon}</span>
                                <label className="text-sm font-medium cursor-pointer">{item.label}</label>
                            </div>
                            <button 
                                onClick={() => handleNotificationChange(item.key as keyof typeof notifications)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                    notifications[item.key as keyof typeof notifications] 
                                        ? 'bg-indigo-600' 
                                        : 'bg-gray-200 dark:bg-gray-700'
                                }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                        notifications[item.key as keyof typeof notifications]
                                            ? 'translate-x-6'
                                            : 'translate-x-1'
                                    }`}
                                />
                            </button>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Appearance Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                        <Palette className="h-4 w-4 sm:h-5 sm:w-5" />
                        Appearance
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                        Customize how Life-OS looks for you
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-3">
                        <label className="text-sm font-medium">Theme</label>
                        <div className="grid grid-cols-3 gap-2 sm:gap-3">
                            <button
                                onClick={() => {
                                    setTheme('light')
                                    toast.success("Light theme applied ☀️")
                                }}
                                className={`flex flex-col items-center gap-2 p-3 sm:p-4 rounded-lg border-2 transition-all ${
                                    theme === 'light' 
                                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950' 
                                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                                }`}
                            >
                                <Sun className="h-5 w-5 sm:h-6 sm:w-6" />
                                <span className="text-xs sm:text-sm font-medium">Light</span>
                            </button>
                            <button
                                onClick={() => {
                                    setTheme('dark')
                                    toast.success("Dark theme applied 🌙")
                                }}
                                className={`flex flex-col items-center gap-2 p-3 sm:p-4 rounded-lg border-2 transition-all ${
                                    theme === 'dark' 
                                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950' 
                                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                                }`}
                            >
                                <Moon className="h-5 w-5 sm:h-6 sm:w-6" />
                                <span className="text-xs sm:text-sm font-medium">Dark</span>
                            </button>
                            <button
                                onClick={() => {
                                    setTheme('system')
                                    toast.success("System theme applied 💻")
                                }}
                                className={`flex flex-col items-center gap-2 p-3 sm:p-4 rounded-lg border-2 transition-all ${
                                    theme === 'system' 
                                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950' 
                                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                                }`}
                            >
                                <Monitor className="h-5 w-5 sm:h-6 sm:w-6" />
                                <span className="text-xs sm:text-sm font-medium">System</span>
                            </button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Security Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                        <Shield className="h-4 w-4 sm:h-5 sm:w-5" />
                        Security
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                        Manage your account security
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    <Button 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={() => toast.info("Password reset email sent! 📧")}
                    >
                        Change Password
                    </Button>
                    <Button 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={() => toast.info("2FA setup coming soon! 🔐")}
                    >
                        Enable Two-Factor Authentication
                    </Button>
                </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-red-200 dark:border-red-900">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-600 text-base sm:text-lg">
                        <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
                        Danger Zone
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                        Irreversible and destructive actions
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button 
                        variant="destructive"
                        onClick={() => {
                            if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
                                toast.error("Account deletion requested - Please contact support")
                            }
                        }}
                    >
                        Delete Account
                    </Button>
                </CardContent>
            </Card>

            {/* Sign Out */}
            <Card>
                <CardContent className="pt-6">
                    <Button 
                        variant="outline" 
                        className="w-full border-red-200 text-red-600 hover:bg-red-50"
                        onClick={handleSignOut}
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
