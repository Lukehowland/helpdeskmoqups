export type UserRole = "user" | "agent" | "company" | "admin"

export type Permission =
  // Ticket permissions
  | "tickets.view.own"
  | "tickets.view.all"
  | "tickets.create"
  | "tickets.respond.own"
  | "tickets.respond.all"
  | "tickets.assign"
  | "tickets.close"

  // User management permissions
  | "users.view"
  | "users.create"
  | "users.edit"
  | "users.delete"

  // Company management permissions
  | "company.view"
  | "company.edit"
  | "company.agents.add"
  | "company.agents.remove"
  | "company.announcements.create"
  | "company.announcements.edit"

  // System permissions
  | "system.analytics"
  | "system.settings"
  | "system.companies.manage"
  | "system.companies.approve"
  | "system.companies.reject"

  // AI Assistant permissions
  | "ai.assistant.access"

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  // Regular User - Limited access to own tickets and profile
  user: ["tickets.view.own", "tickets.create", "tickets.respond.own"],

  // Support Agent - Can handle tickets + AI assistant
  agent: [
    "tickets.view.own",
    "tickets.view.all",
    "tickets.respond.own",
    "tickets.respond.all",
    "tickets.assign",
    "tickets.close",
    "ai.assistant.access",
  ],

  // Company Admin - Manages company, agents, and company tickets
  company: [
    "tickets.view.own",
    "tickets.view.all",
    "tickets.create",
    "tickets.respond.own",
    "tickets.respond.all",
    "tickets.assign",
    "tickets.close",
    "users.view",
    "users.create",
    "users.edit",
    "company.view",
    "company.edit",
    "company.agents.add",
    "company.agents.remove",
    "company.announcements.create",
    "company.announcements.edit",
    "system.analytics",
    "ai.assistant.access",
  ],

  // Platform Admin - Only manages company applications and platform
  admin: [
    "system.companies.manage",
    "system.companies.approve",
    "system.companies.reject",
    "system.settings",
    "users.view",
    "company.view",
  ],
}

export function hasPermission(userRole: UserRole, permission: Permission): boolean {
  return ROLE_PERMISSIONS[userRole].includes(permission)
}

export function hasAnyPermission(userRole: UserRole, permissions: Permission[]): boolean {
  return permissions.some((permission) => hasPermission(userRole, permission))
}

export function getUserRoleFromEmail(email: string): UserRole {
  if (email.includes("empresa@")) return "company"
  if (email.includes("agent@")) return "agent"
  if (email.includes("admin@") || email.includes("super@")) return "admin"
  return "user"
}
