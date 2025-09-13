"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building2, Users, Shield, TrendingUp, AlertCircle, CheckCircle, Clock, Globe } from "lucide-react"

export default function AdminDashboardPage() {
  // Mock data - in real app this would come from API
  const stats = {
    totalCompanies: 24,
    activeCompanies: 22,
    pendingRequests: 3,
    totalUsers: 1247,
    systemHealth: 99.8,
    monthlyGrowth: 12,
  }

  const pendingRequests = [
    {
      id: "REQ-001",
      company: "TechStart Solutions",
      type: "New Company Registration",
      submittedBy: "John Smith",
      date: "2024-01-15",
      status: "pending",
    },
    {
      id: "REQ-002",
      company: "Global Finance Corp",
      type: "Feature Request",
      submittedBy: "Sarah Johnson",
      date: "2024-01-14",
      status: "review",
    },
    {
      id: "REQ-003",
      company: "Healthcare Plus",
      type: "Integration Request",
      submittedBy: "Mike Davis",
      date: "2024-01-13",
      status: "pending",
    },
  ]

  const recentCompanies = [
    {
      name: "Acme Corporation",
      users: 45,
      tickets: 23,
      status: "active",
      joinDate: "2024-01-10",
    },
    {
      name: "Tech Innovations",
      users: 32,
      tickets: 18,
      status: "active",
      joinDate: "2024-01-08",
    },
    {
      name: "Digital Solutions",
      users: 28,
      tickets: 12,
      status: "active",
      joinDate: "2024-01-05",
    },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Platform Administration</h1>
        <p className="text-gray-600">Manage companies, users, and platform-wide settings</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Building2 className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Companies</p>
                <p className="text-2xl font-bold">{stats.totalCompanies}</p>
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
                <p className="text-sm text-gray-600">Active Companies</p>
                <p className="text-2xl font-bold">{stats.activeCompanies}</p>
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
                <p className="text-sm text-gray-600">Pending Requests</p>
                <p className="text-2xl font-bold">{stats.pendingRequests}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl font-bold">{stats.totalUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Health & Growth */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">System Health</p>
                <p className="text-2xl font-bold">{stats.systemHealth}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Monthly Growth</p>
                <p className="text-2xl font-bold">+{stats.monthlyGrowth}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Requests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Pending Requests
          </CardTitle>
          <CardDescription>Company requests requiring admin approval</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingRequests.map((request) => (
              <div
                key={request.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-medium text-gray-900">{request.id}</span>
                    <Badge className="bg-orange-100 text-orange-800">{request.status}</Badge>
                  </div>
                  <p className="text-gray-900 mb-1">
                    {request.company} - {request.type}
                  </p>
                  <p className="text-sm text-gray-500">
                    Submitted by {request.submittedBy} • {request.date}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="text-green-600 hover:text-green-700 bg-transparent">
                    Approve
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                    Reject
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Button variant="outline">View All Requests</Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Companies */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Recent Companies
          </CardTitle>
          <CardDescription>Recently joined companies on the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentCompanies.map((company, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-medium text-gray-900">{company.name}</span>
                    <Badge className="bg-green-100 text-green-800">{company.status}</Badge>
                  </div>
                  <p className="text-sm text-gray-500">
                    {company.users} users • {company.tickets} tickets • Joined {company.joinDate}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Manage
                </Button>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Button variant="outline">View All Companies</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
