"use client"

import React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"
import { FcGoogle } from "react-icons/fc"

interface LoginDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const LoginDialog: React.FC<LoginDialogProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black border border-red-500 text-white rounded-2xl max-w-sm">
        <DialogHeader className="text-center">
          <DialogTitle className="text-3xl font-bold text-red-500">
            Start Quizzing
          </DialogTitle>
          <DialogDescription className="text-gray-400 mt-2">
            Log in to your account to continue
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 flex flex-col items-center">
          <Button
            onClick={() => signIn("google")}
            className="flex items-center gap-3 bg-white text-black hover:bg-gray-200 rounded-full px-6 py-2 w-full justify-center"
          >
            <FcGoogle size={22} />
            Continue with Google
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default LoginDialog
