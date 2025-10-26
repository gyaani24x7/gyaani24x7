"use client"

import React, { useState } from "react"
import { useSession, signOut } from "next-auth/react"
import LoginDialog from "./LoginDialog"

const Navbar = () => {
  const { data: session } = useSession()
  const [open, setOpen] = useState(false)

  return (
    <>
      <nav className="w-full shadow-md border-b border-red-500 bg-black sticky top-0">
        <div className="flex items-center justify-between px-4 sm:px-8 py-3">
          {/* Logo */}
          <div className="text-xl sm:text-2xl font-bold text-red-600 whitespace-nowrap">
            GYAANI<span className="text-white">24x7</span>
          </div>

          {/* Login / Logout Button */}
          {session ? (
            <div className="flex items-center gap-3">
              <span className="text-gray-300 text-sm sm:text-base">
                Hi, {session.user?.name?.split(" ")[0] || "User"}
              </span>
              <button
                className="px-4 py-2 bg-red-500 hover:bg-red-600 transition text-white rounded-lg font-medium text-sm sm:text-base"
                onClick={() => signOut()}
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              className="px-4 py-2 bg-red-500 hover:bg-red-600 transition text-white rounded-lg font-medium text-sm sm:text-base"
              onClick={() => setOpen(true)}
            >
              Login
            </button>
          )}
        </div>
      </nav>

      {/* Dialog Component */}
      <LoginDialog open={open} onOpenChange={setOpen} />
    </>
  )
}

export default Navbar
