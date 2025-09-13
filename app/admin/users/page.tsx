"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Search, Shield, User, Building2, Ticket, Mail } from "lucide-react"

export default function AdminUsersPage() {
  const userStats = {
    totalUsers: 1247,
    activeUsers: 1156,
    adminUsers: 8,
    agentUsers: 45,
    companyUsers: 24,
    regularUsers: 1170,
  }

  const recentUsers = [
    {
      id: "USR-001",
      name: "John Smith",
      email: "john@techstart.com",
      role: "company",
      company: "TechStart Solutions",
      status: "active",
      lastLogin: "2 hours ago",
      ticketsCreated: 12,
      joinDate: "2024-01-15",
    },
    {
      id: "USR-002",
      name: "Sarah Johnson",
      email: "sarah@globalfinance.com",
      role: "agent",
      company: "Global Finance Corp",
      status: "active",
      lastLogin: "1 day ago",
      ticketsCreated: 0,
      joinDate: "2024-01-14",
    },
    {
      id: "USR-003",
      name: "Mike Davis",
      email: "mike@healthcareplus.com",
      role: "user",
      company: "Healthcare Plus",
      status: "active",
      lastLogin: "3 hours ago",
      ticketsCreated: 8,
      joinDate: "2024-01-13",
    },
    {
      id: "USR-004",
      name: "Alice Brown",
      email: "alice@acme.com",
      role: "company",
      company: "Acme Corporation",
      status: "active",
      lastLogin: "5 minutes ago",
      ticketsCreated: 23,
      joinDate: "2024-01-10",
    },
    {
      id: "USR-005",
      name: "Bob Wilson",
      email: "bob@techinnovations.com",
      role: "agent",
      company: "Tech Innovations",
      status: "inactive",
      lastLogin: "1 week ago",
      ticketsCreated: 0,
      joinDate: "2024-01-08",
    },
  ]

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800"
      case "company":
        return "bg-purple-100 text-purple-800"
      case "agent":
        return "bg-blue-100 text-blue-800"
      case "user":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return Shield
      case "company":
        return Building2
      case "agent":
        return User
      case "user":
        return User
      default:
        return User
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
        <p className="text-gray-600">Monitor and manage all platform users</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl font-bold">{userStats.totalUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <User className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Users</p>
                <p className="text-2xl font-bold">{userStats.activeUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <Shield className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Admins</p>
                <p className="text-2xl font-bold">{userStats.adminUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Agents</p>
                <p className="text-2xl font-bold">{userStats.agentUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Building2 className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Company Admins</p>
                <p className="text-2xl font-bold">{userStats.companyUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <User className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Regular Users</p>
                <p className="text-2xl font-bold">{userStats.regularUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                All Users
              </CardTitle>
              <CardDescription>Complete list of platform users across all companies</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input placeholder="Search users..." className="pl-9 w-64" />
              </div>
              <Select>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="company">Company</SelectItem>
                  <SelectItem value="agent">Agent</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentUsers.map((user) => {
              const RoleIcon = getRoleIcon(user.role)
              return (
                <div key={user.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          <RoleIcon className="w-4 h-4 text-gray-500" />
                          <h3 className="font-semibold text-gray-900">{user.name}</h3>
                        </div>
                        <Badge className={getRoleColor(user.role)}>{user.role}</Badge>
                        <Badge
                          className={
                            user.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          }
                        >
                          {user.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          <span>{user.email}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Building2 className="w-3 h-3" />
                          <span>{user.company}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Ticket className="w-3 h-3" />
                          <span>{user.ticketsCreated} tickets</span>
                        </div>
                        <div>
                          <span className="font-medium">Last login:</span> {user.lastLogin}
                        </div>
                      </div>
                      <div className="text-xs text-gray-400 mt-2">
                        User ID: {user.id} • Joined: {user.joinDate}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        View Profile
                      </Button>
                      <Button size="sm" variant="outline">
                        Manage
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="mt-6 text-center">
            <Button variant="outline">Load More Users</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
