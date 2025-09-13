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
import { Plus, AlertCircle, Clock, Zap, ArrowLeft, Upload } from "lucide-react"

export default function CreateTicketPage() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    priority: "",
    description: "",
    company: "",
    contactEmail: "",
    contactName: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Nuevo ticket:", formData)
    // Aquí iría la lógica para crear el ticket
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-end mb-8">
        <Link href="/tickets">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a Tickets
          </Button>
        </Link>
      </div>

      {/* Create Ticket Form */}
      <Card className="shadow-lg border-0">
        <CardHeader className="text-center pb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-xl">Información del Incidente</CardTitle>
          <CardDescription>Proporciona todos los detalles necesarios para resolver tu solicitud</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Company and Contact Info */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Empresa *</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, company: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tu empresa" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tech-corp">Tecnología Avanzada S.A.</SelectItem>
                    <SelectItem value="finance-inc">Finanzas Globales Inc.</SelectItem>
                    <SelectItem value="health-systems">Sistemas de Salud</SelectItem>
                    <SelectItem value="edu-solutions">Soluciones Educativas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactName">Nombre de Contacto *</Label>
                <Input
                  id="contactName"
                  placeholder="Tu nombre completo"
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactEmail">Email de Contacto *</Label>
              <Input
                id="contactEmail"
                type="email"
                placeholder="tu.email@empresa.com"
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                required
              />
            </div>

            {/* Ticket Details */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Detalles del Incidente</h3>

              <div className="space-y-2 mb-4">
                <Label htmlFor="title">Título del Problema *</Label>
                <Input
                  id="title"
                  placeholder="Ej: Error al acceder al sistema de facturación"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Categoría *</Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">Problema Técnico</SelectItem>
                      <SelectItem value="access">Acceso y Permisos</SelectItem>
                      <SelectItem value="software">Software/Aplicaciones</SelectItem>
                      <SelectItem value="hardware">Hardware/Equipos</SelectItem>
                      <SelectItem value="network">Red y Conectividad</SelectItem>
                      <SelectItem value="security">Seguridad</SelectItem>
                      <SelectItem value="training">Capacitación</SelectItem>
                      <SelectItem value="other">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Prioridad *</Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, priority: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona prioridad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-red-500" />
                          Alta - Crítico
                        </div>
                      </SelectItem>
                      <SelectItem value="medium">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-yellow-500" />
                          Media - Importante
                        </div>
                      </SelectItem>
                      <SelectItem value="low">
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-green-500" />
                          Baja - Normal
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción Detallada *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe el problema paso a paso, incluyendo:
- ¿Qué estabas haciendo cuando ocurrió?
- ¿Qué mensaje de error aparece?
- ¿Cuándo comenzó el problema?
- ¿Has intentado alguna solución?"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={6}
                  required
                />
              </div>
            </div>

            {/* File Upload */}
            <div className="border-t pt-6">
              <Label className="text-base font-medium">Archivos Adjuntos (Opcional)</Label>
              <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">
                  Arrastra archivos aquí o{" "}
                  <button type="button" className="text-blue-600 hover:underline">
                    selecciona archivos
                  </button>
                </p>
                <p className="text-xs text-gray-500 mt-1">Capturas de pantalla, logs, documentos (máx. 10MB)</p>
              </div>
            </div>

            {/* Priority Info */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Tiempos de Respuesta:</h4>
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2 text-blue-800">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <span>
                    <strong>Alta:</strong> Respuesta en 2 horas
                  </span>
                </div>
                <div className="flex items-center gap-2 text-blue-800">
                  <Clock className="w-4 h-4 text-yellow-500" />
                  <span>
                    <strong>Media:</strong> Respuesta en 8 horas
                  </span>
                </div>
                <div className="flex items-center gap-2 text-blue-800">
                  <Zap className="w-4 h-4 text-green-500" />
                  <span>
                    <strong>Baja:</strong> Respuesta en 24 horas
                  </span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 py-3">
              Crear Ticket de Soporte
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Additional Info */}
      <div className="text-center mt-8">
        <p className="text-gray-600">
          ¿Necesitas ver tickets existentes?{" "}
          <Link href="/tickets" className="text-blue-600 hover:underline font-medium">
            Ver todos los tickets
          </Link>
        </p>
      </div>
    </div>
  )
}
