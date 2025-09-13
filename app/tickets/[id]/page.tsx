"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Save,
  Shield,
  FileText,
  CheckCircle,
  Settings,
  ChevronDown,
  MoreHorizontal,
  Send,
  Bot,
  User,
} from "lucide-react"

// Mock ticket data
const ticketData = {
  id: "INC0019721",
  title: "The HDMI port on my PC stopped working",
  status: "In Progress",
  priority: "3 - Low",
  assignedTo: "Caleb Kim",
  created: "2024-01-15 10:30 AM",
  updated: "2024-01-15 2:45 PM",
  requester: "John Smith",
  category: "Hardware",
  description: "Dear Alex Kira, The HDMI port on my PC stopped working, users not able to access application",
  keyActions: "Notified that Incident showing steps with AI Agent for Incident Resolution",
  serviceLevel: "Service Level Agreement: 4 hours",
  summary: {
    issue: "The HDMI port on my PC stopped working",
    users: "Users are not able to access the application",
    priority: "3 - Low",
    status: "3 - Planning",
    assignedTo: "Caleb Kim",
    request: "3 - Low",
    priority2: "3 - Planning",
  },
}

const activityData = [
  {
    id: 1,
    user: "Caleb Kim",
    action:
      "Incident possible showing steps with AI Agent for Incident Resolution. Scanning all articles from Agent Assist while we wait for user to update.",
    time: "2024-01-15 11:15 AM",
    type: "comment",
    avatar: "CK",
  },
  {
    id: 2,
    user: "Caleb Kim",
    action: "Incident state: In Progress was done",
    time: "2024-01-15 11:15 AM",
    type: "status",
    avatar: "CK",
  },
]

const agentAssistItems = [
  {
    title: "How can I restore my computer to a previous state?",
    description:
      "You can restore your computer to a previous state by using System Restore. This feature allows you to undo recent system changes without affecting your personal files.",
    updated: "Updated 1 week ago",
    votes: 10,
  },
  {
    title: "PC Port Reset",
    description:
      "The PC update has caused some HDMI ports to disconnect. You can reset the connection by following these steps...",
    updated: "Updated 3 months ago",
    votes: 17,
  },
  {
    title: "Can I upgrade my operating system? What...",
    description:
      "Upgrade your Mac Operating System? The latest macOS offers improved performance, new features, and enhanced security.",
    updated: "Updated 3 months ago",
    votes: 18,
  },
]

