import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Headphones } from "lucide-react"

export default function RegisterUserPage() {
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
              <Link href="/login">
                <Button variant="ghost">Iniciar Sesión</Button>
              </Link>
              <Link href="/register">
                <Button variant="outline">Registrar Empresa</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <Card className="w-full max-w-md mt-16">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Registrar Usuario</CardTitle>
          <CardDescription>Crea tu cuenta de usuario para acceder al sistema de tu empresa</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre Completo</Label>
            <Input id="name" placeholder="Juan Pérez" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="juan@empresa.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Código de Empresa</Label>
            <Input id="company" placeholder="univalle" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input id="password" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
            <Input id="confirmPassword" type="password" />
          </div>
          <Button className="w-full bg-blue-600 hover:bg-blue-700">Registrar Usuario</Button>
          <div className="text-center text-sm text-gray-600">
            ¿Ya tienes cuenta?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Iniciar Sesión
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
