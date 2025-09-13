"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Edit, Trash2, UserPlus, Users, Clock, CheckCircle, Mail, Phone } from "lucide-react"

interface Agent {
  id: string
  name: string
  email: string
  phone?: string
  role: "agent" | "senior_agent" | "team_lead"
  status: "active" | "inactive" | "pending"
  department: string
  joinedAt: string
  lastActive: string
  ticketsAssigned: number
  ticketsResolved: number
  avatar?: string
}

export default function AgentManagementPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false)

  // Mock data - in real app this would come from API
  const [agents, setAgents] = useState<Agent[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      phone: "+1 (555) 123-4567",
      role: "team_lead",
      status: "active",
      department: "Technical Support",
      joinedAt: "2024-01-15",
      lastActive: "2 minutes ago",
      ticketsAssigned: 45,
      ticketsResolved: 42,
      avatar: "/diverse-woman-portrait.png",
    },
    {
      id: "2",
      name: "Mike Chen",
      email: "mike.chen@company.com",
      phone: "+1 (555) 234-5678",
      role: "senior_agent",
      status: "active",
      department: "Technical Support",
      joinedAt: "2024-01-10",
      lastActive: "15 minutes ago",
      ticketsAssigned: 32,
      ticketsResolved: 28,
      avatar: "/thoughtful-man.png",
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      email: "emily.rodriguez@company.com",
      role: "agent",
      status: "active",
      department: "Customer Success",
      joinedAt: "2024-01-20",
      lastActive: "1 hour ago",
      ticketsAssigned: 18,
      ticketsResolved: 15,
      avatar: "/diverse-woman-portrait.png",
    },
    {
      id: "4",
      name: "David Kim",
      email: "david.kim@company.com",
      role: "agent",
      status: "pending",
      department: "Technical Support",
      joinedAt: "2024-01-25",
      lastActive: "Never",
      ticketsAssigned: 0,
      ticketsResolved: 0,
    },
  ])

  const departments = ["Technical Support", "Customer Success", "Billing", "Sales"]

  const getRoleColor = (role: Agent["role"]) => {
    switch (role) {
      case "team_lead":
        return "bg-purple-100 text-purple-800"
      case "senior_agent":
        return "bg-blue-100 text-blue-800"
      case "agent":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: Agent["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredAgents = agents.filter((agent) => {
    const matchesSearch =
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = selectedStatus === "all" || agent.status === selectedStatus
    const matchesDepartment = selectedDepartment === "all" || agent.department === selectedDepartment
    return matchesSearch && matchesStatus && matchesDepartment
  })

  const handleInviteAgent = (agentData: Partial<Agent>) => {
    const newAgent: Agent = {
      id: Date.now().toString(),
      name: agentData.name || "",
      email: agentData.email || "",
      phone: agentData.phone,
      role: agentData.role || "agent",
      status: "pending",
      department: agentData.department || "",
      joinedAt: new Date().toISOString().split("T")[0],
      lastActive: "Never",
      ticketsAssigned: 0,
      ticketsResolved: 0,
    }
    setAgents([...agents, newAgent])
    setIsInviteDialogOpen(false)
  }

  const handleDeleteAgent = (id: string) => {
    setAgents(agents.filter((agent) => agent.id !== id))
  }

  const handleActivateAgent = (id: string) => {
    setAgents(agents.map((agent) => (agent.id === id ? { ...agent, status: "active" as const } : agent)))
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Agent Management</h1>
          <p className="text-gray-600 mt-1">Manage your support team and agent permissions</p>
        </div>
        <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <UserPlus className="w-4 h-4 mr-2" />
              Invite Agent
            </Button>
          </DialogTrigger>
          <InviteAgentDialog onSubmit={handleInviteAgent} departments={departments} />
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Agents</p>
                <p className="text-2xl font-bold">{agents.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Agents</p>
                <p className="text-2xl font-bold">{agents.filter((a) => a.status === "active").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold">{agents.filter((a) => a.status === "pending").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Tickets Resolved</p>
                <p className="text-2xl font-bold">{agents.reduce((sum, agent) => sum + agent.ticketsResolved, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search agents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="All Departments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Agents Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agent</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tickets</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead className="w-32">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAgents.map((agent) => (
                <TableRow key={agent.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={agent.avatar || "/placeholder.svg"} alt={agent.name} />
                        <AvatarFallback>
                          {agent.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{agent.name}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Mail className="w-3 h-3" />
                          {agent.email}
                        </div>
                        {agent.phone && (
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Phone className="w-3 h-3" />
                            {agent.phone}
                          </div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getRoleColor(agent.role)}>
                      {agent.role.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>{agent.department}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(agent.status)}>
                      {agent.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>
                        {agent.ticketsResolved}/{agent.ticketsAssigned} resolved
                      </p>
                      <p className="text-gray-500">
                        {agent.ticketsAssigned > 0
                          ? `${Math.round((agent.ticketsResolved / agent.ticketsAssigned) * 100)}% success rate`
                          : "No tickets yet"}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{agent.lastActive}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {agent.status === "pending" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleActivateAgent(agent.id)}
                          className="text-green-600 hover:text-green-700"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteAgent(agent.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

function InviteAgentDialog({
  onSubmit,
  departments,
}: {
  onSubmit: (data: Partial<Agent>) => void
  departments: string[]
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "agent" as Agent["role"],
    department: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    setFormData({ name: "", email: "", phone: "", role: "agent", department: "" })
  }

  return (
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle>Invite New Agent</DialogTitle>
        <DialogDescription>Send an invitation to a new team member to join as an agent.</DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4 py-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Full Name</label>
            <Input
              placeholder="Enter agent's full name..."
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Email Address</label>
            <Input
              type="email"
              placeholder="Enter agent's email..."
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Phone Number (Optional)</label>
            <Input
              placeholder="Enter phone number..."
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Role</label>
            <Select
              value={formData.role}
              onValueChange={(value) => setFormData({ ...formData, role: value as Agent["role"] })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="agent">Agent</SelectItem>
                <SelectItem value="senior_agent">Senior Agent</SelectItem>
                <SelectItem value="team_lead">Team Lead</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Department</label>
            <Select
              value={formData.department}
              onValueChange={(value) => setFormData({ ...formData, department: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            Send Invitation
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
