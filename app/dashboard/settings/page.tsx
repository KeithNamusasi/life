import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { User, Bell, Shield, Palette, LogOut, Save } from "lucide-react"

export default async function SettingsPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect("/auth/login")
    }

    const { data: profile } = await supabase
        .from('users')
        .select('full_name, email')
        .eq('id', user.id)
        .single()

    const userName = profile?.full_name || user.email?.split('@')[0] || 'User'
    const userEmail = profile?.email || user.email || ''

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="space-y-1">
                <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <span>Settings ⚙️</span>
                </h2>
                <p className="text-muted-foreground">
                    Manage your account settings and preferences
                </p>
            </div>

            {/* Profile Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Profile
                    </CardTitle>
                    <CardDescription>
                        Manage your personal information
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Full Name</label>
                            <input 
                                type="text" 
                                defaultValue={userName}
                                className="w-full px-3 py-2 border rounded-lg bg-background"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Email</label>
                            <input 
                                type="email" 
                                defaultValue={userEmail}
                                className="w-full px-3 py-2 border rounded-lg bg-background"
                                disabled
                            />
                        </div>
                    </div>
                    <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                    </Button>
                </CardContent>
            </Card>

            {/* Notifications Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Bell className="h-5 w-5" />
                        Notifications
                    </CardTitle>
                    <CardDescription>
                        Choose what notifications you receive
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {[
                        { label: "Email notifications for transactions", defaultChecked: true },
                        { label: "Weekly financial summary", defaultChecked: true },
                        { label: "Goal achievement alerts", defaultChecked: false },
                        { label: "Budget limit warnings", defaultChecked: true },
                    ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <label className="text-sm font-medium">{item.label}</label>
                            <input 
                                type="checkbox" 
                                defaultChecked={item.defaultChecked}
                                className="h-4 w-4 rounded border-gray-300"
                            />
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Appearance Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Palette className="h-5 w-5" />
                        Appearance
                    </CardTitle>
                    <CardDescription>
                        Customize how Life-OS looks for you
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Theme</label>
                        <div className="flex gap-2">
                            <Button variant="outline" className="flex-1">Light</Button>
                            <Button variant="outline" className="flex-1">Dark</Button>
                            <Button variant="outline" className="flex-1 bg-indigo-50 border-indigo-200">System</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Security Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        Security
                    </CardTitle>
                    <CardDescription>
                        Manage your account security
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full justify-start">
                        Change Password
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                        Enable Two-Factor Authentication
                    </Button>
                </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-red-200 dark:border-red-900">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-600">
                        <LogOut className="h-5 w-5" />
                        Danger Zone
                    </CardTitle>
                    <CardDescription>
                        Irreversible and destructive actions
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button variant="destructive">
                        Delete Account
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
