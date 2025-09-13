"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Bell, Plus, Edit, Trash2, Eye, Calendar, AlertTriangle, Info, CheckCircle } from "lucide-react"

interface Announcement {
  id: string
  title: string
  message: string
  type: "maintenance" | "error" | "info" | "success"
  isActive: boolean
  createdAt: string
  scheduledFor?: string
}

export default function AdminAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: "1",
      title: "Scheduled Maintenance",
      message:
        "Our system will be under maintenance on Sunday from 2:00 AM to 4:00 AM EST. During this time, some services may be temporarily unavailable.",
      type: "maintenance",
      isActive: true,
      createdAt: "2024-01-15T10:30:00Z",
      scheduledFor: "2024-01-21T02:00:00Z",
    },
    {
      id: "2",
      title: "Server Issues Resolved",
      message:
        "We have successfully resolved the server connectivity issues that were affecting some users. All services are now operating normally.",
      type: "success",
      isActive: false,
      createdAt: "2024-01-14T15:45:00Z",
    },
  ])

  const [isCreating, setIsCreating] = useState(false)
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    message: "",
    type: "info" as const,
    isActive: true,
    scheduledFor: "",
  })

  const handleCreateAnnouncement = () => {
    const announcement: Announcement = {
      id: Date.now().toString(),
      ...newAnnouncement,
      createdAt: new Date().toISOString(),
      scheduledFor: newAnnouncement.scheduledFor || undefined,
    }

    setAnnouncements([announcement, ...announcements])
    setNewAnnouncement({
      title: "",
      message: "",
      type: "info",
      isActive: true,
      scheduledFor: "",
    })
    setIsCreating(false)
  }

  const toggleAnnouncementStatus = (id: string) => {
    setAnnouncements(announcements.map((ann) => (ann.id === id ? { ...ann, isActive: !ann.isActive } : ann)))
  }

  const deleteAnnouncement = (id: string) => {
    setAnnouncements(announcements.filter((ann) => ann.id !== id))
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "maintenance":
        return <AlertTriangle className="w-4 h-4" />
      case "error":
        return <AlertTriangle className="w-4 h-4" />
      case "success":
        return <CheckCircle className="w-4 h-4" />
      default:
        return <Info className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "maintenance":
        return "bg-orange-100 text-orange-800"
      case "error":
        return "bg-red-100 text-red-800"
      case "success":
        return "bg-green-100 text-green-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Company Announcements</h1>
          <p className="text-gray-600">Manage announcements and notifications for your users</p>
        </div>
        <Button onClick={() => setIsCreating(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          New Announcement
        </Button>
      </div>

      {/* Create New Announcement Form */}
      {isCreating && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Create New Announcement</CardTitle>
            <CardDescription>Create a new announcement that will be visible to all users</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={newAnnouncement.title}
                onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                placeholder="Enter announcement title"
              />
            </div>

            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={newAnnouncement.message}
                onChange={(e) => setNewAnnouncement({ ...newAnnouncement, message: e.target.value })}
                placeholder="Enter announcement message"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="type">Type</Label>
                <Select
                  value={newAnnouncement.type}
                  onValueChange={(value: any) => setNewAnnouncement({ ...newAnnouncement, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="info">Information</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="error">Error/Issue</SelectItem>
                    <SelectItem value="success">Success/Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="scheduledFor">Schedule For (Optional)</Label>
                <Input
                  id="scheduledFor"
                  type="datetime-local"
                  value={newAnnouncement.scheduledFor}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, scheduledFor: e.target.value })}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={newAnnouncement.isActive}
                onCheckedChange={(checked) => setNewAnnouncement({ ...newAnnouncement, isActive: checked })}
              />
              <Label htmlFor="isActive">Active (visible to users)</Label>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleCreateAnnouncement} className="bg-blue-600 hover:bg-blue-700">
                Create Announcement
              </Button>
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Announcements List */}
      <div className="space-y-4">
        {announcements.map((announcement) => (
          <Card key={announcement.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{announcement.title}</h3>
                    <Badge className={getTypeColor(announcement.type)}>
                      {getTypeIcon(announcement.type)}
                      <span className="ml-1 capitalize">{announcement.type}</span>
                    </Badge>
                    <Badge variant={announcement.isActive ? "default" : "secondary"}>
                      {announcement.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>

                  <p className="text-gray-600 mb-3">{announcement.message}</p>

                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Created: {new Date(announcement.createdAt).toLocaleDateString()}
                    </div>
                    {announcement.scheduledFor && (
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Scheduled: {new Date(announcement.scheduledFor).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => toggleAnnouncementStatus(announcement.id)}>
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteAnnouncement(announcement.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {announcements.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No announcements yet</h3>
            <p className="text-gray-600 mb-4">Create your first announcement to communicate with your users</p>
            <Button onClick={() => setIsCreating(true)} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Create Announcement
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
