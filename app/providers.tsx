"use client"

import type React from "react"
import { ThemeProvider } from "next-themes"
import { RoleProvider } from "@/components/role-provider"

// Este es un Componente de Cliente que agrupa todos los proveedores de contexto.
// Al aislar esta lógica, evitamos forzar a toda la aplicación a renderizarse en el cliente.
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <RoleProvider>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </RoleProvider>
  )
}