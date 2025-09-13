"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, BookOpen, FileText, Video, Star, Clock, Eye } from "lucide-react"

interface KnowledgeItem {
  id: string
  title: string
  type: "article" | "video" | "faq" | "guide"
  category: string
  content: string
  tags: string[]
  views: number
  rating: number
  lastUpdated: string
  author: string
  helpful: boolean
}

export default function AgentKnowledgePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [activeTab, setActiveTab] = useState("browse")

  // Mock data - in real app this would come from API
  const knowledgeItems: KnowledgeItem[] = [
    {
      id: "kb-001",
      title: "How to Reset User Passwords",
      type: "guide",
      category: "Authentication",
      content: "Step-by-step guide for agents to help users reset their passwords safely and securely.",
      tags: ["password", "reset", "security", "authentication"],
      views: 245,
      rating: 4.8,
      lastUpdated: "2024-01-10",
      author: "Security Team",
      helpful: true,
    },
    {
      id: "kb-002",
      title: "Payment Processing Troubleshooting",
      type: "article",
      category: "Payments",
      content: "Common payment issues and their solutions, including failed transactions and refund processes.",
      tags: ["payments", "troubleshooting", "refunds", "billing"],
      views: 189,
      rating: 4.6,
      lastUpdated: "2024-01-08",
      author: "Billing Team",
      helpful: true,
    },
    {
      id: "kb-003",
      title: "Mobile App Login Issues - Video Guide",
      type: "video",
      category: "Mobile",
      content: "Video walkthrough of common mobile app login problems and solutions.",
      tags: ["mobile", "login", "troubleshooting", "app"],
      views: 156,
      rating: 4.9,
      lastUpdated: "2024-01-05",
      author: "Mobile Team",
      helpful: false,
    },
    {
      id: "kb-004",
      title: "Frequently Asked Questions - Data Export",
      type: "faq",
      category: "Data",
      content: "Common questions about data export functionality and file formats.",
      tags: ["data", "export", "csv", "formats"],
      views: 98,
      rating: 4.3,
      lastUpdated: "2024-01-03",
      author: "Data Team",
      helpful: true,
    },
  ]

  const categories = ["Authentication", "Payments", "Mobile", "Data", "General"]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "article":
        return <FileText className="w-4 h-4" />
      case "video":
        return <Video className="w-4 h-4" />
      case "faq":
        return <BookOpen className="w-4 h-4" />
      case "guide":
        return <BookOpen className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "article":
        return "bg-blue-100 text-blue-800"
      case "video":
        return "bg-purple-100 text-purple-800"
      case "faq":
        return "bg-green-100 text-green-800"
      case "guide":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredItems = knowledgeItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const stats = {
    totalArticles: knowledgeItems.length,
    helpfulItems: knowledgeItems.filter((item) => item.helpful).length,
    totalViews: knowledgeItems.reduce((sum, item) => sum + item.views, 0),
    avgRating: knowledgeItems.reduce((sum, item) => sum + item.rating, 0) / knowledgeItems.length,
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Knowledge Base</h1>
        <p className="text-gray-600">Access articles, guides, and resources to help customers effectively</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BookOpen className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Articles</p>
                <p className="text-2xl font-bold">{stats.totalArticles}</p>
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
                <p className="text-sm text-gray-600">Helpful Items</p>
                <p className="text-2xl font-bold">{stats.helpfulItems}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Eye className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Views</p>
                <p className="text-2xl font-bold">{stats.totalViews}</p>
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

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="browse">Browse Knowledge</TabsTrigger>
          <TabsTrigger value="favorites">My Favorites</TabsTrigger>
          <TabsTrigger value="recent">Recently Viewed</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-4">
          {/* Search and Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search knowledge base..."
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

          {/* Knowledge Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredItems.map((item) => (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(item.type)}
                      <Badge className={getTypeColor(item.type)}>{item.type}</Badge>
                      <Badge variant="outline">{item.category}</Badge>
                    </div>
                    {item.helpful && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription>{item.content}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{item.views} views</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        <span>{item.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{item.lastUpdated}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">By {item.author}</span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Star className="w-4 h-4 mr-1" />
                        Save
                      </Button>
                      <Button size="sm">View</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
                <p className="text-gray-500">Try adjusting your search terms or browse different categories.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="favorites">
          <Card>
            <CardContent className="p-12 text-center">
              <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No favorites yet</h3>
              <p className="text-gray-500">Save helpful articles to access them quickly later.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent">
          <Card>
            <CardContent className="p-12 text-center">
              <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No recent articles</h3>
              <p className="text-gray-500">Articles you view will appear here for quick access.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
