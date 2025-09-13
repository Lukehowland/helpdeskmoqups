"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Clock, AlertTriangle, MessageSquare, Calendar } from "lucide-react"

interface AssignedTicket {
  id: string
  title: string
  customer: {
    name: string
    email: string
    avatar?: string
  }
  priority: "low" | "medium" | "high" | "urgent"
  status: "open" | "in-progress" | "pending" | "waiting-customer"
  category: string
  assignedAt: string
  lastUpdate: string
  responseTime: string
  description: string
}

export default function AgentAssignedPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPriority, setSelectedPriority] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  // Mock data - in real app this would come from API
  const assignedTickets: AssignedTicket[] = [
    {
      id: "TK-001",
      title: "Unable to login to mobile app",
      customer: {
        name: "John Doe",
        email: "john.doe@email.com",
        avatar: "/thoughtful-man.png",
      },
      priority: "high",
      status: "in-progress",
      category: "Authentication",
      assignedAt: "2024-01-15T10:30:00Z",
      lastUpdate: "5 minutes ago",
      responseTime: "2h 15m",
      description: "User reports being unable to login to the mobile application after recent update.",
    },
    {
      id: "TK-002",
      title: "Payment processing error on checkout",
      customer: {
        name: "Sarah Wilson",
        email: "sarah.wilson@email.com",
        avatar: "/diverse-woman-portrait.png",
      },
      priority: "urgent",
      status: "open",
      category: "Payments",
      assignedAt: "2024-01-15T09:15:00Z",
      lastUpdate: "12 minutes ago",
      responseTime: "45m",
      description: "Customer experiencing payment failures during checkout process.",
    },
    {
      id: "TK-003",
      title: "Feature request: Dark mode support",
      customer: {
        name: "Mike Johnson",
        email: "mike.johnson@email.com",
      },
      priority: "low",
      status: "pending",
      category: "Feature Request",
      assignedAt: "2024-01-14T16:20:00Z",
      lastUpdate: "2 hours ago",
      responseTime: "1d 2h",
      description: "User requesting dark mode support for better accessibility.",
    },
    {
      id: "TK-004",
      title: "Data export functionality not working",
      customer: {
        name: "Lisa Chen",
        email: "lisa.chen@email.com",
        avatar: "/asian-woman.png",
      },
      priority: "medium",
      status: "waiting-customer",
      category: "Data Export",
      assignedAt: "2024-01-14T14:10:00Z",
      lastUpdate: "4 hours ago",
      responseTime: "6h 30m",
      description: "Export feature fails when trying to download large datasets.",
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-500 text-white"
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-blue-100 text-blue-800"
      case "in-progress":
        return "bg-orange-100 text-orange-800"
      case "pending":
        return "bg-purple-100 text-purple-800"
      case "waiting-customer":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredTickets = assignedTickets.filter((ticket) => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPriority = selectedPriority === "all" || ticket.priority === selectedPriority
    const matchesStatus = selectedStatus === "all" || ticket.status === selectedStatus
    return matchesSearch && matchesPriority && matchesStatus
  })

  const stats = {
    total: assignedTickets.length,
    inProgress: assignedTickets.filter((t) => t.status === "in-progress").length,
    pending: assignedTickets.filter((t) => t.status === "pending").length,
    urgent: assignedTickets.filter((t) => t.priority === "urgent").length,
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Assigned Tickets</h1>
        <p className="text-gray-600">Manage and respond to tickets assigned to you</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MessageSquare className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Assigned</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">In Progress</p>
                <p className="text-2xl font-bold">{stats.inProgress}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold">{stats.pending}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Urgent</p>
                <p className="text-2xl font-bold">{stats.urgent}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search tickets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedPriority} onValueChange={setSelectedPriority}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="All Priorities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="waiting-customer">Waiting Customer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tickets List */}
      <div className="space-y-4">
        {filteredTickets.map((ticket) => (
          <Card key={ticket.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono text-sm text-gray-500">{ticket.id}</span>
                    <Badge className={getPriorityColor(ticket.priority)}>{ticket.priority}</Badge>
                    <Badge className={getStatusColor(ticket.status)}>{ticket.status.replace("-", " ")}</Badge>
                    <span className="text-sm text-gray-500">{ticket.category}</span>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{ticket.title}</h3>
                  <p className="text-gray-600 mb-4">{ticket.description}</p>

                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={ticket.customer.avatar || "/placeholder.svg"} alt={ticket.customer.name} />
                        <AvatarFallback className="text-xs">
                          {ticket.customer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span>{ticket.customer.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>Response time: {ticket.responseTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Updated: {ticket.lastUpdate}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 ml-4">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    Respond
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTickets.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tickets found</h3>
            <p className="text-gray-500">
              {searchQuery || selectedPriority !== "all" || selectedStatus !== "all"
                ? "Try adjusting your filters to see more tickets."
                : "You don't have any assigned tickets at the moment."}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
