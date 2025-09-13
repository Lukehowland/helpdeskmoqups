"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Headphones, Building2, Users, ArrowLeft, CheckCircle } from "lucide-react"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    size: "",
    contactName: "",
    email: "",
    phone: "",
    description: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Registro de empresa:", formData)
    // Aquí iría la lógica de registro
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
                <Headphones className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">HELPDESK</h1>
            </Link>
            <Link href="/">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al Inicio
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">Registro de Empresa</Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Registra tu empresa en HELPDESK</h2>
            <p className="text-gray-600 text-pretty">
              Completa el formulario para comenzar a usar nuestro sistema de gestión de tickets
            </p>
          </div>

          {/* Registration Form */}
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl">Información de la Empresa</CardTitle>
              <CardDescription>Proporciona los datos básicos de tu organización</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Company Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Nombre de la Empresa *</Label>
                    <Input
                      id="companyName"
                      placeholder="Ej: Tecnología Avanzada S.A."
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industria</Label>
                    <Select onValueChange={(value) => setFormData({ ...formData, industry: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una industria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technology">Tecnología</SelectItem>
                        <SelectItem value="finance">Finanzas</SelectItem>
                        <SelectItem value="healthcare">Salud</SelectItem>
                        <SelectItem value="education">Educación</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="manufacturing">Manufactura</SelectItem>
                        <SelectItem value="other">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="size">Tamaño de la Empresa</Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, size: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el tamaño" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 empleados</SelectItem>
                      <SelectItem value="11-50">11-50 empleados</SelectItem>
                      <SelectItem value="51-200">51-200 empleados</SelectItem>
                      <SelectItem value="201-1000">201-1000 empleados</SelectItem>
                      <SelectItem value="1000+">Más de 1000 empleados</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Contact Information */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Información de Contacto
                  </h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contactName">Nombre del Contacto *</Label>
                      <Input
                        id="contactName"
                        placeholder="Nombre completo"
                        value={formData.contactName}
                        onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Teléfono</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2 mt-4">
                    <Label htmlFor="email">Email Corporativo *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="contacto@empresa.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Descripción de Necesidades (Opcional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe brevemente qué tipo de soporte necesita tu empresa..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </div>

                {/* Benefits */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Al registrarte obtienes:</h4>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-blue-800">
                      <CheckCircle className="w-4 h-4" />
                      <span>Acceso completo al sistema de tickets</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-blue-800">
                      <CheckCircle className="w-4 h-4" />
                      <span>Dashboard personalizado para tu empresa</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-blue-800">
                      <CheckCircle className="w-4 h-4" />
                      <span>Soporte técnico especializado</span>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 py-3">
                  Registrar Empresa
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <div className="text-center mt-8">
            <p className="text-gray-600">
              ¿Ya tienes una cuenta?{" "}
              <Link href="/tickets" className="text-blue-600 hover:underline font-medium">
                Ver tickets existentes
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
