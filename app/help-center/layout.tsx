"use client"

import type React from "react"

import { AuthenticatedLayout } from "@/components/authenticated-layout"

export default function HelpCenterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AuthenticatedLayout>{children}</AuthenticatedLayout>
}
