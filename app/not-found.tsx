import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileQuestion, ArrowLeft, Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileQuestion className="w-8 h-8 text-blue-600" />
          </div>
          <CardTitle className="text-2xl">Página No Encontrada</CardTitle>
          <CardDescription>La página que buscas no existe o ha sido movida.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Link href="/tickets">
            <Button className="w-full">
              <Home className="w-4 h-4 mr-2" />
              Ir a Tickets
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="w-full bg-transparent">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al Inicio
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