export default function TicketDetailPage() {
  const params = useParams()
  const [activeTab, setActiveTab] = useState("overview")
  const [workNotes, setWorkNotes] = useState("")
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      type: "ai",
      message:
        "Hello! I'm here to help you resolve this HDMI port issue. Based on the ticket details, I can suggest some troubleshooting steps.",
      timestamp: "2024-01-15 2:45 PM",
    },
    {
      id: 2,
      type: "ai",
      message: "Here are some articles that might help with this issue:",
      timestamp: "2024-01-15 2:46 PM",
    },
  ])
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const userMessage = {
        id: chatMessages.length + 1,
        type: "user",
        message: newMessage,
        timestamp: new Date().toLocaleString(),
      }
      setChatMessages([...chatMessages, userMessage])
      setNewMessage("")

      // Simulate AI response
      setTimeout(() => {
        const aiResponse = {
          id: chatMessages.length + 2,
          type: "ai",
          message:
            "I understand your concern. Let me analyze the ticket details and provide you with the most relevant solution...",
          timestamp: new Date().toLocaleString(),
        }
        setChatMessages((prev) => [...prev, aiResponse])
      }, 1000)
    }
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="border-b px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-gray-900">{ticketData.id}</h1>
            <Badge className="bg-blue-100 text-blue-800">{ticketData.status}</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" size="sm">
              <Shield className="w-4 h-4 mr-2" />
              Create Security Incident
            </Button>
            <Button variant="outline" size="sm">
              <FileText className="w-4 h-4 mr-2" />
              Create change request
            </Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              <CheckCircle className="w-4 h-4 mr-2" />
              Resolve
            </Button>
          </div>
        </div>

        <h2 className="text-lg font-medium text-gray-900 mb-4">{ticketData.title}</h2>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 max-w-md">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="investigation">Investigation</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="related">Related records</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Column - Ticket Details */}
        <div className="w-1/3 border-r overflow-auto">
          <div className="p-4">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsContent value="overview" className="space-y-4">
                {/* Ticket Summary */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-gray-600">New Basic Incident summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <label className="text-xs font-medium text-gray-500">Issue:</label>
                      <p className="text-sm text-gray-900">{ticketData.summary.issue}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500">Users:</label>
                      <p className="text-sm text-gray-900">{ticketData.summary.users}</p>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      <div>
                        <label className="text-xs font-medium text-gray-500">Priority:</label>
                        <p className="text-sm text-gray-900">{ticketData.summary.priority}</p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500">Status:</label>
                        <p className="text-sm text-gray-900">{ticketData.summary.status}</p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500">Assigned to:</label>
                        <p className="text-sm text-gray-900">{ticketData.assignedTo}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Summary Details */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-gray-600">Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-900 mb-4">{ticketData.description}</p>
                    <div className="space-y-2 text-xs">
                      <div>
                        <span className="font-medium">Key Actions Taken:</span>
                      </div>
                      <div>
                        <span className="font-medium">
                          Notified that Incident showing steps with AI Agent for Incident Resolution
                        </span>
                      </div>
                      <div>
                        <span className="font-medium">Service Level Agreement:</span> 4 hours
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="investigation">
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-gray-500">Investigation details will be displayed here...</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="details">
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-gray-500">Detailed ticket information will be displayed here...</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="related">
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-gray-500">Related records will be displayed here...</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Center Column - Activity & Work Notes */}
        <div className="flex-1 border-r overflow-auto">
          <div className="p-4 space-y-4">
            {/* Work Notes */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-600">Compose</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium">Work notes</span>
                    <span className="text-xs text-gray-500">and Additional comments Customer visible</span>
                    <Button variant="ghost" size="sm" className="h-auto p-0">
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </div>
                  <Textarea
                    placeholder="Enter your Work notes here"
                    value={workNotes}
                    onChange={(e) => setWorkNotes(e.target.value)}
                    className="min-h-[80px] bg-yellow-50 border-yellow-200"
                  />
                </div>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Send className="w-4 h-4 mr-2" />
                  Post
                </Button>
              </CardContent>
            </Card>

            {/* Activity Feed */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  Activity
                  <Badge variant="secondary" className="text-xs">
                    2
                  </Badge>
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Settings className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activityData.map((activity) => (
                    <div key={activity.id} className="flex gap-3 p-3 bg-orange-50 rounded-lg">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-orange-500 text-white text-xs">{activity.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">{activity.user}</span>
                          <span className="text-xs text-gray-500">{activity.time}</span>
                        </div>
                        <p className="text-sm text-gray-700">{activity.action}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Column - Agent Assist AI Chat */}
        <div className="w-80 bg-gray-50 flex flex-col">
          <div className="p-4 border-b bg-white">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <Bot className="w-5 h-5 text-blue-600" />
                Agent Assist
              </h3>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((message) => (
                <div key={message.id} className={`flex gap-3 ${message.type === "user" ? "flex-row-reverse" : ""}`}>
                  <Avatar className="w-8 h-8">
                    <AvatarFallback
                      className={message.type === "ai" ? "bg-blue-600 text-white" : "bg-gray-600 text-white"}
                    >
                      {message.type === "ai" ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`flex-1 ${message.type === "user" ? "text-right" : ""}`}>
                    <div
                      className={`inline-block p-3 rounded-lg max-w-[85%] ${
                        message.type === "ai" ? "bg-white border text-gray-900" : "bg-blue-600 text-white"
                      }`}
                    >
                      <p className="text-sm">{message.message}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{message.timestamp}</p>
                  </div>
                </div>
              ))}

              {/* Knowledge Base Articles */}
              <div className="space-y-3 mt-6">
                <h4 className="text-sm font-medium text-gray-700">Related Articles</h4>
                {agentAssistItems.map((item, index) => (
                  <Card key={index} className="shadow-sm cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-3">
                      <div className="flex items-start justify-between mb-2">
                        <h5 className="font-medium text-xs text-gray-900 line-clamp-2">{item.title}</h5>
                        <div className="flex items-center gap-1 text-xs text-gray-500 ml-2">
                          <span>{item.votes}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mb-2 line-clamp-2">{item.description}</p>
                      <p className="text-xs text-gray-500">{item.updated}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t bg-white">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask Agent Assist..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button size="sm" onClick={handleSendMessage} className="bg-blue-600 hover:bg-blue-700">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
