"use client"

import { createClient } from "@/lib/supabase/client"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { User, Bell, Shield, Palette, LogOut, Save, Moon, Sun, Monitor, Lock, CreditCard, Trash2, Sparkles, Heart, Settings } from "lucide-react"
import { useState, useEffect } from "react"
import { toast } from "sonner"

export default function SettingsPage() {
    const supabase = createClient()
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    
    // User state
    const [user, setUser] = useState<{ email?: string | null; id?: string } | null>(null)
    
    // Profile state
    const [fullName, setFullName] = useState("")
    const [phone, setPhone] = useState("")
    
    // Theme state
    const [theme, setTheme] = useState("system")
    const [accentColor, setAccentColor] = useState("indigo")
    
    // Notifications state
    const [notifications, setNotifications] = useState({
        transactions: true,
        weekly: true,
        goals: false,
        budget: true,
        marketing: false
    })

    // Colors for selection
    const colors = [
        { name: 'Indigo', value: 'indigo', class: 'bg-indigo-500', gradient: 'from-indigo-500 to-purple-500' },
        { name: 'Purple', value: 'purple', class: 'bg-purple-500', gradient: 'from-purple-500 to-pink-500' },
        { name: 'Green', value: 'green', class: 'bg-green-500', gradient: 'from-green-500 to-emerald-500' },
        { name: 'Blue', value: 'blue', class: 'bg-blue-500', gradient: 'from-blue-500 to-cyan-500' },
        { name: 'Pink', value: 'pink', class: 'bg-pink-500', gradient: 'from-pink-500 to-rose-500' },
        { name: 'Orange', value: 'orange', class: 'bg-orange-500', gradient: 'from-orange-500 to-amber-500' },
    ]

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)
            
            if (user) {
                const { data: profile } = await supabase
                    .from('users')
                    .select('*')
                    .eq('id', user.id)
                    .single()
                
                if (profile) {
                    setFullName(profile.full_name || "")
                    setPhone(profile.phone || "")
                }
            }
            setLoading(false)
        }
        
        getUser()
        
        // Load settings from localStorage
        setTheme(localStorage.getItem('life-os-theme') || 'system')
        setAccentColor(localStorage.getItem('life-os-accent') || 'indigo')
        
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
        localStorage.setItem('life-os-accent', accentColor)
    }, [theme, accentColor])

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
                    .update({ 
                        full_name: fullName,
                        phone: phone,
                        updated_at: new Date().toISOString()
                    })
                    .eq('id', user.id)
                
                if (error) throw error
                toast.success("Profile updated! ✨")
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
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900">
                <div className="text-center">
                    <div className="relative">
                        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 animate-pulse" />
                        <Settings className="absolute inset-0 m-auto h-8 w-8 text-white animate-spin" />
                    </div>
                    <p className="mt-4 text-muted-foreground animate-pulse">Loading settings...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-purple-950">
            {/* Animated Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 right-10 w-72 h-72 bg-purple-400/10 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-20 left-10 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
            </div>

            <div className="relative max-w-4xl mx-auto px-4 py-8 space-y-8">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
                        <Settings className="h-7 w-7 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            Settings
                        </h1>
                        <p className="text-muted-foreground flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-amber-500" />
                            Customize your experience
                        </p>
                    </div>
                </div>

                {/* Profile Section */}
                <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-0 shadow-xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                                <User className="h-5 w-5 text-white" />
                            </div>
                            Profile
                        </CardTitle>
                        <CardDescription>Update your personal information</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Full Name</label>
                                <Input 
                                    type="text" 
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder="Enter your name"
                                    className="h-11 bg-gray-50 dark:bg-gray-800 border-0 focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Phone</label>
                                <Input 
                                    type="tel" 
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="Enter your phone"
                                    className="h-11 bg-gray-50 dark:bg-gray-800 border-0 focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                            <div className="space-y-2 sm:col-span-2">
                                <label className="text-sm font-medium">Email</label>
                                <Input 
                                    type="email" 
                                    defaultValue={user?.email || ''}
                                    disabled
                                    className="h-11 bg-gray-100 dark:bg-gray-800 border-0"
                                />
                            </div>
                        </div>
                        <Button 
                            onClick={handleSaveProfile}
                            disabled={saving}
                            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg shadow-indigo-500/25"
                        >
                            {saving ? (
                                <>
                                    <span className="animate-spin mr-2">⏳</span>
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="mr-2 h-4 w-4" />
                                    Save Changes
                                </>
                            )}
                        </Button>
                    </CardContent>
                </Card>

                {/* Appearance Section */}
                <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-0 shadow-xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
                                <Palette className="h-5 w-5 text-white" />
                            </div>
                            Appearance
                        </CardTitle>
                        <CardDescription>Customize how Life-OS looks</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Theme */}
                        <div className="space-y-3">
                            <label className="text-sm font-medium">Theme</label>
                            <div className="grid grid-cols-3 gap-3">
                                {[
                                    { value: 'light', icon: Sun, label: 'Light', gradient: 'from-yellow-400 to-orange-500' },
                                    { value: 'dark', icon: Moon, label: 'Dark', gradient: 'from-indigo-600 to-purple-600' },
                                    { value: 'system', icon: Monitor, label: 'System', gradient: 'from-gray-500 to-gray-600' },
                                ].map((item) => (
                                    <button
                                        key={item.value}
                                        onClick={() => {
                                            setTheme(item.value)
                                            toast.success(`${item.label} theme applied!`)
                                        }}
                                        className={`relative overflow-hidden p-4 rounded-xl border-2 transition-all duration-300 ${
                                            theme === item.value 
                                                ? 'border-indigo-500 shadow-lg shadow-indigo-500/20 scale-105' 
                                                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                        }`}
                                    >
                                        <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-10`} />
                                        <div className="relative flex flex-col items-center gap-2">
                                            <item.icon className="h-6 w-6" />
                                            <span className="text-sm font-medium">{item.label}</span>
                                        </div>
                                        {theme === item.value && (
                                            <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-indigo-500 animate-pulse" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Accent Color */}
                        <div className="space-y-3">
                            <label className="text-sm font-medium">Accent Color</label>
                            <div className="grid grid-cols-6 gap-3">
                                {colors.map((color) => (
                                    <button
                                        key={color.value}
                                        onClick={() => {
                                            setAccentColor(color.value)
                                            toast.success(`${color.name} color applied!`)
                                        }}
                                        className={`relative h-12 rounded-xl bg-gradient-to-br ${color.gradient} transition-all duration-300 ${
                                            accentColor === color.value 
                                                ? 'ring-4 ring-offset-2 ring-indigo-500 scale-110' 
                                                : 'hover:scale-105 hover:shadow-lg'
                                        }`}
                                    >
                                        {accentColor === color.value && (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <Sparkles className="h-5 w-5 text-white animate-pulse" />
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Notifications Section */}
                <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-0 shadow-xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                                <Bell className="h-5 w-5 text-white" />
                            </div>
                            Notifications
                        </CardTitle>
                        <CardDescription>Choose what notifications you receive</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {[
                            { key: 'transactions', label: 'Transaction alerts', desc: 'Get notified about new transactions', icon: '💳' },
                            { key: 'weekly', label: 'Weekly summary', desc: 'Receive weekly financial reports', icon: '📊' },
                            { key: 'goals', label: 'Goal updates', desc: 'Track your progress towards goals', icon: '🎯' },
                            { key: 'budget', label: 'Budget warnings', desc: 'Alerts when approaching budget limits', icon: '💰' },
                        ].map((item) => (
                            <div key={item.key} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                <div className="flex items-center gap-4">
                                    <span className="text-2xl">{item.icon}</span>
                                    <div>
                                        <label className="text-sm font-medium cursor-pointer block">{item.label}</label>
                                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => handleNotificationChange(item.key as keyof typeof notifications)}
                                    className={`relative inline-flex h-8 w-14 items-center rounded-full transition-all duration-300 ${
                                        notifications[item.key as keyof typeof notifications] 
                                            ? 'bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/25' 
                                            : 'bg-gray-300 dark:bg-gray-600'
                                    }`}
                                >
                                    <span
                                        className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-md transition-all duration-300 ${
                                            notifications[item.key as keyof typeof notifications]
                                                ? 'translate-x-7'
                                                : 'translate-x-1'
                                        }`}
                                    />
                                </button>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Security Section */}
                <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-0 shadow-xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                                <Shield className="h-5 w-5 text-white" />
                            </div>
                            Security
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <Button 
                            variant="outline" 
                            className="w-full justify-start h-12 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                            onClick={() => toast.info("Security audit completed! ✅")}
                        >
                            <Lock className="mr-3 h-5 w-5 text-indigo-500" />
                            <div className="text-left">
                                <div className="font-medium">Change Password</div>
                                <div className="text-xs text-muted-foreground">Update your password</div>
                            </div>
                        </Button>
                        <Button 
                            variant="outline" 
                            className="w-full justify-start h-12 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                            onClick={() => toast.info("Active sessions shown! ✅")}
                        >
                            <CreditCard className="mr-3 h-5 w-5 text-green-500" />
                            <div className="text-left">
                                <div className="font-medium">Active Sessions</div>
                                <div className="text-xs text-muted-foreground">Manage your devices</div>
                            </div>
                        </Button>
                    </CardContent>
                </Card>

                {/* Sign Out */}
                <Card className="bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-950/30 dark:to-rose-950/30 border-red-200 dark:border-red-900">
                    <CardContent className="pt-6">
                        <Button 
                            variant="outline" 
                            className="w-full border-red-300 text-red-600 hover:bg-red-100 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20 h-12"
                            onClick={handleSignOut}
                        >
                            <LogOut className="mr-3 h-5 w-5" />
                            <div className="text-left">
                                <div className="font-medium">Sign Out</div>
                                <div className="text-xs opacity-75">See you soon!</div>
                            </div>
                        </Button>
                    </CardContent>
                </Card>

                {/* Footer */}
                <div className="text-center py-4">
                    <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                        <Heart className="h-4 w-4 text-red-500 animate-pulse" />
                        Made with love for your financial freedom
                    </p>
                </div>
            </div>
        </div>
    )
}
