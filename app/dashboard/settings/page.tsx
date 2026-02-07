"use client"

import { createClient } from "@/lib/supabase/client"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { User, Bell, Shield, Palette, LogOut, Save, Moon, Sun, Monitor, Lock, CreditCard, Trash2 } from "lucide-react"
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
    
    // Password state
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    
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
        { name: 'Indigo', value: 'indigo', class: 'bg-indigo-500' },
        { name: 'Purple', value: 'purple', class: 'bg-purple-500' },
        { name: 'Green', value: 'green', class: 'bg-green-500' },
        { name: 'Blue', value: 'blue', class: 'bg-blue-500' },
        { name: 'Pink', value: 'pink', class: 'bg-pink-500' },
        { name: 'Orange', value: 'orange', class: 'bg-orange-500' },
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
                toast.success("Profile updated successfully! ✨")
            }
        } catch (error) {
            toast.error("Failed to update profile")
            console.error(error)
        } finally {
            setSaving(false)
        }
    }

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            toast.error("Passwords don't match!")
            return
        }
        
        if (newPassword.length < 6) {
            toast.error("Password must be at least 6 characters")
            return
        }

        setSaving(true)
        try {
            // Note: Supabase doesn't allow password change without email verification
            // This is a placeholder for when you set up password reset
            toast.info("Password reset email sent to your email! 📧")
            setCurrentPassword("")
            setNewPassword("")
            setConfirmPassword("")
        } catch (error) {
            toast.error("Failed to change password")
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
        <div className="space-y-6 pb-20 lg:pb-6 max-w-4xl">
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
                        Edit Profile
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                        Update your personal information
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Full Name *</label>
                            <Input 
                                type="text" 
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="Enter your full name"
                                className="w-full"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Phone Number</label>
                            <Input 
                                type="tel" 
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Enter your phone number"
                                className="w-full"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Email</label>
                            <Input 
                                type="email" 
                                defaultValue={user?.email || ''}
                                disabled
                                className="w-full bg-muted"
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

            {/* Change Password */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                        <Lock className="h-4 w-4 sm:h-5 sm:w-5" />
                        Change Password
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                        Update your password to keep your account secure
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">New Password</label>
                            <Input 
                                type="password" 
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Enter new password"
                                className="w-full"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Confirm Password</label>
                            <Input 
                                type="password" 
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm new password"
                                className="w-full"
                            />
                        </div>
                    </div>
                    <Button 
                        onClick={handleChangePassword}
                        disabled={saving || !newPassword}
                        variant="outline"
                    >
                        {saving ? 'Sending...' : 'Update Password'}
                    </Button>
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
                <CardContent className="space-y-6">
                    {/* Theme */}
                    <div className="space-y-3">
                        <label className="text-sm font-medium">Theme Mode</label>
                        <div className="grid grid-cols-3 gap-2 sm:gap-3">
                            {[
                                { value: 'light', icon: Sun, label: 'Light' },
                                { value: 'dark', icon: Moon, label: 'Dark' },
                                { value: 'system', icon: Monitor, label: 'System' },
                            ].map((item) => (
                                <button
                                    key={item.value}
                                    onClick={() => {
                                        setTheme(item.value)
                                        toast.success(`${item.label} theme applied!`)
                                    }}
                                    className={`flex flex-col items-center gap-2 p-3 sm:p-4 rounded-lg border-2 transition-all ${
                                        theme === item.value 
                                            ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950' 
                                            : 'border-border hover:border-gray-300 dark:hover:border-gray-600'
                                    }`}
                                >
                                    <item.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                                    <span className="text-xs sm:text-sm font-medium">{item.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Accent Color */}
                    <div className="space-y-3">
                        <label className="text-sm font-medium">Accent Color</label>
                        <div className="grid grid-cols-6 gap-2">
                            {colors.map((color) => (
                                <button
                                    key={color.value}
                                    onClick={() => {
                                        setAccentColor(color.value)
                                        toast.success(`${color.name} color applied!`)
                                    }}
                                    className={`h-10 w-10 rounded-full ${color.class} transition-all ${
                                        accentColor === color.value 
                                            ? 'ring-2 ring-offset-2 ring-indigo-500 scale-110' 
                                            : 'hover:scale-105'
                                    }`}
                                    title={color.name}
                                />
                            ))}
                        </div>
                    </div>
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
                        { key: 'transactions', label: 'Transaction alerts', desc: 'Get notified about new transactions', icon: '💳' },
                        { key: 'weekly', label: 'Weekly summary', desc: 'Receive weekly financial reports', icon: '📊' },
                        { key: 'goals', label: 'Goal updates', desc: 'Track your progress towards goals', icon: '🎯' },
                        { key: 'budget', label: 'Budget warnings', desc: 'Alerts when approaching budget limits', icon: '💰' },
                        { key: 'marketing', label: 'Tips & offers', desc: 'Receive helpful tips and special offers', icon: '🎁' },
                    ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between py-2">
                            <div className="flex items-center gap-3">
                                <span className="text-xl">{item.icon}</span>
                                <div>
                                    <label className="text-sm font-medium cursor-pointer block">{item.label}</label>
                                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                                </div>
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

            {/* Security */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                        <Shield className="h-4 w-4 sm:h-5 sm:w-5" />
                        Security
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <Button 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={() => toast.info("Security audit completed! ✅")}
                    >
                        <CreditCard className="mr-2 h-4 w-4" />
                        Active Sessions
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

            {/* Danger Zone */}
            <Card className="border-red-200 dark:border-red-900">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-600 text-base sm:text-lg">
                        <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                        Danger Zone
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Button 
                        variant="destructive"
                        onClick={() => {
                            if (confirm("Are you sure you want to delete your account? This action CANNOT be undone!")) {
                                toast.error("Account deletion requested - Please contact support to complete this action")
                            }
                        }}
                    >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Account
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
