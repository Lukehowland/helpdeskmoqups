"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, MessageSquare, Plus, Edit, Trash2, Copy, Clock, Star, Tag } from "lucide-react"

interface CannedResponse {
  id: string
  title: string
  content: string
  category: string
  tags: string[]
  usageCount: number
  lastUsed: string
  createdAt: string
  isPublic: boolean
  rating: number
}

export default function AgentResponsesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  // Mock data - in real app this would come from API
  const [cannedResponses, setCannedResponses] = useState<CannedResponse[]>([
    {
      id: "cr-001",
      title: "Password Reset Instructions",
      content:
        "Hi {customer_name},\n\nI understand you're having trouble accessing your account. I'll be happy to help you reset your password.\n\nPlease follow these steps:\n1. Go to the login page\n2. Click 'Forgot Password'\n3. Enter your email address\n4. Check your email for reset instructions\n\nIf you don't receive the email within 5 minutes, please check your spam folder. Let me know if you need any additional assistance!\n\nBest regards,\n{agent_name}",
      category: "Authentication",
      tags: ["password", "reset", "login", "account"],
      usageCount: 45,
      lastUsed: "2024-01-15",
      createdAt: "2024-01-01",
      isPublic: true,
      rating: 4.8,
    },
    {
      id: "cr-002",
      title: "Payment Issue Acknowledgment",
      content:
        "Hello {customer_name},\n\nThank you for contacting us about the payment issue you're experiencing. I sincerely apologize for any inconvenience this has caused.\n\nI've escalated your case to our billing team and they will investigate this matter immediately. You can expect a resolution within 24-48 hours.\n\nIn the meantime, I've temporarily suspended any late fees on your account.\n\nI'll keep you updated on the progress. Thank you for your patience.\n\nBest regards,\n{agent_name}",
      category: "Billing",
      tags: ["payment", "billing", "issue", "escalation"],
      usageCount: 32,
      lastUsed: "2024-01-14",
      createdAt: "2024-01-02",
      isPublic: true,
      rating: 4.6,
    },
    {
      id: "cr-003",
      title: "Feature Request Acknowledgment",
      content:
        "Hi {customer_name},\n\nThank you for taking the time to share your feature suggestion with us. We really appreciate customer feedback as it helps us improve our product.\n\nI've forwarded your request to our product development team for consideration. While I can't guarantee if or when this feature will be implemented, all suggestions are carefully reviewed.\n\nYou can track feature requests and updates on our roadmap page: [link]\n\nIs there anything else I can help you with today?\n\nBest regards,\n{agent_name}",
      category: "General",
      tags: ["feature", "request", "feedback", "product"],
      usageCount: 18,
      lastUsed: "2024-01-13",
      createdAt: "2024-01-03",
      isPublic: false,
      rating: 4.4,
    },
  ])

  const categories = ["Authentication", "Billing", "Technical", "General", "Mobile"]

  const filteredResponses = cannedResponses.filter((response) => {
    const matchesSearch =
      response.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      response.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      response.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || response.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleCreateResponse = (responseData: Partial<CannedResponse>) => {
    const newResponse: CannedResponse = {
      id: `cr-${Date.now()}`,
      title: responseData.title || "",
      content: responseData.content || "",
      category: responseData.category || "General",
      tags: responseData.tags || [],
      usageCount: 0,
      lastUsed: "Never",
      createdAt: new Date().toISOString().split("T")[0],
      isPublic: responseData.isPublic || false,
      rating: 0,
    }
    setCannedResponses([...cannedResponses, newResponse])
    setIsCreateDialogOpen(false)
  }

  const handleCopyResponse = (content: string) => {
    navigator.clipboard.writeText(content)
    // In real app, show toast notification
  }

  const stats = {
    totalResponses: cannedResponses.length,
    publicResponses: cannedResponses.filter((r) => r.isPublic).length,
    totalUsage: cannedResponses.reduce((sum, r) => sum + r.usageCount, 0),
    avgRating: cannedResponses.reduce((sum, r) => sum + r.rating, 0) / cannedResponses.length,
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Canned Responses</h1>
          <p className="text-gray-600">Manage and use pre-written responses for faster customer support</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Create Response
            </Button>
          </DialogTrigger>
          <CreateResponseDialog onSubmit={handleCreateResponse} categories={categories} />
        </Dialog>
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
                <p className="text-sm text-gray-600">Total Responses</p>
                <p className="text-2xl font-bold">{stats.totalResponses}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Star className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Public Templates</p>
                <p className="text-2xl font-bold">{stats.publicResponses}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Copy className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Usage</p>
                <p className="text-2xl font-bold">{stats.totalUsage}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Star className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Avg Rating</p>
                <p className="text-2xl font-bold">{stats.avgRating.toFixed(1)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search responses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(selectedCategory === category ? "all" : category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Responses List */}
      <div className="space-y-4">
        {filteredResponses.map((response) => (
          <Card key={response.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="text-lg">{response.title}</CardTitle>
                    <Badge variant="outline">{response.category}</Badge>
                    {response.isPublic && <Badge className="bg-green-100 text-green-800">Public</Badge>}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Copy className="w-4 h-4" />
                      <span>Used {response.usageCount} times</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>Last used: {response.lastUsed}</span>
                    </div>
                    {response.rating > 0 && (
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        <span>{response.rating}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleCopyResponse(response.content)}>
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="bg-gray-50 rounded-lg p-4 mb-3">
                <p className="text-sm text-gray-700 whitespace-pre-wrap">
                  {response.content.length > 200 ? `${response.content.substring(0, 200)}...` : response.content}
                </p>
              </div>
              <div className="flex flex-wrap gap-1">
                {response.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredResponses.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No responses found</h3>
            <p className="text-gray-500">
              {searchQuery || selectedCategory !== "all"
                ? "Try adjusting your search terms or browse different categories."
                : "Create your first canned response to get started."}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function CreateResponseDialog({
  onSubmit,
  categories,
}: {
  onSubmit: (data: Partial<CannedResponse>) => void
  categories: string[]
}) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "General",
    tags: "",
    isPublic: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    })
    setFormData({ title: "", content: "", category: "General", tags: "", isPublic: false })
  }

  return (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle>Create Canned Response</DialogTitle>
        <DialogDescription>Create a reusable response template to speed up your customer support.</DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4 py-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Title</label>
            <Input
              placeholder="Enter response title..."
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Content</label>
            <Textarea
              placeholder="Enter your response template... Use {customer_name} and {agent_name} for personalization."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={8}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Category</label>
              <select
                className="w-full p-2 border rounded-md"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Tags (comma separated)</label>
              <Input
                placeholder="password, reset, login"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isPublic"
              checked={formData.isPublic}
              onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
            />
            <label htmlFor="isPublic" className="text-sm">
              Make this response available to all agents
            </label>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            Create Response
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
