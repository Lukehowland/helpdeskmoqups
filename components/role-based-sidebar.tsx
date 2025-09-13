"use client"

import type React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import {
  Ticket,
  User,
  Users,
  CheckCircle,
  Settings,
  BarChart3,
  LogOut,
  Headphones,
  HelpCircle,
  MessageSquare,
  UserPlus,
  Building,
  FileText,
  Bell,
  Shield,
  Plus,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useRole } from "@/components/role-provider"
import { LogoutConfirmationModal } from "@/components/logout-confirmation-modal"
import { useState } from "react"

interface SidebarItem {
  icon: React.ComponentType<{ className?: string }>
  href: string
  label: string
  isActive?: boolean
}

interface SidebarSection {
  title: string
  count: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

export function RoleBasedIconSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, setUser } = useRole()
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  const regularUserItems: SidebarItem[] = [
    {
      icon: Ticket,
      href: "/tickets",
      label: "My Tickets",
    },
    {
      icon: Bell,
      href: "/announcements",
      label: "Announcements",
    },
    {
      icon: HelpCircle,
      href: "/help-center",
      label: "Help Center",
    },
    {
      icon: User,
      href: "/profile",
      label: "Profile",
    },
    {
      icon: Settings,
      href: "/settings",
      label: "Settings",
    },
  ]

  const agentItems: SidebarItem[] = [
    {
      icon: BarChart3,
      href: "/agent/dashboard",
      label: "Dashboard",
    },
    {
      icon: Ticket,
      href: "/tickets",
      label: "All Tickets",
    },
    {
      icon: MessageSquare,
      href: "/agent/assigned",
      label: "My Assigned",
    },
    {
      icon: FileText,
      href: "/agent/knowledge",
      label: "Knowledge Base",
    },
    {
      icon: User,
      href: "/profile",
      label: "Profile",
    },
    {
      icon: Settings,
      href: "/settings",
      label: "Settings",
    },
  ]

  const companyAdminItems: SidebarItem[] = [
    {
      icon: BarChart3,
      href: "/empresa/dashboard",
      label: "Dashboard",
    },
    {
      icon: Ticket,
      href: "/empresa/all-tickets",
      label: "All Tickets",
    },
    {
      icon: UserPlus,
      href: "/empresa/agents",
      label: "Manage Agents",
    },
    {
      icon: Bell,
      href: "/empresa/announcements",
      label: "Announcements",
    },
    {
      icon: HelpCircle,
      href: "/empresa/help-management",
      label: "Help Articles",
    },
    {
      icon: Settings,
      href: "/empresa/company",
      label: "Company Settings",
    },
  ]

  const platformAdminItems: SidebarItem[] = [
    {
      icon: Shield,
      href: "/admin/dashboard",
      label: "Platform Dashboard",
    },
    {
      icon: Building,
      href: "/admin/companies",
      label: "Company Applications",
    },
    {
      icon: Users,
      href: "/admin/users",
      label: "All Users",
    },
    {
      icon: User,
      href: "/profile",
      label: "Profile",
    },
    {
      icon: Settings,
      href: "/admin/system-settings",
      label: "System Settings",
    },
  ]

  const getCurrentItems = () => {
    switch (user?.role) {
      case "user":
        return regularUserItems
      case "agent":
        return agentItems
      case "company":
        return companyAdminItems
      case "admin":
        return platformAdminItems
      default:
        return regularUserItems
    }
  }

  const currentItems = getCurrentItems()

  const getActiveState = (item: SidebarItem) => {
    if (item.href === "/tickets") {
      return pathname.startsWith("/tickets") || pathname.startsWith("/create-ticket")
    }
    if (item.href === "/empresa/all-tickets") {
      return pathname.startsWith("/empresa/all-tickets") || pathname.startsWith("/tickets")
    }
    return pathname.startsWith(item.href)
  }

  const handleLogout = () => {
    setUser(null)
    router.push("/")
  }

  return (
    <>
      <div className="w-16 bg-gray-800 border-r border-gray-700 flex flex-col">
        {/* Logo Section */}
        <div className="flex items-center justify-center py-4 border-b border-gray-700">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
            <Headphones className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex flex-col items-center py-4 space-y-2 flex-1">
          {currentItems.map((item) => {
            const Icon = item.icon
            const isActive = getActiveState(item)
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-lg transition-colors group relative",
                    isActive ? "bg-blue-600 text-white" : "text-gray-400 hover:bg-gray-700 hover:text-white",
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                    {item.label}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Bottom Items (Logout) */}
        <div className="flex flex-col items-center py-4 border-t border-gray-700">
          <button
            onClick={() => setShowLogoutModal(true)}
            className="flex items-center justify-center w-10 h-10 rounded-lg transition-colors group relative text-gray-400 hover:bg-red-600 hover:text-white"
          >
            <LogOut className="w-5 h-5" />
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
              Logout
            </div>
          </button>
        </div>
      </div>

      <LogoutConfirmationModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </>
  )
}

export function CreateTicketSidebar() {
  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <div className="flex items-center justify-center w-8 h-8 bg-green-600 rounded">
          <Plus className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Creando Ticket</h2>
        </div>
      </div>

      {/* Description */}
      <div className="mb-6">
        <p className="text-sm text-gray-600 leading-relaxed">
          Describe tu problema o solicitud y nuestro equipo te ayudará lo antes posible
        </p>
      </div>

      {/* Quick Tips */}
      <div className="bg-blue-50 rounded-lg p-4 mb-6">
        <h3 className="text-sm font-medium text-blue-900 mb-2">Consejos para un mejor soporte:</h3>
        <ul className="text-xs text-blue-700 space-y-1">
          <li>• Sé específico con tu problema</li>
          <li>• Incluye pasos para reproducir el error</li>
          <li>• Menciona el navegador que usas</li>
          <li>• Adjunta capturas si es necesario</li>
        </ul>
      </div>

      {/* Quick Actions */}
      <div className="space-y-2">
        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">ACCIONES RÁPIDAS</h3>
        <Link href="/tickets">
          <div className="flex items-center gap-3 p-2 rounded-lg text-sm hover:bg-gray-100 transition-colors">
            <Ticket className="w-4 h-4 text-gray-500" />
            <span>Ver mis tickets</span>
          </div>
        </Link>
        <Link href="/help-center">
          <div className="flex items-center gap-3 p-2 rounded-lg text-sm hover:bg-gray-100 transition-colors">
            <HelpCircle className="w-4 h-4 text-gray-500" />
            <span>Centro de ayuda</span>
          </div>
        </Link>
      </div>
    </div>
  )
}

