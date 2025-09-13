"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import {
  type UserRole,
  type Permission,
  hasPermission,
  hasAnyPermission,
  getUserRoleFromEmail,
} from "@/lib/permissions"

interface User {
  id: string
  email: string
  name: string
  company: string
  role: UserRole
}

interface RoleContextType {
  user: User | null
  setUser: (user: User | null) => void
  hasPermission: (permission: Permission) => boolean
  hasAnyPermission: (permissions: Permission[]) => boolean
  isLoggedIn: boolean
}

const RoleContext = createContext<RoleContextType | undefined>(undefined)

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem("helpdesk_user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error("Failed to parse saved user:", error)
        localStorage.removeItem("helpdesk_user")
      }
    }
    setIsLoading(false)
  }, [])

  const updateUser = (newUser: User | null) => {
    setUser(newUser)
    if (newUser) {
      localStorage.setItem("helpdesk_user", JSON.stringify(newUser))
    } else {
      localStorage.removeItem("helpdesk_user")
    }
  }

  const checkPermission = (permission: Permission): boolean => {
    if (!user) return false
    return hasPermission(user.role, permission)
  }

  const checkAnyPermission = (permissions: Permission[]): boolean => {
    if (!user) return false
    return hasAnyPermission(user.role, permissions)
  }

  const value: RoleContextType = {
    user,
    setUser: updateUser,
    hasPermission: checkPermission,
    hasAnyPermission: checkAnyPermission,
    isLoggedIn: !!user,
  }

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>
}

export function useRole() {
  const context = useContext(RoleContext)
  if (context === undefined) {
    throw new Error("useRole must be used within a RoleProvider")
  }
  return context
}

export function createUserFromLogin(email: string, password: string): User {
  const role = getUserRoleFromEmail(email)

  const mockUsers: Record<string, Omit<User, "role">> = {
    "user@gmail.com": { id: "1", email, name: "Juan Pérez", company: "UniValle" },
    "agent@gmail.com": { id: "2", email, name: "María García", company: "UniValle" },
    "empresa@gmail.com": { id: "3", email, name: "Carlos Company Admin", company: "UniValle" },
    "admin@gmail.com": { id: "4", email, name: "Platform Admin", company: "Sistema" },
    "super@gmail.com": { id: "4", email, name: "Platform Admin", company: "Sistema" },
  }

  const userData = mockUsers[email] || {
    id: "1",
    email,
    name: email.split("@")[0],
    company: "UniValle",
  }

  return { ...userData, role }
}
