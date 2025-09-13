import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Headphones, Shield, Zap, Users, ArrowRight, CheckCircle } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
                <Headphones className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">HELPDESK</h1>
            </div>
            <nav className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost">Iniciar Sesión</Button>
              </Link>
              <Link href="/register">
                <Button variant="outline">Registrar Empresa</Button>
              </Link>
              <Link href="/register-user">
                <Button>Registrar Usuario</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">Sistema de Gestión de Incidentes</Badge>
          <h2 className="text-5xl font-bold text-gray-900 mb-6 text-balance">
            Gestiona el soporte de tu empresa de manera <span className="text-blue-600">profesional</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto text-pretty">
            Plataforma completa de helpdesk que permite a las empresas gestionar tickets de soporte, clasificar
            incidentes y brindar atención al cliente de forma eficiente.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/register">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Registrar Empresa
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline">
                Iniciar Sesión
              </Button>
            </Link>
            <Link href="/register-user">
              <Button size="lg" variant="secondary">
                Registrar Usuario
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Todo lo que necesitas para gestionar soporte</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Herramientas profesionales diseñadas para empresas que buscan excelencia en atención al cliente
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Gestión Segura</CardTitle>
                <CardDescription>
                  Sistema seguro para múltiples empresas con datos protegidos y acceso controlado
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>Respuesta Rápida</CardTitle>
                <CardDescription>
                  Clasificación automática por categorías y prioridades para resolver incidentes eficientemente
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>Multi-empresa</CardTitle>
                <CardDescription>
                  Diseñado para ofrecer servicios de helpdesk a múltiples empresas desde una sola plataforma
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Optimiza la atención al cliente de tu empresa</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Tickets Organizados</h4>
                    <p className="text-gray-600">Clasifica y prioriza todos los incidentes automáticamente</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Seguimiento Completo</h4>
                    <p className="text-gray-600">Historial detallado de todos los tickets y resoluciones</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Escalabilidad</h4>
                    <p className="text-gray-600">Crece con tu empresa, desde startups hasta grandes corporaciones</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Headphones className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">¿Listo para comenzar?</h4>
                <p className="text-gray-600 mb-6">
                  Registra tu empresa o inicia sesión para gestionar tickets profesionalmente
                </p>
                <div className="space-y-3">
                  <Link href="/register">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Registrar Mi Empresa</Button>
                  </Link>
                  <Link href="/login">
                    <Button variant="outline" className="w-full bg-transparent">
                      Ya tengo cuenta - Iniciar Sesión
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
              <Headphones className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold">HELPDESK</h1>
          </div>
          <div className="text-center text-gray-400">
            <p>&copy; 2024 HELPDESK. Sistema profesional de gestión de incidentes para empresas.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
