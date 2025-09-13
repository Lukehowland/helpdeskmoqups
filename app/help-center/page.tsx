"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  Search,
  User,
  Lock,
  CreditCard,
  Settings,
  MessageSquare,
  ChevronRight,
  BookOpen,
  Video,
  FileText,
  ExternalLink,
} from "lucide-react"

interface HelpArticle {
  id: string
  title: string
  description: string
  category: string
  views: number
  helpful: number
  icon: React.ComponentType<{ className?: string }>
}

interface Category {
  id: string
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  articleCount: number
}

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [hasSearched, setHasSearched] = useState(false)

  const categories: Category[] = [
    {
      id: "account",
      name: "Account & Profile",
      description: "Manage your account settings and profile information",
      icon: User,
      color: "bg-blue-100 text-blue-800",
      articleCount: 12,
    },
    {
      id: "security",
      name: "Security & Privacy",
      description: "Password, login, and security-related questions",
      icon: Lock,
      color: "bg-green-100 text-green-800",
      articleCount: 8,
    },
    {
      id: "billing",
      name: "Billing & Payments",
      description: "Billing, invoices, and payment information",
      icon: CreditCard,
      color: "bg-purple-100 text-purple-800",
      articleCount: 6,
    },
    {
      id: "technical",
      name: "Technical Support",
      description: "Technical issues and troubleshooting",
      icon: Settings,
      color: "bg-orange-100 text-orange-800",
      articleCount: 15,
    },
  ]

  const popularArticles: HelpArticle[] = [
    {
      id: "1",
      title: "How to reset your password",
      description: "Step-by-step guide to reset your account password",
      category: "security",
      views: 1250,
      helpful: 89,
      icon: Lock,
    },
    {
      id: "2",
      title: "Updating your profile information",
      description: "Learn how to edit your personal details and preferences",
      category: "account",
      views: 890,
      helpful: 76,
      icon: User,
    },
    {
      id: "3",
      title: "Understanding your billing cycle",
      description: "Information about billing dates and payment processing",
      category: "billing",
      views: 654,
      helpful: 82,
      icon: CreditCard,
    },
    {
      id: "4",
      title: "Troubleshooting login issues",
      description: "Common solutions for login and access problems",
      category: "technical",
      views: 543,
      helpful: 71,
      icon: Settings,
    },
    {
      id: "5",
      title: "Setting up two-factor authentication",
      description: "Enhance your account security with 2FA",
      category: "security",
      views: 432,
      helpful: 94,
      icon: Lock,
    },
    {
      id: "6",
      title: "Managing notification preferences",
      description: "Control what notifications you receive and how",
      category: "account",
      views: 321,
      helpful: 68,
      icon: User,
    },
  ]

  const filteredArticles = popularArticles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || article.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getCategoryById = (id: string) => categories.find((cat) => cat.id === id)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim()) {
      setHasSearched(true)
    }
  }

  const showNoResults = hasSearched && searchQuery.trim() && filteredArticles.length === 0

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Help Center</h1>
        <p className="text-gray-600 text-lg">Find answers to common questions and get the help you need</p>
      </div>

      {/* Search Bar */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search for help articles..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-12 h-12 text-lg"
            />
          </div>
        </CardContent>
      </Card>

      {/* No Results Section */}
      {showNoResults && (
        <Card className="mb-8 bg-yellow-50 border-yellow-200">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-yellow-100 rounded-full">
                <Search className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No articles found for "{searchQuery}"</h3>
            <p className="text-gray-600 mb-4">
              We couldn't find any help articles matching your search. Would you like to create a support ticket
              instead?
            </p>
            <Link href="/tickets/create">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <MessageSquare className="w-4 h-4 mr-2" />
                Create Support Ticket
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Categories */}
      {!showNoResults && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <Card
                  key={category.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedCategory === category.id ? "ring-2 ring-blue-500" : ""
                  }`}
                  onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${category.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-1">{category.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{category.description}</p>
                        <Badge variant="secondary" className="text-xs">
                          {category.articleCount} articles
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}

      {/* Popular Articles */}
      {!showNoResults && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              {selectedCategory ? `${getCategoryById(selectedCategory)?.name} Articles` : "Popular Articles"}
            </h2>
            {selectedCategory && (
              <Button variant="outline" onClick={() => setSelectedCategory(null)}>
                Show All Categories
              </Button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredArticles.map((article) => {
              const Icon = article.icon
              const category = getCategoryById(article.category)
              return (
                <Card key={article.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${category?.color || "bg-gray-100 text-gray-800"}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-1">{article.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{article.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>{article.views} views</span>
                            <span>{article.helpful}% helpful</span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}

      {/* Additional Resources */}
      {!showNoResults && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Additional Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="font-medium">User Guide</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">Comprehensive documentation and tutorials</p>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Guide
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Video className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="font-medium">Video Tutorials</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">Step-by-step video guides and walkthroughs</p>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Watch Videos
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <FileText className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="font-medium">API Documentation</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">Technical documentation for developers</p>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Docs
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Still Need Help */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Can't find what you're looking for?</h3>
          <p className="text-gray-600 mb-4">
            If you couldn't find the answer to your question in our help articles, our support team is here to help you.
          </p>
          <Link href="/tickets/create">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <MessageSquare className="w-4 h-4 mr-2" />
              Create Support Ticket
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
