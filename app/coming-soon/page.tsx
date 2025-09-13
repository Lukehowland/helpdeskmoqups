import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Construction, ArrowLeft, Clock, Zap } from "lucide-react"

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg text-center">
        <CardHeader>
          <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Construction className="w-10 h-10 text-orange-600" />
          </div>
          <CardTitle className="text-3xl mb-2">Próximamente</CardTitle>
          <CardDescription className="text-base">
            Esta funcionalidad está en desarrollo y estará disponible pronto.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-4 h-4 text-blue-500" />
              <span>En desarrollo</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Zap className="w-4 h-4 text-green-500" />
              <span>Próximamente</span>
            </div>
          </div>

          <div className="space-y-3">
            <Link href="/tickets">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver a Tickets
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="w-full bg-transparent">
                Ir al Inicio
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
