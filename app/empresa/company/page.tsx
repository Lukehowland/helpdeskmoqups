"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Building, Mail, Globe, Users, Settings, Bell, Shield, Palette, Upload, Save } from "lucide-react"

interface CompanySettings {
  name: string
  description: string
  website: string
  email: string
  phone: string
  address: string
  city: string
  country: string
  timezone: string
  logo?: string
  primaryColor: string
  allowUserRegistration: boolean
  requireEmailVerification: boolean
  enableNotifications: boolean
  autoAssignTickets: boolean
  businessHours: {
    start: string
    end: string
    timezone: string
  }
}

export default function CompanySettingsPage() {
  const [settings, setSettings] = useState<CompanySettings>({
    name: "Acme Corporation",
    description: "Leading provider of innovative business solutions",
    website: "https://acme.com",
    email: "support@acme.com",
    phone: "+1 (555) 123-4567",
    address: "123 Business Ave",
    city: "San Francisco",
    country: "United States",
    timezone: "America/Los_Angeles",
    logo: "/generic-company-logo.png",
    primaryColor: "#3B82F6",
    allowUserRegistration: true,
    requireEmailVerification: true,
    enableNotifications: true,
    autoAssignTickets: false,
    businessHours: {
      start: "09:00",
      end: "17:00",
      timezone: "America/Los_Angeles",
    },
  })

  const [hasChanges, setHasChanges] = useState(false)

  const handleInputChange = (field: keyof CompanySettings, value: any) => {
    setSettings((prev) => ({ ...prev, [field]: value }))
    setHasChanges(true)
  }

  const handleBusinessHoursChange = (field: keyof CompanySettings["businessHours"], value: string) => {
    setSettings((prev) => ({
      ...prev,
      businessHours: { ...prev.businessHours, [field]: value },
    }))
    setHasChanges(true)
  }

  const handleSave = () => {
    // In real app, this would save to API
    console.log("Saving settings:", settings)
    setHasChanges(false)
  }

  const timezones = [
    "America/Los_Angeles",
    "America/Denver",
    "America/Chicago",
    "America/New_York",
    "Europe/London",
    "Europe/Paris",
    "Asia/Tokyo",
    "Asia/Shanghai",
    "Australia/Sydney",
  ]

  const countries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Germany",
    "France",
    "Japan",
    "Australia",
    "Brazil",
    "Mexico",
  ]

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Company Settings</h1>
          <p className="text-gray-600 mt-1">Manage your company information and preferences</p>
        </div>
        {hasChanges && (
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        )}
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          {/* Company Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5" />
                Company Information
              </CardTitle>
              <CardDescription>Basic information about your company</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input
                    id="company-name"
                    value={settings.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={settings.website}
                    onChange={(e) => handleInputChange("website", e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={settings.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Contact Information
              </CardTitle>
              <CardDescription>How customers can reach your company</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Support Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={settings.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={settings.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" value={settings.city} onChange={(e) => handleInputChange("city", e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Select value={settings.country} onValueChange={(value) => handleInputChange("country", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={settings.timezone} onValueChange={(value) => handleInputChange("timezone", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {timezones.map((tz) => (
                        <SelectItem key={tz} value={tz}>
                          {tz}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Business Hours */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Business Hours
              </CardTitle>
              <CardDescription>Set your support availability hours</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="start-time">Start Time</Label>
                  <Input
                    id="start-time"
                    type="time"
                    value={settings.businessHours.start}
                    onChange={(e) => handleBusinessHoursChange("start", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="end-time">End Time</Label>
                  <Input
                    id="end-time"
                    type="time"
                    value={settings.businessHours.end}
                    onChange={(e) => handleBusinessHoursChange("end", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="business-timezone">Timezone</Label>
                  <Select
                    value={settings.businessHours.timezone}
                    onValueChange={(value) => handleBusinessHoursChange("timezone", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {timezones.map((tz) => (
                        <SelectItem key={tz} value={tz}>
                          {tz}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="branding" className="space-y-6">
          {/* Logo & Branding */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Logo & Branding
              </CardTitle>
              <CardDescription>Customize your company's visual identity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Company Logo</Label>
                <div className="flex items-center gap-4 mt-2">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={settings.logo || "/placeholder.svg"} alt="Company Logo" />
                    <AvatarFallback>
                      <Building className="w-8 h-8" />
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload New Logo
                  </Button>
                </div>
              </div>
              <div>
                <Label htmlFor="primary-color">Primary Color</Label>
                <div className="flex items-center gap-4 mt-2">
                  <Input
                    id="primary-color"
                    type="color"
                    value={settings.primaryColor}
                    onChange={(e) => handleInputChange("primaryColor", e.target.value)}
                    className="w-20 h-10"
                  />
                  <Input
                    value={settings.primaryColor}
                    onChange={(e) => handleInputChange("primaryColor", e.target.value)}
                    placeholder="#3B82F6"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          {/* User Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                User Management
              </CardTitle>
              <CardDescription>Control how users can interact with your system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="allow-registration">Allow User Registration</Label>
                  <p className="text-sm text-gray-500">Let new users register for accounts</p>
                </div>
                <Switch
                  id="allow-registration"
                  checked={settings.allowUserRegistration}
                  onCheckedChange={(checked) => handleInputChange("allowUserRegistration", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-verification">Require Email Verification</Label>
                  <p className="text-sm text-gray-500">Users must verify their email before accessing the system</p>
                </div>
                <Switch
                  id="email-verification"
                  checked={settings.requireEmailVerification}
                  onCheckedChange={(checked) => handleInputChange("requireEmailVerification", checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Ticket Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Ticket Management
              </CardTitle>
              <CardDescription>Configure how tickets are handled</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-assign">Auto-assign Tickets</Label>
                  <p className="text-sm text-gray-500">Automatically assign new tickets to available agents</p>
                </div>
                <Switch
                  id="auto-assign"
                  checked={settings.autoAssignTickets}
                  onCheckedChange={(checked) => handleInputChange("autoAssignTickets", checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notifications
              </CardTitle>
              <CardDescription>Control notification settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enable-notifications">Enable Notifications</Label>
                  <p className="text-sm text-gray-500">Send email notifications for important events</p>
                </div>
                <Switch
                  id="enable-notifications"
                  checked={settings.enableNotifications}
                  onCheckedChange={(checked) => handleInputChange("enableNotifications", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security Settings
              </CardTitle>
              <CardDescription>Manage security and access controls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-8">
                <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Security Features</h3>
                <p className="text-gray-500 mb-4">Advanced security features will be available in future updates.</p>
                <Button variant="outline">Contact Support</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
