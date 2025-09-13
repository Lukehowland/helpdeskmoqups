"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { useRole } from "@/components/role-provider"
import { RoleBasedIconSidebar, RoleBasedTicketsSidebar, CreateTicketSidebar } from "@/components/role-based-sidebar"
import Link from "next/link"
import { Plus } from "lucide-react"

interface AuthenticatedLayoutProps {
  children: React.ReactNode
}

export function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  const { user } = useRole()
  const pathname = usePathname()

  // If no user, don't render the authenticated layout
  if (!user) {
    return <>{children}</>
  }

  const shouldShowCreateTicketSidebar = pathname.startsWith("/create-ticket")

  const shouldShowTicketsSidebar =
    (pathname.startsWith("/tickets") && user.role === "user") ||
    (pathname.startsWith("/tickets") && user.role === "agent") ||
    (pathname.startsWith("/empresa/all-tickets") && user.role === "company")

  const isAuthenticatedPage =
    pathname.startsWith("/settings") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/announcements") ||
    pathname.startsWith("/help-center") ||
    pathname.startsWith("/empresa") ||
    pathname.startsWith("/agent") ||
    pathname.startsWith("/admin")

  const shouldShowFloatingButton =
    user.role === "user" && pathname.startsWith("/tickets") && !pathname.startsWith("/create-ticket")

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        <RoleBasedIconSidebar />

        {shouldShowCreateTicketSidebar && (
          <div className="w-80 bg-white text-gray-900 overflow-y-auto border-r border-gray-200 transition-all duration-300 ease-in-out">
            <div className="border-b border-gray-200 p-4 bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <h1 className="text-lg font-bold text-gray-900">HELPDESK</h1>
                  <Badge variant="secondary" className="text-xs">
                    {user?.role === "company"
                      ? "Company Admin"
                      : user?.role === "agent"
                        ? "Agent"
                        : user?.role === "admin"
                          ? "Platform Admin"
                          : "User"}
                  </Badge>
                </div>
              </div>
              <div className="text-xs text-gray-500">{user?.company || "empresa"}.midominio.online</div>
              <div className="text-xs text-gray-400 mt-1">
                {user?.name || "Usuario"} • {user?.email || "user@empresa.com"}
              </div>
            </div>

            <CreateTicketSidebar />
          </div>
        )}

        {shouldShowTicketsSidebar && !shouldShowCreateTicketSidebar && (
          <div className="w-80 bg-white text-gray-900 overflow-y-auto border-r border-gray-200 transition-all duration-300 ease-in-out">
            <div className="border-b border-gray-200 p-4 bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <h1 className="text-lg font-bold text-gray-900">HELPDESK</h1>
                  <Badge variant="secondary" className="text-xs">
                    {user?.role === "company"
                      ? "Company Admin"
                      : user?.role === "agent"
                        ? "Agent"
                        : user?.role === "admin"
                          ? "Platform Admin"
                          : "User"}
                  </Badge>
                </div>
              </div>
              <div className="text-xs text-gray-500">{user?.company || "empresa"}.midominio.online</div>
              <div className="text-xs text-gray-400 mt-1">
                {user?.name || "Usuario"} • {user?.email || "user@empresa.com"}
              </div>
            </div>

            <RoleBasedTicketsSidebar />
          </div>
        )}

        <div className="flex-1 overflow-hidden bg-white relative">
          <div className="h-full overflow-auto">{children}</div>

          {shouldShowFloatingButton && (
            <Link href="/create-ticket">
              <button className="fixed bottom-6 right-6 w-14 h-14 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group z-50">
                <Plus className="w-6 h-6" />
                <div className="absolute right-full mr-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Crear Ticket
                </div>
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
