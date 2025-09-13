"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building2, Search, CheckCircle, XCircle, Clock, Users, Ticket } from "lucide-react"

export default function AdminCompaniesPage() {
  const pendingApplications = [
    {
      id: "APP-001",
      companyName: "TechStart Solutions",
      contactName: "John Smith",
      email: "john@techstart.com",
      phone: "+1 (555) 123-4567",
      industry: "Technology",
      employees: "50-100",
      submittedDate: "2024-01-15",
      status: "pending",
      description: "Software development company specializing in web applications",
    },
    {
      id: "APP-002",
      companyName: "Global Finance Corp",
      contactName: "Sarah Johnson",
      email: "sarah@globalfinance.com",
      phone: "+1 (555) 987-6543",
      industry: "Finance",
      employees: "200-500",
      submittedDate: "2024-01-14",
      status: "review",
      description: "Financial services company providing investment solutions",
    },
    {
      id: "APP-003",
      companyName: "Healthcare Plus",
      contactName: "Dr. Mike Davis",
      email: "mike@healthcareplus.com",
      phone: "+1 (555) 456-7890",
      industry: "Healthcare",
      employees: "100-200",
      submittedDate: "2024-01-13",
      status: "pending",
      description: "Medical practice management and patient care solutions",
    },
  ]

  const approvedCompanies = [
    {
      id: "COMP-001",
      name: "Acme Corporation",
      contactName: "Alice Brown",
      email: "alice@acme.com",
      users: 45,
      tickets: 23,
      status: "active",
      joinDate: "2024-01-10",
      lastActivity: "2 hours ago",
    },
    {
      id: "COMP-002",
      name: "Tech Innovations",
      contactName: "Bob Wilson",
      email: "bob@techinnovations.com",
      users: 32,
      tickets: 18,
      status: "active",
      joinDate: "2024-01-08",
      lastActivity: "1 day ago",
    },
    {
      id: "COMP-003",
      name: "Digital Solutions",
      contactName: "Carol Martinez",
      email: "carol@digitalsolutions.com",
      users: 28,
      tickets: 12,
      status: "inactive",
      joinDate: "2024-01-05",
      lastActivity: "1 week ago",
    },
  ]

  const handleApprove = (applicationId: string) => {
    console.log("[v0] Approving application:", applicationId)
    // Implementation would go here
  }

  const handleReject = (applicationId: string) => {
    console.log("[v0] Rejecting application:", applicationId)
    // Implementation would go here
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Company Management</h1>
        <p className="text-gray-600">Manage company applications and existing companies</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Pending Applications</p>
                <p className="text-2xl font-bold">{pendingApplications.length}</p>
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
                <p className="text-2xl font-bold">{approvedCompanies.filter((c) => c.status === "active").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl font-bold">{approvedCompanies.reduce((sum, c) => sum + c.users, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Ticket className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Tickets</p>
                <p className="text-2xl font-bold">{approvedCompanies.reduce((sum, c) => sum + c.tickets, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Applications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Pending Applications
          </CardTitle>
          <CardDescription>Company applications awaiting approval</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingApplications.map((app) => (
              <div key={app.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{app.companyName}</h3>
                      <Badge
                        className={
                          app.status === "pending" ? "bg-orange-100 text-orange-800" : "bg-blue-100 text-blue-800"
                        }
                      >
                        {app.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{app.description}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                      <div>
                        <span className="font-medium">Contact:</span> {app.contactName}
                      </div>
                      <div>
                        <span className="font-medium">Email:</span> {app.email}
                      </div>
                      <div>
                        <span className="font-medium">Industry:</span> {app.industry}
                      </div>
                      <div>
                        <span className="font-medium">Employees:</span> {app.employees}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleApprove(app.id)}>
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300 bg-transparent"
                      onClick={() => handleReject(app.id)}
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                </div>
                <div className="text-xs text-gray-400">
                  Application ID: {app.id} • Submitted: {app.submittedDate}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Existing Companies */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Existing Companies
              </CardTitle>
              <CardDescription>Manage approved companies and their status</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input placeholder="Search companies..." className="pl-9 w-64" />
              </div>
              <Select>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {approvedCompanies.map((company) => (
              <div key={company.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{company.name}</h3>
                      <Badge
                        className={
                          company.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }
                      >
                        {company.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm text-gray-500">
                      <div>
                        <span className="font-medium">Contact:</span> {company.contactName}
                      </div>
                      <div>
                        <span className="font-medium">Users:</span> {company.users}
                      </div>
                      <div>
                        <span className="font-medium">Tickets:</span> {company.tickets}
                      </div>
                    </div>
                    <div className="text-xs text-gray-400 mt-2">
                      Joined: {company.joinDate} • Last activity: {company.lastActivity}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                    <Button size="sm" variant="outline">
                      Manage
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
