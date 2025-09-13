"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, AlertTriangle, Info, CheckCircle, Calendar } from "lucide-react"

interface Announcement {
  id: string
  title: string
  message: string
  type: "maintenance" | "error" | "info" | "success"
  createdAt: string
  scheduledFor?: string
}

export default function AnnouncementsPage() {
  // In a real app, this would come from an API
  const announcements: Announcement[] = [
    {
      id: "1",
      title: "Scheduled Maintenance",
      message:
        "Our system will be under maintenance on Sunday from 2:00 AM to 4:00 AM EST. During this time, some services may be temporarily unavailable.",
      type: "maintenance",
      createdAt: "2024-01-15T10:30:00Z",
      scheduledFor: "2024-01-21T02:00:00Z",
    },
    {
      id: "2",
      title: "Server Issues Resolved",
      message:
        "We have successfully resolved the server connectivity issues that were affecting some users. All services are now operating normally.",
      type: "success",
      createdAt: "2024-01-14T15:45:00Z",
    },
    {
      id: "3",
      title: "New Feature Available",
      message:
        "We've added a new dashboard feature that allows you to track your ticket history more efficiently. Check it out in your profile section!",
      type: "info",
      createdAt: "2024-01-13T09:15:00Z",
    },
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "maintenance":
        return <AlertTriangle className="w-5 h-5" />
      case "error":
        return <AlertTriangle className="w-5 h-5" />
      case "success":
        return <CheckCircle className="w-5 h-5" />
      default:
        return <Info className="w-5 h-5" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "maintenance":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "error":
        return "bg-red-100 text-red-800 border-red-200"
      case "success":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-blue-100 text-blue-800 border-blue-200"
    }
  }

  const getCardBorder = (type: string) => {
    switch (type) {
      case "maintenance":
        return "border-l-4 border-l-orange-500"
      case "error":
        return "border-l-4 border-l-red-500"
      case "success":
        return "border-l-4 border-l-green-500"
      default:
        return "border-l-4 border-l-blue-500"
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
            <Bell className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Company Announcements</h1>
            <p className="text-gray-600">Stay updated with the latest news and system updates</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {announcements.map((announcement) => (
          <Card
            key={announcement.id}
            className={`${getCardBorder(announcement.type)} hover:shadow-md transition-shadow`}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg ${getTypeColor(announcement.type)}`}>
                  {getTypeIcon(announcement.type)}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{announcement.title}</h3>
                    <Badge className={getTypeColor(announcement.type)}>
                      <span className="capitalize">{announcement.type}</span>
                    </Badge>
                  </div>

                  <p className="text-gray-700 mb-4 leading-relaxed">{announcement.message}</p>

                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(announcement.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    {announcement.scheduledFor && (
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>
                          Scheduled:{" "}
                          {new Date(announcement.scheduledFor).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    )}
                  </div>
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
            <h3 className="text-lg font-medium text-gray-900 mb-2">No announcements</h3>
            <p className="text-gray-600">
              There are no company announcements at this time. Check back later for updates.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
