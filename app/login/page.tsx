"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Headphones, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useRole, createUserFromLogin } from "@/components/role-provider"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { setUser } = useRole()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Basic validation
    if (!email || !password) {
      setError("Por favor completa todos los campos")
      setIsLoading(false)
      return
    }

    try {
      // Simulate authentication delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const user = createUserFromLogin(email, password)
      setUser(user)

      router.push("/tickets")
    } catch (err) {
      setError("Error al iniciar sesión. Intenta nuevamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
                <Headphones className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">HELPDESK</h1>
            </Link>
            <nav className="flex items-center gap-4">
              <Link href="/register">
                <Button variant="outline">Registrar Empresa</Button>
              </Link>
              <Link href="/register-user">
                <Button variant="ghost">Registrar Usuario</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <Card className="w-full max-w-md mt-16">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Iniciar Sesión</CardTitle>
          <CardDescription>Ingresa a tu cuenta para acceder al sistema de helpdesk</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="empresa@gmail.com o user@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="Cualquier contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
              {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Button>
          </form>

          <div className="text-center text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
            <p className="font-medium mb-1">Credenciales de prueba:</p>
            <p>Admin: admin@gmail.com</p>
            <p>Agente: agent@gmail.com</p>
            <p>Usuario: user@gmail.com</p>
            <p>Super Admin: empresa@gmail.com</p>
            <p>Contraseña: cualquiera</p>
          </div>

          <div className="text-center text-sm text-gray-600">
            ¿No tienes cuenta?{" "}
            <Link href="/register" className="text-blue-600 hover:underline">
              Registrar Empresa
            </Link>
            {" o "}
            <Link href="/register-user" className="text-blue-600 hover:underline">
              Registrar Usuario
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
