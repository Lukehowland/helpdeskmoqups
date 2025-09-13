"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

const mockTickets = [
  {
    id: "TK-001",
    requester: "Bettina Webb",
    email: "bettina@mail.com",
    subject: "Chat follow-up - iOS",
    agent: "Jonah Meadow",
    status: "open",
    lastMessage: "2 minutes ago",
    priority: "high",
    avatar: "BW",
    avatarColor: "bg-green-600",
  },
  {
    id: "TK-002",
    requester: "Bart Tuna",
    email: "bart@mail.com",
    subject: "Support needed",
    agent: "Linda Breach",
    status: "closed",
    lastMessage: "9 minutes ago",
    priority: "medium",
    avatar: "BT",
    avatarColor: "bg-blue-600",
  },
  {
    id: "TK-003",
    requester: "Mark Stone",
    email: "mark@mail.com",
    subject: "Wrong Size of T-Shirt...",
    agent: "Mike Benson",
    status: "open",
    lastMessage: "1 hour ago",
    priority: "low",
    avatar: "MS",
    avatarColor: "bg-yellow-600",
  },
  {
    id: "TK-004",
    requester: "Gregory Contra",
    email: "gregory@mail.com",
    subject: "Issue with prechat...",
    agent: "Jonah Meadow",
    status: "solved",
    lastMessage: "May 12, 2021",
    priority: "medium",
    avatar: "GC",
    avatarColor: "bg-blue-500",
  },
  {
    id: "TK-005",
    requester: "Linda Karlson",
    email: "Linda@mail.com",
    subject: "Browser support",
    agent: "Jason Ham",
    status: "open",
    lastMessage: "May 12, 2021",
    priority: "high",
    avatar: "LK",
    avatarColor: "bg-purple-600",
  },
]

export default function TicketsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Open</Badge>
      case "closed":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Closed</Badge>
      case "solved":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Solved</Badge>
      case "on-hold":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">On hold</Badge>
      default:
        return null
    }
  }

  const filteredTickets = mockTickets.filter((ticket) => {
    const matchesSearch =
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.requester.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Content Header */}
      <div className="border-b px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-semibold text-gray-900">All tickets</h1>
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add filter
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search in all tickets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="text-sm text-gray-500 mt-2">{filteredTickets.length} tickets</div>
      </div>

      {/* Tickets Table */}
      <div className="flex-1 overflow-auto">
        <div className="min-w-full">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b text-xs font-medium text-gray-500 uppercase tracking-wider">
            <div className="col-span-1">
              <input type="checkbox" className="rounded border-gray-300" />
            </div>
            <div className="col-span-3">REQUESTER</div>
            <div className="col-span-3">SUBJECT</div>
            <div className="col-span-2">AGENT</div>
            <div className="col-span-1">STATUS</div>
            <div className="col-span-2 flex items-center gap-1">
              LAST MESSAGE
              <ChevronLeft className="w-3 h-3" />
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200">
            {filteredTickets.map((ticket) => (
              <Link key={ticket.id} href={`/tickets/${ticket.id}`}>
                <div className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors">
                  <div className="col-span-1 flex items-center">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </div>

                  <div className="col-span-3 flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${ticket.avatarColor}`}
                    >
                      {ticket.avatar}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{ticket.requester}</div>
                      <div className="text-sm text-gray-500">{ticket.email}</div>
                    </div>
                  </div>

                  <div className="col-span-3 flex items-center">
                    <div className="flex items-center gap-2">
                      {ticket.priority === "high" && <div className="w-2 h-2 bg-red-500 rounded-full"></div>}
                      {ticket.priority === "medium" && <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>}
                      {ticket.priority === "low" && <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
                      <span className="text-gray-900">{ticket.subject}</span>
                    </div>
                  </div>

                  <div className="col-span-2 flex items-center">
                    <span className="text-gray-900">{ticket.agent}</span>
                  </div>

                  <div className="col-span-1 flex items-center">{getStatusBadge(ticket.status)}</div>

                  <div className="col-span-2 flex items-center justify-between">
                    <span className="text-gray-500">{ticket.lastMessage}</span>
                    <Button variant="ghost" size="sm" className="h-auto p-1">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="border-t px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="sm" className="bg-blue-600 text-white">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="sm">
                4
              </Button>
              <span className="px-2 text-gray-500">...</span>
              <Button variant="outline" size="sm">
                15
              </Button>
            </div>
            <Button variant="outline" size="sm">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Floating Action Button for creating tickets */}
      <Link href="/create-ticket">
        <Button
          size="lg"
          className="fixed bottom-6 right-6 h-14 w-14 rounded-xl shadow-lg bg-green-600 hover:bg-green-700 z-50 transition-all duration-200 hover:scale-105"
        >
          <Plus className="w-6 h-6" />
        </Button>
      </Link>
    </div>
  )
}
