"use client" // Added "use client" directive for consistency with other layouts

import type React from "react"
import { AuthenticatedLayout } from "@/components/authenticated-layout"

export default function AnnouncementsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AuthenticatedLayout>{children}</AuthenticatedLayout>
}
