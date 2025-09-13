"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { LogOut, AlertTriangle } from "lucide-react"

interface LogoutConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export function LogoutConfirmationModal({ isOpen, onClose, onConfirm }: LogoutConfirmationModalProps) {
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleConfirm = async () => {
    setIsLoggingOut(true)
    try {
      await onConfirm()
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            Confirmar Cierre de Sesión
          </DialogTitle>
          <DialogDescription>
            ¿Estás seguro de que quieres cerrar sesión? Perderás cualquier trabajo no guardado.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose} disabled={isLoggingOut}>
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={isLoggingOut}
            className="bg-red-600 hover:bg-red-700"
          >
            {isLoggingOut ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Cerrando...
              </>
            ) : (
              <>
                <LogOut className="w-4 h-4 mr-2" />
                Cerrar Sesión
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
