"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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
import { Plus, Bell, AlertTriangle, Info, CheckCircle, Users, Edit, Trash2, Send } from "lucide-react"

interface Post {
  id: string
  title: string
  content: string
  type: "maintenance" | "announcement" | "alert" | "info"
  priority: "low" | "medium" | "high" | "urgent"
  status: "draft" | "published" | "scheduled"
  scheduledFor?: string
  createdAt: string
  updatedAt: string
  views: number
  targetUsers: "all" | "active" | "specific"
}

export default function PostsPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState("all")

  // Mock data - in real app this would come from API
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      title: "Scheduled Maintenance - December 15th",
      content:
        "We will be performing scheduled maintenance on our servers from 2:00 AM to 4:00 AM EST. During this time, the system may be temporarily unavailable.",
      type: "maintenance",
      priority: "high",
      status: "published",
      createdAt: "2024-01-10",
      updatedAt: "2024-01-10",
      views: 1250,
      targetUsers: "all",
    },
    {
      id: "2",
      title: "New Feature: Advanced Ticket Filtering",
      content:
        "We're excited to announce our new advanced ticket filtering feature that allows you to sort and filter tickets by multiple criteria.",
      type: "announcement",
      priority: "medium",
      status: "published",
      createdAt: "2024-01-08",
      updatedAt: "2024-01-08",
      views: 890,
      targetUsers: "all",
    },
    {
      id: "3",
      title: "Server Performance Issues",
      content:
        "We are currently experiencing some performance issues with our servers. Our team is working to resolve this as quickly as possible.",
      type: "alert",
      priority: "urgent",
      status: "draft",
      createdAt: "2024-01-12",
      updatedAt: "2024-01-12",
      views: 0,
      targetUsers: "all",
    },
  ])

  const getTypeIcon = (type: Post["type"]) => {
    switch (type) {
      case "maintenance":
        return <AlertTriangle className="w-4 h-4" />
      case "announcement":
        return <Bell className="w-4 h-4" />
      case "alert":
        return <AlertTriangle className="w-4 h-4" />
      case "info":
        return <Info className="w-4 h-4" />
      default:
        return <Bell className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: Post["type"]) => {
    switch (type) {
      case "maintenance":
        return "bg-orange-100 text-orange-800"
      case "announcement":
        return "bg-blue-100 text-blue-800"
      case "alert":
        return "bg-red-100 text-red-800"
      case "info":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: Post["priority"]) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredPosts = posts.filter((post) => {
    if (selectedFilter === "all") return true
    return post.status === selectedFilter
  })

  const handleCreatePost = (postData: Partial<Post>) => {
    const newPost: Post = {
      id: Date.now().toString(),
      title: postData.title || "",
      content: postData.content || "",
      type: postData.type || "info",
      priority: postData.priority || "medium",
      status: postData.status || "draft",
      scheduledFor: postData.scheduledFor,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
      views: 0,
      targetUsers: postData.targetUsers || "all",
    }
    setPosts([...posts, newPost])
    setIsCreateDialogOpen(false)
  }

  const handleDeletePost = (id: string) => {
    setPosts(posts.filter((post) => post.id !== id))
  }

  const handlePublishPost = (id: string) => {
    setPosts(posts.map((post) => (post.id === id ? { ...post, status: "published" as const } : post)))
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Posts & Notifications</h1>
          <p className="text-gray-600 mt-1">Create and manage company-wide announcements and notifications</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </Button>
          </DialogTrigger>
          <CreatePostDialog onSubmit={handleCreatePost} />
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Bell className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Posts</p>
                <p className="text-2xl font-bold">{posts.length}</p>
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
                <p className="text-sm text-gray-600">Published</p>
                <p className="text-2xl font-bold">{posts.filter((p) => p.status === "published").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Edit className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Drafts</p>
                <p className="text-2xl font-bold">{posts.filter((p) => p.status === "draft").length}</p>
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
                <p className="text-sm text-gray-600">Total Views</p>
                <p className="text-2xl font-bold">{posts.reduce((sum, post) => sum + post.views, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex gap-4">
            <Select value={selectedFilter} onValueChange={setSelectedFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Posts</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Drafts</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Posts Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Post</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="w-32">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPosts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{post.title}</p>
                      <p className="text-sm text-gray-500 truncate max-w-xs">{post.content}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getTypeColor(post.type)}>
                      <div className="flex items-center gap-1">
                        {getTypeIcon(post.type)}
                        {post.type}
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getPriorityColor(post.priority)}>
                      {post.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={post.status === "published" ? "default" : "secondary"}
                      className={
                        post.status === "published"
                          ? "bg-green-100 text-green-800"
                          : post.status === "scheduled"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                      }
                    >
                      {post.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{post.views}</TableCell>
                  <TableCell>{post.createdAt}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {post.status === "draft" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handlePublishPost(post.id)}
                          className="text-green-600 hover:text-green-700"
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeletePost(post.id)}
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

function CreatePostDialog({
  onSubmit,
}: {
  onSubmit: (data: Partial<Post>) => void
}) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    type: "info" as Post["type"],
    priority: "medium" as Post["priority"],
    status: "draft" as Post["status"],
    targetUsers: "all" as Post["targetUsers"],
    scheduledFor: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    setFormData({
      title: "",
      content: "",
      type: "info",
      priority: "medium",
      status: "draft",
      targetUsers: "all",
      scheduledFor: "",
    })
  }

  return (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle>Create New Post</DialogTitle>
        <DialogDescription>Create a new announcement or notification for your users.</DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4 py-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Title</label>
            <Input
              placeholder="Enter post title..."
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Type</label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData({ ...formData, type: value as Post["type"] })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="info">Information</SelectItem>
                  <SelectItem value="announcement">Announcement</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="alert">Alert</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Priority</label>
              <Select
                value={formData.priority}
                onValueChange={(value) => setFormData({ ...formData, priority: value as Post["priority"] })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Content</label>
            <Textarea
              placeholder="Write your post content..."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={4}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Target Users</label>
              <Select
                value={formData.targetUsers}
                onValueChange={(value) => setFormData({ ...formData, targetUsers: value as Post["targetUsers"] })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="active">Active Users</SelectItem>
                  <SelectItem value="specific">Specific Users</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Status</label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value as Post["status"] })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Publish Now</SelectItem>
                  <SelectItem value="scheduled">Schedule</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            Create Post
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
