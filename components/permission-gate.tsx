"use client"

import type React from "react"
import { useRole } from "@/components/role-provider"
import type { Permission, UserRole } from "@/lib/permissions"

interface PermissionGateProps {
  permission?: Permission
  permissions?: Permission[]
  role?: UserRole
  roles?: UserRole[]
  children: React.ReactNode
  fallback?: React.ReactNode
  requireAll?: boolean // For multiple permissions, require all (default) or any
}

export function PermissionGate({
  permission,
  permissions,
  role,
  roles,
  children,
  fallback = null,
  requireAll = true,
}: PermissionGateProps) {
  const { user, hasPermission, hasAnyPermission } = useRole()

  if (!user) {
    return <>{fallback}</>
  }

  // Check role-based access
  if (role && user.role !== role) {
    return <>{fallback}</>
  }

  if (roles && !roles.includes(user.role)) {
    return <>{fallback}</>
  }

  // Check permission-based access
  if (permission && !hasPermission(permission)) {
    return <>{fallback}</>
  }

  if (permissions) {
    const hasAccess = requireAll ? permissions.every((p) => hasPermission(p)) : hasAnyPermission(permissions)

    if (!hasAccess) {
      return <>{fallback}</>
    }
  }

  return <>{children}</>
}

// Convenience components for common use cases
export function AdminOnly({ children, fallback }: { children: React.ReactNode; fallback?: React.ReactNode }) {
  return (
    <PermissionGate roles={["admin", "super_admin"]} fallback={fallback}>
      {children}
    </PermissionGate>
  )
}

export function AgentOnly({ children, fallback }: { children: React.ReactNode; fallback?: React.ReactNode }) {
  return (
    <PermissionGate roles={["agent", "admin", "super_admin"]} fallback={fallback}>
      {children}
    </PermissionGate>
  )
}

export function UserOnly({ children, fallback }: { children: React.ReactNode; fallback?: React.ReactNode }) {
  return (
    <PermissionGate role="user" fallback={fallback}>
      {children}
    </PermissionGate>
  )
}
