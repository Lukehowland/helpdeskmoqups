"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, MoreHorizontal } from "lucide-react"

const supportCases = [
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

export default function SupportCasesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Open</Badge>
      case "closed":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Closed</Badge>
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="border-b px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-semibold text-gray-900">Support cases</h1>
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add filter
            </Button>
          </div>
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search support cases..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="text-sm text-gray-500 mt-2">{supportCases.length} support cases</div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="min-w-full">
          <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b text-xs font-medium text-gray-500 uppercase tracking-wider">
            <div className="col-span-1">
              <input type="checkbox" className="rounded border-gray-300" />
            </div>
            <div className="col-span-3">REQUESTER</div>
            <div className="col-span-3">SUBJECT</div>
            <div className="col-span-2">AGENT</div>
            <div className="col-span-1">STATUS</div>
            <div className="col-span-2">LAST MESSAGE</div>
          </div>

          <div className="divide-y divide-gray-200">
            {supportCases.map((ticket) => (
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
    </div>
  )
}
