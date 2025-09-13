"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("[v0] Application error:", error)
  }, [error])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl text-red-600">Error de Aplicación</CardTitle>
          <CardDescription>Ha ocurrido un error inesperado. Por favor intenta nuevamente.</CardDescription>
          {process.env.NODE_ENV === "development" && (
            <div className="text-xs text-gray-500 bg-gray-100 p-2 rounded mt-2 font-mono text-left">
              {error.message}
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-3">
          <Button onClick={reset} className="w-full">
            <RefreshCw className="w-4 h-4 mr-2" />
            Intentar Nuevamente
          </Button>
          <Link href="/tickets">
            <Button variant="outline" className="w-full bg-transparent">
              <Home className="w-4 h-4 mr-2" />
              Ir a Tickets
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