export function RoleBasedTicketsSidebar() {
  const pathname = usePathname()
  const { user } = useRole()

  if (!user) return null

  if (user.role === "agent") {
    const agentSidebarItems = [
      {
        title: "All tickets",
        count: "99+",
        href: "/tickets",
        icon: Ticket,
      },
      {
        title: "Unassigned",
        count: "12",
        href: "/tickets/unassigned",
        icon: MessageSquare,
      },
      {
        title: "High priority",
        count: "5",
        href: "/tickets/high-priority",
        icon: User,
      },
      {
        title: "My assigned",
        count: "8",
        href: "/agent/assigned",
        icon: CheckCircle,
      },
    ]

    const agentStatusItems = [
      {
        title: "Open",
        count: "99+",
        href: "/tickets?status=open",
        color: "text-blue-600",
      },
      {
        title: "Pending",
        count: "67",
        href: "/tickets?status=pending",
        color: "text-yellow-600",
      },
      {
        title: "On hold",
        count: "66",
        href: "/tickets?status=on-hold",
        color: "text-orange-600",
      },
      {
        title: "Solved",
        count: "99+",
        href: "/tickets?status=solved",
        color: "text-green-600",
      },
    ]

    return (
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Tickets</h2>
          </div>
        </div>

        {/* Agent Ticket Views */}
        <div className="space-y-2 mb-6">
          {agentSidebarItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={cn(
                    "flex items-center justify-between p-2 rounded-lg text-sm hover:bg-gray-100 transition-colors",
                    isActive && "bg-blue-50 text-blue-600 border border-blue-200",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.title}</span>
                  </div>
                  <Badge variant="secondary" className="bg-gray-100 text-gray-600 text-xs">
                    {item.count}
                  </Badge>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Status Filters */}
        <div>
          <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">STATUSES</h3>
          <div className="space-y-1">
            {agentStatusItems.map((status) => (
              <Link key={status.href} href={status.href}>
                <div className="flex items-center justify-between p-2 rounded text-sm hover:bg-gray-100 transition-colors">
                  <span className={status.color}>{status.title}</span>
                  <Badge variant="secondary" className="bg-gray-100 text-gray-600 text-xs">
                    {status.count}
                  </Badge>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (user.role === "company") {
    const companyAdminSidebarItems = [
      {
        title: "All tickets",
        count: "99+",
        href: "/empresa/all-tickets",
        icon: Ticket,
      },
      {
        title: "Unassigned",
        count: "12",
        href: "/empresa/all-tickets?filter=unassigned",
        icon: MessageSquare,
      },
      {
        title: "High priority",
        count: "5",
        href: "/empresa/all-tickets?filter=high-priority",
        icon: User,
      },
      {
        title: "Agent performance",
        count: "8",
        href: "/empresa/performance",
        icon: BarChart3,
      },
    ]

    const companyStatusItems = [
      {
        title: "Open",
        count: "99+",
        href: "/empresa/all-tickets?status=open",
        color: "text-blue-600",
      },
      {
        title: "Pending",
        count: "67",
        href: "/empresa/all-tickets?status=pending",
        color: "text-yellow-600",
      },
      {
        title: "On hold",
        count: "66",
        href: "/empresa/all-tickets?status=on-hold",
        color: "text-orange-600",
      },
      {
        title: "Solved",
        count: "99+",
        href: "/empresa/all-tickets?status=solved",
        color: "text-green-600",
      },
    ]

    return (
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <div className="flex items-center justify-center w-8 h-8 bg-purple-600 rounded">
            <Building className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Company Tickets</h2>
          </div>
        </div>

        {/* Company Admin Ticket Views */}
        <div className="space-y-2 mb-6">
          {companyAdminSidebarItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={cn(
                    "flex items-center justify-between p-2 rounded-lg text-sm hover:bg-gray-100 transition-colors",
                    isActive && "bg-blue-50 text-blue-600 border border-blue-200",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.title}</span>
                  </div>
                  <Badge variant="secondary" className="bg-gray-100 text-gray-600 text-xs">
                    {item.count}
                  </Badge>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Status Filters */}
        <div>
          <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">STATUSES</h3>
          <div className="space-y-1">
            {companyStatusItems.map((status) => (
              <Link key={status.href} href={status.href}>
                <div className="flex items-center justify-between p-2 rounded text-sm hover:bg-gray-100 transition-colors">
                  <span className={status.color}>{status.title}</span>
                  <Badge variant="secondary" className="bg-gray-100 text-gray-600 text-xs">
                    {status.count}
                  </Badge>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (user.role === "admin") {
    return null
  }

  // User sidebar (updated design)
  const userSidebarItems: SidebarSection[] = [
    {
      title: "All tickets",
      count: "15",
      href: "/tickets",
      icon: Ticket,
    },
    {
      title: "My open tickets",
      count: "3",
      href: "/tickets/my-open",
      icon: Ticket,
    },
    {
      title: "Resolved tickets",
      count: "12",
      href: "/tickets/resolved",
      icon: CheckCircle,
    },
  ]

  const statusItems = [
    {
      title: "Open",
      count: "2",
      href: "/tickets?status=open",
      color: "text-blue-600",
    },
    {
      title: "Pending",
      count: "1",
      href: "/tickets?status=pending",
      color: "text-yellow-600",
    },
    {
      title: "Solved",
      count: "12",
      href: "/tickets?status=solved",
      color: "text-green-600",
    },
  ]

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <div className="flex items-center justify-center w-8 h-8 bg-green-600 rounded">
          <Ticket className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">My Tickets</h2>
        </div>
      </div>

      {/* My Tickets */}
      <div className="space-y-2 mb-6">
        {userSidebarItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "flex items-center justify-between p-2 rounded-lg text-sm hover:bg-gray-100 transition-colors",
                  isActive && "bg-blue-50 text-blue-600 border border-blue-200",
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.title}</span>
                </div>
                <Badge variant="secondary" className="bg-gray-100 text-gray-600 text-xs">
                  {item.count}
                </Badge>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Status Filters */}
      <div>
        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">MY TICKET STATUS</h3>
        <div className="space-y-1">
          {statusItems.map((status) => (
            <Link key={status.href} href={status.href}>
              <div className="flex items-center justify-between p-2 rounded text-sm hover:bg-gray-100 transition-colors">
                <span className={status.color}>{status.title}</span>
                <Badge variant="secondary" className="bg-gray-100 text-gray-600 text-xs">
                  {status.count}
                </Badge>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
